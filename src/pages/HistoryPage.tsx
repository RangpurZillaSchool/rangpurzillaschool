import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Award,
  Landmark,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Users,
  Compass,
  Building,
  CheckCircle2,
  ExternalLink,
  Github,
  Image as ImageIcon,
  Clock,
  BookOpen
} from 'lucide-react';
import { schoolInfo } from '../data/schoolInfo';
import { Reveal } from '../components/common/Reveal';

export const HistoryPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8 space-y-6 sm:space-y-8">
      {/* 1. Breadcrumbs & Header Banner */}
      <Reveal delay={0} direction="up">
        <div className="border-b border-slate-200 pb-4 sm:pb-6 space-y-2.5 sm:space-y-3">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Link to="/" className="hover:text-institutional-navy transition-colors">প্রচ্ছদ</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <Link to="/about/at-a-glance" className="hover:text-institutional-navy transition-colors">পরিচিতি</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-slate-800 font-semibold">বিদ্যালয়ের ইতিহাস</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 sm:gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] sm:text-xs font-semibold mb-1.5 sm:mb-2">
                <Landmark className="w-3.5 h-3.5 text-amber-600" />
                <span>ঐতিহ্যের ১৯৪ বছর | ১৮৩২ — ২০২৬</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 font-serif leading-tight">
                রংপুর জিলা স্কুলের সংক্ষিপ্ত ইতিহাস ও ঐতিহ্য
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 sm:mt-1.5 max-w-3xl leading-relaxed">
                অখণ্ড বাংলার উত্তর জনপদে আধুনিক শিক্ষার প্রথম বাতিঘর — প্রায় দুই শতকের গৌরবময় ইতিহাস, প্রজ্ঞা ও জ্ঞানচর্চার পথপরিক্রমা।
              </p>
            </div>

            <div className="flex items-center gap-2 self-start lg:self-auto shrink-0 pt-1 lg:pt-0">
              <Link
                to="/about/at-a-glance"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:border-institutional-navy hover:text-institutional-navy transition-all shadow-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>এক নজরে পরিচিতি</span>
              </Link>
              <Link
                to="/gallery"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs font-semibold bg-institutional-navy hover:bg-institutional-navyDark text-white transition-all shadow-xs btn-shimmer"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>ছবির গ্যালারি</span>
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      {/* 2. Key Heritage Metrics Cards */}
      <Reveal delay={50} direction="up">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs hover:border-amber-400 transition-all group card-organic">
            <div className="flex items-center justify-between text-slate-400 mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider">ভিত্তিপ্রস্তর</span>
              <Landmark className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-lg sm:text-2xl font-bold font-mono text-slate-900">১৮৩২ খ্রিঃ</div>
            <div className="text-[11px] sm:text-xs text-slate-600 mt-0.5 sm:mt-1 leading-tight">লর্ড উইলিয়াম বেন্টিঙ্ক কর্তৃক</div>
          </div>

          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-500 transition-all group card-organic">
            <div className="flex items-center justify-between text-slate-400 mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider">সরকারি রূপান্তর</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-lg sm:text-2xl font-bold font-mono text-emerald-700">১৮৬২ খ্রিঃ</div>
            <div className="text-[11px] sm:text-xs text-slate-600 mt-0.5 sm:mt-1 leading-tight">শিক্ষা বিভাগের নিয়ন্ত্রণ গ্রহণ</div>
          </div>

          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs hover:border-institutional-navy transition-all group card-organic">
            <div className="flex items-center justify-between text-slate-400 mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider">ঐতিহ্যের বিস্তার</span>
              <Sparkles className="w-4 h-4 text-institutional-navy group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-lg sm:text-2xl font-bold font-mono text-institutional-navy">১৯৪ বছর</div>
            <div className="text-[11px] sm:text-xs text-slate-600 mt-0.5 sm:mt-1 leading-tight">উত্তর জনপদের শ্রেষ্ঠ বিদ্যাপীঠ</div>
          </div>

          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs hover:border-blue-500 transition-all group card-organic">
            <div className="flex items-center justify-between text-slate-400 mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider">বর্তমান শিক্ষার্থী</span>
              <GraduationCap className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-lg sm:text-2xl font-bold font-mono text-slate-900">২,১০৯ জন</div>
            <div className="text-[11px] sm:text-xs text-slate-600 mt-0.5 sm:mt-1 leading-tight">৫৫ জন শিক্ষক-কর্মকর্তা</div>
          </div>
        </div>
      </Reveal>

      {/* 3. Main Content: 12-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Column: Historical Narrative & Timeline (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Institutional Heritage Plaque */}
          <Reveal delay={100} direction="up">
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-xs card-organic space-y-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-amber-400/60 bg-slate-50 p-1.5 flex items-center justify-center shrink-0 shadow-xs">
                  <img
                    src="/school_logo.png"
                    alt="রংপুর জিলা স্কুল মনোগ্রাম"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'http://automation.sib.gov.bd/monogram/127372.png';
                    }}
                  />
                </div>

                <div className="space-y-2 text-center sm:text-left min-w-0">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-institutional-navy/10 text-institutional-navy text-[11px] font-bold uppercase tracking-wider">
                    <span>মহাফেজখানা ও মূল স্মারক উদ্ধৃতি</span>
                  </div>
                  <blockquote className="text-sm sm:text-base font-serif italic text-slate-800 leading-relaxed">
                    &ldquo;১৮৩২ সালে বাংলার তৎকালীন গভর্নর-জেনারেল লর্ড উইলিয়াম বেন্টিঙ্ক রংপুর আগমন করেন এবং স্থানীয় শিক্ষানুরাগী জমিদারদের ঐকান্তিক আগ্রহে উত্তরবঙ্গের প্রথম ইংরেজি মাধ্যমের আধুনিক বিদ্যাপীঠ হিসেবে &lsquo;জমিদার স্কুল&rsquo;-এর ভিত্তিপ্রস্তর স্থাপন করেন।&rdquo;
                  </blockquote>
                  <p className="text-xs text-slate-500 font-medium pt-0.5">
                    — রংপুর জিলা স্কুলের প্রাতিষ্ঠানিক মহাফেজখানা ও ঐতিহ্য বিবরণী
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-800">মৌলিক তথ্যসূত্র:</span> স্থানীয় ইতিহাস ও জনশ্রুতি অনুযায়ী ভিত্তিপ্রস্তর স্থাপনের পূর্বে ১৮২৮ খ্রিষ্টাব্দে (কোনো গবেষকের মতে ১৮২৫ খ্রিষ্টাব্দে) রংপুরের জমিদারবর্গের আর্থিক অনুদানে একটি প্রাথমিক শিখন কার্যক্রম শুরু হয়েছিল।
              </div>
            </div>
          </Reveal>

          {/* Chronological Eras Narrative */}
          <Reveal delay={150} direction="up">
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-7 shadow-xs card-organic space-y-6 sm:space-y-7">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-institutional-navy" />
                  <span>গৌরবময় ইতিহাসের ধারাবাহিক পথপরিক্রমা</span>
                </h2>
                <span className="text-xs font-mono font-semibold text-slate-400">১৮২৮–২০২৬</span>
              </div>

              {/* Era 1 */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-800 font-mono font-bold text-xs">
                    অধ্যায় ০১
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 font-serif">
                    সূচনা পর্ব ও ‘জমিদার স্কুল’ (১৮২৮–১৮৩২)
                  </h3>
                </div>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed text-left sm:text-justify">
                  ঊনবিংশ শতাব্দীর প্রথম ভাগে অখণ্ড বাংলার উত্তর জনপদে আধুনিক শিক্ষার আলো পৌঁছায়নি বললেই চলে। এই পশ্চাৎপদতা দূর করতে রংপুরের বিদ্যোৎসাহী জমিদারবর্গ—বিশেষ করে তাজহাট, ডিমলা, কাকিনা ও কুন্ডির বিদ্যানুরাগী নেতৃবৃন্দ—এক ঐতিহাসিক উদ্যোগ গ্রহণ করেন। তাঁদের আন্তরিক প্রচেষ্টা ও অর্থানুকূল্যে ১৮২৮ সালে প্রাথমিক শিখন কার্যক্রম শুরু হয়, যা তখন ‘জমিদার স্কুল’ নামে সমধিক পরিচিত ছিল।
                </p>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed text-left sm:text-justify">
                  ১৮৩২ সালে ব্রিটিশ ভারতের তৎকালীন গভর্নর-জেনারেল লর্ড উইলিয়াম ক্যাভেন্ডিশ বেন্টিঙ্ক রংপুর সফরে আসেন। স্থানীয় জমিদার সমাজের আবেদন ও আগ্রহের প্রেক্ষিতে তিনি এ বিদ্যালয়ের স্থায়ী ভিত্তিপ্রস্তর স্থাপন করেন। তৎকালীন সময়ে কোলকাতা ও ঢাকার বাইরে এরূপ প্রাতিষ্ঠানিক ইংরেজি স্কুল প্রতিষ্ঠা উত্তরবঙ্গে নবজাগরণের সূচনা করেছিল।
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-50 border border-slate-200/80 text-[11px] sm:text-xs text-slate-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>ঐতিহাসিক গুরুত্ব: অবিভক্ত উত্তরবঙ্গের সর্বপ্রথম আধুনিক ইংরেজি মাধ্যম বিদ্যালয়।</span>
                </div>
              </div>

              {/* Era 2 */}
              <div className="space-y-2.5 pt-5 border-t border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono font-bold text-xs">
                    অধ্যায় ০২
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 font-serif">
                    সরকারি অধিগ্রহণ ও প্রাতিষ্ঠানিক স্বর্ণযুগ (১৮৬২–১৯৪৭)
                  </h3>
                </div>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed text-left sm:text-justify">
                  বিদ্যালয়টি সফলতার সাথে তিন দশক পার করার পর, ১৮৬২ সালে ব্রিটিশ সরকার সরাসরি এর আর্থিক ও প্রশাসনিক দায়িত্ব নিজেদের কাঁধে তুলে নেয়। বেঙ্গল প্রাদেশিক শিক্ষা অধিদপ্তরের সরাসরি নিয়ন্ত্রণে এসে এটি পূর্ণাঙ্গ সরকারি ‘রংপুর জিলা স্কুল’ হিসেবে রূপান্তরিত হয়।
                </p>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed text-left sm:text-justify">
                  সরকারি রূপান্তরের পর কাচারী বাজার সংলগ্ন বর্তমান ক্যাম্পাসে লাল ইটের ভিক্টোরিয়ান স্থাপত্যরীতিতে মূল ভবন নির্মিত হয়। কোলকাতা বিশ্ববিদ্যালয়ের অধীনে এন্ট্রান্স ও পরবর্তীতে ম্যাট্রিকুলেশন পরীক্ষায় অত্র বিদ্যালয়ের শিক্ষার্থীরা অসামান্য মেধার স্বাক্ষর রেখে অবিভক্ত বাংলা ও আসাম প্রদেশে আলোড়ন সৃষ্টি করে।
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-50 border border-slate-200/80 text-[11px] sm:text-xs text-slate-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>ঐতিহাসিক গুরুত্ব: কোলকাতা বিশ্ববিদ্যালয়ের অধীনে এন্ট্রান্স পরীক্ষায় অবিভক্ত বাংলায় শ্রেষ্ঠত্বের স্বীকৃতি।</span>
                </div>
              </div>

              {/* Era 3 */}
              <div className="space-y-2.5 pt-5 border-t border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-800 font-mono font-bold text-xs">
                    অধ্যায় ০৩
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 font-serif">
                    জাতীয় মুক্তিসংগ্রাম ও গৌরবময় অবদান (১৯৫২–১৯৭১)
                  </h3>
                </div>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed text-left sm:text-justify">
                  রংপুর জিলা স্কুল কেবল পুঁথিগত বিদ্যার চর্চায় সীমাবদ্ধ থাকেনি; জাতীয় ইতিহাসের প্রতিটি ক্রান্তিলগ্নে এখানকার শিক্ষক ও শিক্ষার্থীরা অগ্রণী ভূমিকা পালন করেছেন। ১৯৫২ সালের ভাষা আন্দোলন, ১৯৬২-এর শিক্ষা আন্দোলন এবং ১৯৬৯-এর গণঅভ্যুত্থানে এ বিদ্যালয়ের শিক্ষক ও তরুণ শিক্ষার্থীরা রংপুর অঞ্চলের রাজপথে সাহসী নেতৃত্ব দিয়েছিলেন।
                </p>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed text-left sm:text-justify">
                  ১৯৭১ সালের মহান মুক্তিযুদ্ধে অত্র বিদ্যালয়ের বহু শিক্ষক ও ছাত্র জীবন বাজি রেখে মুক্তিযুদ্ধে অংশগ্রহণ করেন। মাতৃভূমির স্বাধীনতা অর্জনে জীবন উৎসর্গ করেছেন বেশ কয়েকজন কৃতি শিক্ষার্থী ও শিক্ষক। তাঁদের বীরত্বগাথা আজও বিদ্যালয়ের ঐতিহ্য ও অহংকারের প্রতীক হিসেবে প্রতিটি প্রজন্মের হৃদয়ে চিরভাস্বর।
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-50 border border-slate-200/80 text-[11px] sm:text-xs text-slate-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>ঐতিহাসিক গুরুত্ব: ভাষা আন্দোলন ও মহান মুক্তিযুদ্ধে শিক্ষক-শিক্ষার্থীদের সক্রিয় অংশগ্রহণ ও আত্মদান।</span>
                </div>
              </div>

              {/* Era 4 */}
              <div className="space-y-2.5 pt-5 border-t border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded-md bg-purple-50 border border-purple-200 text-purple-800 font-mono font-bold text-xs">
                    অধ্যায় ০৪
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 font-serif">
                    সার্ধশতবার্ষিকী থেকে স্মার্ট বিদ্যাপীঠ (১৯৮২–২০২৬)
                  </h3>
                </div>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed text-left sm:text-justify">
                  ১৯৮২ সালে জাঁকজমকপূর্ণ আয়োজনে বিদ্যালয়ের সার্ধশতবার্ষিকী (১৫০ বছর পূর্তি) উদযাপিত হয়। দীর্ঘ প্রায় দুই শতাব্দীর অবিচ্ছিন্ন পথপরিক্রমায় এ প্রতিষ্ঠান দেশের প্রখ্যাত শিক্ষাবিদ, বিজ্ঞানী, চিকিৎসক, প্রকৌশলী, উচ্চপদস্থ আমলা, সাহিত্যিক ও জাতীয় নেতৃবৃন্দ উপহার দিয়েছে।
                </p>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed text-left sm:text-justify">
                  বর্তমানে দিনাজপুর শিক্ষা বোর্ডের অন্যতম শীর্ষ বিদ্যাপীঠ হিসেবে রংপুর জিলা স্কুল তার গৌরবময় ঐতিহ্য বজায় রেখে চলেছে। ২,১০৯ জন শিক্ষার্থী ও ৫৫ জন দক্ষ শিক্ষকমণ্ডলীর তত্ত্বাবধানে আধুনিক কম্পিউটার ল্যাব, সমৃদ্ধ বিজ্ঞানাগার, মাল্টিমিডিয়া ক্লাসরুম ও তথ্যপ্রযুক্তিভিত্তিক শিক্ষা ব্যবস্থাপনায় একবিংশ শতাব্দীর যোগ্য নাগরিক গড়ে তোলাই এর অঙ্গীকার।
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-50 border border-slate-200/80 text-[11px] sm:text-xs text-slate-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  <span>ঐতিহাসিক গুরুত্ব: দিনাজপুর শিক্ষা বোর্ডে শতভাগ পাসের হার ও এসএসসিতে ধারাবাহিক শ্রেষ্ঠত্ব।</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Integrated Visual Milestone Timeline */}
          <Reveal delay={200} direction="up">
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-7 shadow-xs card-organic space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-institutional-navy" />
                    <span>ঐতিহাসিক কালপঞ্জির মূল মাইলফলক</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    ১৮২৮ থেকে ২০২৬ — প্রধান যুগান্তকারী ঘটনা সংক্ষেপ
                  </p>
                </div>
                <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-slate-100 font-mono text-xs text-slate-600 font-semibold">
                  ৭টি প্রধান মাইলফলক
                </span>
              </div>

              <div className="relative border-l-2 border-slate-200 ml-3 sm:ml-4 space-y-5 sm:space-y-6 pl-5 sm:pl-7">
                {/* 1828 */}
                <div className="relative group">
                  <div className="w-3.5 h-3.5 bg-amber-500 rounded-full absolute -left-[27px] sm:-left-[35px] top-1 border-2 border-white ring-2 ring-amber-200 group-hover:scale-125 transition-transform" />
                  <div className="bg-slate-50 rounded-lg p-3 sm:p-3.5 border border-slate-200/80 hover:border-amber-400 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-sm">
                        ১৮২৮ খ্রিঃ (জনশ্রুতি ১৮২৫)
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      &lsquo;জমিদার স্কুল&rsquo; রূপে প্রাথমিক কার্যক্রম
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      রংপুরের দানশীল জমিদারবর্গের যৌথ উদ্যোগে ও অর্থানুকূল্যে এ অঞ্চলের যুবসমাজকে আধুনিক শিক্ষার আওতায় আনার সূচনা ঘটে।
                    </p>
                  </div>
                </div>

                {/* 1832 */}
                <div className="relative group">
                  <div className="w-3.5 h-3.5 bg-institutional-navy rounded-full absolute -left-[27px] sm:-left-[35px] top-1 border-2 border-white ring-2 ring-blue-200 group-hover:scale-125 transition-transform" />
                  <div className="bg-slate-50 rounded-lg p-3 sm:p-3.5 border border-slate-200/80 hover:border-institutional-navy transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-institutional-navy bg-blue-100/70 px-2 py-0.5 rounded-sm">
                        ১৮৩২ খ্রিঃ
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      লর্ড উইলিয়াম বেন্টিঙ্ক কর্তৃক ভিত্তিপ্রস্তর স্থাপন
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      তৎকালীন ব্রিটিশ ভারতের গভর্নর-জেনারেল লর্ড উইলিয়াম বেন্টিঙ্ক রংপুরে আগমন করেন এবং আনুষ্ঠানিকভাবে বিদ্যালয়টির স্থায়ী ভিত্তিপ্রস্তর স্থাপন করেন।
                    </p>
                  </div>
                </div>

                {/* 1862 */}
                <div className="relative group">
                  <div className="w-3.5 h-3.5 bg-emerald-600 rounded-full absolute -left-[27px] sm:-left-[35px] top-1 border-2 border-white ring-2 ring-emerald-200 group-hover:scale-125 transition-transform" />
                  <div className="bg-slate-50 rounded-lg p-3 sm:p-3.5 border border-slate-200/80 hover:border-emerald-500 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-sm">
                        ১৮৬২ খ্রিঃ
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      পূর্ণাঙ্গ সরকারি &lsquo;রংপুর জিলা স্কুল&rsquo; রূপান্তর
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      ব্রিটিশ সরকারের শিক্ষা বিভাগের প্রত্যক্ষ নিয়ন্ত্রণে আসে এবং কাচারী বাজার সংলগ্ন বর্তমান ক্যাম্পাসে লাল ইটের মূল ভবন গড়ে ওঠে।
                    </p>
                  </div>
                </div>

                {/* 1952 */}
                <div className="relative group">
                  <div className="w-3.5 h-3.5 bg-blue-600 rounded-full absolute -left-[27px] sm:-left-[35px] top-1 border-2 border-white ring-2 ring-blue-200 group-hover:scale-125 transition-transform" />
                  <div className="bg-slate-50 rounded-lg p-3 sm:p-3.5 border border-slate-200/80 hover:border-blue-500 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-blue-800 bg-blue-100/70 px-2 py-0.5 rounded-sm">
                        ১৯৫২ খ্রিঃ
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      ঐতিহাসিক ভাষা আন্দোলনে অগ্রণী ভূমিকা
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      রাষ্ট্রভাষা বাংলার দাবিতে রংপুরে অনুষ্ঠিত সর্বদলীয় মিছিলে এ বিদ্যালয়ের শিক্ষক ও ছাত্ররা বীরত্বপূর্ণ নেতৃত্ব দেন।
                    </p>
                  </div>
                </div>

                {/* 1971 */}
                <div className="relative group">
                  <div className="w-3.5 h-3.5 bg-rose-600 rounded-full absolute -left-[27px] sm:-left-[35px] top-1 border-2 border-white ring-2 ring-rose-200 group-hover:scale-125 transition-transform" />
                  <div className="bg-slate-50 rounded-lg p-3 sm:p-3.5 border border-slate-200/80 hover:border-rose-400 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-rose-800 bg-rose-100/70 px-2 py-0.5 rounded-sm">
                        ১৯৭১ খ্রিঃ
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      মহান মুক্তিযুদ্ধ ও শহীদের অমর আত্মদান
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      মাতৃভূমির স্বাধীনতা অর্জনে অত্র বিদ্যালয়ের শিক্ষক ও বহু শিক্ষার্থী সশস্ত্র মুক্তিযুদ্ধে ঝাঁপিয়ে পড়েন এবং আত্মাহুতি দেন।
                    </p>
                  </div>
                </div>

                {/* 1982 */}
                <div className="relative group">
                  <div className="w-3.5 h-3.5 bg-purple-600 rounded-full absolute -left-[27px] sm:-left-[35px] top-1 border-2 border-white ring-2 ring-purple-200 group-hover:scale-125 transition-transform" />
                  <div className="bg-slate-50 rounded-lg p-3 sm:p-3.5 border border-slate-200/80 hover:border-purple-400 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-purple-800 bg-purple-100/70 px-2 py-0.5 rounded-sm">
                        ১৯৮২ খ্রিঃ
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      সার্ধশতবার্ষিকী (১৫০ বছর পূর্তি) মহোৎসব
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      বিদ্যালয়ের ১৫০ বছর পূর্তিতে এক ঐতিহাসিক সার্ধশতবার্ষিকী মহোৎসব অনুষ্ঠিত হয় এবং প্রাক্তন ও বর্তমান শিক্ষার্থীদের অভূতপূর্ব মিলনমেলা ঘটে।
                    </p>
                  </div>
                </div>

                {/* 2026 */}
                <div className="relative group">
                  <div className="w-3.5 h-3.5 bg-institutional-navy rounded-full absolute -left-[27px] sm:-left-[35px] top-1 border-2 border-white ring-2 ring-blue-200 group-hover:scale-125 transition-transform" />
                  <div className="bg-slate-50 rounded-lg p-3 sm:p-3.5 border border-slate-200/80 hover:border-institutional-navy transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-slate-800 bg-slate-200 px-2 py-0.5 rounded-sm">
                        বর্তমান কাল (২০২৬)
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      স্মার্ট ও ডিজিটাল শিক্ষা ব্যবস্থাপনার নেতৃত্ব
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      বর্তমানে ২,১০৯ জন শিক্ষার্থী ও ৫৫ জন শিক্ষক-কর্মকর্তা নিয়ে দিনাজপুর শিক্ষা বোর্ডে শীর্ষ ফলাফল ও আধুনিক শিক্ষার বাতিঘর।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column / Sidebar (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Founders & Historical Patrons Card */}
          <Reveal delay={100} direction="up">
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs card-organic space-y-3.5">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Landmark className="w-4 h-4 text-amber-600" />
                <h3 className="font-bold text-sm text-slate-900 font-serif">
                  মূল পৃষ্ঠপোষক ও প্রতিষ্ঠাতাবৃন্দ
                </h3>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>লর্ড উইলিয়াম বেন্টিঙ্ক</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    তৎকালীন গভর্নর-জেনারেল, ব্রিটিশ ভারত। ১৮৩২ সালে বিদ্যালয়টির স্থায়ী ভিত্তিপ্রস্তর স্থাপনকারী।
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>রংপুরের ঐতিহাসিক জমিদার সমাজ</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    কুন্ডি, কাকিনা, ডিমলা ও তাজহাটের বিদ্যানুরাগী জমিদারবর্গ—যাঁদের অর্থানুকূল্যে ১৮২৮ সালে প্রাথমিক কার্যক্রম শুরু হয়।
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span>বেঙ্গল প্রাদেশিক শিক্ষা অধিদপ্তর</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    ১৮৬২ সালে সরকারি অধিগ্রহণ ও সরাসরি প্রাতিষ্ঠানিক পরিচালনা শুরু।
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Campus Heritage & Architectural Landmarks */}
          <Reveal delay={150} direction="up">
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs card-organic space-y-3.5">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Building className="w-4 h-4 text-institutional-navy" />
                <h3 className="font-bold text-sm text-slate-900 font-serif">
                  শতবর্ষী স্থাপত্য ও ক্যাম্পাস ঐতিহ্য
                </h3>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-0.5">🏛️ লাল ইটের মূল ভবন</span>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    ব্রিটিশ ঔপনিবেশিক ইন্দো-সারাসেনিক স্থাপত্যরীতিতে নির্মিত প্রাচীন লাল ইটের মূল প্রশাসনিক ও একাডেমিক ভবন।
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-0.5">🌳 শতবর্ষী খেলার মাঠ ও বৃক্ষরাজি</span>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    উত্তরবঙ্গের অন্যতম বৃহৎ স্কুল খেলার মাঠ ও শতাব্দীর সাক্ষী সুপ্রাচীন রেইনট্রি ও দেবদারু বীথি।
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-0.5">📚 প্রাচীন গ্রন্থাগার ও মহাফেজখানা</span>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    শতবর্ষের প্রাচীন পাঠ্যপুস্তক, ব্রিটিশ আমলের সরকারি গেজেট ও ঐতিহাসিক রেকর্ডসমৃদ্ধ সুপ্রাচীন সংগ্রহশালা।
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Core Institutional Values */}
          <Reveal delay={200} direction="up">
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs card-organic space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Compass className="w-4 h-4 text-institutional-navy" />
                <h3 className="font-bold text-sm text-slate-900 font-serif">
                  মূল মূল্যবোধ ও অঙ্গীকার
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>জ্ঞান ও মেধার উৎকর্ষ:</strong> পাঠ্যপুস্তকের পাশাপাশি মানবিক ও বৈজ্ঞানিক চিন্তাশক্তি তৈরি।</span>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>কঠোর শৃঙ্খলা ও চারিত্রিক সততা:</strong> দেশপ্রেম ও নাগরিক দায়িত্ববোধ জাগ্রত করা।</span>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>সহশিক্ষা কার্যক্রম:</strong> স্কাউট, বিএনসিসি, রেড ক্রিসেন্ট, বিতর্ক ও খেলাধুলা।</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Quick Jump Links */}
          <Reveal delay={250} direction="up">
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs card-organic space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-sm text-slate-900 font-serif flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>সম্পর্কিত লিংকসমূহ</span>
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <Link
                  to="/about/at-a-glance"
                  className="inline-flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 font-medium text-xs transition-colors border border-slate-200/60"
                >
                  <span>এক নজরে পরিচিতি</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to="/students/statistics"
                  className="inline-flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 font-medium text-xs transition-colors border border-slate-200/60"
                >
                  <span>শিক্ষার্থী পরিসংখ্যান ({schoolInfo.totalStudents} জন)</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to="/teachers"
                  className="inline-flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 font-medium text-xs transition-colors border border-slate-200/60"
                >
                  <span>শিক্ষক ও কর্মকর্তা ({schoolInfo.totalTeachers} জন)</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to="/gallery"
                  className="inline-flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 font-medium text-xs transition-colors border border-slate-200/60"
                >
                  <span>ছবির গ্যালারি ও ক্যাম্পাস</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Student Educational Project Disclaimer */}
          <Reveal delay={300} direction="up">
            <div className="bg-amber-50/90 rounded-xl border border-amber-200/80 p-4 shadow-xs space-y-2 text-xs text-amber-950 card-organic">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <span className="text-sm">🎓</span>
                <span>শিক্ষার্থী প্রদর্শনী প্রকল্প</span>
              </div>
              <p className="text-slate-700 text-[11px] leading-relaxed">
                এই ওয়েবসাইটটি রংপুর জিলা স্কুলের একজন শিক্ষার্থী কর্তৃক শুধুমাত্র শিক্ষামূলক ও প্রযুক্তিগত প্রদর্শনের উদ্দেশ্যে (Educational Showcase) তৈরি করা হয়েছে।
              </p>
              <div className="pt-1">
                <a
                  href="https://github.com/tarangohasan/rangpurzillaschool"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-[11px] transition-colors shadow-xs btn-shimmer"
                >
                  <Github className="w-3 h-3" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-80" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
