import React, { useState, useEffect } from 'react';
import { Calendar, Search, Newspaper, Clock } from 'lucide-react';
import { api } from '../services/api';
import { NewsItem } from '../types';

export const NewsPage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    api.getNews().then(data => {
      setNews(data);
      setLoading(false);
    });
  }, []);

  const filteredNews = news.filter(n => {
    const q = searchQuery.toLowerCase().trim();
    return !q || n.title.toLowerCase().includes(q) || n.date.includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
              <Newspaper className="w-4 h-4" />
              <span>সংবাদ ও একাডেমিক ঘোষণা</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
              খবর ও সমসাময়িক বিজ্ঞপ্তি
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              বিদ্যালয়ের বিভিন্ন কার্যক্রম, বেতন পরিশোধ সময়সীমা, ক্রীড়া ও সাংস্কৃতিক অনুষ্ঠান সংবাদ
            </p>
          </div>

          <div className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono self-start sm:self-auto">
            মোট খবর: {news.length} টি
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <div className="relative">
          <input
            type="text"
            placeholder="খবরের শিরোনাম বা তারিখ দিয়ে খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-md pl-9 pr-4 py-2 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-institutional-navy focus:bg-white"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* News List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-12 text-center text-sm text-slate-600">
            সংবাদ লোড হচ্ছে...
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-12 text-center text-sm text-slate-600">
            কোন সংবাদ পাওয়া যায়নি।
          </div>
        ) : (
          filteredNews.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-emerald-700 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
