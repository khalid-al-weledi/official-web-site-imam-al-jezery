import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          900: '#061325', // أزرق ملكي عميق وفخم جداً
          800: '#0F2240', // أزرق ملكي رئيسي
          700: '#1D3557', // أزرق حيوي للأزرار والعناصر البارزة
        },
        gold: {
          DEFAULT: '#D4AF37', // ذهبي أصيل
          light: '#FDE047',   // أصفر فاتح مضيء للإشعارات
          dark: '#997A15',    // ذهبي داكن للنصوص والتفاصيل
          accent: '#E5C158',  // لمسات إسلامية راقية
        }
      },
      fontFamily: {
        sans: ['var(--font-cairo)', 'var(--font-ethiopic)', 'sans-serif'],
      },
      boxShadow: {
        'royal': '0 10px 30px -5px rgba(15, 34, 64, 0.15)',
        'gold': '0 4px 20px -2px rgba(212, 175, 55, 0.25)',
      }
    },
  },
  plugins: [],
};
export default config;
