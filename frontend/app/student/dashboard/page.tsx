'use client';

import { useState } from 'react';

export default function StudentDashboard() {
  // بيانات تجريبية لحساب الطالب الرصيد والجلسات
  const [studentData, setStudentData] = useState({
    name: 'عبدالله أحمد إبراهيم',
    remainingMinutes: 180,
    activePackage: 'باقة 300 دقيقة',
    membershipStatus: 'نشط ومنتظم',
  });

  const sessionsHistory = [
    { id: 's-1', teacher: 'الشيخ إبراهيم محمد', date: '2026-10-10', duration: 30, status: 'مكتملة' },
    { id: 's-2', teacher: 'الشيخ محمد الأمين', date: '2026-10-07', duration: 45, status: 'مكتملة' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* رأس لوحة الطالب */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-950 text-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-6 border border-amber-500/30">
        <div className="space-y-2 text-center md:text-right">
          <h1 className="text-3xl font-bold text-amber-400">أهلاً بك، {studentData.name}</h1>
          <p className="text-slate-200 text-sm">تابع رصيد دقائقك، جدول جلساتك، واشحن باقتك بكل سهولة</p>
        </div>
        <div className="bg-amber-500 text-blue-950 px-6 py-4 rounded-xl shadow-md text-center">
          <div className="text-xs font-semibold">الرصيد المتبقي</div>
          <div className="text-3xl font-extrabold">{studentData.remainingMinutes} دقيقة</div>
        </div>
      </div>

      {/* معلومات الباقة والحساب */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 space-y-2">
          <h3 className="text-sm font-medium text-slate-500">الباقة الحالية</h3>
          <p className="text-xl font-bold text-blue-900">{studentData.activePackage}</p>
          <a href="/register" className="inline-block text-xs text-amber-600 font-semibold hover:underline pt-2">
            ترقية أو شحن باقة جديدة ⚡
          </a>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 space-y-2">
          <h3 className="text-sm font-medium text-slate-500">حالة الحساب</h3>
          <p className="text-xl font-bold text-emerald-600">{studentData.membershipStatus}</p>
          <span className="inline-block text-xs text-slate-400 pt-2">حساب مؤهل للإقراء والإجازة</span>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 space-y-2">
          <h3 className="text-sm font-medium text-slate-500">حجز جلسة جديدة</h3>
          <p className="text-xl font-bold text-blue-950">اختر المعلم والموعد</p>
          <button 
            onClick={() => alert('سيتم توجيهك لصفحة اختيار الموعد المتاحة مع المعلمين.')}
            className="mt-2 bg-blue-900 text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-800 transition-colors"
          >
            احجز الآن 📅
          </button>
        </div>
      </div>

      {/* جدول الجلسات السابقة */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-200">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-blue-900">سجل الجلسات القرآنية السابقة</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 text-sm border-b">
                <th className="p-4">رقم الجلسة</th>
                <th className="p-4">المعلم المقرئ</th>
                <th className="p-4">التاريخ</th>
                <th className="p-4">المدة المستهلكة</th>
                <th className="p-4">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {sessionsHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">{item.id}</td>
                  <td className="p-4 text-slate-800 font-semibold">{item.teacher}</td>
                  <td className="p-4 text-slate-700">{item.date}</td>
                  <td className="p-4 text-blue-900 font-medium">{item.duration} دقيقة</td>
                  <td className="p-4">
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
