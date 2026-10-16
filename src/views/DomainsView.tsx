import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { interventionDomains } from '../data/referenceData';
import { InterventionDomain } from '../types';
import { 
  Search, 
  Layers, 
  FileText, 
  Users, 
  Scale, 
  Building2, 
  Printer, 
  X, 
  ArrowLeft,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';

export const DomainsView: React.FC = () => {
  const { selectedDomain, setSelectedDomain, globalSearch, setGlobalSearch } = useApp();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState(globalSearch || '');
  const [activeModalDomain, setActiveModalDomain] = useState<InterventionDomain | null>(selectedDomain);

  const categories = [
    { id: 'all', label: 'جميع المجالات الـ 15' },
    { id: 'protection', label: 'الحماية والنهوض الاجتماعي' },
    { id: 'family', label: 'الأسرة والطفولة' },
    { id: 'elderly', label: 'كبار السن والمسنين' },
    { id: 'vulnerable', label: 'الإعاقة والفئات الهشة' },
    { id: 'health', label: 'الصحة والإدمان' },
    { id: 'justice', label: 'العدالة والشغل' },
    { id: 'development', label: 'التنمية والمجتمع' },
    { id: 'research', label: 'البحث والتكوين' }
  ];

  const filteredDomains = interventionDomains.filter(dom => {
    const matchesCat = filterCategory === 'all' || dom.category === filterCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery = !query || 
      dom.title.toLowerCase().includes(query) ||
      dom.targetPopulations.toLowerCase().includes(query) ||
      dom.legalFramework.some(l => l.toLowerCase().includes(query)) ||
      dom.interventions.some(i => i.toLowerCase().includes(query));
    return matchesCat && matchesQuery;
  });

  const handleOpenModal = (dom: InterventionDomain) => {
    setActiveModalDomain(dom);
  };

  const handlePrintModal = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs text-stone-500 font-medium mb-1">
            الباب السادس من الدليل المرجعي · خمسة عشر مجالاً تخصصياً
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
            بطاقات مجالات تدخل الأخصائي الاجتماعي بتونس
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            دليل ميداني وتشريعي تفصيلي يحدد الفئات والوضعيات، السند القانوني، أوجه التدخل السبعة، وشبكة الشركاء
          </p>
        </div>

        <div className="text-xs font-mono text-stone-600 bg-stone-100 px-3 py-2 rounded-lg border border-stone-200 self-start md:self-auto">
          عرض {filteredDomains.length} من أصل 15 مجالاً
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="space-y-4 no-print">
        {/* Search input */}
        <div className="relative max-w-xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setGlobalSearch(e.target.value);
            }}
            placeholder="ابحث في أسماء المجالات، الفئات المستهدفة، القوانين أو مهام التدخل..."
            className="w-full bg-white border border-stone-300 rounded-lg pl-10 pr-10 py-2.5 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 shadow-2xs"
          />
          <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5" />
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(''); setGlobalSearch(''); }}
              className="absolute left-3 top-3 text-stone-400 hover:text-stone-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Functional filter tabs (allowed segmented controls with working click handlers) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-lg border border-stone-200">
          {categories.map((cat) => {
            const isActive = filterCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDomains.map((dom) => (
          <div
            key={dom.id}
            onClick={() => handleOpenModal(dom)}
            className="cursor-pointer group bg-white border border-stone-200 hover:border-stone-400 rounded-xl p-6 transition-all shadow-2xs hover:shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="font-mono font-semibold text-amber-800">بطاقة #{dom.id}</span>
                <span className="text-stone-600">{dom.categoryLabel}</span>
              </div>

              <h2 className="text-lg font-bold text-stone-900 group-hover:text-amber-900 transition-colors leading-snug">
                {dom.title}
              </h2>

              <div className="space-y-1.5 pt-1">
                <div className="text-xs text-stone-500 font-semibold">الفئات والوضعيات:</div>
                <p className="text-xs text-stone-700 line-clamp-2 leading-relaxed">
                  {dom.targetPopulations}
                </p>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="text-xs text-stone-500 font-semibold">المرجع التشريعي الأساسي:</div>
                <p className="text-xs text-stone-600 line-clamp-1 font-mono">
                  {dom.legalFramework[0]}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500">{dom.interventions.length} محاور تدخل</span>
              <span className="text-stone-900 group-hover:text-amber-800 font-semibold inline-flex items-center gap-1">
                فتح بطاقة التدخل
                <ArrowLeft className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredDomains.length === 0 && (
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-12 text-center text-stone-500 space-y-2">
          <p className="text-sm font-semibold">لا توجد نتائج مطابقة لبحثك</p>
          <p className="text-xs">جرّب كلمات بحث أخرى أو قم بإلغاء تصنيف الفئات</p>
          <button
            onClick={() => { setSearchQuery(''); setFilterCategory('all'); }}
            className="mt-3 px-3 py-1.5 bg-stone-900 text-white text-xs rounded hover:bg-stone-800 transition-colors"
          >
            إعادة تعيين البحث
          </button>
        </div>
      )}

      {/* Modal / Detailed Card Drawer View */}
      {activeModalDomain && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 no-print">
          <div className="bg-white rounded-xl border border-stone-300 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl flex flex-col">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-stone-200 p-6 flex items-start justify-between gap-4 z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span className="font-mono text-amber-800 font-bold">المجال #{activeModalDomain.id}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeModalDomain.categoryLabel}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                  {activeModalDomain.title}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintModal}
                  className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded"
                  title="طباعة البطاقة كوثيقة عمل"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveModalDomain(null)}
                  className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-8 text-sm">
              
              {/* Target Populations */}
              <div className="space-y-2">
                <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-800" />
                  <span>الفئات والوضعيات المستهدفة بالتدخل</span>
                </h3>
                <p className="text-stone-700 bg-stone-50 p-4 rounded-lg border border-stone-200 font-serif-ar leading-relaxed text-sm">
                  {activeModalDomain.targetPopulations}
                </p>
              </div>

              {/* Legal Framework */}
              <div className="space-y-2">
                <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <Scale className="w-4 h-4 text-amber-800" />
                  <span>الإطار القانوني والتشريعي التونسي</span>
                </h3>
                <ul className="space-y-2">
                  {activeModalDomain.legalFramework.map((law, lIdx) => (
                    <li key={lIdx} className="text-stone-800 bg-amber-50/50 p-3 rounded border border-amber-200/80 font-mono text-xs leading-relaxed flex items-start gap-2">
                      <span className="font-bold text-amber-800 shrink-0">§</span>
                      <span>{law}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Core Interventions (7 key actions) */}
              <div className="space-y-2">
                <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-800" />
                  <span>أبرز أوجه ومسارات التدخل المهني</span>
                </h3>
                <ul className="space-y-2.5">
                  {activeModalDomain.interventions.map((action, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-3 text-stone-700 font-serif-ar leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-700 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 border border-stone-200">
                        {aIdx + 1}
                      </span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Partners */}
              <div className="space-y-2">
                <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-800" />
                  <span>الهياكل والجهات الشريكة المتدخلة</span>
                </h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeModalDomain.partners.map((partner, pIdx) => (
                    <span 
                      key={pIdx}
                      className="text-xs bg-stone-100 text-stone-800 px-3 py-1.5 rounded border border-stone-200"
                    >
                      {partner}
                    </span>
                  ))}
                </div>
              </div>

              {activeModalDomain.summaryNote && (
                <div className="p-4 bg-stone-100 rounded-lg text-xs text-stone-600 leading-relaxed border border-stone-200">
                  <strong className="text-stone-800 block mb-1">ملاحظة تأطيرية:</strong>
                  {activeModalDomain.summaryNote}
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="border-t border-stone-200 p-4 bg-stone-50 flex items-center justify-between text-xs">
              <span className="text-stone-500">
                مرجع: ملف الأخصائي الاجتماعي بتونس، ياسين بن عبد السلام (2026)
              </span>
              <button
                onClick={() => setActiveModalDomain(null)}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded font-medium transition-colors"
              >
                إغلاق البطاقة
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
