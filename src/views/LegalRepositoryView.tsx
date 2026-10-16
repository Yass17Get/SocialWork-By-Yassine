import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { legalTextsData } from '../data/referenceData';
import { LegalText } from '../types';
import { Scale, Search, ShieldCheck, FileText, ExternalLink, AlertTriangle, X } from 'lucide-react';

export const LegalRepositoryView: React.FC = () => {
  const { globalSearch, setGlobalSearch } = useApp();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState(globalSearch || '');

  const categories = [
    { id: 'all', label: 'جميع النصوص القانونية' },
    { id: 'protection', label: 'الحماية والأمان الاجتماعي والطفولة' },
    { id: 'vulnerable', label: 'كبار السن والأشخاص ذوو الإعاقة' },
    { id: 'ethics', label: 'السر المهني وحماية المعطيات' },
    { id: 'family', label: 'الأسرة وصندوق النفقة' },
    { id: 'fundamental', label: 'النظام الأساسي للمهنة والانتداب' },
    { id: 'health', label: 'الصحة العقلية والتأمين' }
  ];

  const filteredLaws = legalTextsData.filter(item => {
    const matchesCat = filterCategory === 'all' || item.category === filterCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesQ = !q ||
      item.lawTitle.toLowerCase().includes(q) ||
      item.lawNumber.toLowerCase().includes(q) ||
      item.domain.toLowerCase().includes(q) ||
      item.contentSummary.toLowerCase().includes(q) ||
      item.socialWorkConnection.toLowerCase().includes(q);
    return matchesCat && matchesQ;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs text-stone-500 font-medium mb-1">
            الباب الثالث من الدليل المرجعي · الأساس القانوني والتنظيمي للخدمة الاجتماعية
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
            المكتبة التشريعية والقانونية للعمل الاجتماعي بتونس
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            مستودع شامل للقوانين الأساسية والمجلات والأوامر الحكومية المنظمة لمهام الأخصائي وحقوق المنتفعين
          </p>
        </div>

        <div className="text-xs font-mono text-stone-600 bg-stone-100 px-3 py-2 rounded-lg border border-stone-200 self-start md:self-auto">
          {filteredLaws.length} نصاً معتمداً
        </div>
      </div>

      {/* Warning Notice about Official Gazette */}
      <div className="bg-stone-100 border border-stone-300 rounded-xl p-4 text-xs text-stone-700 leading-relaxed flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="text-stone-900 block mb-0.5">تنبيه منهجي وإلزامي:</strong>
          الرائد الرسمي للجمهورية التونسية (JORT) والبوابة الرسمية للتشريع هما المرجع القانوني الملزم والوحيد. يُستحسن التثبت من آخر التنقيحات الصادرة قبل الاستشهاد بأي فصل في تقرير قضائي أو إجراء إداري رسمي.
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 no-print">
        <div className="relative max-w-xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setGlobalSearch(e.target.value);
            }}
            placeholder="ابحث برقم القانون (مثلاً: 304، 114، 58، 254) أو الكلمات المفتاحية..."
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

        {/* Filter buttons */}
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

      {/* Legal Texts List */}
      <div className="space-y-6">
        {filteredLaws.map((law) => (
          <div
            key={law.id}
            className="bg-white border border-stone-200 rounded-xl p-6 shadow-2xs space-y-4 hover:border-stone-400 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
              <div>
                <span className="text-xs font-semibold text-amber-800 ml-2">
                  {law.domain}
                </span>
                <span className="text-xs font-mono text-stone-500">
                  {law.date}
                </span>
              </div>
              <div className="font-mono text-xs font-bold text-stone-900 bg-stone-100 px-2.5 py-1 rounded border border-stone-200 self-start sm:self-auto">
                {law.lawNumber}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-stone-900 leading-snug">
                {law.lawTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block text-xs">
                  مضمون النص التشريعي:
                </span>
                <p className="text-stone-700 leading-relaxed font-serif-ar text-xs sm:text-sm">
                  {law.contentSummary}
                </p>
              </div>

              <div className="bg-amber-50/50 p-4 rounded-lg border border-amber-200/80 space-y-1">
                <span className="font-bold text-amber-950 block text-xs">
                  صلته المباشرة بالعمل والتدخل الاجتماعي:
                </span>
                <p className="text-stone-800 leading-relaxed font-serif-ar text-xs sm:text-sm">
                  {law.socialWorkConnection}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredLaws.length === 0 && (
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-12 text-center text-stone-500 space-y-2">
          <p className="text-sm font-semibold">لم يتم العثور على نصوص قانونية مطابقة</p>
          <button
            onClick={() => { setSearchQuery(''); setFilterCategory('all'); }}
            className="mt-2 px-3 py-1.5 bg-stone-900 text-white text-xs rounded"
          >
            إعادة ضبط الفلتر
          </button>
        </div>
      )}

    </div>
  );
};
