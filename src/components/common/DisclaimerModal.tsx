import React, { useState, useEffect } from 'react';
import { AlertCircle, X, ExternalLink, Github } from 'lucide-react';

const STORAGE_KEY = 'rzs_startup_disclaimer_dismissed_v1';

export const DisclaimerModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (!dismissed) {
        setIsOpen(true);
      }
    } catch {
      setIsOpen(true);
    }
  }, []);

  const handleDismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Ignore write error
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="disclaimer-title"
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-amber-200 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Top Accent Strip */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 h-2 w-full" />

        <div className="p-6 sm:p-7 space-y-5">
          {/* Header Badge & Title */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-800 shrink-0">
                <AlertCircle className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-amber-100 text-amber-900 border border-amber-200 mb-1">
                  Important Notice / গুরুত্বপূর্ণ ঘোষণা
                </span>
                <h3 id="disclaimer-title" className="text-lg sm:text-xl font-bold text-slate-900 font-serif leading-tight">
                  শিক্ষার্থী প্রকল্প ও সাধারণ ঘোষণা
                </h3>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              type="button"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close disclaimer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Primary Highlight Banner */}
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200/90 space-y-2">
            <p className="text-sm sm:text-base font-bold text-amber-950 leading-snug">
              &ldquo;Unofficial student project — educational/demo purposes only. Not the official website of Rangpur Zilla School.&rdquo;
            </p>
            <p className="text-xs sm:text-[13px] text-amber-900/90 leading-relaxed">
              এই ওয়েবসাইটটি রংপুর জিলা স্কুলের একজন শিক্ষার্থী কর্তৃক শুধুমাত্র শিক্ষামূলক, প্রযুক্তিগত চর্চা ও আধুনিক ইন্টারফেস প্রদর্শনের উদ্দেশ্যে তৈরি করা হয়েছে। এটি স্কুলের কোনো প্রাতিষ্ঠানিক বা অফিশিয়াল পোর্টাল নয়।
            </p>
          </div>

          {/* Additional details */}
          <div className="space-y-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed border-l-2 border-slate-200 pl-3.5">
            <p>
              • সমস্ত তথ্য ও নোটিশ মূল ওয়েবসাইট থেকে শুধুমাত্র রিড-অনলি হিসেবে প্রদর্শিত হচ্ছে।
            </p>
            <p>
              • স্কুলের প্রাতিষ্ঠানিক তথ্যের জন্য সর্বদা বিদ্যালয়ের প্রধান শিক্ষক বা অফিস কর্তৃপক্ষের সাথে সরাসরি যোগাযোগ করুন।
            </p>
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100">
            <a
              href="https://github.com/tarangohasan/rangpurzillaschool"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
            >
              <Github className="w-4 h-4 text-slate-700" />
              <span>GitHub Repository</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <button
              onClick={handleDismiss}
              type="button"
              className="px-5 py-2.5 rounded-xl bg-institutional-navy hover:bg-institutional-navyDark text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all text-center cursor-pointer"
            >
              বুঝেছি / Understood & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
