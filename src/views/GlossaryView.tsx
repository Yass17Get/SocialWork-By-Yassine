import React, { useState } from 'react';
import { glossaryData } from '../data/referenceData';
import { GlossaryTerm } from '../types';
import { Search, BookMarked, Filter, X } from 'lucide-react';

export const GlossaryView: React.FC = () => {
  const [selectedField, setSelectedField] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const fields = [
    { id: 'all', label: 'جميع المصطلحات' },
    { id: 'الخدمة الاجتماعية', label: 'الخدمة الاجتماعية' },
    { id: 'علم الاجتماع', label: 'علم الاجتماع' },
    { id: 'الديموغرافيا', label: 'الديموغرافيا' },
    { id: 'القانون الاجتماعي', label: 'القانون والتشريع الاجتماعي' },
    { id: 'السياسات الاجتماعية', label: 'السياسات الاجتماعية' }
  ];

  const filtered = glossaryData.filter(item => {
    const matchesField = selectedField === 'all' || item.field === selectedField;
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch = !q ||
      item.term.toLowerCase().includes(q) ||
      item.definition.toLowerCase().includes(q);
    return matchesField && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs text-stone-500 font-medium mb-1">
            الملحق الأول من الدليل المرجعي
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
            مسرد المصطلحات والمفاهيم الاجتماعية والديموغرافية
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            دليل إبستيمولوجي وإجرائي لأهم المفاهيم المتداولة في الخدمة الاجتماعية، علم الاجتماع، الديموغرافيا، والتشريع التونسي
          </p>
        </div>

        <div className="text-xs font-mono text-stone-600 bg-stone-100 px-3 py-2 rounded-lg border border-stone-200 self-start md:self-auto">
          {filtered.length} مصطلحاً موثقاً
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 no-print">
        <div className="relative max-w-xl">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث في المصطلح أو المعنى (مثل: جينوغرام، تقاطع، أمان، شيخوخة)..."
            className="w-full bg-white border border-stone-300 rounded-lg pl-10 pr-10 py-2.5 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900"
          />
          <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute left-3 top-3 text-stone-400 hover:text-stone-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-lg border border-stone-200">
          {fields.map((f) => {
            const isActive = selectedField === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setSelectedField(f.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-stone-200 rounded-xl p-6 shadow-2xs hover:border-stone-400 transition-colors space-y-3"
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <h2 className="text-base sm:text-lg font-bold text-stone-900">
                {item.term}
              </h2>
              <span className="text-xs text-amber-800 font-medium">
                {item.field}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 font-serif-ar leading-relaxed">
              {item.definition}
            </p>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-12 text-center text-stone-500 space-y-2">
          <p className="text-sm font-semibold">لم يتم العثور على مصطلحات مطابقة</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedField('all'); }}
            className="mt-2 px-3 py-1.5 bg-stone-900 text-white text-xs rounded"
          >
            إعادة ضبط البحث
          </button>
        </div>
      )}

    </div>
  );
};
