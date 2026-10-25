import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, Sun, Moon } from 'lucide-react';
import { useTheme, ThemeId } from '../../context/ThemeContext';

export const ThemeSelector: React.FC = () => {
  const { theme, themeInfo, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-xs cursor-pointer select-none"
        title="থিম পরিবর্তন করুন (Change Theme)"
        aria-expanded={isOpen}
      >
        <Palette className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
        <span className="hidden sm:inline text-slate-500 dark:text-slate-400 text-[11px]">থিম:</span>
        <span className="hidden xs:inline font-semibold text-slate-800 dark:text-slate-100 truncate max-w-[68px] sm:max-w-[85px] text-[11px] sm:text-xs">
          {themeInfo.nameBn.split(' ')[0]}
        </span>
        <span
          className="w-3 h-3 rounded-full border border-black/20 dark:border-white/40 shrink-0 shadow-2xs"
          style={{ backgroundColor: themeInfo.primaryColor }}
        />
      </button>

      {isOpen && (
        <div className="fixed sm:absolute left-3 right-3 sm:left-auto sm:right-0 top-[4.5rem] sm:top-full mt-0 sm:mt-1.5 w-auto sm:w-80 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3 z-[70] animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-institutional-navy dark:text-amber-400" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                থিম নির্বাচন করুন ({availableThemes.length}টি থিম)
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">১২ Themes</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 max-h-[60vh] sm:max-h-[360px] overflow-y-auto pr-1">
            {availableThemes.map(t => {
              const isSelected = t.id === theme;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between p-2 rounded-lg text-left transition-all border text-xs cursor-pointer group ${
                    isSelected
                      ? 'bg-amber-50 dark:bg-slate-800 border-amber-400 dark:border-amber-400/80 font-bold text-amber-950 dark:text-white shadow-xs'
                      : 'border-slate-100 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="flex items-center gap-0.5 shrink-0">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs"
                        style={{ backgroundColor: t.bgColor }}
                        title="Background"
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full -ml-1 border border-black/10 shadow-2xs"
                        style={{ backgroundColor: t.primaryColor }}
                        title="Primary Color"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-[11px] font-semibold flex items-center gap-1">
                        <span>{t.nameBn}</span>
                        {t.isDark ? (
                          <Moon className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                        ) : (
                          <Sun className="w-2.5 h-2.5 text-amber-500 shrink-0" />
                        )}
                      </div>
                      <div className="text-[9px] text-slate-400 truncate">{t.nameEn}</div>
                    </div>
                  </div>

                  {isSelected && <Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
