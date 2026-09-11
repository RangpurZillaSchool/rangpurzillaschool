import {
  BASE_URL,
  getSessionCookie,
  extractHiddenFields,
  errorResponse,
  legacyUnavailableResponse
} from '../_client.js';

/**
 * Cloudflare Pages Function: /api/payments
 *
 * NOTE: Unlike student roster and notices (which use 12-hour Edge Caching),
 * payment data is fetched INSTANT (Live Real-Time, 0-cache) on every request.
 * This ensures that when a student or parent pays their fees, their updated
 * status (PAID/DUE) and transaction ID are immediately visible without delay.
 */
export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const studentId = url.searchParams.get('studentId');
  const requestedQuarter = url.searchParams.get('quarter');

  if (!studentId) {
    return errorResponse('Parameter studentId is required. Example: /api/payments?studentId=127372261031001', 400);
  }

  try {
    const cookie = await getSessionCookie();
    if (!cookie) {
      return legacyUnavailableResponse();
    }

    const payUrl = new URL('payment-history.aspx', BASE_URL).href;

    // Step 1: Initial GET to obtain fresh ViewState and session
    const getRes = await fetch(payUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
        'Cookie': cookie,
        'Referer': BASE_URL
      }
    });

    if (!getRes.ok) {
      return legacyUnavailableResponse();
    }

    const initialHtml = await getRes.text();
    const state = extractHiddenFields(initialHtml);

    // Step 2: Post Search by Student ID
    const searchBody = new URLSearchParams({
      '__EVENTTARGET': '',
      '__EVENTARGUMENT': '',
      '__VIEWSTATE': state.viewState,
      '__VIEWSTATEGENERATOR': state.viewStateGenerator,
      'ctl00$ContentPlaceHolder1$txtID': studentId.trim(),
      'ctl00$ContentPlaceHolder1$btnSearch': 'Search'
    });

    const searchRes = await fetch(payUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
        'Cookie': cookie,
        'Referer': payUrl
      },
      body: searchBody.toString()
    });

    if (!searchRes.ok) {
      return legacyUnavailableResponse();
    }

    const searchHtml = await searchRes.text();

    const nameMatch = searchHtml.match(/id="ContentPlaceHolder1_lblName"[^>]*>([^<]*)<\/span>/);
    const sessionMatch = searchHtml.match(/id="ContentPlaceHolder1_lblSession"[^>]*>([^<]*)<\/span>/);
    const classMatch = searchHtml.match(/id="ContentPlaceHolder1_lblClass"[^>]*>([^<]*)<\/span>/);
    const shiftMatch = searchHtml.match(/id="ContentPlaceHolder1_lblShift"[^>]*>([^<]*)<\/span>/);
    const sectionMatch = searchHtml.match(/id="ContentPlaceHolder1_lblSection"[^>]*>([^<]*)<\/span>/);
    const rollMatch = searchHtml.match(/id="ContentPlaceHolder1_lblRollNo"[^>]*>([^<]*)<\/span>/);
    const imgMatch = searchHtml.match(/id="ContentPlaceHolder1_imgStudent"[^>]*src="([^"]*)"/);

    const studentName = nameMatch ? nameMatch[1].trim() : '';

    if (!studentName) {
      return new Response(JSON.stringify({
        success: false,
        message: 'প্রদত্ত শিক্ষার্থী আইডি অনুযায়ী কোনো তথ্য বা ফি বিবরণী পাওয়া যায়নি।'
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-store, no-cache, must-revalidate'
        }
      });
    }

    const rawPhoto = imgMatch && imgMatch[1] && !imgMatch[1].includes('no-image') ? imgMatch[1] : null;
    const photo = rawPhoto ? `/api/students/photo?url=${encodeURIComponent(rawPhoto)}` : null;

    const student = {
      id: studentId.trim(),
      name: studentName,
      session: sessionMatch ? sessionMatch[1].trim() : '',
      className: classMatch ? classMatch[1].trim() : '',
      shift: shiftMatch ? shiftMatch[1].trim() : '',
      section: sectionMatch ? sectionMatch[1].trim() : '',
      roll: rollMatch ? rollMatch[1].trim() : '',
      photo
    };

    // Extract available quarters
    const quarters = [];
    const qMatches = searchHtml.matchAll(/<option\s+(?:selected="selected"\s+)?value="([^"]+)">([^<]+)<\/option>/g);
    for (const m of qMatches) {
      if (m[1] && m[1] !== '0') {
        quarters.push({ value: m[1], label: m[2].trim() });
      }
    }

    const defaultQMatch = searchHtml.match(/<select[^>]*name="ctl00\$ContentPlaceHolder1\$cmbQuarter"[^>]*>[\s\S]*?<option selected="selected" value="([^"]+)">/);
    let selectedQuarter = requestedQuarter || (defaultQMatch ? defaultQMatch[1] : (quarters[0]?.value || ''));

    // Step 3: Fetch receipt for requestedQuarter if different or requested
    let finalHtml = searchHtml;
    if (requestedQuarter && defaultQMatch && defaultQMatch[1] !== requestedQuarter) {
      const postState = extractHiddenFields(searchHtml);
      const qBody = new URLSearchParams({
        '__EVENTTARGET': '',
        '__EVENTARGUMENT': '',
        '__VIEWSTATE': postState.viewState,
        '__VIEWSTATEGENERATOR': postState.viewStateGenerator,
        'ctl00$ContentPlaceHolder1$txtID': studentId.trim(),
        'ctl00$ContentPlaceHolder1$cmbQuarter': requestedQuarter,
        'ctl00$ContentPlaceHolder1$btnShow': 'Show'
      });

      const qRes = await fetch(payUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
          'Cookie': cookie,
          'Referer': payUrl
        },
        body: qBody.toString()
      });

      if (qRes.ok) {
        finalHtml = await qRes.text();
        selectedQuarter = requestedQuarter;
      }
    }

    // Step 4: Parse receipt table
    let receipt = null;
    const receiptContainer = finalHtml.match(/id="ContentPlaceHolder1_pnlReceipt"[\s\S]*?<\/table>/);

    if (receiptContainer) {
      const qMatch = finalHtml.match(/id="ContentPlaceHolder1_lblQuarter"[^>]*>([^<]*)<\/span>/);
      const dateMatch = finalHtml.match(/id="ContentPlaceHolder1_lblDate"[^>]*>([^<]*)<\/span>/);
      const trxMatch = finalHtml.match(/id="ContentPlaceHolder1_lblTrxID"[^>]*>([^<]*)<\/span>/);
      const statusMatch = finalHtml.match(/id="ContentPlaceHolder1_lblStatus"[^>]*>([^<]*)<\/span>/);
      const govtTotalMatch = finalHtml.match(/id="ContentPlaceHolder1_lblTotalGovt"[^>]*>([^<]*)<\/span>/);
      const nonGovtTotalMatch = finalHtml.match(/id="ContentPlaceHolder1_lblTotalNonGovt"[^>]*>([^<]*)<\/span>/);
      const grandTotalMatch = finalHtml.match(/id="ContentPlaceHolder1_lblGrandTotal"[^>]*>([^<]*)<\/span>/);

      const payQtr = qMatch ? qMatch[1].trim() : '';
      const payDate = dateMatch ? dateMatch[1].trim() : '';
      const payTrx = trxMatch ? trxMatch[1].trim() : '';
      const payStatus = statusMatch ? statusMatch[1].trim() : '';
      const totalGovt = govtTotalMatch ? govtTotalMatch[1].trim() : '';
      const totalNonGovt = nonGovtTotalMatch ? nonGovtTotalMatch[1].trim() : '';
      const grandTotal = grandTotalMatch ? grandTotalMatch[1].trim() : '';

      const tableMatch = finalHtml.match(/<table[^>]*id="ContentPlaceHolder1_pnlReceipt"[\s\S]*?<\/table>/);
      if (tableMatch) {
        const rows = [...tableMatch[0].matchAll(/<tr[^>]*id="ContentPlaceHolder1_row_([^"]+)"[^>]*>([\s\S]*?)<\/tr>/g)];
        const items = [];
        for (const r of rows) {
          const rowId = r[1];
          if (rowId.startsWith('Total')) continue;
          const headMatch = r[2].match(/class="leftColumnStyle"[^>]*>([\s\S]*?)<\/td>/);
          const amtMatch = r[2].match(/class="rightColumnStyle"[^>]*>[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/);
          if (headMatch && amtMatch) {
            items.push({
              head: headMatch[1].trim().replace(/\s+/g, ' '),
              amount: amtMatch[1].trim()
            });
          }
        }

        if (payStatus || items.length > 0 || grandTotal) {
          receipt = {
            quarter: payQtr || selectedQuarter,
            date: payDate,
            trxId: payTrx,
            status: payStatus || 'PAID',
            items,
            totalGovt,
            totalNonGovt,
            grandTotal
          };
        }
      }
    }

    // Return INSTANT Real-Time response (no-cache)
    return new Response(JSON.stringify({
      success: true,
      student,
      quarters,
      selectedQuarter,
      receipt
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
      }
    });
  } catch (err) {
    return legacyUnavailableResponse();
  }
}
