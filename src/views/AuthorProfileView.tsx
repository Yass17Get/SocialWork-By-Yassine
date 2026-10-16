import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Mail, 
  MapPin, 
  Building2, 
  BookOpen, 
  GraduationCap, 
  Share2, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Phone,
  FileText
} from 'lucide-react';
import { demographySociologyLibrary } from '../assets/images';

export const AuthorProfileView: React.FC = () => {
  const { authorProfile, articles, navigateToArticle, showToast } = useApp();
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquirySubject, setInquirySubject] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail || !inquiryMessage) {
      showToast('يرجى ملء كافة الحقول الأساسية لرسالتك.');
      return;
    }
    setIsSent(true);
    showToast('شكراً لتواصلك. تم استلام رسالتك وسيتم الرد عليك في أقرب وقت.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Profile Header Hero */}
      <div className="bg-white border border-stone-200 rounded-xl p-8 sm:p-10 shadow-2xs space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Avatar / Portrait Frame */}
          <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-stone-100 border-2 border-stone-300 overflow-hidden flex items-center justify-center shadow-sm">
              <img
                src={demographySociologyLibrary}
                alt={authorProfile.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
                {authorProfile.name}
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 font-medium">
                {authorProfile.title}
              </p>
            </div>

            {/* Direct Social & Academic Networks (Unboxed clean list) */}
            <div className="pt-2 flex flex-wrap justify-center gap-2 text-xs">
              {authorProfile.socialAccounts.googleScholar && (
                <a
                  href={authorProfile.socialAccounts.googleScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded transition-colors inline-flex items-center gap-1"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-amber-800" />
                  <span>Google Scholar</span>
                </a>
              )}

              {authorProfile.socialAccounts.orcid && (
                <a
                  href={authorProfile.socialAccounts.orcid}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded transition-colors inline-flex items-center gap-1"
                >
                  <span className="font-mono font-bold text-emerald-800">iD</span>
                  <span>ORCID</span>
                </a>
              )}

              {authorProfile.socialAccounts.researchGate && (
                <a
                  href={authorProfile.socialAccounts.researchGate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded transition-colors inline-flex items-center gap-1"
                >
                  <span className="font-mono font-bold text-teal-800">RG</span>
                  <span>ResearchGate</span>
                </a>
              )}

              {authorProfile.socialAccounts.linkedin && (
                <a
                  href={authorProfile.socialAccounts.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded transition-colors inline-flex items-center gap-1"
                >
                  <span className="font-bold text-blue-800">in</span>
                  <span>LinkedIn</span>
                </a>
              )}
            </div>

            <div className="pt-2 text-xs text-stone-500 space-y-1">
              <div className="flex items-center justify-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{authorProfile.location}</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <a href={`mailto:${authorProfile.email}`} className="text-amber-900 hover:underline">
                  {authorProfile.email}
                </a>
              </div>
            </div>
          </div>

          {/* Bio & Academic Vision Narrative */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-2 border-b border-stone-100 pb-4">
              <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                الصفة والموقع المؤسسي
              </div>
              <div className="text-sm sm:text-base font-bold text-stone-900">
                {authorProfile.currentRole}
              </div>
              <div className="text-xs text-stone-600">
                {authorProfile.institution}
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-base font-bold text-stone-900">
                السيرة العلمية والرؤية البحثية
              </h2>
              <div className="text-xs sm:text-sm text-stone-700 font-serif-ar leading-relaxed whitespace-pre-line space-y-3">
                {authorProfile.bio}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h2 className="text-base font-bold text-stone-900">
                الاهتمامات البحثية ومحاور العمل
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                {authorProfile.academicInterests.map((interest, idx) => (
                  <li key={idx} className="bg-stone-50 p-2.5 rounded border border-stone-200 flex items-start gap-2">
                    <span className="font-bold text-amber-800">•</span>
                    <span>{interest}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Publications by the Researcher */}
      <div className="space-y-6">
        <div className="border-b border-stone-200 pb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
            الإنتاج العلمي والأوراق البحثية المنشورة
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            مجموعة الدراسات والمقالات والأدلة المرجعية للباحث ياسين بن عبد السلام
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((art) => (
            <div
              key={art.id}
              onClick={() => navigateToArticle(art)}
              className="cursor-pointer bg-white border border-stone-200 hover:border-stone-400 rounded-xl p-6 transition-all shadow-2xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span className="font-semibold text-amber-900">{art.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{art.date}</span>
                </div>
                <h3 className="text-base font-bold text-stone-900 leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500">{art.readTime}</span>
                <span className="text-stone-900 font-semibold inline-flex items-center gap-1">
                  تصفح وقراءة الدراسة
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Academic Inquiry & Contact Form */}
      <div className="bg-[#F7F4EE] border border-stone-300 rounded-xl p-8 sm:p-10 space-y-6 max-w-3xl mx-auto">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-stone-900">
            التواصل الأكاديمي والمهني مع الباحث
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            للتعاون البحثي، أو الاستشارات في مجال رعاية كبار السن وعلم الاجتماع والخدمة الاجتماعية، أو طلب إذن النشر والاقتباس:
          </p>
        </div>

        {isSent ? (
          <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-6 text-center space-y-2 text-emerald-950">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="text-sm font-bold">تم إرسال رسالتك بنجاح</h3>
            <p className="text-xs text-emerald-800">
              سيقوم الباحث ياسين بن عبد السلام بمراجعة رسالتك والتواصل معك عبر البريد الإلكتروني.
            </p>
            <button
              onClick={() => {
                setIsSent(false);
                setInquirySubject('');
                setInquiryMessage('');
              }}
              className="mt-2 px-3 py-1.5 bg-emerald-700 text-white rounded text-xs"
            >
              إرسال رسالة أخرى
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitInquiry} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-stone-800 block mb-1">الاسم واللقب / المؤسسة:</label>
                <input
                  type="text"
                  required
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded p-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  placeholder="اسمك أو صفتك البحثية..."
                />
              </div>

              <div>
                <label className="font-semibold text-stone-800 block mb-1">البريد الإلكتروني للرد:</label>
                <input
                  type="email"
                  required
                  value={inquiryEmail}
                  onChange={(e) => setInquiryEmail(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded p-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-stone-800 block mb-1">موضوع الرسالة:</label>
              <input
                type="text"
                required
                value={inquirySubject}
                onChange={(e) => setInquirySubject(e.target.value)}
                className="w-full bg-white border border-stone-300 rounded p-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                placeholder="مثال: استفسار حول الدليل المرجعي، تعاون في دراسة ديموغرافية..."
              />
            </div>

            <div>
              <label className="font-semibold text-stone-800 block mb-1">نص الرسالة أو الاستشارة:</label>
              <textarea
                required
                rows={4}
                value={inquiryMessage}
                onChange={(e) => setInquiryMessage(e.target.value)}
                className="w-full bg-white border border-stone-300 rounded p-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 font-serif-ar text-sm"
                placeholder="اكتب رسالتك وتفاصيل استفسارك..."
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded text-xs inline-flex items-center gap-2 shadow-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>إرسال الرسالة للباحث</span>
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
};
