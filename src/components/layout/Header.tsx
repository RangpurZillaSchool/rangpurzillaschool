import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, BookOpen, Users, GraduationCap, Bell, FileText, Award, Image, PhoneCall, Github } from 'lucide-react';
import { schoolInfo } from '../../data/schoolInfo';
import { ThemeSelector } from '../common/ThemeSelector';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [studentsDropdown, setStudentsDropdown] = useState(false);
  const [newsDropdown, setNewsDropdown] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

  // Close dropdowns when clicking outside or navigating
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setAboutDropdown(false);
        setStudentsDropdown(false);
        setNewsDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setAboutDropdown(false);
    setStudentsDropdown(false);
    setNewsDropdown(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 shadow-xs transition-colors">
      {/* Main Branding Row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3.5 group min-w-0">
          {/* Official Monogram */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-slate-200 dark:border-slate-700 bg-white p-1 flex items-center justify-center shadow-xs group-hover:border-institutional-navy transition-colors shrink-0">
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

          <div className="min-w-0">
            <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
              <h1 className="text-base sm:text-2xl lg:text-3xl font-bold text-institutional-navy dark:text-sky-400 tracking-tight leading-tight font-serif truncate sm:whitespace-normal transition-colors">
                {schoolInfo.nameBn}
              </h1>
              <span className="text-[10px] sm:text-xs lg:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-sans">
                {schoolInfo.nameEn}
              </span>
            </div>
            <p className="text-[11px] sm:text-[13px] text-slate-600 dark:text-slate-400 mt-0.5 flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="font-medium text-emerald-800 dark:text-emerald-400 whitespace-nowrap">সরকারি বালক উচ্চ বিদ্যালয়</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="whitespace-nowrap">রংপুর সদর, রংপুর</span>
              <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">•</span>
              <span className="text-amber-700 dark:text-amber-400 font-semibold hidden sm:inline">EIIN: {schoolInfo.eiin}</span>
            </p>
          </div>
        </Link>

        {/* Quick Portal Badges on Desktop */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          <ThemeSelector />
          <Link
            to="/students"
            className="px-3 py-1.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-institutional-navy hover:text-white transition-all flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            শিক্ষার্থী তথ্য
          </Link>
          <Link
            to="/notices"
            className="px-3 py-1.5 rounded-md text-xs font-medium bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-300/40 hover:bg-amber-600 hover:text-white transition-all flex items-center gap-1.5"
          >
            <Bell className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 group-hover:text-white" />
            নোটিশ বোর্ড
          </Link>
        </div>

        {/* Mobile quick theme + menu button */}
        <div className="flex items-center gap-1.5 lg:hidden ml-2 shrink-0">
          <ThemeSelector />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-institutional-navy border border-slate-200 focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Institutional Navbar */}
      <nav ref={navRef} className="bg-institutional-navy text-white hidden lg:block border-t border-institutional-navyDark shadow-sm relative z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between">
          <ul className="flex items-center text-[12.5px] xl:text-[14px] font-medium divide-x divide-institutional-navyDark/60 whitespace-nowrap shrink-0">
            <li className="shrink-0">
              <Link
                to="/"
                className={`px-2.5 xl:px-3.5 py-2.5 block whitespace-nowrap transition-colors ${
                  isActive('/') ? 'bg-institutional-navyDark text-amber-400 font-semibold' : 'hover:bg-institutional-navyDark/60 text-slate-100'
                }`}
              >
                প্রচ্ছদ
              </Link>
            </li>

            {/* About Dropdown */}
            <li
              className="relative shrink-0"
              onMouseEnter={() => setAboutDropdown(true)}
              onMouseLeave={() => setAboutDropdown(false)}
            >
              <button
                type="button"
                onClick={() => {
                  setAboutDropdown(prev => !prev);
                  setStudentsDropdown(false);
                  setNewsDropdown(false);
                }}
                className={`px-2.5 xl:px-3.5 py-2.5 flex items-center gap-1 whitespace-nowrap transition-colors cursor-pointer select-none ${
                  location.pathname.startsWith('/about') || aboutDropdown ? 'bg-institutional-navyDark text-amber-400 font-semibold' : 'hover:bg-institutional-navyDark/60 text-slate-100'
                }`}
                aria-expanded={aboutDropdown}
              >
                পরিচিতি <ChevronDown className={`w-3.5 h-3.5 opacity-75 shrink-0 transition-transform duration-150 ${aboutDropdown ? 'rotate-180' : ''}`} />
              </button>
              {aboutDropdown && (
                <div className="absolute top-full left-0 pt-1 w-52 z-50">
                  <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-xl border border-slate-200 dark:border-slate-800 rounded-b-md py-1.5 ring-1 ring-black/5 animate-in fade-in slide-in-from-top-1 duration-150">
                    <Link
                      to="/about/history"
                      onClick={() => setAboutDropdown(false)}
                      className="block px-4 py-2 text-xs xl:text-sm hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-institutional-navy dark:hover:text-sky-400 font-medium transition-colors"
                    >
                      সংক্ষিপ্ত ইতিহাস (১৮৩২)
                    </Link>
                    <Link
                      to="/about/at-a-glance"
                      onClick={() => setAboutDropdown(false)}
                      className="block px-4 py-2 text-xs xl:text-sm hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-institutional-navy dark:hover:text-sky-400 font-medium transition-colors"
                    >
                      এক নজরে পরিচিতি
                    </Link>
                  </div>
                </div>
              )}
            </li>

            <li className="shrink-0">
              <Link
                to="/teachers"
                className={`px-2.5 xl:px-3.5 py-2.5 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                  isActive('/teachers') ? 'bg-institutional-navyDark text-amber-400 font-semibold' : 'hover:bg-institutional-navyDark/60 text-slate-100'
                }`}
              >
                <span>শিক্ষক ও কর্মকর্তা</span>
                <span className="px-1.5 py-0.5 rounded-full bg-institutional-navyLight/90 text-[10px] xl:text-[11px] font-mono text-amber-300 font-semibold">
                  ৫৫
                </span>
              </Link>
            </li>

            {/* Students Dropdown */}
            <li
              className="relative shrink-0"
              onMouseEnter={() => setStudentsDropdown(true)}
              onMouseLeave={() => setStudentsDropdown(false)}
            >
              <button
                type="button"
                onClick={() => {
                  setStudentsDropdown(prev => !prev);
                  setAboutDropdown(false);
                  setNewsDropdown(false);
                }}
                className={`px-2.5 xl:px-3.5 py-2.5 flex items-center gap-1 whitespace-nowrap transition-colors cursor-pointer select-none ${
                  location.pathname.startsWith('/students') || studentsDropdown ? 'bg-institutional-navyDark text-amber-400 font-semibold' : 'hover:bg-institutional-navyDark/60 text-slate-100'
                }`}
                aria-expanded={studentsDropdown}
              >
                শিক্ষার্থী <ChevronDown className={`w-3.5 h-3.5 opacity-75 shrink-0 transition-transform duration-150 ${studentsDropdown ? 'rotate-180' : ''}`} />
              </button>
              {studentsDropdown && (
                <div className="absolute top-full left-0 pt-1 w-56 z-50">
                  <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-xl border border-slate-200 dark:border-slate-800 rounded-b-md py-1.5 ring-1 ring-black/5 animate-in fade-in slide-in-from-top-1 duration-150">
                    <Link
                      to="/students"
                      onClick={() => setStudentsDropdown(false)}
                      className="block px-4 py-2 text-xs xl:text-sm hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-institutional-navy dark:hover:text-sky-400 font-medium transition-colors"
                    >
                      অধ্যয়নরত শিক্ষার্থীর তালিকা
                    </Link>
                    <Link
                      to="/students/statistics"
                      onClick={() => setStudentsDropdown(false)}
                      className="block px-4 py-2 text-xs xl:text-sm hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-institutional-navy dark:hover:text-sky-400 font-medium transition-colors"
                    >
                      শিক্ষার্থী পরিসংখ্যান ({schoolInfo.totalStudents})
                    </Link>
                  </div>
                </div>
              )}
            </li>

            <li className="shrink-0">
              <Link
                to="/notices"
                className={`px-2.5 xl:px-3.5 py-2.5 block whitespace-nowrap transition-colors ${
                  isActive('/notices') ? 'bg-institutional-navyDark text-amber-400 font-semibold' : 'hover:bg-institutional-navyDark/60 text-slate-100'
                }`}
              >
                নোটিশ বোর্ড
              </Link>
            </li>

            {/* News & Downloads Dropdown */}
            <li
              className="relative shrink-0"
              onMouseEnter={() => setNewsDropdown(true)}
              onMouseLeave={() => setNewsDropdown(false)}
            >
              <button
                type="button"
                onClick={() => {
                  setNewsDropdown(prev => !prev);
                  setAboutDropdown(false);
                  setStudentsDropdown(false);
                }}
                className={`px-2.5 xl:px-3.5 py-2.5 flex items-center gap-1 whitespace-nowrap transition-colors cursor-pointer select-none ${
                  isActive('/news') || isActive('/downloads') || newsDropdown ? 'bg-institutional-navyDark text-amber-400 font-semibold' : 'hover:bg-institutional-navyDark/60 text-slate-100'
                }`}
                aria-expanded={newsDropdown}
              >
                সংবাদ ও ডাউনলোড <ChevronDown className={`w-3.5 h-3.5 opacity-75 shrink-0 transition-transform duration-150 ${newsDropdown ? 'rotate-180' : ''}`} />
              </button>
              {newsDropdown && (
                <div className="absolute top-full left-0 pt-1 w-48 z-50">
                  <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-xl border border-slate-200 dark:border-slate-800 rounded-b-md py-1.5 ring-1 ring-black/5 animate-in fade-in slide-in-from-top-1 duration-150">
                    <Link
                      to="/news"
                      onClick={() => setNewsDropdown(false)}
                      className="block px-4 py-2 text-xs xl:text-sm hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-institutional-navy dark:hover:text-sky-400 font-medium transition-colors"
                    >
                      খবর ও বিজ্ঞপ্তি
                    </Link>
                    <Link
                      to="/downloads"
                      onClick={() => setNewsDropdown(false)}
                      className="block px-4 py-2 text-xs xl:text-sm hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-institutional-navy dark:hover:text-sky-400 font-medium transition-colors"
                    >
                      ডাউনলোড ফরম ও রুটিন
                    </Link>
                  </div>
                </div>
              )}
            </li>

            <li className="shrink-0">
              <Link
                to="/academics/results"
                className={`px-2.5 xl:px-3.5 py-2.5 block whitespace-nowrap transition-colors ${
                  isActive('/academics/results') ? 'bg-institutional-navyDark text-amber-400 font-semibold' : 'hover:bg-institutional-navyDark/60 text-slate-100'
                }`}
              >
                পরীক্ষার ফলাফল
              </Link>
            </li>

            <li className="shrink-0">
              <Link
                to="/gallery"
                className={`px-2.5 xl:px-3.5 py-2.5 block whitespace-nowrap transition-colors ${
                  isActive('/gallery') ? 'bg-institutional-navyDark text-amber-400 font-semibold' : 'hover:bg-institutional-navyDark/60 text-slate-100'
                }`}
              >
                গ্যালারি
              </Link>
            </li>

            <li className="shrink-0">
              <Link
                to="/contact"
                className={`px-2.5 xl:px-3.5 py-2.5 block whitespace-nowrap transition-colors ${
                  isActive('/contact') ? 'bg-institutional-navyDark text-amber-400 font-semibold' : 'hover:bg-institutional-navyDark/60 text-slate-100'
                }`}
              >
                যোগাযোগ
              </Link>
            </li>
          </ul>

          <div className="text-xs font-semibold text-amber-300 whitespace-nowrap shrink-0 pl-3 hidden sm:block">
            প্রতিষ্ঠা: ১৮৩২ খ্রিঃ
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-2 shadow-xl max-h-[85vh] overflow-y-auto">
          {/* Explicit Student Project Notice */}
          <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-300/30 text-xs text-amber-950 dark:text-amber-200 space-y-1.5">
            <div className="font-semibold flex items-center justify-between gap-1.5 text-amber-800 dark:text-amber-300">
              <span className="flex items-center gap-1.5">
                <span className="text-sm">🎓</span>
                <span>শিক্ষার্থী প্রকল্প (Educational Demo)</span>
              </span>
              <a
                href="https://github.com/tarangohasan/rangpurzillaschool"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-600 hover:bg-amber-700 text-white font-medium text-[10px] transition-colors"
                title="GitHub Repository"
              >
                <Github className="w-2.5 h-2.5" />
                <span>GitHub</span>
              </a>
            </div>
            <p className="text-[11px] text-amber-900/90 dark:text-amber-300/80 leading-relaxed">
              এই ওয়েবসাইটটি রংপুর জিলা স্কুলের একজন শিক্ষার্থী কর্তৃক শুধুমাত্র শিক্ষামূলক ও প্রযুক্তিগত প্রদর্শনের উদ্দেশ্যে তৈরি করা হয়েছে।
            </p>
          </div>

          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              isActive('/') ? 'bg-institutional-navy dark:bg-sky-600 text-white' : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            প্রচ্ছদ (Home)
          </Link>

          <div className="pt-2 pb-1 border-t border-slate-100 dark:border-slate-800 space-y-1">
            <span className="px-3 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">পরিচিতি</span>
            <Link
              to="/about/history"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md ml-2"
            >
              • সংক্ষিপ্ত ইতিহাস (১৮৩২)
            </Link>
            <Link
              to="/about/at-a-glance"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md ml-2"
            >
              • এক নজরে পরিচিতি
            </Link>
          </div>

          <Link
            to="/teachers"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              isActive('/teachers') ? 'bg-institutional-navy dark:bg-sky-600 text-white' : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            শিক্ষক ও কর্মকর্তা ({schoolInfo.totalTeachers})
          </Link>

          <div className="pt-2 pb-1 border-t border-slate-100 dark:border-slate-800 space-y-1">
            <span className="px-3 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">শিক্ষার্থী</span>
            <Link
              to="/students"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md ml-2"
            >
              • অধ্যয়নরত শিক্ষার্থীর তালিকা
            </Link>
            <Link
              to="/students/statistics"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md ml-2"
            >
              • শিক্ষার্থী পরিসংখ্যান
            </Link>
          </div>

          <Link
            to="/notices"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              isActive('/notices') ? 'bg-institutional-navy dark:bg-sky-600 text-white' : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            নোটিশ বোর্ড
          </Link>

          <Link
            to="/news"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              isActive('/news') ? 'bg-institutional-navy dark:bg-sky-600 text-white' : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            সংবাদ ও ঘোষণা
          </Link>

          <Link
            to="/downloads"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              isActive('/downloads') ? 'bg-institutional-navy dark:bg-sky-600 text-white' : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            ডাউনলোড
          </Link>

          <Link
            to="/academics/results"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              isActive('/academics/results') ? 'bg-institutional-navy dark:bg-sky-600 text-white' : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            পাবলিক পরীক্ষার ফলাফল
          </Link>

          <Link
            to="/gallery"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              isActive('/gallery') ? 'bg-institutional-navy dark:bg-sky-600 text-white' : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            ছবির গ্যালারি
          </Link>

          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              isActive('/contact') ? 'bg-institutional-navy dark:bg-sky-600 text-white' : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            যোগাযোগ
          </Link>

          {/* National Portal Links in Mobile Drawer */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">জাতীয় ই-সেবা</span>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="http://gsa.teletalk.com.bd"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-between text-xs"
              >
                <span>ভর্তি আবেদন</span>
                <span className="text-slate-400">↗</span>
              </a>
              <a
                href="http://www.konnect.edu.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-between text-xs"
              >
                <span>কিশোর বাতায়ন</span>
                <span className="text-slate-400">↗</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
