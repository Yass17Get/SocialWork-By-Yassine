import React from 'react';
import { useApp } from '../context/AppContext';
import { HeroSection } from '../components/HeroSection';
import { referenceChapters, interventionDomains } from '../data/referenceData';
import { 
  BookOpen, 
  Layers, 
  Scale, 
  PhoneCall, 
  FileText, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  ShieldAlert,
  GraduationCap,
  Users
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { 
    setCurrentPage, 
    articles, 
    navigateToArticle, 
    navigateToChapter, 
    authorProfile 
  } = useApp();

  return (
    <div className="space-y-16">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Hotlines & Emergency Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  دليل النجدة والخطوط الخضراء التونسية المباشرة
                </h3>
                <p className="text-xs text-stone-600">
                  للحالات الطارئة والتدخل الفوري؛ تقدم الحماية الفورية على أي إجراء إداري
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <a
                href="tel:1899"
                className="px-3 py-1.5 bg-white border border-stone-300 rounded text-stone-900 hover:border-amber-600 transition-colors flex items-center gap-1.5"
              >
                <span className="text-stone-500">المرأة ضحية عنف:</span>
                <span className="font-mono font-bold text-amber-900">1899</span>
              </a>

              <a
                href="tel:1809"
                className="px-3 py-1.5 bg-white border border-stone-300 rounded text-stone-900 hover:border-amber-600 transition-colors flex items-center gap-1.5"
              >
                <span className="text-stone-500">حماية الطفولة والمسنين:</span>
                <span className="font-mono font-bold text-amber-900">1809</span>
              </a>

              <a
                href="tel:190"
                className="px-3 py-1.5 bg-white border border-stone-300 rounded text-stone-900 hover:border-amber-600 transition-colors flex items-center gap-1.5"
              >
                <span className="text-stone-500">الإسعاف الطبي:</span>
                <span className="font-mono font-bold text-stone-900">190</span>
              </a>

              <button
                onClick={() => setCurrentPage('referral')}
                className="px-3 py-1.5 bg-amber-800 hover:bg-amber-900 text-white font-medium rounded transition-colors inline-flex items-center gap-1"
              >
                <span>خريطة الإحالة الكاملة</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Core Reference Work: 9 Chapters Interactive Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="text-xs text-stone-500 font-medium mb-1">
              المرجع الوطني المتكامل · تأليف ياسين بن عبد السلام
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
              أبواب الدليل المرجعي للأخصائي الاجتماعي بتونس
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('reference')}
            className="text-xs font-semibold text-stone-900 hover:text-amber-800 inline-flex items-center gap-1 self-start md:self-auto"
          >
            <span>عرض فهرس الدليل كاملاً وقراءته</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {referenceChapters.slice(1, 10).map((ch) => (
            <div
              key={ch.id}
              onClick={() => navigateToChapter(ch.id)}
              className="group cursor-pointer bg-white border border-stone-200 hover:border-stone-400 rounded-lg p-5 transition-all shadow-2xs hover:shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="text-xs font-mono text-amber-800 font-semibold">
                  {ch.number}
                </div>
                <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                  {ch.title}
                </h3>
                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {ch.sections[0]?.content || ''}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>{ch.sections.length} أقسام ومحاور</span>
                <span className="inline-flex items-center gap-1 font-medium text-stone-800 group-hover:translate-x-[-2px] transition-transform">
                  قراءة الباب
                  <ArrowLeft className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. The 15 Intervention Domains Quick Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="text-xs text-stone-500 font-medium mb-1">
              الباب السادس من المرجع · بطاقات التدخل الميداني
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
              مجالات التدخل المهني الـ 15
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('domains')}
            className="text-xs font-semibold text-stone-900 hover:text-amber-800 inline-flex items-center gap-1 self-start md:self-auto"
          >
            <span>استعراض البطاقات الـ 15 كاملة</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {interventionDomains.slice(0, 6).map((dom) => (
            <div
              key={dom.id}
              onClick={() => setCurrentPage('domains')}
              className="cursor-pointer bg-white border border-stone-200 hover:border-stone-400 rounded-lg p-5 transition-all shadow-2xs hover:shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="font-mono text-stone-400">المجال #{dom.id}</span>
                <span className="text-stone-700 font-medium">{dom.categoryLabel}</span>
              </div>
              <h3 className="text-base font-bold text-stone-900">
                {dom.title}
              </h3>
              <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                {dom.targetPopulations}
              </p>
              <div className="pt-2 text-xs text-amber-800 font-medium flex items-center gap-1">
                <span>تصفح الإطار القانوني والشركاء</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Golden Rule Highlight & Practical Methodology */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-stone-100 rounded-xl p-8 lg:p-10 shadow-sm relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>القاعدة الذهبية في تحرير التقرير الاجتماعي</span>
            </div>
            <blockquote className="text-xl sm:text-2xl font-serif-ar leading-relaxed text-amber-100">
              «يُفرَّق في التقرير الاجتماعي بين ما عاينه الأخصائي بنفسه، وما نقله عنه الغير، وما استنتجه هو. وبهذا الفصل يحفظ التقرير مصداقيته ويحمي صاحبه ويحمي المعني به.»
            </blockquote>
            <p className="text-xs text-stone-300 leading-relaxed max-w-2xl">
              تعتمد الإدارة والقضاء التونسي (قاضي الأسرة، قاضي الأطفال، النيابة العمومية) على التقارير الاجتماعية كأساس موضوعي لاتخاذ القرارات الحمائية والتدابير الإدماجية؛ لذا صممنا أداة تفاعلية لتوليد هيكل التقرير الاجتماعي وفق هذه الضوابط الدقيقة.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => setCurrentPage('tools')}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded transition-colors"
              >
                تجربة مولد التقرير الاجتماعي
              </button>
              <button
                onClick={() => setCurrentPage('laws')}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs rounded transition-colors"
              >
                مراجعة الفصل 254 (السر المهني)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Scientific Research & Publications Portal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="text-xs text-stone-500 font-medium mb-1">
              الإنتاج العلمي والأكاديمي · علم الاجتماع والديموغرافيا
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
              أحدث الدراسات والأوراق البحثية
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('articles')}
            className="text-xs font-semibold text-stone-900 hover:text-amber-800 inline-flex items-center gap-1 self-start md:self-auto"
          >
            <span>جميع الأبحاث والمقالات</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.slice(0, 2).map((art) => (
            <article
              key={art.id}
              onClick={() => navigateToArticle(art)}
              className="cursor-pointer group bg-white border border-stone-200 hover:border-stone-400 rounded-xl overflow-hidden transition-all shadow-2xs hover:shadow-sm flex flex-col"
            >
              {art.featuredImage && (
                <div className="h-52 overflow-hidden bg-stone-100">
                  <img
                    src={art.featuredImage}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Unboxed metadata with typographic separator */}
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span className="font-semibold text-stone-700">{art.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{art.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-amber-900 transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500">بقلم: {art.author}</span>
                  <span className="font-semibold text-stone-900 group-hover:text-amber-800 inline-flex items-center gap-1">
                    قراءة المقال كاملاً
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. Author Bio Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F7F4EE] border border-stone-200 rounded-xl p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                عن الباحث والمؤلف
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
                {authorProfile.name}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-stone-700">
                {authorProfile.currentRole} — {authorProfile.institution}
              </p>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                باحث وممارس ميداني يجمع بين الخبرة الإكلينيكية داخل مؤسسات رعاية المسنين التونسية والتحليل السوسيولوجي والديموغرافي للسياسات العمومية. مؤلف الدليل المرجعي للأخصائي الاجتماعي بتونس، وناشط في إثراء البحث العلمي حول قضايا التحول الأسري والشيخوخة والحماية الاجتماعية.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs text-stone-700">
                <button
                  onClick={() => setCurrentPage('author')}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-medium rounded transition-colors inline-flex items-center gap-1.5"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>السيرة العلمية وحسابات الباحث</span>
                </button>
                <button
                  onClick={() => setCurrentPage('cms')}
                  className="px-4 py-2 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 font-medium rounded transition-colors"
                >
                  نظام إدارة المحتوى (CMS)
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-xs bg-white border border-stone-200 rounded-xl p-5 shadow-2xs space-y-3 text-xs">
                <div className="font-bold text-stone-900 border-b border-stone-100 pb-2">
                  المجالات البحثية الأساسية
                </div>
                <ul className="space-y-2 text-stone-600">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-800 font-bold">•</span>
                    <span>سوسيولوجيا الشيخوخة والرعاية المؤسسية</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-800 font-bold">•</span>
                    <span>الانتقال الديموغرافي في تونس والمغرب العربي</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-800 font-bold">•</span>
                    <span>أخلاقيات السر المهني وحقوق الإنسان</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-800 font-bold">•</span>
                    <span>برنامج الأمان الاجتماعي والفقر متعدد الأبعاد</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
