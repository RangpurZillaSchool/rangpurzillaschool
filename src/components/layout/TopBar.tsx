import React from 'react';
import { Phone, Mail, Award, ExternalLink, Github } from 'lucide-react';
import { schoolInfo } from '../../data/schoolInfo';
import { ThemeSelector } from '../common/ThemeSelector';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-institutional-navyDark text-slate-200 text-xs border-b border-institutional-navyLight/30 py-1.5 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: EIIN & Established */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="flex items-center gap-1.5 font-medium text-amber-400">
            <Award className="w-3.5 h-3.5 shrink-0" />
            <span>EIIN: {schoolInfo.eiin}</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 text-[11px] sm:text-xs">স্থাপিত: {schoolInfo.established}</span>
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
        <div className="flex items-center gap-2 sm:gap-3 text-[11px] font-medium ml-auto">
          <div className="flex items-center gap-1 text-amber-300 bg-amber-400/10 border border-amber-400/25 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] shrink-0 font-medium">
            <span>🎓</span>
            <span className="hidden xs:inline">শিক্ষার্থী প্রকল্প</span>
            <span className="text-amber-200/80">(Educational Demo)</span>
          </div>

          {/* GitHub Repository Link */}
          <a
            href="https://github.com/tarangohasan/rangpurzillaschool"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded-md transition-colors text-[10px] sm:text-[11px] shrink-0 border border-white/15"
            title="GitHub Repository"
          >
            <Github className="w-3 h-3 text-amber-400" />
            <span className="font-semibold">GitHub</span>
          </a>

          {/* Theme Selector Dropdown */}
          <ThemeSelector />

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
