import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'مقرأة الإمام الجزري للإقراء والإجازة بالسند',
  description: 'منصة رقمية متكاملة لتعليم القرآن الكريم والإقراء وتصحيح التلاوة والإجازة بالسند',
};

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params?: { lang?: string };
}) {
  const lang = params?.lang || 'ar';
  const isRtl = lang === 'ar';

  return (
    <html lang={lang} dir={isRtl ? 'rtl' : 'ltr'}>
      <body className="bg-slate-50 text-slate-900 font-sans antialiased min-h-screen flex flex-col">
        {/* شريط التنقل العلوي */}
        <header className="bg-blue-900 text-white shadow-md border-b-2 border-amber-500">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-amber-400">
              مقرأة الإمام الجزري للإقراء والإجازة بالسند
            </h1>
            <nav className="flex gap-4 items-center">
              <a href="/" className="hover:text-amber-300 transition-colors">الرئيسية</a>
              <a href="/programs" className="hover:text-amber-300 transition-colors">البرامج</a>
              <a href="/register" className="bg-amber-500 text-blue-950 font-semibold px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors">
                التسجيل
              </a>
            </nav>
          </div>
        </header>

        {/* المحتوى الرئيسي */}
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>

        {/* تذييل الصفحة */}
        <footer className="bg-blue-950 text-slate-300 py-6 text-center text-sm border-t border-blue-950">
          <p>© 2026 مقرأة الإمام الجزري للإقراء والإجازة بالسند. جميع الحقوق محفوظة.</p>
        </footer>
      </body>
    </html>
  );
}

import './globals.css';
import { Cairo, Noto_Sans_Ethiopic } from 'next/font/google';

const cairo = Cairo({ 
  subsets: ['arabic'], 
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-cairo'
});

const ethiopic = Noto_Sans_Ethiopic({ 
  subsets: ['ethiopic'], 
  weight: ['400', '600', '700'],
  variable: '--font-ethiopic'
});

export const metadata = {
  title: 'مقرأة الإمام الجزري للإقراء والإجازة بالسند',
  description: 'منصة إلكترونية متقدمة لتعليم القرآن الكريم وتأصيل القراءات',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} ${ethiopic.variable} font-sans bg-slate-900 text-slate-100 antialiased min-h-screen selection:bg-gold selection:text-royal-900`}>
        {children}
      </body>
    </html>
  );
}
