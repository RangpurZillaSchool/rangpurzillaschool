import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, GraduationCap, Users, Filter, LayoutGrid, List, AlertCircle, RefreshCw, UserCheck, Clock, Info, CreditCard } from 'lucide-react';
import { api } from '../services/api';
import { Student } from '../types';
import { StudentPaymentModal } from '../components/StudentPaymentModal';

export const StudentsPage: React.FC = () => {
  // Start BLANK by default - do not waste worker credits
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSectionKey, setSelectedSectionKey] = useState('');

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isUnavailable, setIsUnavailable] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [paymentModalStudent, setPaymentModalStudent] = useState<Student | null>(null);

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
    { value: 'A-Morning', label: 'Section A (Morning)', section: 'A', shift: 'Morning' },
    { value: 'B-Day', label: 'Section B (Day)', section: 'B', shift: 'Day' },
    { value: 'C-Morning', label: 'Section C (Morning)', section: 'C', shift: 'Morning' },
    { value: 'D-Day', label: 'Section D (Day)', section: 'D', shift: 'Day' },
  ];

  const handleClassChange = (newClass: string) => {
    setSelectedClass(newClass);
    setHasSearched(false);
    setIsUnavailable(false);
    setStudents([]);
    setError(null);
  };

  const handleSectionChange = (newKey: string) => {
    setSelectedSectionKey(newKey);
    setIsUnavailable(false);
    setError(null);
  };

  const currentSection = sectionOptions.find(opt => opt.value === selectedSectionKey);

  const fetchStudents = async () => {
    if (!selectedClass || !currentSection) {
      setError('অনুগ্রহ করে শ্রেণি এবং শাখা নির্বাচন করুন।');
      return;
    }

    setLoading(true);
    setError(null);
    setIsUnavailable(false);
    setHasSearched(true);

    try {
      const res = await api.getStudents(selectedClass, currentSection.shift, currentSection.section);
      if (res.unavailable) {
        setIsUnavailable(true);
        setStudents([]);
      } else {
        setIsUnavailable(false);
        setStudents(res.students);
        if (res.students.length === 0) {
          setError('এই শ্রেণি ও শাখার জন্য কোন শিক্ষার্থীর তথ্য পাওয়া যায়নি। অন্য শাখা নির্বাচন করুন।');
        }
      }
    } catch (err: any) {
      setIsUnavailable(true);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(s => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      s.name.toLowerCase().includes(q) ||
      s.roll.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-institutional-navy mb-1">
              <GraduationCap className="w-4 h-4" />
              <span>অধ্যয়নরত শিক্ষার্থী তথ্যভাণ্ডার</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
              শিক্ষার্থীদের তালিকা
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              শিক্ষাবর্ষ: ২০২৬ | শ্রেণি ও শাখা নির্বাচন করে সরাসরি সার্ভার থেকে শিক্ষার্থী তালিকা অনুসন্ধান করুন
            </p>
          </div>

          <Link
            to="/students/statistics"
            className="px-3.5 py-2 rounded-md bg-white border border-slate-200 hover:border-institutional-navy text-slate-700 hover:text-institutional-navy text-xs font-semibold transition-all self-start sm:self-auto flex items-center gap-1.5 shadow-xs"
          >
            <Users className="w-3.5 h-3.5" />
            শিক্ষার্থী পরিসংখ্যান (২,১০৯ জন) &rarr;
          </Link>
        </div>
      </div>

      {/* Filter Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-institutional-navy" />
            <span>শিক্ষার্থী অনুসন্ধান ফিল্টার</span>
          </div>
          <span className="text-[11px] text-slate-400">শ্রেণি ও শাখা নির্বাচন করুন</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          {/* Class Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
              ১. শ্রেণি (Class) <span className="text-rose-500">*</span>
            </label>
            <select
              value={selectedClass}
              onChange={(e) => handleClassChange(e.target.value)}
              className="w-full text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-md py-2 px-3 focus:outline-hidden focus:ring-2 focus:ring-institutional-navy dark:focus:ring-sky-400 focus:border-institutional-navy bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
            >
              <option value="">-- শ্রেণি নির্বাচন করুন --</option>
              {classes.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Section Selector (Direct combined selector) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
              ২. শাখা (Section) <span className="text-rose-500">*</span>
            </label>
            <select
              value={selectedSectionKey}
              onChange={(e) => handleSectionChange(e.target.value)}
              className="w-full text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-md py-2 px-3 focus:outline-hidden focus:ring-2 focus:ring-institutional-navy dark:focus:ring-sky-400 focus:border-institutional-navy bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
            >
              <option value="">-- শাখা নির্বাচন করুন --</option>
              {sectionOptions.map(sec => (
                <option key={sec.value} value={sec.value}>{sec.label}</option>
              ))}
            </select>
          </div>

          {/* Submit Search Button */}
          <div>
            <button
              onClick={fetchStudents}
              disabled={loading || !selectedClass || !selectedSectionKey}
              type="button"
              className="w-full py-2 px-4 rounded-md bg-institutional-navy dark:bg-sky-500 hover:bg-institutional-navyDark dark:hover:bg-sky-400 text-white dark:text-sky-950 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>লোড হচ্ছে...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>শিক্ষার্থী দেখুন</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Initial Blank State (Before Search) */}
      {!hasSearched && !loading && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-12 text-center space-y-4 shadow-2xs">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-institutional-navy dark:text-sky-400 flex items-center justify-center mx-auto">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-serif">
              কোন শ্রেণি ও শাখা নির্বাচন করা হয়নি
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              সার্ভার থেকে শিক্ষার্থী তথ্য দেখতে উপরের ড্রপডাউন হতে প্রথমে <strong>শ্রেণি</strong>, এরপর <strong>শিফট</strong> ও <strong>শাখা</strong> নির্বাচন করে <strong>'শিক্ষার্থী দেখুন'</strong> বাটনে চাপুন।
            </p>
          </div>
        </div>
      )}

      {/* Results Bar (Only when searched) */}
      {hasSearched && !loading && filteredStudents.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-100/90 dark:bg-slate-800/90 p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {selectedClass} শ্রেণির {currentSection?.label} এর তালিকা:
            </span>
            <span className="bg-institutional-navy dark:bg-sky-500/20 text-white dark:text-sky-300 font-mono px-2 py-0.5 rounded-sm font-bold border border-transparent dark:border-sky-500/30">
              {filteredStudents.length} জন
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Search within results */}
            <div className="relative flex-grow sm:w-60">
              <input
                type="text"
                placeholder="নাম, রোল বা আইডি দিয়ে খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-1 focus:ring-institutional-navy dark:focus:ring-sky-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>

            {/* View Toggles */}
            <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md p-0.5 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1 rounded-sm cursor-pointer transition-colors ${viewMode === 'grid' ? 'bg-institutional-navy dark:bg-sky-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                title="গ্রিড ভিউ"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1 rounded-sm cursor-pointer transition-colors ${viewMode === 'table' ? 'bg-institutional-navy dark:bg-sky-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                title="টেবিল ভিউ"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Polished Institutional Unavailable State */}
      {isUnavailable && !loading && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
            <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
                শিক্ষার্থী তথ্য সাময়িকভাবে অনুপলব্ধ (Student Information Temporarily Unavailable)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                বিদ্যালয়ের লেগ্যাসি সার্ভারটি বর্তমানে সাড়া দিচ্ছে না। শিক্ষার্থীদের ব্যক্তিগত তথ্য ও ছবি সরাসরি লেগ্যাসি সার্ভার থেকে লাইভ পদ্ধতিতে প্রদর্শিত হয়।
              </p>
            </div>
          </div>

          {/* Institutional Note & Next Steps */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs sm:text-sm text-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-institutional-navy">
              <Info className="w-4 h-4 text-institutional-navy" />
              <span>বিকল্প সেবা ও তথ্য:</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              সার্ভার মেইনটেন্যান্স চলাকালীন আপনারা বিদ্যালয়ের সার্বিক শিক্ষার্থী বণ্টন ও শাখাভিত্তিক পরিসংখ্যান দেখতে পারেন।
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={fetchStudents}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-institutional-navy hover:bg-institutional-navyDark text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>পুনরায় চেষ্টা করুন (Retry)</span>
            </button>
            <Link
              to="/students/statistics"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white border border-slate-300 hover:border-institutional-navy text-slate-700 hover:text-institutional-navy text-xs sm:text-sm font-semibold transition-all shadow-xs"
            >
              <Users className="w-3.5 h-3.5" />
              <span>শিক্ষার্থী পরিসংখ্যান দেখুন (View Statistics) &rarr;</span>
            </Link>
          </div>

          {/* Aggregate Stats Summary Card */}
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50/80 p-3 rounded-lg border border-slate-200 text-center">
              <div className="text-[11px] text-slate-500 font-medium">মোট শিক্ষার্থী</div>
              <div className="text-base sm:text-lg font-bold font-mono text-institutional-navy mt-0.5">২,১০৯ জন</div>
            </div>
            <div className="bg-slate-50/80 p-3 rounded-lg border border-slate-200 text-center">
              <div className="text-[11px] text-slate-500 font-medium">প্রভাতি শিফট</div>
              <div className="text-base sm:text-lg font-bold font-mono text-slate-800 mt-0.5">১,০৬০ জন</div>
            </div>
            <div className="bg-slate-50/80 p-3 rounded-lg border border-slate-200 text-center">
              <div className="text-[11px] text-slate-500 font-medium">দিবা শিফট</div>
              <div className="text-base sm:text-lg font-bold font-mono text-slate-800 mt-0.5">১,০৪৯ জন</div>
            </div>
            <div className="bg-slate-50/80 p-3 rounded-lg border border-slate-200 text-center">
              <div className="text-[11px] text-slate-500 font-medium">মোট সেকশন</div>
              <div className="text-base sm:text-lg font-bold font-mono text-slate-800 mt-0.5">৩৩টি</div>
            </div>
          </div>
        </div>
      )}

      {/* Error state (non-unavailable error) */}
      {error && !loading && !isUnavailable && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-lg p-4 flex items-start gap-3 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">তথ্য পাওয়া যায়নি</p>
            <p className="text-slate-600">{error}</p>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-institutional-navy animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-800">
            সার্ভার থেকে শিক্ষার্থী তথ্য আনয়ন করা হচ্ছে...
          </p>
          <p className="text-xs text-slate-500">
            অনুগ্রহ করে অপেক্ষা করুন ({selectedClass} - {currentSection?.label})
          </p>
        </div>
      )}

      {/* Students Data Display */}
      {!loading && hasSearched && filteredStudents.length > 0 && (
        viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredStudents.map((student) => (
              <div
                key={student.id || student.roll}
                onClick={() => setPaymentModalStudent(student)}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs hover:border-institutional-navy dark:hover:border-sky-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer active:scale-[0.99]"
                title="পেমেন্ট তথ্য দেখতে ক্লিক করুন"
              >
                <div className="flex items-center gap-3.5">
                  {/* Photo */}
                  <div className="w-14 h-16 rounded-md overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0 flex items-center justify-center">
                    <img
                      src={student.photo || ''}
                      alt={student.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=1e293b&color=38bdf8&size=100`;
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-sm bg-institutional-navy dark:bg-sky-500/20 text-white dark:text-sky-300 border border-transparent dark:border-sky-500/30 text-[11px] font-bold font-mono">
                        রোল: {student.roll}
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate mt-1 group-hover:text-institutional-navy dark:group-hover:text-sky-400 leading-snug">
                      {student.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 dark:text-slate-400 font-mono mt-0.5 truncate">
                      ID: {student.id}
                    </p>
                  </div>
                </div>

                {/* Footer hint */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 group-hover:text-institutional-navy dark:group-hover:text-sky-400 font-medium transition-colors">
                  <span className="flex items-center gap-1">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>পেমেন্ট ও ফি তথ্য</span>
                  </span>
                  <span className="text-xs font-bold group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="py-3 px-4 w-16 text-center">ছবি</th>
                    <th className="py-3 px-4 w-20">রোল</th>
                    <th className="py-3 px-4 w-40">শিক্ষার্থী আইডি</th>
                    <th className="py-3 px-4">শিক্ষার্থীর নাম</th>
                    <th className="py-3 px-4">শ্রেণি ও শাখা</th>
                    <th className="py-3 px-4 text-right">পেমেন্ট</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredStudents.map((student) => (
                    <tr
                      key={student.id || student.roll}
                      onClick={() => setPaymentModalStudent(student)}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/60 transition-colors cursor-pointer group"
                      title="পেমেন্ট তথ্য দেখতে ক্লিক করুন"
                    >
                      <td className="py-2.5 px-4 text-center">
                        <div className="w-9 h-11 rounded-sm overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mx-auto">
                          <img
                            src={student.photo || ''}
                            alt={student.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=1e293b&color=38bdf8&size=60`;
                            }}
                          />
                        </div>
                      </td>
                      <td className="py-2.5 px-4 font-mono font-bold text-institutional-navy dark:text-sky-400 text-sm">
                        {student.roll}
                      </td>
                      <td className="py-2.5 px-4 font-mono text-slate-600 dark:text-slate-400">
                        {student.id}
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-slate-100 group-hover:text-institutional-navy dark:group-hover:text-sky-400">
                        {student.name}
                      </td>
                      <td className="py-2.5 px-4 text-slate-500 dark:text-slate-400">
                        {selectedClass} ({currentSection?.label})
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-institutional-navy dark:text-sky-400 bg-institutional-navy/5 dark:bg-sky-500/10 px-2 py-1 rounded group-hover:bg-institutional-navy group-hover:text-white dark:group-hover:bg-sky-500 dark:group-hover:text-sky-950 transition-colors">
                          <CreditCard className="w-3 h-3" />
                          <span>পেমেন্ট</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}

      {/* Student Payment Modal Popup */}
      <StudentPaymentModal
        isOpen={!!paymentModalStudent}
        onClose={() => setPaymentModalStudent(null)}
        studentId={paymentModalStudent?.id}
        studentBasic={paymentModalStudent}
      />
    </div>
  );
};
