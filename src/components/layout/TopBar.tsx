import React from 'react';
import { Phone, Mail, Award, ExternalLink, Github } from 'lucide-react';
import { schoolInfo } from '../../data/schoolInfo';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-institutional-navyDark text-slate-200 text-xs border-b border-institutional-navyLight/30 py-1.5 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
        {/* Left: EIIN & Established */}
        <div className="flex items-center gap-1.5 sm:gap-4 min-w-0">
          <div className="flex items-center gap-1 font-medium text-amber-400 shrink-0 text-[11px] sm:text-xs">
            <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span>EIIN: {schoolInfo.eiin}</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 text-[10px] xs:text-[11px] sm:text-xs truncate">
            <span className="hidden xs:inline">স্থাপিত: </span>
            <span className="sm:hidden">১৮৩২ খ্রিঃ</span>
            <span className="hidden sm:inline">{schoolInfo.established}</span>
          </span>
          <span className="text-slate-600 hidden md:inline">|</span>
          <div className="hidden md:flex items-center gap-1.5 text-slate-300">
            <Phone className="w-3 h-3 text-emerald-400" />
            <span>{schoolInfo.contact.phone}</span>
          </div>
          <div className="hidden lg:flex items-center gap-1.5 text-slate-300">
            <Mail className="w-3 h-3 text-blue-400" />
            <span>{schoolInfo.contact.email}</span>
          </div>
        </div>

        {/* Center / Right: Explicit Student Project Notice & GitHub Link */}
        <div className="flex items-center gap-1.5 sm:gap-3 text-[11px] font-medium ml-auto shrink-0">
          <div className="flex items-center gap-1 text-amber-300 bg-amber-400/10 border border-amber-400/25 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] shrink-0 font-medium">
            <span>🎓</span>
            <span>শিক্ষার্থী প্রকল্প</span>
            <span className="text-amber-200/80 hidden sm:inline">(Educational Demo)</span>
          </div>

          {/* GitHub Repository Link */}
          <a
            href="https://github.com/tarangohasan/rangpurzillaschool"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 px-1.5 sm:px-2 py-0.5 rounded-md transition-colors text-[10px] sm:text-[11px] shrink-0 border border-white/15"
            title="GitHub Repository"
          >
            <Github className="w-3 h-3 text-amber-400" />
            <span className="font-semibold">GitHub</span>
          </a>

          {/* Desktop National Education Portals */}
          <div className="hidden md:flex items-center gap-2 text-slate-300 pl-2 border-l border-slate-700">
            <a
              href="http://gsa.teletalk.com.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors flex items-center gap-0.5"
            >
              ভর্তি আবেদন <ExternalLink className="w-2.5 h-2.5 opacity-70" />
            </a>
            <span className="text-slate-600">•</span>
            <a
              href="http://www.konnect.edu.bd/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors flex items-center gap-0.5"
            >
              কিশোর বাতায়ন <ExternalLink className="w-2.5 h-2.5 opacity-70" />
            </a>
            <span className="text-slate-600">•</span>
            <a
              href="http://www.teachers.gov.bd/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors flex items-center gap-0.5"
            >
              শিক্ষক বাতায়ন <ExternalLink className="w-2.5 h-2.5 opacity-70" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
