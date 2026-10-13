'use client';

import { useState } from 'formreact' // استخدمنا مكتبة React القياسية
import React, { useState } from 'react';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    country: '',
    city: '',
    phone: '',
    previousSchool: '',
    previousTeacher: '',
    programId: 'تلقين',
    readingLevel: 'مبتدئ',
    canReadQuran: 'no',
    memorizationState: 'لم يحفظ',
    memorizedParts: 0,
    hasPreviousIjazah: false,
    ijazahDetails: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تم إرسال طلب التسجيل بنجاح! سيتم مراجعته من قبل الإدارة.');
    // هنا يتم ربط البيانات لاحقاً مع نقطة النهاية (API) في الخادم الخلفي
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-blue-100 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-blue-950">استمارة التسجيل في مقرأة الإمام الجزري</h1>
        <p className="text-slate-600 text-sm">أدخل بياناتك بدقة للإنضمام إلى برامج الإقراء والإجازة بالسند</p>
        <div className="flex justify-center gap-2 pt-2">
          <span className={`h-2 w-16 rounded-full ${step >= 1 ? 'bg-amber-500' : 'bg-slate-200'}`}></span>
          <span className={`h-2 w-16 rounded-full ${step >= 2 ? 'bg-amber-500' : 'bg-slate-200'}`}></span>
          <span className={`h-2 w-16 rounded-full ${step >= 3 ? 'bg-amber-500' : 'bg-slate-200'}`}></span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* الخطوة الأولى: البيانات الشخصية */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-900 border-b pb-2">1. البيانات الشخصية والأساسية</h2>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">الاسم الكامل</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none"
                placeholder="أدخل اسمك الكامل"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">العمر</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">رقم الهاتف (مع الرمز الدولي)</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">الدولة</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">المدينة</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue-900 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
              >
                التالي
              </button>
            </div>
          </div>
        )}

        {/* الخطوة الثانية: المستوى التعليمي والبرنامج */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-900 border-b pb-2">2. المستوى الأكاديمي والبرنامج المطلوب</h2>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">البرنامج المطلوب</label>
              <select
                name="programId"
                value={formData.programId}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none"
              >
                <option value="تلقين">برنامج التلقين وتصحيح الأداء</option>
                <option value="حفظ">برنامج الحفظ المكثف</option>
                <option value="حفص">الاستعداد للإجازة برواية حفص عن عاصم</option>
                <option value="سبع">برنامج القراءات السبع</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">مستوى القراءة الحالي</label>
              <select
                name="readingLevel"
                value={formData.readingLevel}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none"
              >
                <option value="مبتدئ">مبتدئ</option>
                <option value="متوسط">متوسط</option>
                <option value="جيد جدا">جيد جداً</option>
                <option value="متقدم">متقدم</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">هل أتممت قراءة القرآن كاملًا نظرًا من المصحف؟</label>
              <select
                name="canReadQuran"
                value={formData.canReadQuran}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none"
              >
                <option value="yes">نعم</option>
                <option value="no">لا</option>
