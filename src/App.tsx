import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { ReferenceGuideView } from './views/ReferenceGuideView';
import { DomainsView } from './views/DomainsView';
import { LegalRepositoryView } from './views/LegalRepositoryView';
import { ReferralMapView } from './views/ReferralMapView';
import { GlossaryView } from './views/GlossaryView';
import { ArticlesView } from './views/ArticlesView';
import { ArticleDetailView } from './views/ArticleDetailView';
import { SocialToolsView } from './views/SocialToolsView';
import { AuthorProfileView } from './views/AuthorProfileView';
import { CmsAdminView } from './views/CmsAdminView';
import { CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentPage, toastMessage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      <Navbar />

      <main className="flex-1">
        {currentPage === 'home' && <HomeView />}
        {currentPage === 'reference' && <ReferenceGuideView />}
        {currentPage === 'domains' && <DomainsView />}
        {currentPage === 'laws' && <LegalRepositoryView />}
        {currentPage === 'referral' && <ReferralMapView />}
        {currentPage === 'glossary' && <GlossaryView />}
        {currentPage === 'articles' && <ArticlesView />}
        {currentPage === 'article-detail' && <ArticleDetailView />}
        {currentPage === 'tools' && <SocialToolsView />}
        {currentPage === 'author' && <AuthorProfileView />}
        {currentPage === 'cms' && <CmsAdminView />}
      </main>

      <Footer />

      {/* Floating System Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-stone-100 text-xs py-2.5 px-4 rounded-lg shadow-lg border border-stone-800 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
