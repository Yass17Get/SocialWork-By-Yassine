import React, { createContext, useContext, useState, useEffect } from 'react';
import { PageId, Article, AuthorProfile, InterventionDomain, LegalText, ReferralItem, GlossaryTerm } from '../types';
import { initialArticles } from '../data/initialArticles';
import { defaultAuthorProfile, interventionDomains, legalTextsData, referralDirectory, glossaryData } from '../data/referenceData';

interface AppContextType {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  selectedArticle: Article | null;
  setSelectedArticle: (article: Article | null) => void;
  selectedChapterId: string;
  setSelectedChapterId: (id: string) => void;
  selectedDomain: InterventionDomain | null;
  setSelectedDomain: (domain: InterventionDomain | null) => void;
  globalSearch: string;
  setGlobalSearch: (query: string) => void;
  
  // CMS & Articles State
  articles: Article[];
  addArticle: (article: Omit<Article, 'id'>) => void;
  updateArticle: (id: string, updated: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  resetArticlesToDefault: () => void;
  
  // Author Profile
  authorProfile: AuthorProfile;
  updateAuthorProfile: (profile: Partial<AuthorProfile>) => void;
  resetProfileToDefault: () => void;

  // Notification / Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
  
  // Quick navigation helpers
  navigateToArticle: (article: Article) => void;
  navigateToChapter: (chapterId: string) => void;
  navigateToDomain: (domain: InterventionDomain) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const ARTICLES_STORAGE_KEY = 'yassine_portal_articles_v1';
const PROFILE_STORAGE_KEY = 'yassine_portal_profile_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedChapterId, setSelectedChapterId] = useState<string>('intro');
  const [selectedDomain, setSelectedDomain] = useState<InterventionDomain | null>(null);
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load articles from localStorage
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const stored = localStorage.getItem(ARTICLES_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return initialArticles;
  });

  // Load author profile from localStorage
  const [authorProfile, setAuthorProfile] = useState<AuthorProfile>(() => {
    try {
      const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return defaultAuthorProfile as AuthorProfile;
  });

  useEffect(() => {
    try {
      localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(articles));
    } catch (e) {
      console.error('Failed to save articles to localStorage', e);
    }
  }, [articles]);

  useEffect(() => {
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(authorProfile));
    } catch (e) {
      console.error('Failed to save profile to localStorage', e);
    }
  }, [authorProfile]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const addArticle = (newArt: Omit<Article, 'id'>) => {
    const id = 'paper-' + Date.now();
    const createdArticle: Article = {
      ...newArt,
      id
    };
    setArticles(prev => [createdArticle, ...prev]);
    showToast('تمت إضافة المقال/الدراسة بنجاح ونشرها في المنصة.');
  };

  const updateArticle = (id: string, updated: Partial<Article>) => {
    setArticles(prev =>
      prev.map(art => (art.id === id ? { ...art, ...updated } : art))
    );
    showToast('تم تحديث بيانات المقال بنجاح.');
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(art => art.id !== id));
    showToast('تم حذف المقال.');
    if (selectedArticle?.id === id) {
      setSelectedArticle(null);
      setCurrentPage('articles');
    }
  };

  const resetArticlesToDefault = () => {
    setArticles(initialArticles);
    localStorage.removeItem(ARTICLES_STORAGE_KEY);
    showToast('تمت استعادة المقالات الافتراضية بنجاح.');
  };

  const updateAuthorProfile = (updated: Partial<AuthorProfile>) => {
    setAuthorProfile(prev => ({
      ...prev,
      ...updated,
      socialAccounts: {
        ...prev.socialAccounts,
        ...(updated.socialAccounts || {})
      }
    }));
    showToast('تم حفظ تعديلات السيرة الذاتية وحسابات التواصل بنجاح.');
  };

  const resetProfileToDefault = () => {
    setAuthorProfile(defaultAuthorProfile as AuthorProfile);
    localStorage.removeItem(PROFILE_STORAGE_KEY);
    showToast('تمت استعادة البيانات التعريفية الافتراضية.');
  };

  const navigateToArticle = (art: Article) => {
    setSelectedArticle(art);
    setCurrentPage('article-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToChapter = (chId: string) => {
    setSelectedChapterId(chId);
    setCurrentPage('reference');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToDomain = (domain: InterventionDomain) => {
    setSelectedDomain(domain);
    setCurrentPage('domains');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedArticle,
        setSelectedArticle,
        selectedChapterId,
        setSelectedChapterId,
        selectedDomain,
        setSelectedDomain,
        globalSearch,
        setGlobalSearch,
        articles,
        addArticle,
        updateArticle,
        deleteArticle,
        resetArticlesToDefault,
        authorProfile,
        updateAuthorProfile,
        resetProfileToDefault,
        toastMessage,
        showToast,
        navigateToArticle,
        navigateToChapter,
        navigateToDomain
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
