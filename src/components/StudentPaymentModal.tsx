import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  CreditCard,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  Loader2,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { api } from '../services/api';
import { PaymentHistoryResponse, Student, PaymentStudentInfo } from '../types';

interface StudentPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId?: string;
  studentBasic?: Student | PaymentStudentInfo | null;
}

export const StudentPaymentModal: React.FC<StudentPaymentModalProps> = ({
  isOpen,
  onClose,
  studentId,
  studentBasic
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PaymentHistoryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeQuarter, setActiveQuarter] = useState<string>('');
  const [loadingQuarter, setLoadingQuarter] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    if (isOpen && studentId) {
      let isMounted = true;
      setLoading(true);
      setError(null);
      setData(null);

      api.getPaymentHistory(studentId)
        .then((res) => {
          if (isMounted) {
            setData(res);
            if (res.success && res.selectedQuarter) {
              setActiveQuarter(res.selectedQuarter);
            } else if (!res.success) {
              setError(res.message || 'পেমেন্ট তথ্য পাওয়া যায়নি।');
            }
            setLoading(false);
          }
        })
        .catch(() => {
          if (isMounted) {
            setError('পেমেন্ট সার্ভারে সংযোগে সমস্যা হয়েছে।');
            setLoading(false);
          }
        });

      return () => {
        isMounted = false;
      };
    }
  }, [isOpen, studentId]);

  const handleQuarterChange = async (quarterVal: string) => {
    if (!studentId || quarterVal === activeQuarter) return;
    setActiveQuarter(quarterVal);
    setLoadingQuarter(true);
    try {
      const res = await api.getPaymentHistory(studentId, quarterVal);
      if (res.success) {
        setData(res);
      }
    } catch (err) {
      console.warn('Failed to switch quarter:', err);
    } finally {
      setLoadingQuarter(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  if (!isOpen) return null;

  const student = data?.student || studentBasic;
  const receipt = data?.receipt;
  const quarters = data?.quarters || [];

  const studentSession = student && 'session' in student ? (student as PaymentStudentInfo).session : '2026';
  const studentClass = student ? ('className' in student ? (student as PaymentStudentInfo).className : ('class' in student ? (student as any).class : null)) : null;
  const studentShift = student && 'shift' in student ? (student as any).shift : null;
  const studentSection = student && 'section' in student ? (student as any).section : null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-2xl shadow-2xl max-w-2xl w-full p-5 sm:p-7 space-y-5 relative max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-institutional-navy/10 dark:bg-sky-950 flex items-center justify-center text-institutional-navy dark:text-sky-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-tight font-serif">
                শিক্ষার্থী পেমেন্ট তথ্য (Payment Info)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                রংপুর জিলা স্কুল • লাইভ পেমেন্ট ডাটাবেজ
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-12 text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-institutional-navy dark:text-sky-400 mx-auto" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              পেমেন্ট রেকর্ড অনুসন্ধান করা হচ্ছে...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="p-6 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-center space-y-2">
            <AlertCircle className="w-7 h-7 text-amber-600 dark:text-amber-400 mx-auto" />
            <div className="text-sm font-bold text-amber-900 dark:text-amber-200">{error}</div>
            <p className="text-xs text-amber-700 dark:text-amber-400">
              এই শিক্ষার্থীর কোনো সক্রিয় পেমেন্ট রেকর্ড বা বকেয়া তালিকা পাওয়া যায়নি।
            </p>
          </div>
        )}

        {/* Loaded Data */}
        {!loading && student && (
          <div className="space-y-5">
            {/* Student Profile Card */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="w-16 h-20 rounded-lg overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0 shadow-2xs">
                {student.photo ? (
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=0f2b5c&color=fff&size=120`;
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <User className="w-8 h-8 opacity-50" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs flex-1 w-full">
                <div className="col-span-2 flex items-center justify-between">
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100">{student.name}</div>
                  <button
                    onClick={() => handleCopy(student.id)}
                    className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:text-institutional-navy cursor-pointer"
                    title="Copy ID"
                  >
                    {copiedId ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>ID: {student.id}</span>
                  </button>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">রোল নম্বর:</span>{' '}
                  <span className="font-bold text-institutional-navy dark:text-sky-400 font-mono text-sm">{student.roll}</span>
                </div>
                {studentSession ? (
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">সেশন:</span>{' '}
                    <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">{studentSession}</span>
                  </div>
                ) : null}
                {studentClass ? (
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">শ্রেণি:</span>{' '}
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{studentClass}</span>
                  </div>
                ) : null}
                {studentShift ? (
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">শিফট ও শাখা:</span>{' '}
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {studentShift === 'Morning' ? 'প্রভাতি' : 'দিবা'} {studentSection ? `(শাখা ${studentSection})` : ''}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Quarter Selector */}
            {quarters.length > 0 && (
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-institutional-navy dark:text-sky-400" />
                    <span>পেমেন্ট কোয়ার্টার / মাস নির্বাচন করুন:</span>
                  </span>
                  {loadingQuarter && (
                    <span className="text-[11px] text-institutional-navy dark:text-sky-400 flex items-center gap-1">
                      <Loader2 className="w-3 h-3 animate-spin" /> আপডেট হচ্ছে...
                    </span>
                  )}
                </label>
                <select
                  value={activeQuarter}
                  disabled={loadingQuarter}
                  onChange={(e) => handleQuarterChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-institutional-navy/20"
                >
                  {quarters.map((q) => (
                    <option key={q.value} value={q.value}>
                      {q.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Payment Info Card (Clean info view - NO RECEIPT) */}
            {receipt && (
              <div className="bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700 p-5 space-y-4 shadow-xs">
                {/* Status & Trx Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      কোয়ার্টার: <span className="font-mono text-slate-900 dark:text-slate-100">{receipt.quarter}</span>
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 font-mono">
                      তারিখ: {receipt.date || 'N/A'}
                    </div>
                    {receipt.trxId && (
                      <div className="text-xs font-mono text-slate-700 dark:text-slate-300 font-semibold">
                        TRX ID: {receipt.trxId}
                      </div>
                    )}
                  </div>

                  <div className="self-start sm:self-auto">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono uppercase shadow-2xs ${
                      receipt.status?.toLowerCase() === 'paid'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                    }`}>
                      {receipt.status?.toLowerCase() === 'paid' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      )}
                      <span>{receipt.status || 'PAID'}</span>
                    </span>
                  </div>
                </div>

                {/* Fees Itemized List */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    আদায়কৃত ফি বিবরণী:
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden text-xs sm:text-sm font-mono">
                    {receipt.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/40">
                        <span className="font-sans text-slate-800 dark:text-slate-200">{item.head}</span>
                        <span className="font-bold text-slate-900 dark:text-slate-100">৳ {item.amount}</span>
                      </div>
                    ))}

                    {receipt.totalGovt && (
                      <div className="flex items-center justify-between px-4 py-2 bg-slate-50/60 dark:bg-slate-800/80 font-bold">
                        <span className="font-sans text-slate-600 dark:text-slate-400">মোট সরকারি ফি:</span>
                        <span className="text-slate-900 dark:text-slate-100">৳ {receipt.totalGovt}</span>
                      </div>
                    )}

                    {receipt.totalNonGovt && (
                      <div className="flex items-center justify-between px-4 py-2 bg-slate-50/60 dark:bg-slate-800/80 font-bold">
                        <span className="font-sans text-slate-600 dark:text-slate-400">মোট বেসরকারি ফি:</span>
                        <span className="text-slate-900 dark:text-slate-100">৳ {receipt.totalNonGovt}</span>
                      </div>
                    )}

                    {receipt.grandTotal && (
                      <div className="flex items-center justify-between px-4 py-3 bg-institutional-navy/5 dark:bg-sky-950/40 border-t border-slate-200 dark:border-slate-700 font-bold text-sm sm:text-base">
                        <span className="font-sans text-slate-900 dark:text-slate-100">সর্বমোট প্রদেয় ফি:</span>
                        <span className="text-institutional-navy dark:text-sky-400">৳ {receipt.grandTotal}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer close action */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
