import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageId } from '../types';
import { 
  BookOpen, 
  Layers, 
  Scale, 
  PhoneCall, 
  FileText, 
  User, 
  Settings, 
  Menu, 
  X,
  Compass,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'reference', label: 'الدليل المرجعي' },
    { id: 'domains', label: 'مجالات التدخل' },
    { id: 'laws', label: 'المكتبة القانونية' },
    { id: 'articles', label: 'البحوث والمقالات' },
    { id: 'referral', label: 'دليل الإحالة' },
    { id: 'tools', label: 'أدوات الأخصائي' }
  ];

  const handleNavClick = (page: PageId) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-stone-200">
      {/* Strict 3-Zone Top Bar Contract: Brand — 4-5 Links — 1 Primary Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-right text-base sm:text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:text-stone-700 transition-colors"
        >
          ياسين بن عبد السلام
          <span className="text-xs font-normal text-stone-500 mr-2 hidden lg:inline">
            | بوابة العلوم الاجتماعية والديموغرافيا
          </span>
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                  isActive
                    ? 'text-stone-950 font-bold border-b-2 border-stone-900'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action & Mobile Menu Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('author')}
            className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded transition-colors ${
              currentPage === 'author'
                ? 'text-stone-900 font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>السيرة والتواصل</span>
          </button>

          <button
            onClick={() => handleNavClick('cms')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 ${
              currentPage === 'cms'
                ? 'bg-amber-800 text-white'
                : 'bg-stone-900 text-stone-50 hover:bg-stone-800'
            }`}
            title="نظام إدارة المحتوى لنشر المقالات والأبحاث وتحديث البيانات"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">إدارة المحتوى</span>
            <span className="sm:hidden">CMS</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded text-stone-600 hover:text-stone-900 hover:bg-stone-100"
            aria-label="القائمة الرئيسية"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FBF9F5] border-b border-stone-200 px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-right py-2 px-3 text-sm font-medium rounded ${
                  isActive
                    ? 'bg-stone-200 text-stone-950 font-bold'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('author')}
              className="text-right py-2 px-3 text-sm text-stone-700 hover:bg-stone-100 rounded flex items-center justify-between"
            >
              <span>السيرة العلمية وحسابات التواصل</span>
              <User className="w-4 h-4 text-stone-500" />
            </button>
            <button
              onClick={() => handleNavClick('cms')}
              className="text-right py-2 px-3 text-sm text-amber-900 font-semibold bg-amber-50 hover:bg-amber-100 rounded flex items-center justify-between"
            >
              <span>نظام إدارة المحتوى والنشر (CMS)</span>
              <Settings className="w-4 h-4 text-amber-800" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
