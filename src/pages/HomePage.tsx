import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Users,
  Award,
  BookOpen,
  Calendar,
  ChevronRight,
  FileText,
  Download,
  Building,
  CheckCircle,
  ExternalLink,
  Clock,
  ArrowRight
} from 'lucide-react';
import { schoolInfo } from '../data/schoolInfo';
import { api } from '../services/api';
import { Notice, NewsItem, DownloadItem } from '../types';
import { Reveal } from '../components/common/Reveal';

export const HomePage: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);

  useEffect(() => {
    api.getNotices().then(data => setNotices(data.slice(0, 6)));
    api.getNews().then(data => setNews(data.slice(0, 4)));
    api.getDownloads().then(data => setDownloads(data.slice(0, 4)));
  }, []);

  return (
    <div className="space-y-10 pb-16">
      {/* 1. Hero Section - Institutional & Trustworthy */}
      <section className="relative bg-gradient-to-b from-institutional-navy to-institutional-navyDark text-white pt-10 pb-14 sm:pt-14 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Organic Aurora Ambient Orbs */}
        <div className="absolute -top-28 -left-28 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none animate-aurora" />
        <div className="absolute top-1/2 -right-28 w-[30rem] h-[30rem] bg-sky-500/15 rounded-full blur-3xl pointer-events-none animate-aurora-reverse" />
        <div className="absolute -bottom-24 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-aurora" />

        {/* Subtle decorative grid */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 8 Cols: Main Pitch */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold backdrop-blur-xs animate-float-slow">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                  <span>ঐতিহ্যের ১৯৪ বছর | ১৮৩২ — ২০২৬</span>
                </div>
                {/* Explicit Student Project Notice Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-400/10 border border-blue-400/30 text-blue-200 text-xs font-medium backdrop-blur-xs">
                  <span>🎓</span>
                  <span>শিক্ষার্থী প্রকল্প (Educational Purpose Only)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-serif leading-tight">
                <span className="animate-shimmer-text inline-block">উত্তরবঙ্গের শ্রেষ্ঠ বিদ্যাপীঠ</span> <br />
                <span className="animate-shimmer-gold inline-block mt-1">{schoolInfo.nameBn}</span>
              </h1>

              <p className="text-slate-200 text-xs sm:text-base leading-relaxed max-w-2xl font-light">
                ১৮৩২ খ্রিষ্টাব্দে তৎকালীন ব্রিটিশ ভারতের গভর্নর লর্ড উইলিয়াম বেন্টিঙ্ক কর্তৃক প্রতিষ্ঠিত। শতবর্ষের ঐতিহ্য, সুশৃঙ্খল পরিবেশ ও আধুনিক পাঠদানের সমন্বয়ে মেধা ও নৈতিকতা বিকাশের আদর্শ শিক্ষা প্রতিষ্ঠান।
              </p>

              {/* Action Buttons - Mobile Responsive Stack */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                <Link
                  to="/students"
                  className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 text-center btn-shimmer group"
                >
                  <GraduationCap className="w-4 h-4 transition-transform group-hover:scale-110" />
                  অধ্যয়নরত শিক্ষার্থী তালিকা
                </Link>
                <Link
                  to="/notices"
                  className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all border border-white/20 flex items-center justify-center gap-2 text-center btn-shimmer group backdrop-blur-xs"
                >
                  <FileText className="w-4 h-4 transition-transform group-hover:scale-110" />
                  সকল নোটিশ দেখুন
                </Link>
                <Link
                  to="/about/history"
                  className="px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 sm:bg-transparent text-slate-200 hover:text-white text-sm font-medium transition-all flex items-center justify-center gap-1.5 text-center border border-white/10 sm:border-transparent group link-underline-organic"
                >
                  <span>বিদ্যালয়ের ইতিহাস</span> <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right 4 Cols: Key Metrics Quick Panel */}
            <div className="lg:col-span-4 bg-white/5 backdrop-blur-xs border border-white/10 rounded-xl p-4 sm:p-6 space-y-3.5 sm:space-y-4 shadow-xl">
              <h2 className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider border-b border-white/10 pb-2">
                এক নজরে প্রতিষ্ঠান
              </h2>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                <div className="bg-institutional-navyDark/60 hover:bg-institutional-navyDark/90 p-2.5 sm:p-3 rounded-lg border border-white/5 transition-all duration-300 hover:scale-[1.03] hover:border-amber-400/30 group cursor-default">
                  <div className="text-xl sm:text-2xl font-bold text-white font-mono group-hover:text-amber-300 transition-colors">১৮৩২</div>
                  <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5">প্রতিষ্ঠা সাল</div>
                </div>

                <div className="bg-institutional-navyDark/60 hover:bg-institutional-navyDark/90 p-2.5 sm:p-3 rounded-lg border border-white/5 transition-all duration-300 hover:scale-[1.03] hover:border-emerald-400/30 group cursor-default">
                  <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono group-hover:text-emerald-300 transition-colors">{schoolInfo.totalStudents.toLocaleString('bn-BD')} জন</div>
                  <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5">শিক্ষার্থী</div>
                </div>

                <div className="bg-institutional-navyDark/60 hover:bg-institutional-navyDark/90 p-2.5 sm:p-3 rounded-lg border border-white/5 transition-all duration-300 hover:scale-[1.03] hover:border-amber-400/30 group cursor-default">
                  <div className="text-xl sm:text-2xl font-bold text-amber-400 font-mono group-hover:text-amber-300 transition-colors">{schoolInfo.totalTeachers.toLocaleString('bn-BD')} জন</div>
                  <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5">শিক্ষক-কর্মকর্তা</div>
                </div>

                <div className="bg-institutional-navyDark/60 hover:bg-institutional-navyDark/90 p-2.5 sm:p-3 rounded-lg border border-white/5 transition-all duration-300 hover:scale-[1.03] hover:border-cyan-400/30 group cursor-default">
                  <div className="text-xl sm:text-2xl font-bold text-cyan-400 font-mono group-hover:text-cyan-300 transition-colors">১০০%</div>
                  <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5">পাসের হার</div>
                </div>
              </div>

              <div className="pt-2 text-[11px] sm:text-xs text-slate-300 flex items-center justify-between border-t border-white/10">
                <span>EIIN: <strong className="text-white font-mono">{schoolInfo.eiin}</strong></span>
                <span>শিফট: <strong className="text-white">প্রভাতি ও দিবা</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Portals Bar */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 -mt-6 sm:-mt-8 relative z-20">
        <Reveal delay={100} direction="up">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
            <Link
              to="/students"
              className="bg-white p-3 sm:p-4 rounded-xl shadow-xs border border-slate-200 hover:border-institutional-navy card-organic group flex items-center gap-2.5 sm:gap-3.5"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-50 text-institutional-navy flex items-center justify-center shrink-0 group-hover:bg-institutional-navy group-hover:text-white transition-all duration-300 group-hover:rotate-3">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-institutional-navy transition-colors truncate">শিক্ষার্থী তালিকা</div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 truncate">রোল ও আইডি ভিত্তিক</div>
              </div>
            </Link>

            <Link
              to="/teachers"
              className="bg-white p-3 sm:p-4 rounded-xl shadow-xs border border-slate-200 hover:border-emerald-600 card-organic group flex items-center gap-2.5 sm:gap-3.5"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 group-hover:bg-emerald-800 group-hover:text-white transition-all duration-300 group-hover:rotate-3">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-emerald-800 transition-colors truncate">শিক্ষকমণ্ডলী</div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 truncate">{schoolInfo.totalTeachers} জন কর্মকর্তা</div>
              </div>
            </Link>

            <Link
              to="/academics/results"
              className="bg-white p-3 sm:p-4 rounded-xl shadow-xs border border-slate-200 hover:border-amber-500 card-organic group flex items-center gap-2.5 sm:gap-3.5"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 group-hover:bg-amber-800 group-hover:text-white transition-all duration-300 group-hover:rotate-3">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-amber-800 transition-colors truncate">পরীক্ষার ফলাফল</div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 truncate">এসএসসি ও জেএসসি</div>
              </div>
            </Link>

            <a
              href="http://gsa.teletalk.com.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-3 sm:p-4 rounded-xl shadow-xs border border-slate-200 hover:border-purple-600 card-organic group flex items-center gap-2.5 sm:gap-3.5"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-50 text-purple-800 flex items-center justify-center shrink-0 group-hover:bg-purple-800 group-hover:text-white transition-all duration-300 group-hover:rotate-3">
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-purple-800 transition-colors truncate">ভর্তি আবেদন</div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 truncate">টেলিটক জিএসএ পোর্টাল</div>
              </div>
            </a>
          </div>
        </Reveal>
      </section>

      {/* 3. Main Content Columns: Left (60%) & Right (40%) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Headmaster's Desk + Brief History */}
          <div className="lg:col-span-8 space-y-8">
            {/* Principal / Headmaster Message Card */}
            <Reveal delay={150} direction="up">
              <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-xs card-organic group/card">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-sm inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                      প্রধান শিক্ষকের বাণী
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 font-serif mt-1 group-hover/card:text-institutional-navy transition-colors">
                      জ্ঞান, শৃঙ্খলা ও নেতৃত্বের সূতিকাগার
                    </h2>
                  </div>
                  <Building className="w-6 h-6 text-slate-300 hidden sm:block transition-transform group-hover/card:scale-110 group-hover/card:text-institutional-navy" />
                </div>

                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="shrink-0 text-center mx-auto sm:mx-0">
                    <div className="w-28 h-36 rounded-lg overflow-hidden border-2 border-slate-200 shadow-sm bg-slate-100 mx-auto transition-all duration-300 group-hover/card:border-institutional-navy/40 group-hover/card:shadow-md">
                      <img
                        src={schoolInfo.headmaster.photo}
                        alt={schoolInfo.headmaster.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = 'https://ui-avatars.com/api/?name=Abul+Kalam+Azad&background=0f2b5c&color=fff&size=150';
                        }}
                      />
                    </div>
                    <div className="mt-2">
                      <h3 className="text-sm font-bold text-slate-900">{schoolInfo.headmaster.name}</h3>
                      <p className="text-xs text-slate-500 font-medium">{schoolInfo.headmaster.designation}</p>
                      <p className="text-[11px] text-slate-400 font-mono">PDS: {schoolInfo.headmaster.pdsId}</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-slate-700 text-sm leading-relaxed text-justify">
                    <p>
                      {schoolInfo.headmaster.message}
                    </p>
                    <p>
                      রংপুর জিলা স্কুল কেবল একটি বিদ্যাপীঠ নয়, এটি প্রায় দুই শতকের একটি সমৃদ্ধ ইতিহাস ও ঐতিহ্য। এখানকার শিক্ষার্থীবৃন্দ জাতীয় ও আন্তর্জাতিক পর্যায়ে কৃতিত্বের স্বাক্ষর রেখে চলেছে। আমাদের লক্ষ্য শিক্ষার্থীদের সুনাগরিক, দেশপ্রেমিক এবং আধুনিক জ্ঞান-বিজ্ঞানে দক্ষ হিসেবে গড়ে তোলা।
                    </p>
                    <div className="pt-2 flex items-center justify-between flex-wrap gap-2 text-xs text-slate-500 border-t border-slate-100">
                      <span>যোগদান: {schoolInfo.headmaster.joiningDate}</span>
                      <Link to="/about/history" className="text-institutional-navy font-semibold hover:underline flex items-center gap-1 group/link">
                        <span>বিদ্যালয়ের বিস্তারিত ইতিহাস</span> <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* School History Highlights */}
            <Reveal delay={200} direction="up">
              <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4 card-organic">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h2 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-institutional-navy" />
                    সংক্ষিপ্ত ইতিহাস ও প্রেক্ষাপট
                  </h2>
                  <Link to="/about/history" className="text-xs font-semibold text-institutional-navy link-underline-organic">
                    সম্পূর্ণ ইতিহাস
                  </Link>
                </div>

                <div className="space-y-3 text-slate-700 text-sm leading-relaxed text-justify">
                  {schoolInfo.historyNarrative.slice(0, 3).map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Milestones bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                  <div className="bg-slate-50 p-3 rounded-md border border-slate-200/80 transition-all hover:bg-amber-50/50 hover:border-amber-300 hover:translate-y-[-2px] group">
                    <div className="text-amber-700 font-bold font-mono text-sm group-hover:text-amber-800 transition-colors">১৮২৮ খ্রিষ্টাব্দ</div>
                    <div className="text-xs text-slate-600 mt-0.5">শিখন কার্যক্রম শুরু (জমিদার স্কুল)</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-md border border-slate-200/80 transition-all hover:bg-amber-50/50 hover:border-amber-300 hover:translate-y-[-2px] group">
                    <div className="text-amber-700 font-bold font-mono text-sm group-hover:text-amber-800 transition-colors">১৮৩২ খ্রিষ্টাব্দ</div>
                    <div className="text-xs text-slate-600 mt-0.5">লর্ড বেন্টিঙ্ক কর্তৃক ভিত্তিপ্রস্তর স্থাপন</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-md border border-slate-200/80 transition-all hover:bg-amber-50/50 hover:border-amber-300 hover:translate-y-[-2px] group">
                    <div className="text-amber-700 font-bold font-mono text-sm group-hover:text-amber-800 transition-colors">১৮৬২ খ্রিষ্টাব্দ</div>
                    <div className="text-xs text-slate-600 mt-0.5">সরকারি রংপুর জিলা স্কুল হিসেবে আত্মপ্রকাশ</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Notices Card + News + Downloads */}
          <div className="lg:col-span-4 space-y-6">
            {/* Notice Board Card */}
            <Reveal delay={150} direction="up">
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden card-organic">
                <div className="bg-institutional-navy text-white px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>সর্বশেষ নোটিশ</span>
                  </div>
                  <Link
                    to="/notices"
                    className="text-xs text-amber-300 hover:text-white transition-colors link-underline-organic"
                  >
                    সবগুলো ({notices.length > 0 ? notices.length : 494}+)
                  </Link>
                </div>

                <div className="divide-y divide-slate-100">
                  {notices.map((notice, idx) => (
                    <Link
                      key={notice.id}
                      to={`/notices/${notice.id}`}
                      className="p-3.5 block hover:bg-slate-50 transition-all duration-200 group"
                    >
                      <div className="flex items-start gap-2">
                        {idx === 0 && (
                          <span className="relative flex h-2 w-2 mt-1.5 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                          </span>
                        )}
                        <div className="text-xs font-semibold text-slate-900 group-hover:text-institutional-navy line-clamp-2 leading-snug transition-transform duration-200 group-hover:translate-x-1">
                          {notice.title}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {notice.date}
                        </span>
                        <span className="text-institutional-navy group-hover:underline font-medium transition-transform duration-200 group-hover:translate-x-1">
                          বিস্তারিত &rarr;
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                  <Link
                    to="/notices"
                    className="text-xs font-semibold text-institutional-navy hover:underline block py-1 transition-transform hover:scale-[1.02]"
                  >
                    সকল নোটিশ আর্কাইভ দেখুন &rarr;
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* News & Announcements Card */}
            <Reveal delay={200} direction="up">
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4 card-organic">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-700" />
                    খবর ও সমসাময়িক ঘোষণা
                  </h3>
                  <Link to="/news" className="text-xs font-semibold text-emerald-700 link-underline-organic">
                    সকল খবর
                  </Link>
                </div>

                <div className="space-y-3">
                  {news.map((item) => (
                    <div key={item.id} className="text-xs space-y-1 border-b border-slate-50 pb-2.5 last:border-none last:pb-0 transition-transform duration-200 hover:translate-x-1">
                      <span className="text-[11px] text-slate-400 font-mono">{item.date}</span>
                      <p className="font-medium text-slate-800 leading-snug hover:text-emerald-800 cursor-pointer transition-colors">
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Quick Downloads Card */}
            <Reveal delay={250} direction="up">
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-3 card-organic">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Download className="w-4 h-4 text-blue-700" />
                    গুরুত্বপূর্ণ ডাউনলোড
                  </h3>
                  <Link to="/downloads" className="text-xs font-semibold text-blue-700 link-underline-organic">
                    সকল ফরম ({downloads.length > 0 ? 195 : 0})
                  </Link>
                </div>

                <div className="space-y-2">
                  {downloads.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-md bg-slate-50 hover:bg-blue-50/80 border border-slate-200/80 transition-all flex items-center justify-between gap-2 group text-xs hover:translate-y-[-1px] hover:shadow-xs"
                    >
                      <span className="text-slate-800 group-hover:text-blue-900 font-medium line-clamp-1 transition-colors">
                        {item.title}
                      </span>
                      <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-700 shrink-0 transition-transform group-hover:scale-110" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};
