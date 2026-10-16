import React from 'react';
import { useApp } from '../context/AppContext';
import { PageId } from '../types';
import { Scale, Phone, Mail, BookOpen, ShieldCheck, HeartHandshake, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, authorProfile } = useApp();

  const handleNav = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-12 pb-8 mt-20 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-800 text-sm">
          
          {/* Col 1: Author & Mission */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-stone-100 font-bold text-base">
              {authorProfile.name}
            </h3>
            <p className="text-xs text-stone-400 font-medium leading-relaxed">
              {authorProfile.currentRole}
              <br />
              {authorProfile.institution}
            </p>
            <p className="text-xs text-stone-400 leading-relaxed max-w-md">
              بوابة بحثية ومرجعية متخصصة تهدف إلى تأصيل ممارسة الخدمة الاجتماعية في تونس، ونشر الدراسات في علم الاجتماع والتحولات الديموغرافية وقضايا كبار السن، مع تكريس مبادئ العدالة الاجتماعية والسر المهني.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                ملف مرجعي متكامل: أكتوبر 2026
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                حقوق الإنسان والسر المهني
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              أبواب المنصة
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('reference')} className="hover:text-white transition-colors">
                  الدليل المرجعي الكامل (9 أبواب)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('domains')} className="hover:text-white transition-colors">
                  بطاقات مجالات التدخل الـ 15
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('laws')} className="hover:text-white transition-colors">
                  المكتبة القانونية والتشريعية
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('articles')} className="hover:text-white transition-colors">
                  البحوث والمقالات الأكاديمية
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('referral')} className="hover:text-white transition-colors">
                  خريطة الإحالة والخطوط الخضراء
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('glossary')} className="hover:text-white transition-colors">
                  مسرد المصطلحات الاجتماعية
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('tools')} className="hover:text-white transition-colors">
                  أدوات الأخصائي ومولد التقرير
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hotlines & Direct Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              أرقام النجدة والخطوط الخضراء
            </h4>
            <div className="space-y-2 text-xs text-stone-300">
              <div className="flex items-center justify-between py-1 border-b border-stone-800">
                <span className="text-stone-400">المرأة ضحية عنف (24/7):</span>
                <span className="font-mono font-bold text-amber-400">1899</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-stone-800">
                <span className="text-stone-400">حماية الطفولة وكبار السن:</span>
                <span className="font-mono font-bold text-amber-400">1809</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-stone-800">
                <span className="text-stone-400">الإسعاف الطبي الاستعجالي:</span>
                <span className="font-mono font-bold text-stone-200">190</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-stone-800">
                <span className="text-stone-400">الحماية المدنية والنجدة:</span>
                <span className="font-mono font-bold text-stone-200">198</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-stone-400">الأمن الوطني / الحرس:</span>
                <span className="font-mono font-bold text-stone-200">197 / 193</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleNav('cms')}
                className="w-full text-center py-2 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs rounded transition-colors"
              >
                دخول نظام إدارة المحتوى (CMS)
              </button>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer & Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p className="text-center sm:text-right leading-relaxed">
            تنبيه منهجي: الرائد الرسمي للجمهورية التونسية هو المرجع الإلزامي والوحيد للنصوص القانونية. تم إعداد محتوى هذا الموقع بإشراف الباحث ياسين بن عبد السلام (أكتوبر 2026).
          </p>
          <div className="flex items-center gap-4 shrink-0">
            <button onClick={() => handleNav('author')} className="hover:text-stone-300">
              السيرة الأكاديمية
            </button>
            <span>·</span>
            <button onClick={() => handleNav('referral')} className="hover:text-stone-300">
              دليل الإحالة
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
