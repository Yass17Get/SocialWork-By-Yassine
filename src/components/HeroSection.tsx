import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, BookOpen, Layers, ArrowLeft, PhoneCall, ShieldCheck } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setCurrentPage, setGlobalSearch } = useApp();
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setGlobalSearch(searchInput.trim());
    setCurrentPage('domains');
  };

  return (
    <section className="relative border-b border-stone-200 bg-[#F7F4EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* 2-Column Split: Text Narrative & Scholarly Visual Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left / Main text column (Arabic RTL: starts from right) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Unboxed Metadata Kicker (Anti-slop: NO pills, clean typography) */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600">
              <span className="font-semibold text-amber-800">الجمهورية التونسية</span>
              <span aria-hidden="true">·</span>
              <span>الخدمة الاجتماعية</span>
              <span aria-hidden="true">·</span>
              <span>علم الاجتماع والديموغرافيا</span>
              <span aria-hidden="true">·</span>
              <span>إصدار أكتوبر 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-[1.25] text-balance">
              منصة الأخصائي الاجتماعي والعلوم الاجتماعية بتونس
            </h1>

            {/* Subtitle / Decker */}
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-normal max-w-2xl">
              بوابة علمية ومرجعية متكاملة من إعداد ومراجعة وتأليف 
              <strong className="text-stone-900 font-semibold mx-1">ياسين بن عبد السلام</strong>، 
              أخصائي اجتماعي بمؤسسة حكومية لرعاية كبار السن وباحث في علم الاجتماع والديموغرافيا. تجمع بين صرامة التأصيل التشريعي التونسي وعمق الممارسة الميدانية ونشر الإنتاج العلمي.
            </p>

            {/* Quick Unified Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-xl pt-2">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="ابحث في مجالات التدخل، النصوص القانونية، المصطلحات، أو الأبحاث..."
                  className="w-full bg-white border border-stone-300 rounded-lg pl-28 pr-11 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-stone-900 shadow-sm"
                />
                <Search className="w-5 h-5 text-stone-400 absolute right-3.5 pointer-events-none" />
                <button
                  type="submit"
                  className="absolute left-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-md transition-colors whitespace-nowrap"
                >
                  بحث شامل
                </button>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-stone-500 mt-2 pr-1">
                <span className="text-stone-600 font-medium">عمليات بحث شائعة:</span>
                <button
                  type="button"
                  onClick={() => { setSearchInput('الأمان الاجتماعي'); setGlobalSearch('الأمان الاجتماعي'); setCurrentPage('domains'); }}
                  className="hover:text-stone-900 underline"
                >
                  الأمان الاجتماعي
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => { setSearchInput('كبار السن'); setGlobalSearch('كبار السن'); setCurrentPage('domains'); }}
                  className="hover:text-stone-900 underline"
                >
                  رعاية المسنين
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => { setSearchInput('حماية الطفل'); setGlobalSearch('حماية الطفل'); setCurrentPage('domains'); }}
                  className="hover:text-stone-900 underline"
                >
                  مجلة حماية الطفل
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => { setSearchInput('السر المهني'); setGlobalSearch('السر المهني'); setCurrentPage('laws'); }}
                  className="hover:text-stone-900 underline"
                >
                  السر المهني
                </button>
              </div>
            </form>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setCurrentPage('reference')}
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors inline-flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>تصفح الدليل المرجعي (9 أبواب)</span>
              </button>

              <button
                onClick={() => setCurrentPage('domains')}
                className="px-5 py-2.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-sm font-semibold rounded-lg shadow-sm transition-colors inline-flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-amber-700" />
                <span>مجالات التدخل الـ 15</span>
              </button>

              <button
                onClick={() => setCurrentPage('referral')}
                className="px-4 py-2.5 text-stone-700 hover:text-stone-950 text-sm font-medium transition-colors inline-flex items-center gap-1.5"
              >
                <PhoneCall className="w-4 h-4 text-emerald-700" />
                <span>خريطة الإحالة والنجدة</span>
                <ArrowLeft className="w-4 h-4 mr-0.5" />
              </button>
            </div>
          </div>

          {/* Right column: High-Fidelity Imagery Frame */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-xl overflow-hidden border border-stone-300 shadow-sm bg-stone-200">
              <img
                src="/src/assets/images/hero_social_research_1792094339503.jpg"
                alt="المكتبة البحثية والدليل المرجعي للأخصائي الاجتماعي في تونس"
                className="w-full h-72 sm:h-80 lg:h-full object-cover min-h-[340px]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold mb-1">
                  المرجع الوطني الشامل
                </span>
                <p className="text-sm font-semibold leading-snug">
                  الأخصائي الاجتماعي في تونس: المهنة والإطار القانوني ومجالات التدخل
                </p>
                <p className="text-xs text-stone-300 mt-1">
                  ماهية المهنة وكيفية ممارستها · الأساس القانوني والتنظيمي · مسارات الإحالة
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Operational 4-Column KPI / Benchmark Strip (Below Hero Split) */}
        <div className="mt-12 pt-8 border-t border-stone-300 grid grid-cols-2 sm:grid-cols-4 gap-6 text-stone-900">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-stone-950">
              15
            </div>
            <div className="text-xs text-stone-600 font-medium">
              مجال تدخل مهني وقانوني محدد
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-stone-950">
              20+
            </div>
            <div className="text-xs text-stone-600 font-medium">
              نصاً تشريعياً وأمراً حكومياً مؤطراً
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-stone-950">
              13
            </div>
            <div className="text-xs text-stone-600 font-medium">
              دوراً ومهمة محورية موحدة للمهنة
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-stone-950">
              07
            </div>
            <div className="text-xs text-stone-600 font-medium">
              مراحل ممنهجة للتدخل مع الحالة
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
