import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { referenceChapters } from '../data/referenceData';
import { 
  BookOpen, 
  Search, 
  Printer, 
  Share2, 
  Check, 
  ChevronRight, 
  ArrowLeft, 
  AlertCircle,
  HelpCircle,
  Sparkles,
  Bookmark
} from 'lucide-react';

export const ReferenceGuideView: React.FC = () => {
  const { selectedChapterId, setSelectedChapterId, setCurrentPage } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);

  const activeChapter = referenceChapters.find(ch => ch.id === selectedChapterId) || referenceChapters[0];

  const handleCopyCitation = () => {
    const citation = `ياسين بن عبد السلام، "الأخصائي الاجتماعي في تونس: المهنة والإطار القانوني ومجالات التدخل"، ${activeChapter.number}: ${activeChapter.title}، تونس، أكتوبر 2026.`;
    navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header & Meta */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-1">
            <span>ملف مرجعي متكامل</span>
            <span aria-hidden="true">·</span>
            <span>إعداد ومراجعة وتقديم: ياسين بن عبد السلام</span>
            <span aria-hidden="true">·</span>
            <span>أكتوبر 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-tight">
            الأخصائي الاجتماعي في تونس: المهنة والإطار القانوني ومجالات التدخل
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            ماهية المهنة وكيفية ممارستها · الأساس القانوني والتنظيمي · مجالات التدخل ومسارات الإحالة وأخلاقيات المهنة
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 no-print">
          <button
            onClick={handleCopyCitation}
            className="px-3 py-2 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-medium rounded transition-colors inline-flex items-center gap-1.5"
            title="نسخ توثيق هذا الباب بصيغة APA"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'تم نسخ التوثيق' : 'توثيق واقتباس'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded transition-colors inline-flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>طباعة الباب</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Asymmetric 2-Column (Sidebar navigation + Reader Canvas) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Right Sidebar: Chapters Index (Desktop sticky) */}
        <aside className="lg:col-span-4 bg-white border border-stone-200 rounded-xl p-4 shadow-2xs space-y-4 no-print lg:sticky lg:top-24 max-h-[85vh] overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <span className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-amber-800" />
              فهرس محتويات الدليل
            </span>
            <span className="text-xs text-stone-400 font-mono">10 فصول</span>
          </div>

          <nav className="space-y-1">
            {referenceChapters.map((ch) => {
              const isActive = ch.id === activeChapter.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    setSelectedChapterId(ch.id);
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                  className={`w-full text-right p-2.5 rounded-lg text-xs transition-all flex items-start justify-between gap-2 ${
                    isActive
                      ? 'bg-stone-900 text-white font-bold shadow-xs'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className={`font-mono ${isActive ? 'text-amber-300' : 'text-stone-400'}`}>
                      {ch.number}
                    </div>
                    <div>{ch.title}</div>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 mt-1 shrink-0 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                </button>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-stone-100 space-y-2">
            <button
              onClick={() => setCurrentPage('domains')}
              className="w-full text-right text-xs text-amber-900 hover:underline py-1 flex items-center justify-between"
            >
              <span>الانتقال لبطاقات مجالات التدخل الـ 15</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentPage('laws')}
              className="w-full text-right text-xs text-stone-600 hover:text-stone-900 py-1 flex items-center justify-between"
            >
              <span>المكتبة التشريعية والقانونية</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>

        {/* Left / Main Canvas: Reading Area */}
        <main className="lg:col-span-8 bg-white border border-stone-200 rounded-xl p-6 sm:p-10 shadow-2xs space-y-10">
          
          {/* Chapter Banner */}
          <div className="border-b border-stone-200 pb-6 space-y-2">
            <div className="text-xs font-mono font-semibold text-amber-800 uppercase tracking-widest">
              {activeChapter.number}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-950 font-editorial">
              {activeChapter.title}
            </h2>
            {activeChapter.subTitle && (
              <p className="text-xs sm:text-sm text-stone-600">
                {activeChapter.subTitle}
              </p>
            )}
          </div>

          {/* Chapter Content Sections */}
          <div className="space-y-10">
            {activeChapter.sections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h3 className="text-lg font-bold text-stone-900 pb-2 border-b border-stone-100 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-amber-800 rounded-full inline-block"></span>
                  <span>{section.title}</span>
                </h3>

                {/* Main Prose Text */}
                <div className="text-sm sm:text-base text-stone-700 leading-relaxed font-serif-ar space-y-3 whitespace-pre-line">
                  {section.content}
                </div>

                {/* Bullet Points if any */}
                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-stone-700 font-serif-ar">
                    {section.bulletPoints.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-800 mt-2 shrink-0"></span>
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Structured Table if present */}
                {section.table && (
                  <div className="pt-3 overflow-x-auto">
                    <table className="w-full text-right text-xs sm:text-sm border-collapse border border-stone-200">
                      <thead>
                        <tr className="bg-stone-100 text-stone-900 border-b border-stone-300">
                          {section.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-3 font-bold border-l border-stone-200 last:border-l-0">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="border-b border-stone-200 hover:bg-stone-50/50">
                            {row.map((cell, cIdx) => (
                              <td 
                                key={cIdx} 
                                className={`p-3 border-l border-stone-200 last:border-l-0 leading-relaxed ${
                                  cIdx === 0 ? 'font-semibold text-stone-900 whitespace-nowrap bg-stone-50/50' : 'text-stone-700'
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Callout Box if present */}
                {section.callout && (
                  <div 
                    className={`mt-4 p-5 rounded-lg border text-xs sm:text-sm ${
                      section.callout.type === 'gold'
                        ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                        : section.callout.type === 'warning'
                        ? 'bg-rose-50/80 border-rose-300 text-rose-950'
                        : 'bg-stone-100 border-stone-300 text-stone-900'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1.5 mb-1.5 text-sm">
                      <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>{section.callout.title}</span>
                    </div>
                    <p className="font-serif-ar leading-relaxed">
                      {section.callout.text}
                    </p>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Bottom Pagination / Next Chapter Button */}
          <div className="pt-8 border-t border-stone-200 flex items-center justify-between no-print text-xs">
            {(() => {
              const currentIndex = referenceChapters.findIndex(ch => ch.id === activeChapter.id);
              const prev = referenceChapters[currentIndex - 1];
              const next = referenceChapters[currentIndex + 1];

              return (
                <>
                  <div>
                    {prev && (
                      <button
                        onClick={() => {
                          setSelectedChapterId(prev.id);
                          window.scrollTo({ top: 120, behavior: 'smooth' });
                        }}
                        className="p-2 text-stone-700 hover:text-stone-950 font-medium inline-flex items-center gap-1.5"
                      >
                        <ChevronRight className="w-4 h-4" />
                        <span>الباب السابق: {prev.title}</span>
                      </button>
                    )}
                  </div>
                  <div>
                    {next && (
                      <button
                        onClick={() => {
                          setSelectedChapterId(next.id);
                          window.scrollTo({ top: 120, behavior: 'smooth' });
                        }}
                        className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-medium rounded transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>الباب التالي: {next.title}</span>
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </>
              );
            })()}
          </div>

        </main>
      </div>

    </div>
  );
};
