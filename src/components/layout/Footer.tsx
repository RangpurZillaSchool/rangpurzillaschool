import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, ExternalLink, ShieldCheck, GraduationCap, Info, Github } from 'lucide-react';
import { schoolInfo } from '../../data/schoolInfo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-institutional-navyDark text-slate-300 border-t border-institutional-navy text-sm mt-auto">
      {/* Upper Footer: Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Col 1: Institutional Identity */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-white p-1 flex items-center justify-center shrink-0">
              <img
                src="/school_logo.png"
                alt="রংপুর জিলা স্কুল"
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'http://automation.sib.gov.bd/monogram/127372.png';
                }}
              />
            </div>
            <div>
              <h3 className="font-bold text-white text-base leading-tight font-serif">
                {schoolInfo.nameBn}
              </h3>
              <p className="text-xs text-slate-400 font-sans">{schoolInfo.nameEn}</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            ১৮৩২ খ্রিষ্টাব্দে প্রতিষ্ঠিত উত্তরবঙ্গের অন্যতম প্রাচীন ও স্বনামধন্য সরকারি বিদ্যাপীঠ। প্রায় দুই শতাব্দীর গৌরবময় ঐতিহ্য নিয়ে মেধা ও নৈতিকতা বিকাশে অঙ্গীকারাবদ্ধ।
          </p>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-institutional-navy/80 border border-slate-700 text-xs text-amber-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>EIIN: {schoolInfo.eiin}</span>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">
            প্রয়োজনীয় লিংক
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/about/history" className="hover:text-amber-400 transition-colors">
                বিদ্যালয়ের ইতিহাস ও ঐতিহ্য
              </Link>
            </li>
            <li>
              <Link to="/teachers" className="hover:text-amber-400 transition-colors">
                শিক্ষক-শিক্ষিকা ও কর্মচারীবৃন্দ ({schoolInfo.totalTeachers})
              </Link>
            </li>
            <li>
              <Link to="/students" className="hover:text-amber-400 transition-colors">
                অধ্যয়নরত শিক্ষার্থীর তালিকা (লাইভ)
              </Link>
            </li>
            <li>
              <Link to="/students/statistics" className="hover:text-amber-400 transition-colors">
                শিক্ষার্থী পরিসংখ্যান ও গ্রুপ বণ্টন
              </Link>
            </li>
            <li>
              <Link to="/notices" className="hover:text-amber-400 transition-colors">
                নোটিশ বোর্ড ও সার্কুলার
              </Link>
            </li>
            <li>
              <Link to="/academics/results" className="hover:text-amber-400 transition-colors">
                পাবলিক পরীক্ষার ফলাফল বিবরণী
              </Link>
            </li>
            <li>
              <Link to="/downloads" className="hover:text-amber-400 transition-colors">
                রুটিন ও ভর্তি লটারি ফলাফল ডাউনলোড
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Government & Educational Portals */}
        <div>
          <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">
            জাতীয় ই-সেবা লিংক
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a
                href="http://www.moedu.gov.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors flex items-center justify-between"
              >
                <span>শিক্ষা মন্ত্রণালয়</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </li>
            <li>
              <a
                href="http://www.dshe.gov.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors flex items-center justify-between"
              >
                <span>মাধ্যমিক ও উচ্চ শিক্ষা অধিদপ্তর</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </li>
            <li>
              <a
                href="http://gsa.teletalk.com.bd"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors flex items-center justify-between text-emerald-400 font-medium"
              >
                <span>সরকারি বিদ্যালয়ে ভর্তি আবেদন</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </li>
            <li>
              <a
                href="http://www.banbeis.gov.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors flex items-center justify-between"
              >
                <span>ব্যানবেইজ (BANBEIS)</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </li>
            <li>
              <a
                href="http://www.teachers.gov.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors flex items-center justify-between"
              >
                <span>শিক্ষক বাতায়ন</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </li>
            <li>
              <a
                href="http://www.konnect.edu.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors flex items-center justify-between"
              >
                <span>কিশোর বাতায়ন</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Contact & Office */}
        <div>
          <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">
            যোগাযোগ ও কার্যালয়
          </h4>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{schoolInfo.address.fullBn}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{schoolInfo.contact.phone}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{schoolInfo.contact.email}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-amber-400 shrink-0" />
              <a href={schoolInfo.contact.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                rangpurzillaschool.edu.bd
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Explicit Student Creator & Educational Purpose Disclaimer Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
        <div className="p-4 sm:p-5 rounded-xl bg-slate-900/90 border border-amber-400/30 text-xs text-slate-300 shadow-md">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-amber-400/10 text-amber-400 shrink-0 mt-0.5">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-bold text-amber-300 text-sm">
                  শিক্ষামূলক প্রদর্শনী প্রকল্প বিষয়ক ঘোষণা (Educational Purpose Disclaimer)
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-semibold">
                  Student Project • Not Official
                </span>
              </div>
              <p className="text-slate-200 leading-relaxed text-xs">
                এই ওয়েবসাইটটি <strong>রংপুর জিলা স্কুলের একজন শিক্ষার্থী কর্তৃক শুধুমাত্র শিক্ষামূলক ও প্রযুক্তিগত প্রদর্শনের উদ্দেশ্যে (For Educational and Demonstration Purposes Only)</strong> তৈরি করা হয়েছে। এটি বিদ্যালয়ের কোনো অফিশিয়াল বা প্রশাসনিক পরিবর্তন নয়; বরং বিদ্যমান তথ্য ও ডিজিটাল ব্যবস্থাপনার আধুনিক, দ্রুততর ও মোবাইল-বান্ধব ইউজার এক্সপেরিয়েন্স প্রদর্শনের একটি উন্মুক্ত অলাভজনক শিক্ষার্থী প্রকল্প।
              </p>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                This web application is developed by a student of Rangpur Zilla School strictly for educational and portfolio presentation purposes. All official administration, institutional rights, and copyrights belong to Rangpur Zilla School and the Ministry of Education, Government of Bangladesh.
              </p>
              <div className="pt-2">
                <a
                  href="https://github.com/tarangohasan/rangpurzillaschool"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors border border-white/20"
                >
                  <Github className="w-3.5 h-3.5 text-amber-400" />
                  <span>GitHub Repository: tarangohasan/rangpurzillaschool</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-black/50 py-4 px-4 sm:px-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} {schoolInfo.nameBn} (EIIN: {schoolInfo.eiin})।
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400 flex-wrap justify-center sm:justify-end">
            <span className="text-amber-300/80 font-medium">
              রংপুর জিলা স্কুলের একজন শিক্ষার্থী কর্তৃক শিক্ষামূলক উদ্দেশ্যে নির্মিত
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <a
              href="https://github.com/tarangohasan/rangpurzillaschool"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-amber-400" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
