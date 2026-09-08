import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeId =
  | 'light'
  | 'dark'
  | 'sepia'
  | 'nord'
  | 'emerald'
  | 'sunset'
  | 'cyberpunk'
  | 'dracula'
  | 'forest'
  | 'ocean'
  | 'rose'
  | 'coffee';

export interface ThemeInfo {
  id: ThemeId;
  nameBn: string;
  nameEn: string;
  isDark: boolean;
  primaryColor: string;
  bgColor: string;
  accentColor: string;
  description: string;
}

export const THEMES: ThemeInfo[] = [
  {
    id: 'light',
    nameBn: 'ক্লাসিক লাইট (প্রাতিষ্ঠানিক)',
    nameEn: 'Classic Light',
    isDark: false,
    primaryColor: '#0f2b5c',
    bgColor: '#f8fafc',
    accentColor: '#c59b27',
    description: 'ঐতিহ্যবাহী প্রাতিষ্ঠানিক নেভি ও গোল্ডেন থিম'
  },
  {
    id: 'dark',
    nameBn: 'মডার্ন ডার্ক',
    nameEn: 'Modern Dark',
    isDark: true,
    primaryColor: '#38bdf8',
    bgColor: '#0f172a',
    accentColor: '#38bdf8',
    description: 'ক্লিন ডিপ স্লেট ও সায়ান ব্লু বৈপরীত্য'
  },
  {
    id: 'sepia',
    nameBn: 'সেপিয়া (পড়ার উপযোগী)',
    nameEn: 'Warm Sepia',
    isDark: false,
    primaryColor: '#78350f',
    bgColor: '#fbf0d9',
    accentColor: '#b45309',
    description: 'চোখের জন্য আরামদায়ক কাগজের উষ্ণ আবহ'
  },
  {
    id: 'nord',
    nameBn: 'নর্ডিক কোল্ড ব্লু',
    nameEn: 'Nord Frost',
    isDark: true,
    primaryColor: '#88c0d0',
    bgColor: '#2e3440',
    accentColor: '#81a1c1',
    description: 'আর্কটিক ব্লু ও শান্ত ধূসর টোন'
  },
  {
    id: 'emerald',
    nameBn: 'সবুজ ক্যাম্পাস',
    nameEn: 'Emerald Green',
    isDark: false,
    primaryColor: '#047857',
    bgColor: '#f0fdf4',
    accentColor: '#059669',
    description: 'বিদ্যালয় মাঠ ও প্রকৃতির সতেজ সবুজ'
  },
  {
    id: 'sunset',
    nameBn: 'গোধূলি অরেঞ্জ',
    nameEn: 'Golden Sunset',
    isDark: false,
    primaryColor: '#c2410c',
    bgColor: '#fff7ed',
    accentColor: '#ea580c',
    description: 'উষ্ণ রক্তিম ও সোনালী আভা'
  },
  {
    id: 'cyberpunk',
    nameBn: 'সাইবার নিয়ন',
    nameEn: 'Cyberpunk Neon',
    isDark: true,
    primaryColor: '#f43f5e',
    bgColor: '#18181b',
    accentColor: '#06b6d4',
    description: 'হাই-কনট্রাস্ট ইলেকট্রিক নিয়ন ভাইব'
  },
  {
    id: 'dracula',
    nameBn: 'ড্রাকুলা পার্পল',
    nameEn: 'Dracula Purple',
    isDark: true,
    primaryColor: '#bd93f9',
    bgColor: '#282a36',
    accentColor: '#ff79c6',
    description: 'লিজেন্ডারি ডার্ক ভায়োলেট ও পিঙ্ক অ্যাকসেন্ট'
  },
  {
    id: 'forest',
    nameBn: 'গভীর অরণ্য (ফরেস্ট)',
    nameEn: 'Deep Forest',
    isDark: true,
    primaryColor: '#34d399',
    bgColor: '#064e3b',
    accentColor: '#10b981',
    description: 'নৈশ বনানীর গভীর শান্ত সবুজ'
  },
  {
    id: 'ocean',
    nameBn: 'মহাসাগর ব্লু',
    nameEn: 'Deep Ocean',
    isDark: true,
    primaryColor: '#38bdf8',
    bgColor: '#0c4a6e',
    accentColor: '#0284c7',
    description: 'গভীর সাগরের নীলিমায় মোড়ানো আবহ'
  },
  {
    id: 'rose',
    nameBn: 'রোজ প্যাস্টেল',
    nameEn: 'Rose Gold',
    isDark: false,
    primaryColor: '#be123c',
    bgColor: '#fff1f2',
    accentColor: '#e11d48',
    description: 'নরম গোলাপী ও রুচিশীল মখমল শেড'
  },
  {
    id: 'coffee',
    nameBn: 'কফি বার্লি',
    nameEn: 'Vintage Coffee',
    isDark: true,
    primaryColor: '#d97706',
    bgColor: '#1c1917',
    accentColor: '#b45309',
    description: 'রোস্টেড কফি বিন ও উষ্ণ কাঠবাদামী ভাব'
  }
];

interface ThemeContextType {
  theme: ThemeId;
  themeInfo: ThemeInfo;
  setTheme: (theme: ThemeId) => void;
  availableThemes: ThemeInfo[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'rzs_active_theme_v2';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
      if (saved && THEMES.some(t => t.id === saved)) {
        return saved;
      }
    } catch {
      // Fallback
    }
    return 'light';
  });

  const currentThemeInfo = THEMES.find(t => t.id === theme) || THEMES[0];

  useEffect(() => {
    const root = document.documentElement;
    // Set data-theme attribute
    root.setAttribute('data-theme', theme);
    
    // Toggle dark class for Tailwind or dark mode selectors
    if (currentThemeInfo.isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore write errors
    }
  }, [theme, currentThemeInfo.isDark]);

  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeInfo: currentThemeInfo,
        setTheme,
        availableThemes: THEMES
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
