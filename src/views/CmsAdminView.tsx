import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Article, AuthorProfile } from '../types';
import { 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Save, 
  RotateCcw, 
  FileText, 
  Download, 
  Upload, 
  Settings, 
  User, 
  Check, 
  Eye, 
  Share2, 
  AlertTriangle
} from 'lucide-react';

export const CmsAdminView: React.FC = () => {
  const { 
    articles, 
    addArticle, 
    updateArticle, 
    deleteArticle, 
    resetArticlesToDefault,
    authorProfile,
    updateAuthorProfile,
    resetProfileToDefault,
    navigateToArticle,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'articles' | 'profile' | 'backup'>('articles');
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  // Article Form State
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<'الخدمة الاجتماعية' | 'علم الاجتماع' | 'الديموغرافيا وكبار السن' | 'السياسات الاجتماعية'>('الخدمة الاجتماعية');
  const [formReadTime, setFormReadTime] = useState('6 دقائق قراءة');
  const [formDate, setFormDate] = useState('أكتوبر 2026');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formTags, setFormTags] = useState('');
  const [formCitations, setFormCitations] = useState('');
  const [formImage, setFormImage] = useState('/src/assets/images/hero_social_research_1792094339503.jpg');

  // Profile Form State
  const [profileName, setProfileName] = useState(authorProfile.name);
  const [profileTitle, setProfileTitle] = useState(authorProfile.title);
  const [profileRole, setProfileRole] = useState(authorProfile.currentRole);
  const [profileInstitution, setProfileInstitution] = useState(authorProfile.institution);
  const [profileBio, setProfileBio] = useState(authorProfile.bio);
  const [profileEmail, setProfileEmail] = useState(authorProfile.email);
  const [profileGoogleScholar, setProfileGoogleScholar] = useState(authorProfile.socialAccounts.googleScholar || '');
  const [profileOrcid, setProfileOrcid] = useState(authorProfile.socialAccounts.orcid || '');
  const [profileResearchGate, setProfileResearchGate] = useState(authorProfile.socialAccounts.researchGate || '');
  const [profileLinkedin, setProfileLinkedin] = useState(authorProfile.socialAccounts.linkedin || '');
  const [profileFacebook, setProfileFacebook] = useState(authorProfile.socialAccounts.facebook || '');

  const resetArticleForm = () => {
    setEditingArticleId(null);
    setFormTitle('');
    setFormCategory('الخدمة الاجتماعية');
    setFormReadTime('6 دقائق قراءة');
    setFormDate('أكتوبر 2026');
    setFormExcerpt('');
    setFormContent('');
    setFormTags('');
    setFormCitations('');
    setFormImage('/src/assets/images/hero_social_research_1792094339503.jpg');
  };

  const handleEditClick = (art: Article) => {
    setEditingArticleId(art.id);
    setFormTitle(art.title);
    setFormCategory(art.category);
    setFormReadTime(art.readTime);
    setFormDate(art.date);
    setFormExcerpt(art.excerpt);
    setFormContent(art.content);
    setFormTags(art.tags.join(', '));
    setFormCitations((art.citations || []).join('\n'));
    if (art.featuredImage) setFormImage(art.featuredImage);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim() || !formExcerpt.trim()) {
      showToast('يرجى تعبئة العنوان والملخص ومحتوى الدراسة.');
      return;
    }

    const tagsArray = formTags.split(',').map(t => t.trim()).filter(Boolean);
    const citationsArray = formCitations.split('\n').map(c => c.trim()).filter(Boolean);

    if (editingArticleId) {
      updateArticle(editingArticleId, {
        title: formTitle.trim(),
        category: formCategory,
        readTime: formReadTime,
        date: formDate,
        excerpt: formExcerpt.trim(),
        content: formContent.trim(),
        tags: tagsArray,
        citations: citationsArray,
        featuredImage: formImage
      });
      setEditingArticleId(null);
    } else {
      addArticle({
        title: formTitle.trim(),
        slug: 'study-' + Date.now(),
        category: formCategory,
        author: authorProfile.name,
        date: formDate,
        readTime: formReadTime,
        excerpt: formExcerpt.trim(),
        content: formContent.trim(),
        tags: tagsArray,
        citations: citationsArray,
        featuredImage: formImage,
        isPublished: true
      });
    }

    resetArticleForm();
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateAuthorProfile({
      name: profileName,
      title: profileTitle,
      currentRole: profileRole,
      institution: profileInstitution,
      bio: profileBio,
      email: profileEmail,
      socialAccounts: {
        googleScholar: profileGoogleScholar,
        orcid: profileOrcid,
        researchGate: profileResearchGate,
        linkedin: profileLinkedin,
        facebook: profileFacebook
      }
    });
  };

  const handleExportData = () => {
    const backupData = {
      exportDate: new Date().toISOString(),
      articles,
      authorProfile
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `yassine_portal_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('تم تصدير ملف النسخة الاحتياطية بنجاح.');
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.articles) {
            localStorage.setItem('yassine_portal_articles_v1', JSON.stringify(parsed.articles));
            window.location.reload();
          }
        } catch (err) {
          showToast('فشل قراءة الملف، تأكد من صحة صيغة JSON.');
        }
      };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs text-amber-800 font-bold uppercase tracking-wider mb-1">
            نظام إدارة المحتوى والنشر (CMS)
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
            لوحة إدارة المقالات والبحوث والملف العلمي
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            إضافة وتعديل الأوراق البحثية، تحديث السيرة الأكاديمية وروابط الحسابات العلمية، وإدارة النسخ الاحتياطي
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg border border-stone-200 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              activeTab === 'articles' ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            إدارة المقالات والأبحاث
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              activeTab === 'profile' ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            السيرة وحسابات التواصل
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              activeTab === 'backup' ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            النسخ والبيانات
          </button>
        </div>
      </div>

      {/* TAB 1: ARTICLES MANAGEMENT */}
      {activeTab === 'articles' && (
        <div className="space-y-10">
          
          {/* Article Form */}
          <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
              <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-800" />
                <span>{editingArticleId ? 'تعديل دراسة / مقال منشور' : 'نشر دراسة أو مقال بحثي جديد'}</span>
              </h2>
              {editingArticleId && (
                <button
                  type="button"
                  onClick={resetArticleForm}
                  className="text-xs text-stone-500 hover:text-rose-700 underline"
                >
                  إلغاء التعديل
                </button>
              )}
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="font-semibold text-stone-800 block mb-1">عنوان الدراسة أو المقال:</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded p-2.5 text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 font-semibold"
                    placeholder="مثال: التحولات الديموغرافية والأسرة في المجتمع التونسي..."
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-800 block mb-1">المجال / التصنيف العلمي:</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-300 rounded p-2.5 text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900"
                  >
                    <option value="الخدمة الاجتماعية">الخدمة الاجتماعية</option>
                    <option value="علم الاجتماع">علم الاجتماع</option>
                    <option value="الديموغرافيا وكبار السن">الديموغرافيا وكبار السن</option>
                    <option value="السياسات الاجتماعية">السياسات الاجتماعية</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-stone-800 block mb-1">زمن القراءة التقديري:</label>
                  <input
                    type="text"
                    value={formReadTime}
                    onChange={(e) => setFormReadTime(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded p-2.5 text-stone-900 focus:bg-white focus:outline-none"
                    placeholder="مثال: 8 دقائق قراءة"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-800 block mb-1">تاريخ النشر / الإصدار:</label>
                  <input
                    type="text"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded p-2.5 text-stone-900 focus:bg-white focus:outline-none"
                    placeholder="أكتوبر 2026"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-800 block mb-1">الصورة المميزة للورقة:</label>
                  <select
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded p-2.5 text-stone-900 focus:bg-white focus:outline-none"
                  >
                    <option value="/src/assets/images/hero_social_research_1792094339503.jpg">المكتبة والكتب والتشريع (الرئيسية)</option>
                    <option value="/src/assets/images/demography_sociology_library_1792094340665.jpg">الإحصاءات والتحليل الديموغرافي</option>
                    <option value="/src/assets/images/elderly_care_consultation_1792094339861.jpg">المقابلة والرعاية الميدانية للمسنين</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-800 block mb-1">ملخص الدراسة (Abstract / Excerpt):</label>
                <textarea
                  rows={2}
                  required
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded p-2.5 text-stone-900 focus:bg-white focus:outline-none font-serif-ar"
                  placeholder="ملخص مكثف لأهداف الدراسة والنتائج الأساسية..."
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-stone-800">محتوى الدراسة الكامل (يدعم الماركداون والفقرات):</label>
                  <span className="text-[11px] text-stone-400">استعمل ### للعناوين الفرعية، و - للقوائم</span>
                </div>
                <textarea
                  rows={10}
                  required
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded p-3 text-stone-900 focus:bg-white focus:outline-none font-serif-ar text-sm leading-relaxed"
                  placeholder="اكتب أو الصق نص الدراسة كاملاً هنا..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-stone-800 block mb-1">الكلمات المفتاحية والوسوم (مفصولة بفواصل):</label>
                  <input
                    type="text"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded p-2 text-stone-900 focus:bg-white focus:outline-none"
                    placeholder="مثال: كبار السن, الديموغرافيا, الرعاية المؤسسية"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-800 block mb-1">المراجع والمصادر (مرجع في كل سطر):</label>
                  <textarea
                    rows={2}
                    value={formCitations}
                    onChange={(e) => setFormCitations(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded p-2 text-stone-900 focus:bg-white focus:outline-none font-serif-ar"
                    placeholder="مثال: المعهد الوطني للإحصاء، 2026..."
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-stone-100">
                <button
                  type="button"
                  onClick={resetArticleForm}
                  className="px-3 py-2 text-stone-600 hover:text-stone-900"
                >
                  إعادة تعيين النموذج
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded text-xs inline-flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{editingArticleId ? 'حفظ التعديلات ونشرها' : 'نشر الدراسة في المنصة'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Published Articles Table */}
          <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-2xs space-y-4 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-stone-900">
                قائمة الدراسات والمقالات المنشورة في المنصة ({articles.length})
              </h2>
              <button
                onClick={resetArticlesToDefault}
                className="text-xs text-stone-500 hover:text-rose-700 underline"
                title="استعادة المقالات الافتراضية"
              >
                استعادة المقالات التأسيسية
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-100 text-stone-900 border-b border-stone-300">
                    <th className="p-3 font-bold">العنوان</th>
                    <th className="p-3 font-bold">التصنيف</th>
                    <th className="p-3 font-bold">تاريخ النشر</th>
                    <th className="p-3 font-bold text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((art) => (
                    <tr key={art.id} className="border-b border-stone-200 hover:bg-stone-50">
                      <td className="p-3 font-semibold text-stone-900 max-w-sm">
                        {art.title}
                      </td>
                      <td className="p-3 text-stone-600 font-medium">
                        {art.category}
                      </td>
                      <td className="p-3 text-stone-500 font-mono">
                        {art.date}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => navigateToArticle(art)}
                            className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded"
                            title="معاينة وقراءة"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleEditClick(art)}
                            className="p-1.5 text-amber-700 hover:text-amber-900 hover:bg-amber-50 rounded"
                            title="تعديل المقال"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`هل أنت متأكد من حذف المقال: "${art.title}"؟`)) {
                                deleteArticle(art.id);
                              }
                            }}
                            className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded"
                            title="حذف"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: PROFILE & SOCIAL ACCOUNTS SETTINGS */}
      {activeTab === 'profile' && (
        <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-2xs space-y-6 max-w-3xl">
          <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <User className="w-4 h-4 text-amber-800" />
              <span>تعديل السيرة الذاتية وحسابات التواصل العلمي</span>
            </h2>
            <button
              onClick={resetProfileToDefault}
              className="text-xs text-stone-500 hover:text-rose-700 underline"
            >
              استعادة البيانات الأصلية
            </button>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-stone-800 block mb-1">الاسم الكامل:</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full border border-stone-300 rounded p-2 text-stone-900"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-800 block mb-1">الصفة العلمية:</label>
                <input
                  type="text"
                  value={profileTitle}
                  onChange={(e) => setProfileTitle(e.target.value)}
                  className="w-full border border-stone-300 rounded p-2 text-stone-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-stone-800 block mb-1">الخطة المهنية الحالية:</label>
                <input
                  type="text"
                  value={profileRole}
                  onChange={(e) => setProfileRole(e.target.value)}
                  className="w-full border border-stone-300 rounded p-2 text-stone-900"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-800 block mb-1">المؤسسة والوزارة المشغلة:</label>
                <input
                  type="text"
                  value={profileInstitution}
                  onChange={(e) => setProfileInstitution(e.target.value)}
                  className="w-full border border-stone-300 rounded p-2 text-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-stone-800 block mb-1">البريد الإلكتروني المهني والأكاديمي:</label>
              <input
                type="email"
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
                className="w-full border border-stone-300 rounded p-2 text-stone-900"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-800 block mb-1">السيرة الذاتية والرؤية البحثية:</label>
              <textarea
                rows={5}
                value={profileBio}
                onChange={(e) => setProfileBio(e.target.value)}
                className="w-full border border-stone-300 rounded p-2.5 text-stone-900 font-serif-ar leading-relaxed text-sm"
              />
            </div>

            {/* Social accounts */}
            <div className="pt-2 border-t border-stone-100 space-y-3">
              <h3 className="font-bold text-stone-900">
                روابط المنصات البحثية والحسابات الاجتماعية:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-700 block mb-1">رابط Google Scholar:</label>
                  <input
                    type="url"
                    value={profileGoogleScholar}
                    onChange={(e) => setProfileGoogleScholar(e.target.value)}
                    className="w-full border border-stone-300 rounded p-2 text-stone-900 font-mono text-xs"
                    placeholder="https://scholar.google.com/..."
                  />
                </div>

                <div>
                  <label className="text-stone-700 block mb-1">رابط ORCID:</label>
                  <input
                    type="url"
                    value={profileOrcid}
                    onChange={(e) => setProfileOrcid(e.target.value)}
                    className="w-full border border-stone-300 rounded p-2 text-stone-900 font-mono text-xs"
                    placeholder="https://orcid.org/..."
                  />
                </div>

                <div>
                  <label className="text-stone-700 block mb-1">رابط ResearchGate:</label>
                  <input
                    type="url"
                    value={profileResearchGate}
                    onChange={(e) => setProfileResearchGate(e.target.value)}
                    className="w-full border border-stone-300 rounded p-2 text-stone-900 font-mono text-xs"
                    placeholder="https://www.researchgate.net/..."
                  />
                </div>

                <div>
                  <label className="text-stone-700 block mb-1">رابط LinkedIn:</label>
                  <input
                    type="url"
                    value={profileLinkedin}
                    onChange={(e) => setProfileLinkedin(e.target.value)}
                    className="w-full border border-stone-300 rounded p-2 text-stone-900 font-mono text-xs"
                    placeholder="https://www.linkedin.com/..."
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded text-xs inline-flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>حفظ التعديلات</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: BACKUP & DATA MANAGEMENT */}
      {activeTab === 'backup' && (
        <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-2xs space-y-6 max-w-2xl">
          <div className="border-b border-stone-100 pb-3">
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Settings className="w-4 h-4 text-amber-800" />
              <span>النسخ الاحتياطي واستيراد البيانات</span>
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              جميع المقالات والتعديلات محفوظة محلياً في متصفحك (LocalStorage). يمكنك تحميل نسخة احتياطية من كافة مقالاتك أو استعادتها لاحقاً.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-2">
              <strong className="text-stone-900 block text-xs">تصدير كافة المحتويات كملف JSON:</strong>
              <p className="text-stone-600">
                يقوم بحفظ جميع المقالات المنشورة، ومعلومات الباحث، والروابط في ملف واحد على جهازك.
              </p>
              <button
                onClick={handleExportData}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded font-medium inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تحميل ملف النسخة الاحتياطية (JSON)</span>
              </button>
            </div>

            <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-2">
              <strong className="text-stone-900 block text-xs">استيراد نسخة احتياطية سابقة:</strong>
              <p className="text-stone-600">
                اختر ملف النسخة الاحتياطية (JSON) لاسترجاع المقالات والبيانات المحفوظة.
              </p>
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="block w-full text-xs text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-stone-900 file:text-white hover:file:bg-stone-800 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
