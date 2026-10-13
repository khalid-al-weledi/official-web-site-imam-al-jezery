'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { dictionary, Language } from '@/lib/dictionary';
import Switch from '@/components/Switch';

export default function RegisterPage() {
  const [lang, setLang] = useState<Language>('ar');
  const t = dictionary[lang];

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'teacher' | 'accountant'>('student');
  const [programId, setProgramId] = useState('تلقين');
  const [readingLevel, setReadingLevel] = useState('مبتدئ');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // 1. تسجيل المستخدم في Supabase Auth مع تخزين البيانات الأساسية في metadata
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
            program_id: programId,
            reading_level: readingLevel,
          }
        }
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      // 2. التوجيه التلقائي حسب الدور بعد التسجيل الناجح
      if (role === 'teacher') {
        router.push('/teacher/dashboard');
      } else if (role === 'accountant') {
        router.push('/accountant/dashboard');
      } else {
        router.push('/student/dashboard');
      }
    } catch (err: any) {
      setErrorMsg(lang === 'ar' ? 'حدث خطأ غير متوقع أثناء التسجيل.' : 'በምዝገባ ወቅት ስህተት ተከስቷል።');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-900 via-royal-800 to-slate-900 flex items-center justify-center px-4 py-12" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* بطاقة التسجيل الملكية */}
      <div className="max-w-xl w-full bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-royal border border-gold/40 space-y-6 relative overflow-hidden">
        
        {/* شريط زاهي ذهبي علوي */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold-dark via-gold to-gold-light"></div>

        {/* رأس البطاقة مع تبديل اللغات */}
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse"></span>
            <span className="text-xs font-extrabold text-royal-800 tracking-wider">مقرأة الإمام الجزري</span>
          </div>
          <Switch currentLang={lang} setLang={setLang} />
        </div>

        <div className="text-center space-y-1.5">
          <h1 className="text-2xl md:text-3xl font-extrabold text-royal-900">{t.createAccountTitle}</h1>
          <p className="text-slate-600 text-xs md:text-sm font-medium">{t.title}</p>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 text-rose-700 p-3 rounded-xl text-sm border border-rose-200 text-center font-medium">
            {errorMsg}
          </div>
        )}

        {/* نموذج التسجيل */}
        <form onSubmit={handleRegister} className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* الاسم الكامل */}
            <div>
              <label className="block text-xs font-bold text-royal-800 mb-1.5 uppercase">
                {t.fullName}
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-royal-800 outline-none text-slate-900 text-sm transition-all"
                placeholder={lang === 'ar' ? 'أدخل اسمك الكامل' : 'ሙሉ ስምዎን ያስገቡ'}
              />
            </div>

            {/* البريد الإلكتروني */}
            <div>
              <label className="block text-xs font-bold text-royal-800 mb-1.5 uppercase">
                {t.email}
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* كلمة المرور */}
            <div>
              <label className="block text-xs font-bold text-royal-800 mb-1.5 uppercase">
                {t.password}
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

            {/* دور المستخدم */}
            <div>
              <label className="block text-xs font-bold text-royal-800 mb-1.5 uppercase">
                {t.role}
              </label>
              <select
                value={role}
                onChange={(e: any) => setRole(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-royal-800 outline-none text-slate-900 text-sm transition-all"
              >
                <option value="student">{t.student}</option>
                <option value="teacher">{t.teacher}</option>
                <option value="accountant">{t.accountant}</option>
              </select>
            </div>
          </div>

          {/* خيارات إضافية خاصة بالطلاب */}
          {role === 'student' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-royal-800 mb-1.5 uppercase">
                  {t.program}
                </label>
                <select
                  value={programId}
                  onChange={(e) => setProgramId(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-royal-800 outline-none text-slate-900 text-sm transition-all"
                >
                  <option value="تلقين">{t.talaqqi}</option>
                  <option value="إجازة بالسند">{t.ijazah}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-royal-800 mb-1.5 uppercase">
                  {t.readingLevel}
                </label>
                <select
                  value={readingLevel}
                  onChange={(e) => setReadingLevel(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-royal-800 outline-none text-slate-900 text-sm transition-all"
                >
                  <option value="مبتدئ">{t.beginner}</option>
                  <option value="متقدم">{t.advanced}</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-royal-800 hover:bg-royal-900 text-gold-light hover:text-white font-bold py-3.5 rounded-xl transition-all shadow-royal border border-gold/30 disabled:opacity-50 text-sm tracking-wide mt-2"
          >
            {loading ? (lang === 'ar' ? 'جاري إنشاء الحساب...' : 'አካውንት በመፍጠር ላይ...') : t.registerBtn}
          </button>
        </form>

        {/* رابط الانتقال لتسجيل الدخول */}
        <div className="text-center pt-3 border-t border-slate-100">
          <p className="text-xs text-slate-600 font-medium">
            {t.hasAccount}{' '}
            <a href="/login" className="text-gold-dark hover:text-gold font-bold underline underline-offset-4">
              {t.loginHere}
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
