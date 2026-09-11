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
 * NOTE: Fetches live payment history from Rangpur Zilla School's ASP.NET WebForms.
 * Uses two-step handshake:
 * 1. btnSearch -> to retrieve student identity, class, shift, roll & quarter dropdown list.
 * 2. btnShow (with target quarter) -> to retrieve statement, payment status (PAID/UNPAID),
 *    date, transaction ID, and itemized fees.
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
    const studentName = nameMatch ? nameMatch[1].trim() : '';

    if (!studentName) {
      return new Response(JSON.stringify({
        success: false,
        message: 'প্রদত্ত শিক্ষার্থী আইডি অনুযায়ী কোনো তথ্য পাওয়া যায়নি।'
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-store, no-cache, must-revalidate'
        }
      });
    }

    const sessionMatch = searchHtml.match(/id="ContentPlaceHolder1_lblSession"[^>]*>([^<]*)<\/span>/);
    const classMatch = searchHtml.match(/id="ContentPlaceHolder1_lblClass"[^>]*>([^<]*)<\/span>/);
    const shiftMatch = searchHtml.match(/id="ContentPlaceHolder1_lblShift"[^>]*>([^<]*)<\/span>/);
    const sectionMatch = searchHtml.match(/id="ContentPlaceHolder1_lblSection"[^>]*>([^<]*)<\/span>/);
    const rollMatch = searchHtml.match(/id="ContentPlaceHolder1_lblRollNo"[^>]*>([^<]*)<\/span>/);
    const imgMatch = searchHtml.match(/id="ContentPlaceHolder1_imgStudent"[^>]*src="([^"]*)"/);

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
    const qMatches = [...searchHtml.matchAll(/<option\s+(?:selected="selected"\s+)?value="([^"]+)">([^<]+)<\/option>/g)];
    for (const m of qMatches) {
      if (m[1] && !m[1].toLowerCase().includes('select')) {
        quarters.push({ value: m[1], label: m[2].trim() });
      }
    }

    // Determine target quarter (user specified or default to the first real quarter)
    const targetQuarter = (requestedQuarter && quarters.some(q => q.value === requestedQuarter))
      ? requestedQuarter
      : (quarters[0]?.value || '');

    let receipt = null;
    let selectedQuarter = targetQuarter;

    // Step 3: Fetch receipt/statement by submitting btnShow with targetQuarter
    if (targetQuarter) {
      const vs3 = searchHtml.match(/id="__VIEWSTATE"\s+value="([^"]*)"/)?.[1] || '';
      const vsg3 = searchHtml.match(/id="__VIEWSTATEGENERATOR"\s+value="([^"]*)"/)?.[1] || '';

      const showBody = new URLSearchParams({
        '__EVENTTARGET': '',
        '__EVENTARGUMENT': '',
        '__VIEWSTATE': vs3,
        '__VIEWSTATEGENERATOR': vsg3,
        'ctl00$ContentPlaceHolder1$txtID': studentId.trim(),
        'ctl00$ContentPlaceHolder1$cmbQuarter': targetQuarter,
        'ctl00$ContentPlaceHolder1$btnShow': 'Show'
      });

      const showRes = await fetch(payUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
          'Cookie': cookie,
          'Referer': payUrl
        },
        body: showBody.toString()
      });

      if (showRes.ok) {
        const showHtml = await showRes.text();

        if (showHtml.includes('ContentPlaceHolder1_pnlStatement') || showHtml.includes('ContentPlaceHolder1_lblPayStatus')) {
          const qMatch = showHtml.match(/id="ContentPlaceHolder1_lblPayQtr"[^>]*>([^<]*)<\/span>/);
          const dateMatch = showHtml.match(/id="ContentPlaceHolder1_lblPayDate"[^>]*>([^<]*)<\/span>/) ||
                            showHtml.match(/id="ContentPlaceHolder1_lblDate"[^>]*>([^<]*)<\/span>/);
          const trxMatch = showHtml.match(/id="ContentPlaceHolder1_lblPayTrx"[^>]*>([^<]*)<\/span>/);
          const statusMatch = showHtml.match(/id="ContentPlaceHolder1_lblPayStatus"[^>]*>([^<]*)<\/span>/);
          const govtTotalMatch = showHtml.match(/id="ContentPlaceHolder1_lblTotalGovtFee"[^>]*>([^<]*)<\/span>/);
          const nonGovtTotalMatch = showHtml.match(/id="ContentPlaceHolder1_lblTotalNonGovtFee"[^>]*>([^<]*)<\/span>/);
          const grandTotalMatch = showHtml.match(/id="ContentPlaceHolder1_lblGrandTotal"[^>]*>([^<]*)<\/span>/);

          const payQtr = qMatch ? qMatch[1].trim() : targetQuarter;
          const payDate = dateMatch ? dateMatch[1].trim() : '';
          let payTrx = trxMatch ? trxMatch[1].trim() : '';
          payTrx = payTrx.replace(/[\[\]]/g, '').trim();

          const payStatus = statusMatch ? statusMatch[1].trim() : 'UNPAID';
          const totalGovt = govtTotalMatch ? govtTotalMatch[1].trim() : '';
          const totalNonGovt = nonGovtTotalMatch ? nonGovtTotalMatch[1].trim() : '';
          const grandTotal = grandTotalMatch ? grandTotalMatch[1].trim() : '';

          const items = [];
          const fundWiseIdx = showHtml.indexOf('id="ContentPlaceHolder1_pnlFundWise"');
          if (fundWiseIdx !== -1) {
            const tableIdx = showHtml.indexOf('<table', fundWiseIdx);
            const endTableIdx = showHtml.indexOf('</table>', tableIdx);
            if (tableIdx !== -1 && endTableIdx !== -1) {
              const tableHtml = showHtml.substring(tableIdx, endTableIdx + 8);
              const rows = [...tableHtml.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)];
              for (const r of rows) {
                const rowContent = r[1];
                if (rowContent.includes('TotalGovtFee') || rowContent.includes('TotalNonGovtFee') || rowContent.includes('GrandTotal')) {
                  continue;
                }
                const headMatch = rowContent.match(/class="leftColumnStyle"[^>]*>([\s\S]*?)<\/td>/);
                const amtMatch = rowContent.match(/class="rightColumnStyle"[^>]*>[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/);
                if (headMatch && amtMatch) {
                  const head = headMatch[1].trim().replace(/\s+/g, ' ');
                  const amt = amtMatch[1].trim();
                  if (head !== 'আদায়কৃত ফি' && amt !== 'Amount' && amt) {
                    items.push({ head, amount: amt });
                  }
                }
              }
            }
          }

          receipt = {
            quarter: payQtr,
            date: payDate,
            trxId: payTrx,
            status: payStatus,
            items,
            totalGovt,
            totalNonGovt,
            grandTotal
          };
        }
      }
    }

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
