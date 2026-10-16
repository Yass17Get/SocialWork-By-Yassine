import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Article } from '../types';
import { Search, BookOpen, Clock, Tag, ArrowLeft, PlusCircle, X } from 'lucide-react';

export const ArticlesView: React.FC = () => {
  const { articles, navigateToArticle, setCurrentPage } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'جميع الدراسات والمقالات' },
    { id: 'الديموغرافيا وكبار السن', label: 'الديموغرافيا وكبار السن' },
    { id: 'الخدمة الاجتماعية', label: 'الخدمة الاجتماعية' },
    { id: 'علم الاجتماع', label: 'علم الاجتماع' },
    { id: 'السياسات الاجتماعية', label: 'السياسات الاجتماعية' }
  ];

  const filteredArticles = articles.filter(art => {
    const matchesCat = selectedCategory === 'all' || art.category === selectedCategory;
    const q = searchTerm.trim().toLowerCase();
    const matchesQ = !q ||
      art.title.toLowerCase().includes(q) ||
      art.excerpt.toLowerCase().includes(q) ||
      art.content.toLowerCase().includes(q) ||
      art.tags.some(t => t.toLowerCase().includes(q));
    return matchesCat && matchesQ;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs text-stone-500 font-medium mb-1">
            بوابة البحوث الأكاديمية والمقالات الميدانية
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
            البحوث والدراسات في علم الاجتماع والديموغرافيا والخدمة الاجتماعية
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            إنتاج علمي وبحوث ميدانية متخصصة للأخصائي الاجتماعي والباحث ياسين بن عبد السلام
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('cms')}
          className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>إضافة مقال أو بحث جديد</span>
        </button>
      </div>

      {/* Search and Categories Filter */}
      <div className="space-y-4 no-print">
        <div className="relative max-w-xl">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث في عناوين الدراسات، الكلمات المفتاحية، أو المحتوى..."
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

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-lg border border-stone-200">
          {categories.map((c) => {
            const isActive = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredArticles.map((art) => (
          <article
            key={art.id}
            onClick={() => navigateToArticle(art)}
            className="cursor-pointer group bg-white border border-stone-200 hover:border-stone-400 rounded-xl overflow-hidden transition-all shadow-2xs hover:shadow-sm flex flex-col justify-between"
          >
            {art.featuredImage && (
              <div className="h-52 bg-stone-100 overflow-hidden">
                <img
                  src={art.featuredImage}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                {/* Unboxed metadata with · separator */}
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span className="font-semibold text-amber-900">{art.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{art.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{art.readTime}</span>
                </div>

                <h2 className="text-xl font-bold text-stone-900 group-hover:text-amber-900 transition-colors leading-snug">
                  {art.title}
                </h2>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-serif-ar line-clamp-3">
                  {art.excerpt}
                </p>

                {art.tags && art.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-stone-500">
                    {art.tags.map((t, idx) => (
                      <span key={idx}>#{t}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500 font-medium">بقلم: {art.author}</span>
                <span className="font-semibold text-stone-900 group-hover:text-amber-800 inline-flex items-center gap-1">
                  قراءة الدراسة كاملة
                  <ArrowLeft className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-12 text-center text-stone-500 space-y-2">
          <p className="text-sm font-semibold">لا توجد مقالات تطابق هذا البحث أو التصنيف</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
            className="mt-2 px-3 py-1.5 bg-stone-900 text-white text-xs rounded"
          >
            عرض جميع المقالات
          </button>
        </div>
      )}

    </div>
  );
};
