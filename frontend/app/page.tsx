export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* القسم الرئيسي (Hero Section) */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-950 text-white py-16 px-6 rounded-2xl shadow-xl text-center space-y-6 border border-amber-500/30">
        <h1 className="text-4xl md:text-5xl font-extrabold text-amber-400">
          مقرأة الإمام الجزري للإقراء والإجازة بالسند
        </h1>
        <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
          منصة رقمية متكاملة لتعليم القرآن الكريم، الإقراء، تصحيح التلاوة، والحفظ، وإصدار الإجازات بالسند المتصل إلى رسول الله صلى الله عليه وسلم.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <a
            href="/register"
            className="bg-amber-500 text-blue-950 font-bold px-8 py-3 rounded-xl hover:bg-amber-400 transition-all shadow-lg"
          >
            سجل الآن في المقرأة
          </a>
          <a
            href="#programs"
            className="border-2 border-amber-400 text-amber-400 font-semibold px-6 py-3 rounded-xl hover:bg-amber-400/10 transition-all"
          >
            استعرض البرامج
          </a>
        </div>
      </section>

      {/* البرامج الأساسية للمقرأة */}
      <section id="programs" className="space-y-6">
        <h2 className="text-3xl font-bold text-blue-950 text-center">
          برامجنا التعليمية المتخصصة
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* برنامج 1 */}
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-amber-500 space-y-3">
            <h3 className="text-xl font-bold text-blue-900">برنامج التلقين وتصحيح الأداء</h3>
            <p className="text-slate-600 text-sm">
              لجميع المستويات لتحسين النطق ومخارج الحروف والصفات وأحكام التجويد بدقة متناهية.
            </p>
          </div>
          {/* برنامج 2 */}
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-amber-500 space-y-3">
            <h3 className="text-xl font-bold text-blue-900">برنامج الحفظ المكثف</h3>
            <p className="text-slate-600 text-sm">
              الحفظ الجديد، ربط المحفوظ السابق، المراجعة الدورية، والاختبارات المنتظمة.
            </p>
          </div>
          {/* برنامج 3 */}
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-amber-500 space-y-3">
            <h3 className="text-xl font-bold text-blue-900">الاستعداد للإجازة برواية حفص</h3>
            <p className="text-slate-600 text-sm">
              ضبط الرواية، مراجعة الأصول، التلاوة على المقرئ المجيز، وتقييم الاستعداد الكامل.
            </p>
          </div>
          {/* برنامج 4 */}
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-amber-500 space-y-3">
            <h3 className="text-xl font-bold text-blue-900">برنامج القراءات السبع</h3>
            <p className="text-slate-600 text-sm">
              دراسة الأصول والفرش والتطبيق العملي والإقراء الفردي أو الجمع بحسب الخطة.
            </p>
          </div>
        </div>
      </section>

      {/* نبذة عن نظام الباقات والدقائق */}
      <section className="bg-blue-50 border border-blue-200 p-8 rounded-2xl text-center space-y-4">
        <h2 className="text-2xl font-bold text-blue-950">نظام مرن يعتمد على الدقائق وباقات مميزة</h2>
        <p className="text-slate-700 max-w-2xl mx-auto">
          اختر الباقة المناسبة لدقائق القراءة الخاصة بك، واستفد من الخصومات التصاعدية والرصيد الترحيبي للطلاب الجدد المؤهلين.
        </p>
        <div className="pt-2">
          <a
            href="/register"
            className="inline-block bg-blue-900 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-800 transition-colors"
          >
            ابدأ رحلتك القرآنية اليوم
          </a>
        </div>
      </section>
    </div>
  );
}
