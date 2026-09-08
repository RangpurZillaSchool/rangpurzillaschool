import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Award, Landmark, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { schoolInfo } from '../data/schoolInfo';

export const HistoryPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Breadcrumbs */}
      <div>
        <Link
          to="/about/at-a-glance"
          className="inline-flex items-center gap-1 text-xs font-semibold text-institutional-navy hover:underline mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> এক নজরে পরিচিতি
        </Link>
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
            <Landmark className="w-4 h-4" />
            <span>ঐতিহ্য ও ইতিহাস</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 font-serif">
            রংপুর জিলা স্কুলের সংক্ষিপ্ত ইতিহাস
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            অখণ্ড বাংলার উত্তর জনপদে শিক্ষা বিস্তারের এক অনন্য ও গৌরবোজ্জ্বল অধ্যায়
          </p>
        </div>
      </div>

      {/* Main Narrative Article */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6 text-justify">
        <div className="border-l-4 border-institutional-navy pl-4 py-1 italic text-slate-700 bg-slate-50 text-sm sm:text-base font-serif">
          &ldquo;১৮৩২ সালে বাংলার তৎকালীন গভর্নর লর্ড উইলিয়াম বেন্টিঙ্ক &lsquo;জমিদার স্কুল&rsquo; নামে এ বিদ্যালয়ের ভিত্তিপ্রস্তর স্থাপন করেন।&rdquo;
        </div>

        <div className="space-y-4 text-slate-800 text-sm sm:text-base leading-relaxed">
          {schoolInfo.historyNarrative.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Timeline Visualization */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 font-serif mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-institutional-navy" />
            ঐতিহাসিক মাইলফলক
          </h2>

          <div className="relative border-l-2 border-slate-200 ml-3.5 space-y-8 pl-6">
            {/* 1825/1828 */}
            <div className="relative">
              <div className="w-3.5 h-3.5 bg-amber-500 rounded-full absolute -left-[31px] top-1 border-2 border-white ring-2 ring-amber-200"></div>
              <div className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-sm inline-block mb-1">
                ১৮২৮ খ্রিষ্টাব্দ (জনশ্রুত ১৮২৫)
              </div>
              <h3 className="text-sm font-bold text-slate-900">প্রাথমিক পাঠদান কার্যক্রম</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                রংপুর ও নিকটবর্তী এলাকার দানশীল জমিদারবর্গের উদ্যোগে ও আর্থিক সহায়তায় এ অঞ্চলের যুবসমাজকে আধুনিক শিক্ষার আওতায় আনার সূচনা ঘটে।
              </p>
            </div>

            {/* 1832 */}
            <div className="relative">
              <div className="w-3.5 h-3.5 bg-institutional-navy rounded-full absolute -left-[31px] top-1 border-2 border-white ring-2 ring-blue-200"></div>
              <div className="text-xs font-mono font-bold text-institutional-navy bg-blue-50 px-2.5 py-0.5 rounded-sm inline-block mb-1">
                ১৮৩২ খ্রিষ্টাব্দ
              </div>
              <h3 className="text-sm font-bold text-slate-900">ভিত্তিপ্রস্তর স্থাপন ও আনুষ্ঠানিক রূপ</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                তৎকালীন ব্রিটিশ ভারতের গভর্নর-জেনারেল লর্ড উইলিয়াম বেন্টিঙ্ক রংপুরে আগমন করেন এবং আনুষ্ঠানিকভাবে &lsquo;জমিদার স্কুল&rsquo; হিসেবে এ বিদ্যাপীঠের ভিত্তিপ্রস্তর স্থাপন করেন।
              </p>
            </div>

            {/* 1862 */}
            <div className="relative">
              <div className="w-3.5 h-3.5 bg-emerald-600 rounded-full absolute -left-[31px] top-1 border-2 border-white ring-2 ring-emerald-200"></div>
              <div className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-sm inline-block mb-1">
                ১৮৬২ খ্রিষ্টাব্দ
              </div>
              <h3 className="text-sm font-bold text-slate-900">সরকারি রংপুর জিলা স্কুল হিসেবে রূপান্তর</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                তৎকালীন ব্রিটিশ সরকারের শিক্ষা বিভাগের প্রত্যক্ষ নিয়ন্ত্রণে আসে এবং আনুষ্ঠানিকভাবে &lsquo;রংপুর জিলা স্কুল&rsquo; হিসেবে রূপান্তরিত হয়ে পূর্ণাঙ্গ সরকারি বিদ্যাপীঠ হিসেবে অগ্রযাত্রা শুরু করে।
              </p>
            </div>

            {/* Modern Era */}
            <div className="relative">
              <div className="w-3.5 h-3.5 bg-slate-800 rounded-full absolute -left-[31px] top-1 border-2 border-white ring-2 ring-slate-200"></div>
              <div className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-sm inline-block mb-1">
                বর্তমান কাল (২০২৬)
              </div>
              <h3 className="text-sm font-bold text-slate-900">স্মার্ট শিক্ষা ও আধুনিক বিদ্যাপীঠ</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                বর্তমানে বিদ্যালয়টি ২,১০৯ জন শিক্ষার্থী ও ৫৫ জন দক্ষ শিক্ষকমণ্ডলীর সমন্বয়ে সুসজ্জিত বিজ্ঞানাগার, মাল্টিমিডিয়া ক্লাসরুম ও তথ্যপ্রযুক্তিভিত্তিক শিক্ষা পরিচালনায় উত্তরবঙ্গে নেতৃত্ব দিয়ে আসছে।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
