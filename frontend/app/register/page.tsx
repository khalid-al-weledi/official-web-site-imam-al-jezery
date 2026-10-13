'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      // 1. إنشاء الحساب في Supabase Auth وحفظ البيانات الإضافية في بيانات المستخدم (User Metadata)
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            role: 'student',
            age: formData.age,
            country: formData.country,
            city: formData.city,
            phone: formData.phone,
            program_id: formData.programId,
            reading_level: formData.readingLevel,
            can_read_quran: formData.canReadQuran,
            memorization_state: formData.memorizationState,
            memorized_parts: formData.memorizedParts,
            has_previous_ijazah: formData.hasPreviousIjazah,
            ijazah_details: formData.ijazahDetails,
          },
        },
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      setSuccessMsg('تم إرسال طلب التسجيل بنجاح! يرجى التحقق من بريدك الإلكتروني لتفعيل الحساب.');
      setTimeout(() => {
        router.push('/login');
      }, 3500);
    } catch (err: any) {
      setErrorMsg('حدث خطأ غير متوقع أثناء إرسال التسجيل.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-xl border border-blue-100 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-blue-950">استمارة التسجيل في مقرأة الإمام الجزري</h1>
          <p className="text-slate-600 text-sm">أدخل بياناتك بدقة للانضمام إلى برامج الإقراء والإجازة بالسند</p>
          <div className="flex justify-center gap-2 pt-2">
            <span className={`h-2 w-16 rounded-full ${step >= 1 ? 'bg-amber-500' : 'bg-slate-200'}`}></span>
            <span className={`h-2 w-16 rounded-full ${step >= 2 ? 'bg-amber-500' : 'bg-slate-200'}`}></span>
            <span className={`h-2 w-16 rounded-full ${step >= 3 ? 'bg-amber-500' : 'bg-slate-200'}`}></span>
          </div>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 text-rose-700 p-3 rounded-lg text-sm border border-rose-200 text-center">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-50 text-emerald-700 p-3 rounded-lg text-sm border border-emerald-200 text-center">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* الخطوة الأولى: البيانات الشخصية وحساب الدخول */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-blue-900 border-b pb-2">1. بيانات الحساب والبيانات الشخصية</h2>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">الاسم الكامل</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-slate-900"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">البريد الإلكتروني</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-slate-900"
                    placeholder="name@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">كلمة المرور</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-slate-900"
                    placeholder="••••••••"
                  />
                </div>
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
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-slate-900"
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
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-slate-900"
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
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-slate-900"
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
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-slate-900"
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
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-slate-900 bg-white"
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
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-slate-900 bg-white"
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
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-slate-900 bg-white"
                >
                  <option value="yes">نعم</option>
                  <option value="no">لا</option>
                </select>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-slate-200 text-slate-700 font-semibold px-6 py-2 rounded-lg hover:bg-slate-300 transition-colors"
                >
                  السابق
                </button>
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

          {/* الخطوة الثالثة: الحفظ والإجازات */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-blue-900 border-b pb-2">3. الحفظ المسبق والإجازات</h2>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">حالة الحفظ</label>
                <select
                  name="memorizationState"
                  value={formData.memorizationState}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-slate-900 bg-white"
                >
                  <option value="لم يحفظ">لم يحفظ القرآن الكريم</option>
                  <option value="يحفظ أجزاء">يحفظ أجزاء متفرقة</option>
                  <option value="خاتم">خاتم للقرآن الكريم</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">عدد الأجزاء المحفوظة</label>
                <input
                  type="number"
                  name="memorizedParts"
                  value={formData.memorizedParts}
                  onChange={handleChange}
                  min={0}
                  max={30}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-slate-900"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  name="hasPreviousIjazah"
                  checked={formData.hasPreviousIjazah}
                  onChange={handleChange}
                  id="hasPreviousIjazah"
                  className="w-4 h-4 text-blue-900 border-slate-300 rounded focus:ring-blue-900"
                />
                <label htmlFor="hasPreviousIjazah" className="text-sm font-medium text-slate-700">
                  هل لديك إجازات سابقة في القرآن؟
                </label>
              </div>

              {formData.hasPreviousIjazah && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">تفاصيل الإجازات السابقة</label>
                  <textarea
                    name="ijazahDetails"
                    value={formData.ijazahDetails}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-slate-900"
                    placeholder="اذكر الرواية واسم الشيخ والسنة..."
                  ></textarea>
                </div>
              )}

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-slate-200 text-slate-700 font-semibold px-6 py-2 rounded-lg hover:bg-slate-300 transition-colors"
                >
                  السابق
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-emerald-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'جاري إرسال الطلب...' : 'إرسال طلب التسجيل 🚀'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
