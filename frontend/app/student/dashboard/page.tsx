'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function StudentDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // إذا لم يكن المستخدم مسجل الدخول، يتم توجيهه لصفحة الدخول
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
        <p className="text-slate-600 text-lg">جاري تحميل لوحة التحكم...</p>
      </div>
    );
  }

  const metadata = user?.user_metadata || {};

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* رأس الصفحة / الترحيب */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-blue-950">
              أهلاً بك، {metadata.full_name || 'طالب القرآن'} 🌟
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              مقرأة الإمام الجزري للإقراء والإجازة بالسند — لوحة تحكم الطالب
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold px-4 py-2 rounded-lg text-sm transition-colors border border-rose-200"
          >
            تسجيل الخروج
          </button>
        </div>

        {/* إحصائيات سريعة أو تفاصيل البرنامج */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-2">
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">البرنامج الحالي</span>
            <h3 className="text-lg font-bold text-slate-900">{metadata.program_id || 'برنامج التلقين'}</h3>
            <p className="text-sm text-slate-500">مستوى القراءة: {metadata.reading_level || 'مبتدئ'}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-2">
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">حالة الحفظ</span>
            <h3 className="text-lg font-bold text-slate-900">{metadata.memorization_state || 'لم يحفظ'}</h3>
            <p className="text-sm text-slate-500">الأجزاء المحفوظة: {metadata.memorized_parts || 0} أجزاء</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-2">
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">الجلسات القادمة</span>
            <h3 className="text-lg font-bold text-slate-900">لا توجد جلسات محجوزة</h3>
            <p className="text-sm text-slate-500">احجز جلستك الأولى مع المعلم الآن</p>
          </div>
        </div>

        {/* حجز الجلسات أو الروابط السريعة */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <h2 className="text-xl font-bold text-blue-950 border-b pb-3">إدارة الإقراء وجلسات السماع</h2>
          <p className="text-slate-600 text-sm">
            يمكنك التواصل مع المعلمين المختصين وبدء جلسات التلقين وتصحيح التلاوة وفق الأوقات المتاحة.
          </p>
          <div className="flex gap-4 pt-2">
            <button 
              onClick={() => alert('قريباً: نافذة حجز جلسة جديدة مع المعلم!')}
              className="bg-blue-900 hover:bg-blue-800 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors shadow-sm"
            >
              📅 حجز جلسة إقراء جديدة
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
