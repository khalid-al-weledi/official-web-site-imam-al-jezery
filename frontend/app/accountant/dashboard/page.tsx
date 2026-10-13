'use client';

import { useState } from 'react';

// بيانات تجريبية لعرض طلبات الدفع المعلقة للمحاسب
const initialReceipts = [
  {
    id: 'pay-001',
    studentName: 'عبدالله أحمد إبراهيم',
    packageName: 'باقة 300 دقيقة (خصم 2%)',
    amount: 1470,
    receiptImage: '/uploads/receipt-sample-1.jpg',
    status: 'PENDING',
    createdAt: '2026-10-13 10:30',
  },
  {
    id: 'pay-002',
    studentName: 'محمد أمين محمد',
    packageName: 'باقة 100 دقيقة',
    amount: 500,
    receiptImage: '/uploads/receipt-sample-2.jpg',
    status: 'PENDING',
    createdAt: '2026-10-13 11:15',
  },
];

export default function AccountantDashboard() {
  const [receipts, setReceipts] = useState(initialReceipts);

  const handleApprove = (id: string) => {
    // محاكاة اعتماد الدفع وإضافة الدقائق للطالب عبر المعاملة الآمنة
    setReceipts(receipts.map(r => r.id === id ? { ...r, status: 'APPROVED' } : r));
    alert('تم اعتماد الدفع وإضافة الدقائق بنجاح وتحديث السجل المالي.');
  };

  const handleReject = (id: string) => {
    const reason = prompt('أدخل سبب رفض الإيصال:');
    if (reason) {
      setReceipts(receipts.map(r => r.id === id ? { ...r, status: 'REJECTED' } : r));
      alert('تم رفض الإيصال وإبلاغ الطالب بالسبب.');
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">لوحة تحكم المحاسب - مراجعة الإيصالات والمدفوعات</h1>
          <p className="text-slate-600 text-sm">مراجعة إيصالات باقات الدقائق واعتمادها بطريقة ذرية تمنع التكرار</p>
        </div>
        <div className="bg-blue-50 text-blue-900 px-4 py-2 rounded-xl font-semibold text-sm">
          العملة: بر إثيوبي (ETB)
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-200">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-blue-900">طلبات الدفع المعلقة بانتظار المراجعة</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 text-sm border-b">
                <th className="p-4">رقم العملية / التاريخ</th>
                <th className="p-4">اسم الطالب</th>
                <th className="p-4">الباقة المختارة</th>
                <th className="p-4">المبلغ (بر)</th>
                <th className="p-4">الإيصال</th>
                <th className="p-4">الحالة</th>
                <th className="p-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {receipts.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">
                    <div>{item.id}</div>
                    <div className="text-xs text-slate-500">{item.createdAt}</div>
                  </td>
                  <td className="p-4 text-slate-800 font-semibold">{item.studentName}</td>
                  <td className="p-4 text-slate-700">{item.packageName}</td>
                  <td className="p-4 text-blue-900 font-bold">{item.amount} بر</td>
                  <td className="p-4">
                    <span className="text-blue-600 hover:underline cursor-pointer text-xs font-semibold">
                      عرض الإيصال 📄
                    </span>
                  </td>
                  <td className="p-4">
                    {item.status === 'PENDING' && (
                      <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold">
                        قيد المراجعة
                      </span>
                    )}
                    {item.status === 'APPROVED' && (
                      <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
                        معتمد
                      </span>
                    )}
                    {item.status === 'REJECTED' && (
                      <span className="bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-xs font-semibold">
                        مرفوض
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center space-x-2 space-x-reverse">
                    {item.status === 'PENDING' ? (
                      <>
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors text-xs font-semibold"
                        >
                          اعتماد وإضافة الدقائق
                        </button>
                        <button
                          onClick={() => handleReject(item.id)}
                          className="bg-rose-600 text-white px-3 py-1.5 rounded-lg hover:bg-rose-700 transition-colors text-xs font-semibold"
                        >
                          رفض
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">تمت المعالجة</span>
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
