'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { dictionary, Language } from '@/lib/dictionary';
import Switch from '@/components/Switch';

export default function StudentDashboard() {
  const [lang, setLang] = useState<Language>('ar');
  const t = dictionary[lang];

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    }
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-600 text-lg">{lang === 'ar' ? 'جاري التحميل...' : 'በመጫን ላይ...'}</p>
      </div>
    );
  }

  const metadata = user?.user_metadata || {};

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* رأس الصفحة مع زر تبديل اللغة */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-blue-950">
              {t.welcome}, {metadata.full_name || (lang === 'ar' ? 'طالب القرآن' : 'ተማሪ')} 🌟
            </h1>
            <p className="text-slate-600 text-sm mt-1">{t.title}</p>
          </div>
          <div className="flex items-center gap-4">
            <Switch currentLang={lang} setLang={setLang} />
            <button
              onClick={handleLogout}
              className="bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold px-4 py-2 rounded-lg text-sm transition-colors border border-rose-200"
            >
              {t.logout}
            </button>
          </div>
        </div>

        {/* الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-2">
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">{t.currentProgram}</span>
            <h3 className="text-lg font-bold text-slate-900">{metadata.program_id || 'تلقين'}</h3>
            <p className="text-sm text-slate-500">{t.readingLevel}: {metadata.reading_level || 'مبتدئ'}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-2">
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{t.memorizationState}</span>
            <h3 className="text-lg font-bold text-slate-900">{metadata.memorization_state || '-'}</h3>
            <p className="text-sm text-slate-500">{t.memorizedParts}: {metadata.memorized_parts || 0}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-2">
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">{t.upcomingSessions}</span>
            <h3 className="text-lg font-bold text-slate-900">{t.noSessions}</h3>
          </div>
        </div>

        {/* حجز الجلسات */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <button 
            onClick={() => alert(lang === 'ar' ? 'قريباً نافذة الحجز!' : 'በቅርቡ ይመጣል!')}
            className="bg-blue-900 hover:bg-blue-800 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors shadow-sm"
          >
            📅 {t.bookSession}
          </button>
        </div>

      </div>
    </div>
  );
}
