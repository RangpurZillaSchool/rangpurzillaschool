import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  Search,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  User,
  Calendar,
  Loader2,
  FileText,
  RotateCcw,
  Copy,
  Check,
  Clock
} from 'lucide-react';
import { api } from '../services/api';
import { PaymentHistoryResponse } from '../types';

export const PaymentHistoryPage: React.FC = () => {
  // Search Mode: 'id' for direct student ID, 'cascade' for Class -> Section -> Roll
  const [searchMode, setSearchMode] = useState<'id' | 'cascade'>('id');

  // Mode 1: Direct Student ID
  const [studentIdInput, setStudentIdInput] = useState('');

  // Mode 2: Cascading Selectors (Direct Section, Number Input Roll)
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSectionKey, setSelectedSectionKey] = useState('');
  const [rollInput, setRollInput] = useState('');

  // Live Payment Response State
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentHistoryResponse | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Active Quarter in view
  const [activeQuarter, setActiveQuarter] = useState<string>('');
  const [loadingQuarter, setLoadingQuarter] = useState(false);

  // Copy ID feedback
  const [copiedId, setCopiedId] = useState(false);

  const classes = [
    { value: 'Three', label: 'শ্রেণি ৩ (Three)' },
    { value: 'Four', label: 'শ্রেণি ৪ (Four)' },
    { value: 'Five', label: 'শ্রেণি ৫ (Five)' },
    { value: 'Six', label: 'শ্রেণি ৬ (Six)' },
    { value: 'Seven', label: 'শ্রেণি ৭ (Seven)' },
    { value: 'Eight', label: 'শ্রেণি ৮ (Eight)' },
    { value: 'Nine', label: 'শ্রেণি ৯ (Nine)' },
    { value: 'Ten', label: 'শ্রেণি ১০ (Ten)' },
    { value: 'S.S.C', label: 'এসএসসি (S.S.C)' }
  ];

  // Combined Section Selector: Section A (Morning), Section B (Day), Section C (Morning), Section D (Day)
  const sectionOptions = [
    { value: 'A-Morning', label: 'Section A (Morning)', section: 'A', shift: 'Morning', shiftCode: '1', secCode: '1' },
    { value: 'B-Day', label: 'Section B (Day)', section: 'B', shift: 'Day', shiftCode: '2', secCode: '2' },
    { value: 'C-Morning', label: 'Section C (Morning)', section: 'C', shift: 'Morning', shiftCode: '1', secCode: '3' },
    { value: 'D-Day', label: 'Section D (Day)', section: 'D', shift: 'Day', shiftCode: '2', secCode: '4' },
  ];

  // Fetch Payment directly by Student ID
  const fetchPayment = async (idToFetch: string, quarterToFetch?: string) => {
    const id = idToFetch.trim();
    if (!id) {
      setErrorMessage('অনুগ্রহ করে সঠিক শিক্ষার্থী আইডি প্রবেশ করান।');
      return;
    }

    setHasSearched(true);
    setLoadingPayment(true);
    setErrorMessage(null);

    try {
      const res = await api.getPaymentHistory(id, quarterToFetch);
      setPaymentData(res);
      if (res.success && res.selectedQuarter) {
        setActiveQuarter(res.selectedQuarter);
      } else if (!res.success) {
        setErrorMessage(res.message || 'শিক্ষার্থীর তথ্য বা ফি বিবরণী পাওয়া যায়নি।');
      }
    } catch (err: any) {
      setErrorMessage('সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি।');
    } finally {
      setLoadingPayment(false);
    }
  };

  // Handle Cascade Search: Class + Combined Section + Roll Number Input
  const handleCascadeSearch = async () => {
    if (!selectedClass || !selectedSectionKey || !rollInput.trim()) {
      setErrorMessage('অনুগ্রহ করে শ্রেণি, শাখা এবং রোল নম্বর প্রবেশ করান।');
      return;
    }

    const secOpt = sectionOptions.find(s => s.value === selectedSectionKey);
    if (!secOpt) return;

    setHasSearched(true);
    setLoadingPayment(true);
    setErrorMessage(null);
    setPaymentData(null);

    try {
      // Normalize roll to integer (handles Bengali or English digits)
      const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      const normalizedRollStr = rollInput.replace(/[০-৯]/g, (d) => bengaliDigits.indexOf(d).toString()).trim();
      const targetRollInt = parseInt(normalizedRollStr, 10);

      if (isNaN(targetRollInt) || targetRollInt <= 0) {
        setErrorMessage('অনুগ্রহ করে একটি সঠিক রোল নম্বর প্রবেশ করান।');
        setLoadingPayment(false);
        return;
      }

      let targetStudentId = '';

      // Step 1: Attempt to find student in live student roster
      try {
        const studentRoster = await api.getStudents(selectedClass, secOpt.shift, secOpt.section);
        if (studentRoster.students && studentRoster.students.length > 0) {
          const matched = studentRoster.students.find(s => {
            const sRoll = parseInt(s.roll.replace(/[০-৯]/g, (d) => bengaliDigits.indexOf(d).toString()).trim(), 10);
            return sRoll === targetRollInt || s.roll.trim() === normalizedRollStr;
          });
          if (matched && matched.id) {
            targetStudentId = matched.id;
          }
        }
      } catch (rosterErr) {
        console.warn('Live roster query skipped, falling back to canonical ID formula:', rosterErr);
      }

      // Step 2: Fallback to Rangpur Zilla School's deterministic ID structure if roster is unavailable
      if (!targetStudentId) {
        const classCodeMap: Record<string, string> = {
          'Three': '03', 'Four': '04', 'Five': '05', 'Six': '06',
          'Seven': '07', 'Eight': '08', 'Nine': '09', 'Ten': '10', 'S.S.C': '10'
        };
        const classCode = classCodeMap[selectedClass] || '03';
        const paddedRoll = targetRollInt.toString().padStart(3, '0');
        // Formula: 127372 (EIIN) + 26 (Session) + shiftCode + classCode + secCode + paddedRoll
        targetStudentId = `12737226${secOpt.shiftCode}${classCode}${secOpt.secCode}${paddedRoll}`;
      }

      await fetchPayment(targetStudentId);
    } catch (err: any) {
      setErrorMessage('পেমেন্ট সার্ভারে সংযোগ স্থাপন করা সম্ভব হয়নি।');
      setLoadingPayment(false);
    }
  };

  // Handle Quarter Switch
  const handleQuarterChange = async (newQuarter: string) => {
    if (!paymentData?.student?.id || newQuarter === activeQuarter) return;
    setActiveQuarter(newQuarter);
    setLoadingQuarter(true);

    try {
      const res = await api.getPaymentHistory(paymentData.student.id, newQuarter);
      if (res.success) {
        setPaymentData(res);
      }
    } catch (err) {
      console.warn('Failed to fetch quarter details:', err);
    } finally {
      setLoadingQuarter(false);
    }
  };

  const handleReset = () => {
    setStudentIdInput('');
    setSelectedClass('');
    setSelectedSectionKey('');
    setRollInput('');
    setPaymentData(null);
    setHasSearched(false);
    setErrorMessage(null);
    setActiveQuarter('');
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const student = paymentData?.student;
  const receipt = paymentData?.receipt;
  const quarters = paymentData?.quarters || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Breadcrumb & Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
          <Link to="/" className="hover:text-institutional-navy dark:hover:text-sky-400">প্রচ্ছদ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/students" className="hover:text-institutional-navy dark:hover:text-sky-400">শিক্ষার্থী</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 dark:text-slate-200 font-semibold">বেতন ও ফি প্রদানের তথ্য</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-institutional-navy dark:text-sky-400 mb-1">
              <CreditCard className="w-4 h-4" />
              <span>রংপুর জিলা স্কুল • বেতন ও অন্যান্য ফি প্রদানের তথ্য</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 font-serif">
              বেতন ও ফি প্রদানের তথ্য
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              শিক্ষার্থী আইডি অথবা শ্রেণি, শাখা ও রোল নম্বর দিয়ে সরাসরি বিদ্যালয় সার্ভার থেকে ফি প্রদানের তথ্য ও বিবরণী অনুসন্ধান করুন।
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              EIIN: 127372 অনুমোদিত
            </span>
            <a
              href="http://www.rangpurzillaschool.edu.bd/payment-history.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-2xs"
            >
              <span>মূল সার্ভার লিঙ্ক</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Search Container Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs p-5 sm:p-6 space-y-5">
        {/* Mode Toggle Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Search className="w-4.5 h-4.5 text-institutional-navy dark:text-sky-400" />
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              অনুসন্ধান পদ্ধতি নির্বাচন করুন
            </h2>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setSearchMode('id')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                searchMode === 'id'
                  ? 'bg-white dark:bg-slate-700 text-institutional-navy dark:text-sky-400 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              সরাসরি শিক্ষার্থী আইডি (Student ID)
            </button>
            <button
              onClick={() => setSearchMode('cascade')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                searchMode === 'cascade'
                  ? 'bg-white dark:bg-slate-700 text-institutional-navy dark:text-sky-400 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              শ্রেণি, শাখা ও রোল (Class → Section → Roll)
            </button>
          </div>
        </div>

        {/* Mode 1: Search by Student ID */}
        {searchMode === 'id' ? (
          <div className="space-y-4">
            <div className="max-w-md">
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                শিক্ষার্থী আইডি (Student ID)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="উদাঃ 127372261031001"
                  value={studentIdInput}
                  onChange={(e) => setStudentIdInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchPayment(studentIdInput)}
                  className="flex-1 px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-institutional-navy/20 dark:focus:ring-sky-500/20 font-mono"
                />
                <button
                  onClick={() => fetchPayment(studentIdInput)}
                  disabled={loadingPayment || !studentIdInput.trim()}
                  className="px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-institutional-navy dark:bg-sky-600 hover:bg-institutional-navyDark dark:hover:bg-sky-700 disabled:opacity-50 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  {loadingPayment ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  <span>অনুসন্ধান</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Mode 2: Cascading Search: Class -> Direct Section -> Roll (Number Input) */
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              {/* Step 1: Class */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  ১. শ্রেণি (Class) <span className="text-rose-500">*</span>
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-institutional-navy/20 dark:focus:ring-sky-500/20"
                >
                  <option value="">-- শ্রেণি নির্বাচন করুন --</option>
                  {classes.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Step 2: Direct Section Selector */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  ২. শাখা (Section) <span className="text-rose-500">*</span>
                </label>
                <select
                  value={selectedSectionKey}
                  onChange={(e) => setSelectedSectionKey(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-institutional-navy/20 dark:focus:ring-sky-500/20"
                >
                  <option value="">-- শাখা নির্বাচন করুন --</option>
                  {sectionOptions.map(sec => (
                    <option key={sec.value} value={sec.value}>{sec.label}</option>
                  ))}
                </select>
              </div>

              {/* Step 3: Roll / Student Number Input */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  ৪. রোল / শিক্ষার্থী <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="রোল নম্বর (যেমন: 1)"
                  value={rollInput}
                  onChange={(e) => setRollInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCascadeSearch()}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-institutional-navy/20 dark:focus:ring-sky-500/20 font-mono"
                />
              </div>

              {/* Search Button */}
              <div>
                <button
                  type="button"
                  onClick={handleCascadeSearch}
                  disabled={loadingPayment || !selectedClass || !selectedSectionKey || !rollInput.trim()}
                  className="w-full py-2 px-4 rounded-lg text-xs sm:text-sm font-bold text-white bg-institutional-navy dark:bg-sky-600 hover:bg-institutional-navyDark dark:hover:bg-sky-700 disabled:opacity-50 transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {loadingPayment ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>অনুসন্ধান হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>পেমেন্ট দেখুন</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reset Button */}
        {hasSearched && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              onClick={handleReset}
              className="px-3.5 py-1.5 rounded-md text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>নতুন অনুসন্ধান করুন</span>
            </button>
          </div>
        )}
      </div>

      {/* Loading Indicator */}
      {loadingPayment && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-institutional-navy dark:text-sky-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            বিদ্যালয় সার্ভার থেকে ফি বিবরণী লোড হচ্ছে...
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            রংপুর জিলা স্কুলের লাইভ ডাটাবেজ (automation.sib.gov.bd) থেকে তথ্য সংগ্রহ করা হচ্ছে। অনুগ্রহ করে অপেক্ষা করুন।
          </p>
        </div>
      )}

      {/* Error Message */}
      {!loadingPayment && errorMessage && (
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl p-6 text-center space-y-2">
          <AlertCircle className="w-7 h-7 text-amber-600 dark:text-amber-400 mx-auto" />
          <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200">
            {errorMessage}
          </h3>
          <p className="text-xs text-amber-700 dark:text-amber-400 max-w-md mx-auto">
            প্রদত্ত তথ্য রংপুর জিলা স্কুলের ডাটাবেজের সাথে মেলেনি। আইডি অথবা শ্রেণি ও রোল নম্বর পুনরায় যাচাই করে চেষ্টা করুন।
          </p>
        </div>
      )}

      {/* Loaded Results Display: CLEAN PAYMENT INFO (NO RECEIPT) */}
      {!loadingPayment && student && (
        <div className="space-y-6 animate-in fade-in-50 duration-300">
          {/* Row 1: Student Profile Card & Quarter Selection Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Student Profile Card */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-institutional-navy dark:text-sky-400" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    শিক্ষার্থীর প্রোফাইল ও তথ্য (Student Info)
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopyId(student.id)}
                    className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-institutional-navy dark:hover:text-sky-400 font-mono cursor-pointer transition-colors"
                    title="Copy Student ID"
                  >
                    {copiedId ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>ID: {student.id}</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                {/* Photo */}
                <div className="w-24 h-28 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shrink-0 shadow-2xs">
                  {student.photo ? (
                    <img
                      src={student.photo}
                      alt={student.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=0f2b5c&color=fff&size=150`;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <User className="w-10 h-10 opacity-50" />
                    </div>
                  )}
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-xs flex-1 w-full">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">শিক্ষার্থীর নাম:</span>
                    <div className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5">{student.name}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">শিক্ষাবর্ষ:</span>
                    <div className="font-bold text-slate-900 dark:text-slate-100 font-mono mt-0.5">{student.session}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">শ্রেণি:</span>
                    <div className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5">{student.className}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">শিফট ও শাখা:</span>
                    <div className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
                      {student.shift === 'Morning' ? 'প্রভাতি' : student.shift === 'Day' ? 'দিবা' : student.shift} (শাখা {student.section})
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">রোল নম্বর:</span>
                    <div className="font-bold text-slate-900 dark:text-slate-100 font-mono mt-0.5">{student.roll}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">আইডি নম্বর:</span>
                    <div className="font-mono text-slate-700 dark:text-slate-300 mt-0.5">{student.id}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quarter Selector Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs p-5 sm:p-6 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <Calendar className="w-4 h-4 text-institutional-navy dark:text-sky-400" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    পেমেন্ট কোয়ার্টার নির্বাচন
                  </h3>
                </div>

                <div className="mt-4 space-y-3">
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    কোয়ার্টার বা মাস পরিবর্তন করুন:
                  </label>
                  <select
                    value={activeQuarter}
                    disabled={loadingQuarter || quarters.length === 0}
                    onChange={(e) => handleQuarterChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-institutional-navy/20 font-mono"
                  >
                    {quarters.map(q => (
                      <option key={q.value} value={q.value}>{q.label}</option>
                    ))}
                  </select>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    কোয়ার্টার নির্বাচন করলে স্বয়ংক্রিয়ভাবে ঐ মেয়াদের ফি বিবরণী ও লেনদেন তথ্য হালনাগাদ হবে।
                  </p>
                </div>
              </div>

              {loadingQuarter && (
                <div className="flex items-center gap-2 text-xs text-institutional-navy dark:text-sky-400 font-semibold pt-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>তথ্য আপডেট হচ্ছে...</span>
                </div>
              )}
            </div>
          </div>

          {/* Row 2: Payment Details & Itemized Fees (Modern Clean Info Dashboard, NO RECEIPT) */}
          {receipt ? (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs p-5 sm:p-6 space-y-6">
              {/* Payment Summary Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">কোয়ার্টার:</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{receipt.quarter}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-300 font-mono">
                    <span>তারিখ: {receipt.date || 'N/A'}</span>
                    {receipt.trxId && (
                      <span className="font-semibold text-slate-800 dark:text-slate-200">TRX: {receipt.trxId}</span>
                    )}
                  </div>
                </div>

                <div>
                  <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-2xs ${
                    receipt.status?.toLowerCase() === 'paid'
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                  }`}>
                    {receipt.status?.toLowerCase() === 'paid' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    )}
                    <span>{receipt.status || 'PAID'}</span>
                  </span>
                </div>
              </div>

              {/* Itemized Fees Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    আদায়কৃত ফি বিবরণী (Fee Breakdown)
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    খাত অনুযায়ী প্রদেয় টাকা
                  </span>
                </div>

                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xs">
                  <table className="w-full text-xs sm:text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        <th className="px-4 py-3 text-left">ফি খাত (Fee Head)</th>
                        <th className="px-4 py-3 text-right font-mono">টাকার পরিমাণ (Amount)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                      {receipt.items.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="px-4 py-2.5 text-slate-800 dark:text-slate-200 font-sans">{item.head}</td>
                          <td className="px-4 py-2.5 text-right font-semibold text-slate-900 dark:text-slate-100">৳ {item.amount}</td>
                        </tr>
                      ))}

                      {receipt.totalGovt && (
                        <tr className="bg-slate-50/60 dark:bg-slate-800/60 font-semibold">
                          <td className="px-4 py-2 text-right text-slate-600 dark:text-slate-400 font-sans">মোট সরকারি ফি:</td>
                          <td className="px-4 py-2 text-right text-slate-900 dark:text-slate-100">৳ {receipt.totalGovt}</td>
                        </tr>
                      )}

                      {receipt.totalNonGovt && (
                        <tr className="bg-slate-50/60 dark:bg-slate-800/60 font-semibold">
                          <td className="px-4 py-2 text-right text-slate-600 dark:text-slate-400 font-sans">মোট বেসরকারি ফি:</td>
                          <td className="px-4 py-2 text-right text-slate-900 dark:text-slate-100">৳ {receipt.totalNonGovt}</td>
                        </tr>
                      )}

                      {receipt.grandTotal && (
                        <tr className="bg-institutional-navy/5 dark:bg-sky-950/40 border-t-2 border-slate-200 dark:border-slate-700 font-bold text-sm sm:text-base">
                          <td className="px-4 py-3 text-right text-slate-900 dark:text-slate-100 font-sans">সর্বমোট প্রদেয় ফি (Grand Total):</td>
                          <td className="px-4 py-3 text-right text-institutional-navy dark:text-sky-400">৳ {receipt.grandTotal}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Server citation badge */}
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>তথ্যসূত্র: রংপুর জিলা স্কুল লাইভ অটোমেশন ডাটাবেজ (automation.sib.gov.bd)</span>
                </span>
                <span className="font-mono text-[11px]">EIIN: 127372</span>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-2">
              <FileText className="w-6 h-6 text-slate-400 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                এই কোয়ার্টারের কোনো পেমেন্ট রেকর্ড পাওয়া যায়নি
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                উপরে অন্য কোনো কোয়ার্টার নির্বাচন করে পুনরায় দেখুন।
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentHistoryPage;
