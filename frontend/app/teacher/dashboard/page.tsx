'use client';

import { useState } from 'react';

// بيانات تجريبية لجلسات المعلم الحالية
const initialSessions = [
  {
    id: 'ses-101',
    studentName: 'عبدالله أحمد إبراهيم',
    program: 'رواية حفص عن عاصم',
    scheduledTime: 'اليوم - 04:00 مساءً',
    status: 'SCHEDULED', // SCHEDULED, COMPLETED, CANCELLED
    durationMinutes: 30,
  },
  {
    id: 'ses-102',
    studentName: 'محمد أمين محمد',
    program: 'تسيير وتصحيح التلاوة',
    scheduledTime: 'اليوم - 05:30 مساءً',
    status: 'SCHEDULED',
    durationMinutes: 45,
  },
];

export default function TeacherDashboard() {
  const [sessions, setSessions] = useState(initialSessions);

  const handleCompleteSession = (id: string) => {
    setSessions(sessions.map(s => s.id === id ? { ...s, status: 'COMPLETED' } : s));
    alert('تم إنهاء الجلسة واحتساب الدقائق وخصمها من رصيد الطالب بنجاح!');
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* رأس الصفحة */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">لوحة تحكم المعلم - إدارة الجلسات القرآنية</h1>
          <p className="text-slate-600 text-sm">متابعة الطلاب، جدول الجلسات اليومية، وتقييم الأداء والتلاوة</p>
        </div>
        <div className="bg-emerald-50 text-emerald-800 px-4 py-2 rounded-xl font-semibold text-sm border border-emerald-200">
          الحالة: متاح للإقراء 🟢
        </div>
      </div>

      {/* جدول الجلسات القادمة */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-200">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-blue-900">جدول الجلسات القرآنية القادمة</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 text-sm border-b">
                <th className="p-4">رقم الجلسة</th>
                <th className="p-4">اسم الطالب</th>
                <th className="p-4">البرنامج / المنهج</th>
                <th className="p-4">الموعد المحدد</th>
                <th className="p-4">المدة المخططة</th>
                <th className="p-4">الحالة</th>
                <th className="p-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {sessions.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">{item.id}</td>
                  <td className="p-4 text-slate-800 font-semibold">{item.studentName}</td>
                  <td className="p-4 text-slate-700">{item.program}</td>
                  <td className="p-4 text-blue-900 font-medium">{item.scheduledTime}</td>
                  <td className="p-4 text-slate-700">{item.durationMinutes} دقيقة</td>
                  <td className="p-4">
                    {item.status === 'SCHEDULED' && (
                      <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold">
                        مجدولة
                      </span>
                    )}
                    {item.status === 'COMPLETED' && (
                      <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
                        مكتملة
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {item.status === 'SCHEDULED' ? (
                      <button
                        onClick={() => handleCompleteSession(item.id)}
                        className="bg-blue-900 text-white px-4 py-1.5 rounded-lg hover:bg-blue-800 transition-colors text-xs font-semibold shadow-sm"
                      >
                        بدء الجلسة وإنهاؤها
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">تمت بنجاح</span>
                    )}
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
