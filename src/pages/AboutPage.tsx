import React from 'react';
import { Link } from 'react-router-dom';
import { Building, ShieldCheck, MapPin, Phone, Mail, Award, BookOpen, Clock, Users, ArrowRight, Github, ExternalLink } from 'lucide-react';
import { schoolInfo } from '../data/schoolInfo';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-institutional-navy mb-1">
          <Building className="w-4 h-4" />
          <span>প্রাতিষ্ঠানিক তথ্যাবলী</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
          এক নজরে রংপুর জিলা স্কুল
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          পরিচিতি, ভৌগোলিক অবস্থান, অবকাঠামো ও প্রাতিষ্ঠানিক বিবরণী
        </p>
      </div>

      {/* Main Grid: At a Glance Metadata Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {/* Metadata Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="bg-institutional-navy text-white px-6 py-4 flex items-center justify-between">
              <h2 className="font-bold text-base font-serif flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                মৌলিক পরিচিতি বিবরণী (EIIN: {schoolInfo.eiin})
              </h2>
              <span className="text-xs text-amber-300 font-mono">কোড: ১২৭৩৭২</span>
            </div>

            <div className="divide-y divide-slate-100 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                <div className="font-semibold text-slate-600">বিদ্যালয়ের নাম (বাংলা)</div>
                <div className="sm:col-span-2 font-bold text-slate-900">{schoolInfo.nameBn}</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                <div className="font-semibold text-slate-600">বিদ্যালয়ের নাম (ইংরেজি)</div>
                <div className="sm:col-span-2 font-semibold text-slate-800 font-sans">{schoolInfo.nameEn}</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                <div className="font-semibold text-slate-600">ইআইআইএন (EIIN)</div>
                <div className="sm:col-span-2 font-mono font-bold text-institutional-navy">{schoolInfo.eiin}</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                <div className="font-semibold text-slate-600">প্রতিষ্ঠা কাল</div>
                <div className="sm:col-span-2 text-slate-800">{schoolInfo.established} (ভিত্তিপ্রস্তর: লর্ড উইলিয়াম বেন্টিঙ্ক)</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                <div className="font-semibold text-slate-600">প্রতিষ্ঠানের ধরন</div>
                <div className="sm:col-span-2 text-slate-800">{schoolInfo.type}</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                <div className="font-semibold text-slate-600">শিক্ষা স্তর</div>
                <div className="sm:col-span-2 text-slate-800">{schoolInfo.levels}</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                <div className="font-semibold text-slate-600">চালু শিফট</div>
                <div className="sm:col-span-2 text-slate-800 font-medium">
                  ১. প্রভাতি শিফট (সকাল ৭:০০ হতে) | ২. দিবা শিফট (দুপুর ১২:০০ হতে)
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                <div className="font-semibold text-slate-600">অবস্থান ও ঠিকানা</div>
                <div className="sm:col-span-2 text-slate-800">
                  {schoolInfo.address.fullBn}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                <div className="font-semibold text-slate-600">ওয়ার্ড ও থানা</div>
                <div className="sm:col-span-2 text-slate-800">ওয়ার্ড নম্বর ১৯, থানা: কোতয়ালী, রংপুর</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                <div className="font-semibold text-slate-600">পোস্ট অফিস ও কোড</div>
                <div className="sm:col-span-2 text-slate-800 font-mono">পোস্ট: রংপুর, কোড: ৫৪০০</div>
              </div>
            </div>
          </div>

          {/* Vision and Mission */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3">
            <h3 className="font-bold text-base text-slate-900 font-serif">
              প্রাতিষ্ঠানিক লক্ষ্য ও উদ্দেশ্য
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed text-justify">
              রংপুর জিলা স্কুলের মূল ব্রত হলো ভবিষ্যৎ প্রজন্মকে নৈতিকতা, মানবিক মূল্যবোধ ও আধুনিক বিজ্ঞানভিত্তিক জ্ঞানে ঋদ্ধ করে গড়ে তোলা। প্রায় দুই শতাব্দীর গৌরবকে ধারণ করে আমরা শিক্ষার্থীদের পাঠ্যপুস্তকের পাশাপাশি ক্রীড়া, সাংস্কৃতিক ও সহ-শিক্ষা কার্যক্রমে অগ্রণী করে গড়ে তুলছি।
            </p>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="lg:col-span-4 space-y-6">
          {/* History link card */}
          <div className="bg-gradient-to-br from-institutional-navy to-institutional-navyDark text-white rounded-xl p-6 shadow-md space-y-4">
            <BookOpen className="w-8 h-8 text-amber-400" />
            <h3 className="text-lg font-bold font-serif">বিদ্যালয়ের গৌরবোজ্জ্বল ইতিহাস</h3>
            <p className="text-xs text-slate-200 leading-relaxed">
              ১৮৩২ খ্রিষ্টাব্দ থেকে উত্তর জনপদে শিক্ষার আলো বিস্তার করে চলেছে রংপুর জিলা স্কুল। জানুন এর বিস্তারিত ইতিহাস ও তাৎপর্য।
            </p>
            <Link
              to="/about/history"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-all"
            >
              সম্পূর্ণ ইতিহাস পড়ুন <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Key contacts widget */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
              যোগাযোগ ও হেল্পডেস্ক
            </h3>
            <div className="space-y-2.5 text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>কাচারী বাজার, প্রধান সড়ক, কোতয়ালী, রংপুর</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="font-mono">{schoolInfo.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-700 shrink-0" />
                <span>{schoolInfo.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Student Project Notice Card */}
          <div className="bg-amber-50/90 rounded-xl border border-amber-200/80 p-5 shadow-xs space-y-2 text-xs text-amber-950">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
              <span className="text-base">🎓</span>
              <span>শিক্ষার্থী প্রদর্শনী প্রকল্প</span>
            </div>
            <p className="text-slate-700 leading-relaxed text-xs">
              এই ওয়েবসাইটটি রংপুর জিলা স্কুলের একজন শিক্ষার্থী কর্তৃক শুধুমাত্র শিক্ষামূলক ও প্রযুক্তিগত প্রদর্শনের উদ্দেশ্যে (Educational Purposes Only) তৈরি করা হয়েছে।
            </p>
            <div className="text-[11px] text-amber-800/90 font-medium">
              Student Educational Project • EIIN: {schoolInfo.eiin}
            </div>
            <div className="pt-1.5">
              <a
                href="https://github.com/tarangohasan/rangpurzillaschool"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs transition-colors shadow-xs"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3 opacity-75" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
