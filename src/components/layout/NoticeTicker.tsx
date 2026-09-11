import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Pause, Play, ChevronRight } from 'lucide-react';
import { api } from '../../services/api';
import { Notice } from '../../types';

export const NoticeTicker: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    api.getNotices().then(data => {
      setNotices(data.slice(0, 8));
    });
  }, []);

  if (notices.length === 0) return null;

  return (
    <div className="bg-amber-50 dark:bg-slate-900 border-b border-amber-200/80 dark:border-slate-800 text-amber-950 dark:text-amber-100 text-xs sm:text-sm min-h-[38px] sm:min-h-[44px] flex items-center px-3 sm:px-6 py-1 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3 w-full">
        {/* Badge */}
        <div className="bg-amber-600 text-white font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-sm flex items-center gap-1 sm:gap-1.5 shrink-0 shadow-xs text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <Bell className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline">জরুরি নোটিশ</span>
          <span className="sm:hidden text-[11px]">নোটিশ</span>
        </div>

        {/* Ticker Content */}
        <div
          className="flex-grow overflow-hidden relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="animate-marquee flex items-center"
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {/* Primary list */}
            <div className="flex items-center gap-6 sm:gap-8 pr-6 sm:pr-8 whitespace-nowrap">
              {notices.map((n, idx) => (
                <Link
                  key={`n1-${n.id || idx}`}
                  to={`/notices/${n.id}`}
                  className="hover:underline text-amber-950 dark:text-slate-100 hover:text-amber-800 dark:hover:text-amber-300 inline-flex items-center gap-1.5 font-medium py-1 leading-relaxed text-xs sm:text-sm transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block shrink-0"></span>
                  <span>{n.title}</span>
                  <span className="text-[10px] sm:text-[11px] text-amber-700 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950/60 px-1.5 py-0.2 rounded-sm shrink-0 hidden sm:inline border border-amber-300/30 dark:border-amber-700/30">
                    {n.date}
                  </span>
                </Link>
              ))}
            </div>

            {/* Seamless loop duplicate list */}
            <div className="flex items-center gap-6 sm:gap-8 pr-6 sm:pr-8 whitespace-nowrap" aria-hidden="true">
              {notices.map((n, idx) => (
                <Link
                  key={`n2-${n.id || idx}`}
                  to={`/notices/${n.id}`}
                  tabIndex={-1}
                  className="hover:underline text-amber-950 dark:text-slate-100 hover:text-amber-800 dark:hover:text-amber-300 inline-flex items-center gap-1.5 font-medium py-1 leading-relaxed text-xs sm:text-sm transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block shrink-0"></span>
                  <span>{n.title}</span>
                  <span className="text-[10px] sm:text-[11px] text-amber-700 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950/60 px-1.5 py-0.2 rounded-sm shrink-0 hidden sm:inline border border-amber-300/30 dark:border-amber-700/30">
                    {n.date}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="hidden sm:flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? "চালু করুন" : "থামান"}
            className="p-1 rounded-sm text-amber-800 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
          <Link
            to="/notices"
            className="text-amber-800 dark:text-amber-400 font-semibold hover:underline hidden md:flex items-center text-xs ml-1"
          >
            সব নোটিশ <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};
