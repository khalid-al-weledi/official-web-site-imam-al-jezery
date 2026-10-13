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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-blue-100 space-y-6">
        
        {/* زر تبديل اللغة في الأعلى */}
        <div className="flex justify-between items-center border-b pb-4">
          <span className="text-xs font-bold text-slate-500 uppercase">Language / اللغة</span>
          <Switch currentLang={lang} setLang={setLang} />
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-blue-950">{t.login}</h1>
          <p className="text-slate-600 text-sm">{t.title}</p>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 text-rose-700 p-3 rounded-lg text-sm border border-rose-200 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {lang === 'ar' ? 'البريد الإلكتروني' : 'ኢሜይል'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-slate-900"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {lang === 'ar' ? 'كلمة المرور' : 'የሚስጥር ቁጥር (Password)'}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-slate-900"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? (lang === 'ar' ? 'جاري تسجيل الدخول...' : 'በመግባት ላይ...') : t.login}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-sm text-slate-600">
            {lang === 'ar' ? 'ليس لديك حساب بعد؟' : 'አካውንት የለህም?'} {' '}
            <a href="/register" className="text-amber-600 font-semibold hover:underline">
              {t.register}
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
