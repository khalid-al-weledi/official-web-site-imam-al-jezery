'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { dictionary, Language } from '@/lib/dictionary';
import Switch from '@/components/Switch';

export default function LoginPage() {
  const [lang, setLang] = useState<Language>('ar');
  const t = dictionary[lang];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      const role = data.user?.user_metadata?.role || 'student';

      if (role === 'teacher') {
        router.push('/teacher/dashboard');
      } else if (role === 'accountant') {
        router.push('/accountant/dashboard');
      } else {
        router.push('/student/dashboard');
      }
    } catch (err: any) {
      setErrorMsg(lang === 'ar' ? 'حدث خطأ غير متوقع أثناء تسجيل الدخول.' : 'በግባ ጊዜ ያልተጠበቀ ስህተት ተከስቷል።');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-900 via-royal-800 to-slate-900 flex items-center justify-center px-4 py-12" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* إطار البطاقة الملكي */}
      <div className="max-w-md w-full bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-royal border border-gold/40 space-y-6 relative overflow-hidden">
        
        {/* زخرفة بصرية علوية بخط ذهبي خفيف */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold-dark via-gold to-gold-light"></div>

        {/* شريط تبديل اللغات */}
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold"></span>
            <span className="text-xs font-bold text-royal-800 uppercase tracking-wider">مقرأة الإمام الجزري</span>
          </div>
          <Switch currentLang={lang} setLang={setLang} />
        </div>

        {/* رأس العنوان */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-extrabold text-royal-900">{t.login}</h1>
          <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed">{t.title}</p>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 text-rose-700 p-3 rounded-xl text-sm border border-rose-200 text-center font-medium">
            {errorMsg}
          </div>
        )}

        {/* نموذج الدخول */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-royal-800 mb-1.5 uppercase">
              {lang === 'ar' ? 'البريد الإلكتروني' : 'ኢሜይል'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-royal-800 outline-none text-slate-900 text-sm transition-all"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-royal-800 mb-1.5 uppercase">
              {lang === 'ar' ? 'كلمة المرور' : 'የሚስጥር ቁጥር (Password)'}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-royal-800 outline-none text-slate-900 text-sm transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-royal-800 hover:bg-royal-900 text-gold-light hover:text-white font-bold py-3.5 rounded-xl transition-all shadow-royal border border-gold/30 disabled:opacity-50 text-sm tracking-wide"
          >
            {loading ? (lang === 'ar' ? 'جاري تسجيل الدخول...' : 'በመግባት ላይ...') : t.login}
          </button>
        </form>

        {/* رابط التسجيل */}
        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-600 font-medium">
            {lang === 'ar' ? 'ليس لديك حساب بعد؟' : 'አካውንት የለህም?'} {' '}
            <a href="/register" className="text-gold-dark hover:text-gold font-bold underline underline-offset-4">
              {t.register}
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
