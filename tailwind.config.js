/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        institutional: {
          navy: '#0f2b5c',
          navyDark: '#091a38',
          navyLight: '#1b3f7d',
          gold: '#c59b27',
          goldLight: '#dfb743',
          green: '#047857',
          greenLight: '#059669',
          border: '#e2e8f0',
          surface: '#f8fafc',
          muted: '#64748b',
          dark: '#0f172a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Purno', 'system-ui', 'sans-serif'],
        serif: ['Purno', 'Merriweather', 'serif'],
        bangla: ['Purno', 'sans-serif'],
        english: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
