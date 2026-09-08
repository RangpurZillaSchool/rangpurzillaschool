import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Search, Download, Calendar, ArrowRight, ExternalLink, Filter } from 'lucide-react';
import { api } from '../services/api';
import { Notice } from '../types';

export const NoticesPage: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    api.getNotices().then(data => {
      setNotices(data);
      setLoading(false);
    });
  }, []);

  const filteredNotices = notices.filter(n => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return n.title.toLowerCase().includes(q) || n.date.includes(q);
  });

  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
  const displayedNotices = filteredNotices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-institutional-navy mb-1">
              <FileText className="w-4 h-4" />
              <span>দাপ্তরিক বিজ্ঞপ্তি ও সার্কুলার</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
              নোটিশ বোর্ড
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              বিদ্যালয়ের যাবতীয় একাডেমিক, প্রশাসনিক ও পরীক্ষার বিজ্ঞপ্তি
            </p>
          </div>

          <div className="bg-amber-100 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono self-start sm:self-auto">
            সর্বমোট নোটিশ: {notices.length} টি
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <div className="relative">
          <input
            type="text"
            placeholder="নোটিশের শিরোনাম বা তারিখ দিয়ে খুঁজুন..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-slate-50 border border-slate-300 rounded-md pl-9 pr-4 py-2 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-institutional-navy focus:bg-white"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Notices Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-sm text-slate-600">
            নোটিশ বোর্ড লোড হচ্ছে...
          </div>
        ) : displayedNotices.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-600">
            কোন নোটিশ পাওয়া যায়নি।
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 w-16 text-center">ক্রমিক</th>
                  <th className="py-3 px-4 w-32">প্রকাশের তারিখ</th>
                  <th className="py-3 px-4">নোটিশের বিষয় / শিরোনাম</th>
                  <th className="py-3 px-4 w-36 text-right">সংযুক্তি / বিবরণ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedNotices.map((notice) => (
                  <tr key={notice.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-3 px-4 text-center font-mono text-slate-400 font-medium">
                      {notice.sl}
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-mono whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{notice.date}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900 group-hover:text-institutional-navy text-sm leading-snug">
                      <Link to={`/notices/${notice.id}`} className="hover:underline">
                        {notice.title}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/notices/${notice.id}`}
                          className="px-2.5 py-1 rounded-sm bg-slate-100 hover:bg-institutional-navy hover:text-white text-slate-700 text-[11px] font-medium transition-colors"
                        >
                          বিস্তারিত
                        </Link>
                        {notice.attachmentUrl && (
                          <a
                            href={notice.attachmentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded-sm text-slate-500 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                            title="ফাইল ডাউনলোড"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
            <div>
              পৃষ্ঠা <strong>{currentPage}</strong> / <strong>{totalPages}</strong> (মোট {filteredNotices.length} টি নোটিশ)
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
