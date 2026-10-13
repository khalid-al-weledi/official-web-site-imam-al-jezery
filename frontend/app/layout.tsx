import './globals.css';
import { Cairo, Noto_Sans_Ethiopic } from 'next/font/google';

const cairo = Cairo({ 
  subsets: ['arabic'], 
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-cairo',
  display: 'swap',
});

const ethiopic = Noto_Sans_Ethiopic({ 
  subsets: ['ethiopic'], 
  weight: ['400', '600', '700'],
  variable: '--font-ethiopic',
  display: 'swap',
});

export const metadata = {
  title: 'مقرأة الإمام الجزري للإقراء والإجازة بالسند',
  description: 'منصة إلكترونية متقدمة لتعليم القرآن الكريم وتأصيل القراءات بالسند المتصل',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} ${ethiopic.variable} font-sans bg-slate-900 text-slate-100 antialiased min-h-screen selection:bg-gold selection:text-royal-900`}>
        <div className="min-h-screen flex flex-col justify-between">
          {children}
        </div>
      </body>
    </html>
  );
}
