export type PageId =
  | 'home'
  | 'reference'
  | 'domains'
  | 'laws'
  | 'referral'
  | 'glossary'
  | 'articles'
  | 'article-detail'
  | 'tools'
  | 'author'
  | 'cms';

export interface InterventionDomain {
  id: number;
  title: string;
  category: 'protection' | 'family' | 'vulnerable' | 'elderly' | 'health' | 'justice' | 'development' | 'research';
  categoryLabel: string;
  targetPopulations: string;
  legalFramework: string[];
  interventions: string[];
  partners: string[];
  summaryNote?: string;
}

export interface LegalText {
  id: string;
  domain: string;
  lawTitle: string;
  lawNumber: string;
  date: string;
  contentSummary: string;
  socialWorkConnection: string;
  category: 'fundamental' | 'protection' | 'family' | 'health' | 'justice' | 'ethics' | 'vulnerable';
}

export interface ReferralItem {
  id: string;
  situation: string;
  competentEntity: string;
  contactNumber?: string;
  isEmergency?: boolean;
  notes: string;
  legalReference?: string;
  category: 'urgent' | 'childhood' | 'women' | 'elderly' | 'poverty' | 'disability' | 'health' | 'justice' | 'family';
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  field: 'الخدمة الاجتماعية' | 'علم الاجتماع' | 'الديموغرافيا' | 'القانون الاجتماعي' | 'السياسات الاجتماعية';
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: 'الخدمة الاجتماعية' | 'علم الاجتماع' | 'الديموغرافيا وكبار السن' | 'السياسات الاجتماعية';
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  tags: string[];
  featuredImage?: string;
  citations?: string[];
  isPublished: boolean;
}

export interface AuthorProfile {
  name: string;
  title: string;
  currentRole: string;
  institution: string;
  bio: string;
  academicInterests: string[];
  publicationsSummary: string;
  email: string;
  phone?: string;
  location: string;
  socialAccounts: {
    googleScholar?: string;
    orcid?: string;
    researchGate?: string;
    linkedin?: string;
    facebook?: string;
    twitter?: string;
  };
}

export interface ReferenceChapter {
  id: string;
  number: string;
  title: string;
  subTitle?: string;
  sections: {
    title: string;
    content: string;
    bulletPoints?: string[];
    table?: {
      headers: string[];
      rows: string[][];
    };
    callout?: {
      type: 'gold' | 'warning' | 'info';
      title: string;
      text: string;
    };
  }[];
}
