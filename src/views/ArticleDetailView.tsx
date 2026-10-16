import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  Printer, 
  Share2, 
  Check, 
  BookOpen, 
  Clock, 
  Tag, 
  User, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const ArticleDetailView: React.FC = () => {
  const { selectedArticle, setCurrentPage } = useApp();
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [copied, setCopied] = useState(false);

  if (!selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <p className="text-stone-600">لم يتم اختيار أي دراسة أو مقال للقراءة.</p>
        <button
          onClick={() => setCurrentPage('articles')}
          className="px-4 py-2 bg-stone-900 text-white rounded text-xs font-semibold"
        >
          العودة لبوابة المقالات
        </button>
      </div>
    );
  }

  const handleCopyCitation = () => {
    const citation = `${selectedArticle.author} (${selectedArticle.date})، "${selectedArticle.title}"، بوابة العلوم الاجتماعية والديموغرافيا، تونس.`;
    navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Convert simple markdown headings and lists into clean JSX
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return <div key={idx} className="h-4" />;
      }

      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-xl sm:text-2xl font-bold text-stone-900 pt-6 pb-2 border-b border-stone-200 mt-6 mb-3">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }

      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-2xl sm:text-3xl font-bold text-stone-950 pt-8 pb-3 border-b border-stone-300 mt-8 mb-4">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }

      if (trimmed.startsWith('> ')) {
        return (
          <blockquote key={idx} className="my-6 p-5 bg-[#F7F4EE] border-y border-stone-300 text-stone-800 text-base sm:text-lg font-serif-ar italic leading-relaxed">
            {trimmed.replace('> ', '')}
          </blockquote>
        );
      }

      if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
        return (
          <li key={idx} className="mr-5 my-1.5 list-disc leading-relaxed text-stone-800">
            {trimmed.replace(/^[-•]\s*/, '')}
          </li>
        );
      }

      if (/^\d+\.\s/.test(trimmed)) {
        return (
          <li key={idx} className="mr-5 my-1.5 list-decimal leading-relaxed text-stone-800 font-medium">
            {trimmed.replace(/^\d+\.\s*/, '')}
          </li>
        );
      }

      return (
        <p key={idx} className="leading-relaxed text-stone-800 my-3">
          {trimmed}
        </p>
      );
    });
  };

  const textSizeClass =
    fontSize === 'normal'
      ? 'text-base leading-relaxed'
      : fontSize === 'large'
      ? 'text-lg leading-loose'
      : 'text-xl leading-loose';

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Breadcrumb & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4 no-print text-xs">
        <button
          onClick={() => setCurrentPage('articles')}
          className="text-stone-600 hover:text-stone-950 font-medium inline-flex items-center gap-1.5"
        >
          <ChevronRight className="w-4 h-4" />
          <span>العودة لجميع الدراسات والأبحاث</span>
        </button>

        <div className="flex items-center gap-3">
          {/* Font size toggles */}
          <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded border border-stone-200 text-[11px]">
            <span className="px-2 text-stone-500">حجم الخط:</span>
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-0.5 rounded ${fontSize === 'normal' ? 'bg-white font-bold shadow-2xs' : 'text-stone-600'}`}
            >
              عادي
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-0.5 rounded ${fontSize === 'large' ? 'bg-white font-bold shadow-2xs' : 'text-stone-600'}`}
            >
              كبير
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-2 py-0.5 rounded ${fontSize === 'xlarge' ? 'bg-white font-bold shadow-2xs' : 'text-stone-600'}`}
            >
              أكبر
            </button>
          </div>

          <button
            onClick={handleCopyCitation}
            className="p-1.5 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 rounded transition-colors"
            title="نسخ التوثيق العلمي"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => window.print()}
            className="p-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded transition-colors"
            title="طباعة المقال"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Editorial Header */}
      <header className="space-y-4">
        {/* Unboxed metadata kicker */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
          <span className="font-semibold text-amber-900">{selectedArticle.category}</span>
          <span aria-hidden="true">·</span>
          <span>تاريخ النشر: {selectedArticle.date}</span>
          <span aria-hidden="true">·</span>
          <span>{selectedArticle.readTime}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-950 leading-tight">
          {selectedArticle.title}
        </h1>

        <div className="p-4 bg-stone-100 rounded-lg border border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed font-serif-ar italic">
          <strong>ملخص الدراسة: </strong> {selectedArticle.excerpt}
        </div>

        <div className="flex items-center gap-3 pt-2 text-xs text-stone-600 border-b border-stone-200 pb-4">
          <div className="w-7 h-7 rounded-full bg-stone-800 text-white font-bold flex items-center justify-center text-xs">
            ي
          </div>
          <div>
            <span className="font-bold text-stone-900 block">{selectedArticle.author}</span>
            <span className="text-[11px] text-stone-500">أخصائي اجتماعي بمؤسسة حكومية لرعاية كبار السن، باحث في علم الاجتماع والديموغرافيا</span>
          </div>
        </div>
      </header>

      {/* Featured Image if present */}
      {selectedArticle.featuredImage && (
        <div className="rounded-xl overflow-hidden border border-stone-200 shadow-2xs max-h-96">
          <img
            src={selectedArticle.featuredImage}
            alt={selectedArticle.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* Editorial Reading Canvas (Constrained width 65-75ch) */}
      <main className={`font-serif-ar text-stone-800 ${textSizeClass} max-w-prose mx-auto space-y-4`}>
        {renderFormattedContent(selectedArticle.content)}
      </main>

      {/* Citations & Bibliography */}
      {selectedArticle.citations && selectedArticle.citations.length > 0 && (
        <section className="pt-8 border-t border-stone-300 max-w-prose mx-auto space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
            المراجع والمصادر المعتمدة:
          </h4>
          <ul className="space-y-1.5 text-xs text-stone-600 font-serif-ar list-decimal list-inside pr-1">
            {selectedArticle.citations.map((cite, cIdx) => (
              <li key={cIdx} className="leading-relaxed">
                {cite}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Bottom Nav */}
      <div className="pt-8 border-t border-stone-200 flex items-center justify-between no-print text-xs">
        <button
          onClick={() => setCurrentPage('articles')}
          className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded font-medium transition-colors"
        >
          العودة لكافة الدراسات
        </button>
        <button
          onClick={() => setCurrentPage('tools')}
          className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded font-medium transition-colors"
        >
          تطبيق أدوات الأخصائي
        </button>
      </div>

    </article>
  );
};
