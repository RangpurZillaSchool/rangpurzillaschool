import React, { useState } from 'react';
import { Award, GraduationCap, CheckCircle2, TrendingUp, Calendar } from 'lucide-react';
import { api } from '../services/api';

export const ExamResultsPage: React.FC = () => {
  const results = api.getExamResults();
  const [selectedExam, setSelectedExam] = useState('all');

  const exams = [
    { value: 'all', label: 'সকল পাবলিক পরীক্ষা' },
    { value: 'প্রাথমিক', label: 'প্রাথমিক সমাপনী (PEC)' },
    { value: 'জুনিয়র', label: 'জুনিয়র স্কুল সার্টিফিকেট (JSC)' },
    { value: 'মাধ্যমিক', label: 'এসএসসি / মাধ্যমিক (SSC)' }
  ];

  const filtered = results.filter(r => {
    if (selectedExam === 'all') return true;
    return r.examName.includes(selectedExam);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
              <Award className="w-4 h-4" />
              <span>ঐতিহাসিক শিক্ষাগত সাফল্য</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
              পাবলিক পরীক্ষার ফলাফল বিবরণী
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              প্রাথমিক শিক্ষা সমাপনী, জেএসসি ও এসএসসি পরীক্ষায় রংপুর জিলা স্কুলের ফলাফল ইতিহাস
            </p>
          </div>

          <div className="bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-300/40 dark:border-amber-700/40 px-3 py-1.5 rounded-lg text-xs font-semibold self-start sm:self-auto flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>গড় পাসের হার: ১০০%</span>
          </div>
        </div>
      </div>

      {/* Highlights Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">পাসের ধারাবাহিকতা</div>
            <div className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-0.5">শতভাগ (১০০%) সাফল্য</div>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5">দিনাজপুর শিক্ষা বোর্ডে শীর্ষ স্থান</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">জিপিএ ৫.০০ প্রাপ্তি</div>
            <div className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-0.5">সর্বোচ্চ গ্রেড অর্জন</div>
            <div className="text-[11px] text-amber-700 dark:text-amber-400 mt-0.5">প্রতিবছর বিপুল সংখ্যক এ+</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">সরকারি বৃত্তিপ্রাপ্তি</div>
            <div className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-0.5">ট্যালেন্টপুল ও সাধারণ</div>
            <div className="text-[11px] text-blue-700 dark:text-blue-400 mt-0.5">বোর্ড মেধা তালিকায় গৌরবময় অর্জন</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {exams.map(e => (
          <button
            key={e.value}
            onClick={() => setSelectedExam(e.value)}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-all font-medium cursor-pointer ${
              selectedExam === e.value
                ? 'bg-institutional-navy dark:bg-sky-600 text-white font-semibold shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {e.label}
          </button>
        ))}
      </div>

      {/* Results Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">পরীক্ষার নাম</th>
                <th className="py-3 px-4">সাল</th>
                <th className="py-3 px-4 text-right">মোট পরীক্ষার্থী</th>
                <th className="py-3 px-4 text-right">উত্তীর্ণ ছাত্র</th>
                <th className="py-3 px-4 text-right">জিপিএ ৫.০০</th>
                <th className="py-3 px-4 text-right">পাসের হার</th>
                <th className="py-3 px-4 text-right">বৃত্তিপ্রাপ্ত</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-4 font-semibold text-slate-900">
                    {item.examName}
                  </td>
                  <td className="py-2.5 px-4 font-mono font-bold text-institutional-navy">
                    {item.year}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-slate-700 text-right">
                    {item.total}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-slate-700 text-right">
                    {item.passed}
                  </td>
                  <td className="py-2.5 px-4 font-mono font-bold text-amber-700 text-right">
                    {item.gpa5 > 0 ? item.gpa5 : '-'}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-emerald-700 font-semibold text-right">
                    {item.passRate}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-blue-700 text-right">
                    {item.scholarships > 0 ? item.scholarships : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
