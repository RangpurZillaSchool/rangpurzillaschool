import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, BarChart3, GraduationCap, ArrowLeft, ShieldAlert } from 'lucide-react';
import { api } from '../services/api';

export const StudentStatsPage: React.FC = () => {
  const stats = api.getStudentStats();
  const [filterShift, setFilterShift] = useState<'all' | 'Morning' | 'Day'>('all');

  const filtered = stats.filter(s => {
    if (filterShift === 'all') return true;
    return s.shift.toLowerCase() === filterShift.toLowerCase();
  });

  const totalBoys = stats.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Breadcrumb & Header */}
      <div className="border-b border-slate-200 pb-5">
        <Link
          to="/students"
          className="inline-flex items-center gap-1 text-xs font-semibold text-institutional-navy hover:underline mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> শিক্ষার্থী তালিকায় ফিরে যান
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
              <BarChart3 className="w-4 h-4" />
              <span>পরিসংখ্যান বিবরণী</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
              অধ্যয়নরত শিক্ষার্থীর সংখ্যা ও পরিসংখ্যান
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              শ্রেণি, শিফট, শাখা, ধর্ম ও বিভাগ ভিত্তিক শিক্ষার্থীর সুবিন্যস্ত তথ্য
            </p>
          </div>
        </div>
      </div>

      {/* Aggregate Overview Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">মোট শিক্ষার্থী সংখ্যা</div>
          <div className="text-2xl sm:text-3xl font-bold text-institutional-navy font-mono mt-1">
            ২,১০৯
          </div>
          <div className="text-[11px] text-emerald-700 mt-1 font-semibold">১০০% ছাত্র (বালক বিদ্যালয়)</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">মুসলিম শিক্ষার্থী</div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono mt-1">
            ১,৯১৫
          </div>
          <div className="text-[11px] text-slate-400 mt-1">৯০.৮%</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">হিন্দু শিক্ষার্থী</div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono mt-1">
            ১৯৪
          </div>
          <div className="text-[11px] text-slate-400 mt-1">৯.২%</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">বিজ্ঞান বিভাগ (৯ম-১০ম)</div>
          <div className="text-2xl sm:text-3xl font-bold text-purple-900 font-mono mt-1">
            ৫৩২
          </div>
          <div className="text-[11px] text-slate-400 mt-1">ব্যবসায়: ৪ | মানবিক: ১</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilterShift('all')}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
            filterShift === 'all'
              ? 'bg-institutional-navy text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          উভয় শিফট ({stats.length} টি শাখা)
        </button>
        <button
          onClick={() => setFilterShift('Morning')}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
            filterShift === 'Morning'
              ? 'bg-institutional-navy text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          প্রভাতি শাখা (Morning)
        </button>
        <button
          onClick={() => setFilterShift('Day')}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
            filterShift === 'Day'
              ? 'bg-institutional-navy text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          দিবা শাখা (Day)
        </button>
      </div>

      {/* Detailed Section Breakdown Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">শ্রেণি</th>
                <th className="py-3 px-4">শিফট</th>
                <th className="py-3 px-4">শাখা</th>
                <th className="py-3 px-4 font-mono text-right">মোট ছাত্র</th>
                <th className="py-3 px-4 font-mono text-right">মুসলিম</th>
                <th className="py-3 px-4 font-mono text-right">হিন্দু</th>
                <th className="py-3 px-4 font-mono text-right">বিজ্ঞান</th>
                <th className="py-3 px-4 font-mono text-right">ব্যবসায়</th>
                <th className="py-3 px-4 font-mono text-right">মানবিক</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-4 font-semibold text-slate-900">
                    {row.className}
                  </td>
                  <td className="py-2.5 px-4 text-slate-600">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                      row.shift === 'Morning' ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-900'
                    }`}>
                      {row.shift}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 font-bold text-institutional-navy">
                    শাখা {row.section}
                  </td>
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-900 text-right">
                    {row.total}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-slate-600 text-right">
                    {row.muslim}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-slate-600 text-right">
                    {row.hindu}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-slate-600 text-right">
                    {row.science > 0 ? row.science : '-'}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-slate-600 text-right">
                    {row.business > 0 ? row.business : '-'}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-slate-600 text-right">
                    {row.humanities > 0 ? row.humanities : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-100 font-bold text-slate-900 border-t border-slate-200">
              <tr>
                <td colSpan={3} className="py-3 px-4 text-right">সর্বমোট:</td>
                <td className="py-3 px-4 font-mono text-right text-institutional-navy text-sm">
                  {filtered.reduce((a, c) => a + c.total, 0)}
                </td>
                <td className="py-3 px-4 font-mono text-right">
                  {filtered.reduce((a, c) => a + c.muslim, 0)}
                </td>
                <td className="py-3 px-4 font-mono text-right">
                  {filtered.reduce((a, c) => a + c.hindu, 0)}
                </td>
                <td className="py-3 px-4 font-mono text-right">
                  {filtered.reduce((a, c) => a + c.science, 0)}
                </td>
                <td className="py-3 px-4 font-mono text-right">
                  {filtered.reduce((a, c) => a + c.business, 0)}
                </td>
                <td className="py-3 px-4 font-mono text-right">
                  {filtered.reduce((a, c) => a + c.humanities, 0)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
