import React, { useState, useEffect } from 'react';
import { Download, Search, FileText, Calendar, ExternalLink } from 'lucide-react';
import { api } from '../services/api';
import { DownloadItem } from '../types';

export const DownloadsPage: React.FC = () => {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    api.getDownloads().then(data => {
      setDownloads(data);
      setLoading(false);
    });
  }, []);

  const filtered = downloads.filter(d => {
    const q = searchQuery.toLowerCase().trim();
    return !q || d.title.toLowerCase().includes(q) || d.date.includes(q);
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const displayed = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 mb-1">
              <Download className="w-4 h-4" />
              <span>ডাউনলোড আর্কাইভ</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
              ফরম, রুটিন ও পরীক্ষার ফলাফল ডাউনলোড
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              ভর্তি লটারির ফলাফল, ব্যবহারিক পরীক্ষার রুটিন ও অন্যান্য অফিসিয়াল পিডিএফ
            </p>
          </div>

          <div className="bg-blue-500/15 text-blue-800 dark:text-blue-300 border border-blue-300/40 dark:border-blue-700/40 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono self-start sm:self-auto">
            সর্বমোট ফাইল: {downloads.length} টি
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
        <div className="relative">
          <input
            type="text"
            placeholder="ফাইলের শিরোনাম বা সাল দিয়ে খুঁজুন..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-md pl-9 pr-4 py-2 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-institutional-navy dark:focus:ring-sky-400 focus:bg-white dark:focus:bg-slate-800"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-sm text-slate-600">
            ডাউনলোড তালিকা লোড হচ্ছে...
          </div>
        ) : displayed.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-600">
            কোন ফাইল পাওয়া যায়নি।
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 w-16 text-center">ক্রমিক</th>
                  <th className="py-3 px-4 w-32">তারিখ</th>
                  <th className="py-3 px-4">নথির শিরোনাম ও বিষয়</th>
                  <th className="py-3 px-4 w-32 text-right">ডাউনলোড</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayed.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-3 px-4 text-center font-mono text-slate-400">
                      {item.sl}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.date}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900 group-hover:text-blue-700 leading-snug">
                      {item.title}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      {item.fileUrl ? (
                        <a
                          href={item.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-institutional-navy hover:bg-institutional-navyDark text-white text-[11px] font-medium transition-colors shadow-xs"
                        >
                          <Download className="w-3 h-3" />
                          <span>পিডিএফ</span>
                        </a>
                      ) : (
                        <span className="text-slate-400 text-[11px]">সংযুক্ত নেই</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
            <div>
              পৃষ্ঠা <strong>{currentPage}</strong> / <strong>{totalPages}</strong> (মোট {filtered.length} টি নথি)
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-sm bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-50 text-xs font-semibold"
              >
                পূর্ববর্তী
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-sm bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-50 text-xs font-semibold"
              >
                পরবর্তী
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
