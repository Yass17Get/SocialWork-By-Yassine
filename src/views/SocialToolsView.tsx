import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  Sparkles, 
  Printer, 
  Copy, 
  Check, 
  Download, 
  RotateCcw, 
  Scale, 
  AlertCircle,
  HelpCircle,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';

export const SocialToolsView: React.FC = () => {
  const { authorProfile } = useApp();
  const [activeTab, setActiveTab] = useState<'report-generator' | 'referral-wizard'>('report-generator');
  const [copied, setCopied] = useState(false);

  // Report Generator Form State
  const [reportState, setReportState] = useState({
    requestingEntity: 'قاضي الأسرة بالمحكمة الابتدائية',
    caseSubject: 'بحث اجتماعي حول وضعية رعاية أطفال إثر نزاع حضانة ونفقة',
    personName: 'المعني بالأمر / الأسرة المعنية',
    cinNumber: '08******',
    address: 'تونس العاصمة، الحي الاجتماعي',
    socialStatus: 'متزوج وله 3 أبناء قُصّر',
    sources: 'مقابلة بمكتب الأخصائي بتاريخ 12 أكتوبر 2026، وزيارة منزلية بتاريخ 14 أكتوبر 2026، والاطلاع على سجلات الحالة المدنية والتقاطع البياني بالأمان الاجتماعي.',
    
    // Core Golden Rule Sections
    observedDirectly: `1. عاين الأخصائي أثناء الزيارة المنزلية مسكناً متكوناً من غرفتين ومطبخ، يعاني من رطوبة واضحة ونقص في التدفئة.
2. عاين الأخصائي وجود مؤونة غذائية محدودة وتجهيزات أساسية متواضعة، مع تخصيص فضاء مشترك لتمدرس الأطفال.
3. بدت على الأطفال علامات انتظام في الحضور المدرسي وتفاعل إيجابي مع الأم أثناء المقابلة.`,

    reportedByOthers: `1. صرّحت الأم بأن الأب غادر محل الزوجية منذ 8 أشهر وامتنع عن أداء النفقة المحكوم بها، مما اضطرها للاقتراض من الجيران.
2. صرّح الأب في المقابلة المنفصلة بأنه فقد عمله كعامل يومي ويعاني من صعوبة إيجاد مورد رزق مستقر، معرباً عن رغبته في رؤية أبنائه دورياً.
3. أفادت الجارة القريبة بعدم تسجيل أي عنف مادي مباشر ضد الأطفال في محيط الحي.`,

    professionalAssessment: `1. الوضعية تتسم بهشاشة اقتصادية حادة ناجمة عن توقف مساهمة الأب في أعباء الأسرة، مع وجود رابط عاطفي وتربوي متين بين الأم والأبناء.
2. لا توجد مؤشرات على خطر داهم أو سوء معاملة يقتضي إسقاط الحضانة أو إيداع الأطفال بمؤسسة.
3. التوصيات: 
   أ- الإبقاء على حضانة الأطفال لدى الأم صوناً للمصلحة الفضلى للأطفال ومتابعتهم المدرسية.
   ب- إحالة ملف الأم على صندوق ضمان النفقة وجراية الطلاق للانتفاع بالتحويلات الميسرة.
   ج- إدراج الأسرة في برنامج الأمان الاجتماعي للحصول على الإعانة الطبية والمنحة الظرفية.
   د- تنظيم حق الزيارة والمراقبة للأب في ظروف هادئة تضمن توازن الأطفال النفسي.`,
    
    workerName: authorProfile.name,
    workerTitle: 'أخصائي اجتماعي',
    institution: authorProfile.institution,
    reportDate: '15 أكتوبر 2026'
  });

  // Referral Wizard State
  const [wizardSituation, setWizardSituation] = useState<'child' | 'woman' | 'elderly' | 'poverty' | 'addiction' | 'disability'>('child');

  const wizardData = {
    child: {
      title: 'طفل مهدد أو معنف أو فاقد للسند',
      urgency: 'فورية / أولوية قصوى إذا كان هناك خطر داهم',
      competent: 'مندوب حماية الطفولة بالولاية، والنيابة العمومية',
      hotline: '1809 (أخضر ومجاني)',
      law: 'الفصل 20 وما يليه من مجلة حماية الطفل (القانون 92 لسنة 1995)',
      checklist: [
        'تأمين سلامة الطفل الفورية وفصله عن مصدر الخطر.',
        'الاتصال الفوري بالرقم 1809 أو إشعار مكتب المندوب كتابياً.',
        'إجراء بحث اجتماعي استعجالي واستقصاء بيئة الأسرة.',
        'عدم إفشاء المعطيات لأطراف غير معنية صوناً للسر المهني وحرمة الطفل.'
      ]
    },
    woman: {
      title: 'امرأة ضحية عنف أسري أو زوجي',
      urgency: 'فورية على مدار الساعة',
      competent: 'الخط الأخضر 1899، الفرقة المختصة بالبحث في جرائم العنف ضد المرأة، النيابة العمومية',
      hotline: '1899 (يعمل 24/7)',
      law: 'القانون الأساسي عدد 58 لسنة 2017 المتعلق بالقضاء على العنف ضد المرأة',
      checklist: [
        'الإنصات غير اللائم في فضاء يحفظ السرية والكرامة.',
        'تقييم مؤشرات الخطر الوشيك على حياتها وحياة أطفالها.',
        'توجيه الضحية للفحص الطبي وتأمين شهادة طبية أولية.',
        'التنسيق مع مراكز الإيواء الآمنة والمساعدة العدلية المجانية.'
      ]
    },
    elderly: {
      title: 'مسن فاقد للسند أو معرض للإهمال وسوء المعاملة',
      urgency: 'عاجلة واجتماعية',
      competent: 'المندوبية الجهوية للمرأة والأسرة والطفولة وكبار السن، مؤسسات رعاية المسنين',
      hotline: '1809',
      law: 'القانون عدد 114 لسنة 1994 المتعلق بحماية المسنين ومجلة الأحوال الشخصية',
      checklist: [
        'إجراء المعاينة الميدانية والتثبت من الوضع الصحي والاستقلالية الحركية.',
        'استنفاد إمكانيات الإبقاء بالوسط الطبيعي عبر الوساطة الأسرية والنفقة.',
        'دراسة ملف الإقامة بمؤسسة رعاية كبار السن إذا انعدم السند العائلي تماماً.',
        'إعداد المشروع الفردي للمسن والتنسيق مع الضمان الاجتماعي والصحة.'
      ]
    },
    poverty: {
      title: 'أسرة معوزة أو شخص في فقر مدقع بدون دخل',
      urgency: 'إدارية واجتماعية',
      competent: 'الوحدة المحلية للنهوض الاجتماعي (وزارة الشؤون الاجتماعية)',
      hotline: 'مباشر بالوحدة المحلية',
      law: 'القانون الأساسي عدد 10 لسنة 2019 (الأمان الاجتماعي) والأمر 317 لسنة 2020',
      checklist: [
        'استقبال الطلب واستيفاء ملف الإثباتات والوثائق المدنية.',
        'إجراء الزيارة الميدانية المنزلية لمعاينة مؤشرات الحرمان متعدد الأبعاد.',
        'قراءة نتائج التقاطع الآلي مع السجلات العمومية والضرائب.',
        'إدراج الأسرة في سجل الفقر للانتفاع بالمنحة القارة وبطاقة العلاج.'
      ]
    },
    addiction: {
      title: 'شخص يعاني من الإدمان على المواد المخدرة أو الكحول',
      urgency: 'صحية ونفسية اجتماعية',
      competent: 'مراكز علاج الإدمان المتخصصة، أقسام الطب النفسي والمستشفيات',
      hotline: '190 للطوارئ الطبية / مراكز الإنصات',
      law: 'القانون عدد 52 لسنة 1992 المتعلق بالمخدرات وتنقيحاته والقانون عدد 83 لسنة 1992',
      checklist: [
        'تأمين المقابلة الفردية وطمأنة الشخص لسرية العلاج الطوعي.',
        'التنسيق مع الفريق الطبي متعدد الاختصاصات لتحديد مسار إزالة السموم.',
        'الإحاطة النفسية والاجتماعية بالأسرة لضمان الدعم أثناء التعافي.',
        'إعداد خطة لإعادة الإدماج المهني والاجتماعي لمنع الانتكاس.'
      ]
    },
    disability: {
      title: 'شخص ذو إعاقة يحتاج إلى بطاقة إعاقة وتأهيل وإدماج',
      urgency: 'اجتماعية وتنظيمية',
      competent: 'الهياكل الجهوية لوزارة الشؤون الاجتماعية (اللجنة الجهوية للإعاقة)',
      hotline: 'الإدارة الجهوية للشؤون الاجتماعية',
      law: 'القانون التوجيهي عدد 83 لسنة 2005 المنقح بالقانون عدد 41 لسنة 2016',
      checklist: [
        'إيداع الملف الطبي والوظيفي لدى اللجنة الجهوية للأشخاص ذوي الإعاقة.',
        'توجيه الشخص نحو مراكز التأهيل والتكوين المهني المتخصصة.',
        'تسهيل الحصول على التجهيزات والمساعدات الفنية التعويضية.',
        'متابعة ملف الترشح لمناظرات الوظيفة العمومية المخصصة بنسبة 2%.'
      ]
    }
  };

  const currentWizard = wizardData[wizardSituation];

  const handleCopyReport = () => {
    const textToCopy = `
الجمهورية التونسية
وزارة الشؤون الاجتماعية / وزارة الأسرة والمرأة والطفولة وكبار السن

تقرير بحث اجتماعي
--------------------------------------------------
الجهة الطالبة: ${reportState.requestingEntity}
موضوع البحث: ${reportState.caseSubject}
تاريخ التقرير: ${reportState.reportDate}

1. بيانات الحالة والملف:
- الاسم واللقب: ${reportState.personName}
- ب.ت.و: ${reportState.cinNumber}
- العنوان: ${reportState.address}
- الوضع الاجتماعي: ${reportState.socialStatus}

2. مصادر المعطيات وتواريخها:
${reportState.sources}

3. الوقائع المعاينة ذاتياً من قِبل الأخصائي الاجتماعي:
${reportState.observedDirectly}

4. أقوال وتصريحات الغير وأطراف العلاقة:
${reportState.reportedByOthers}

5. التقييم والاستنتاج المهني والمقترحات:
${reportState.professionalAssessment}

--------------------------------------------------
محرر التقرير: ${reportState.workerName}
الصفة: ${reportState.workerTitle}
الهيكل المشغل: ${reportState.institution}
التوقيع والختم المهني: .......................................
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs text-stone-500 font-medium mb-1">
            الباب الخامس والسابع من المرجع · أدوات الممارسة الميدانية
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
            أدوات الأخصائي الاجتماعي التفاعلية
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            مولد هيكل التقرير الاجتماعي النموذجي وفق القاعدة الذهبية، وموجه مسار التدخل والإحالة
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg border border-stone-200 no-print self-start md:self-auto">
          <button
            onClick={() => setActiveTab('report-generator')}
            className={`px-3.5 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              activeTab === 'report-generator'
                ? 'bg-stone-900 text-white shadow-xs font-semibold'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            مولد التقرير الاجتماعي
          </button>
          <button
            onClick={() => setActiveTab('referral-wizard')}
            className={`px-3.5 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              activeTab === 'referral-wizard'
                ? 'bg-stone-900 text-white shadow-xs font-semibold'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            موجه مسارات الإحالة
          </button>
        </div>
      </div>

      {/* TAB 1: REPORT GENERATOR */}
      {activeTab === 'report-generator' && (
        <div className="space-y-8">
          
          {/* Golden Rule Banner */}
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-5 text-amber-950 text-xs sm:text-sm leading-relaxed space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
              <span>القاعدة الذهبية الملزمة في تحرير التقرير الاجتماعي التونسي:</span>
            </div>
            <p className="font-serif-ar">
              «يُفَرّق في التقرير بين ما عاينه الأخصائي بنفسه، وما نقله عنه الغير، وما استنتجه هو. وبهذا الفصل يحفظ التقرير مصداقيته ويحمي صاحبه ويحمي المعني به.»
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Editor Column */}
            <div className="lg:col-span-6 bg-white border border-stone-200 rounded-xl p-6 shadow-2xs space-y-5 no-print">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  محرر حقول التقرير الاجتماعي
                </span>
                <button
                  onClick={() => {
                    setReportState({
                      requestingEntity: '',
                      caseSubject: '',
                      personName: '',
                      cinNumber: '',
                      address: '',
                      socialStatus: '',
                      sources: '',
                      observedDirectly: '',
                      reportedByOthers: '',
                      professionalAssessment: '',
                      workerName: authorProfile.name,
                      workerTitle: 'أخصائي اجتماعي',
                      institution: authorProfile.institution,
                      reportDate: new Date().toLocaleDateString('ar-TN')
                    });
                  }}
                  className="text-xs text-stone-500 hover:text-rose-700 inline-flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>تفريغ الحقول</span>
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-stone-800 block mb-1">الجهة الطالبة للتقرير:</label>
                  <input
                    type="text"
                    value={reportState.requestingEntity}
                    onChange={(e) => setReportState({ ...reportState, requestingEntity: e.target.value })}
                    className="w-full border border-stone-300 rounded p-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    placeholder="مثلاً: قاضي الأسرة بالمحكمة الابتدائية، مندوب حماية الطفولة..."
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-800 block mb-1">موضوع البحث / الغاية من التقرير:</label>
                  <input
                    type="text"
                    value={reportState.caseSubject}
                    onChange={(e) => setReportState({ ...reportState, caseSubject: e.target.value })}
                    className="w-full border border-stone-300 rounded p-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    placeholder="موضوع التدخل أو البحث الاجتماعي..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-stone-800 block mb-1">الاسم واللقب:</label>
                    <input
                      type="text"
                      value={reportState.personName}
                      onChange={(e) => setReportState({ ...reportState, personName: e.target.value })}
                      className="w-full border border-stone-300 rounded p-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-800 block mb-1">رقم ب.ت.و / المعرف:</label>
                    <input
                      type="text"
                      value={reportState.cinNumber}
                      onChange={(e) => setReportState({ ...reportState, cinNumber: e.target.value })}
                      className="w-full border border-stone-300 rounded p-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-stone-800 block mb-1">العنوان والمقر السكني:</label>
                  <input
                    type="text"
                    value={reportState.address}
                    onChange={(e) => setReportState({ ...reportState, address: e.target.value })}
                    className="w-full border border-stone-300 rounded p-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-800 block mb-1">مصادر المعطيات والتواريخ الميدانية:</label>
                  <textarea
                    rows={2}
                    value={reportState.sources}
                    onChange={(e) => setReportState({ ...reportState, sources: e.target.value })}
                    className="w-full border border-stone-300 rounded p-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    placeholder="المقابلات، الزيارات المنزلية، استشارة الوثائق..."
                  />
                </div>

                {/* Golden Rule Section 1 */}
                <div className="bg-amber-50/40 p-3 rounded border border-amber-200">
                  <label className="font-bold text-amber-950 block mb-1">
                    أولاً: الوقائع المعاينة ذاتياً من قِبل الأخصائي:
                  </label>
                  <span className="text-[11px] text-stone-500 block mb-1.5">
                    (ما شاهده وسمعه الأخصائي شخصياً في الزيارة الميدانية أو المقابلة دون وسيط)
                  </span>
                  <textarea
                    rows={3}
                    value={reportState.observedDirectly}
                    onChange={(e) => setReportState({ ...reportState, observedDirectly: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded p-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 font-serif-ar"
                  />
                </div>

                {/* Golden Rule Section 2 */}
                <div className="bg-stone-50 p-3 rounded border border-stone-200">
                  <label className="font-bold text-stone-900 block mb-1">
                    ثانياً: أقوال وتصريحات الغير وأطراف العلاقة:
                  </label>
                  <span className="text-[11px] text-stone-500 block mb-1.5">
                    (أقوال الأب، الأم، الأبناء، الجيران بصيغة النقل الصريح: "صرّح فلان...")
                  </span>
                  <textarea
                    rows={3}
                    value={reportState.reportedByOthers}
                    onChange={(e) => setReportState({ ...reportState, reportedByOthers: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded p-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 font-serif-ar"
                  />
                </div>

                {/* Golden Rule Section 3 */}
                <div className="bg-stone-50 p-3 rounded border border-stone-200">
                  <label className="font-bold text-stone-900 block mb-1">
                    ثالثاً: التقييم والاستنتاج المهني والمقترحات:
                  </label>
                  <span className="text-[11px] text-stone-500 block mb-1.5">
                    (تحليل الأخصائي العلمي، تشخيص الهشاشة، وتدابير الحماية والإحالة المقترحة)
                  </span>
                  <textarea
                    rows={4}
                    value={reportState.professionalAssessment}
                    onChange={(e) => setReportState({ ...reportState, professionalAssessment: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded p-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 font-serif-ar"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-stone-500">
                  يتم تحيين المعاينة الحية فوراً
                </span>
                <button
                  onClick={handleCopyReport}
                  className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-semibold inline-flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'تم النسخ' : 'نسخ التقرير كاملاً'}</span>
                </button>
              </div>
            </div>

            {/* Live Document Preview & Printable View */}
            <div className="lg:col-span-6 bg-white border border-stone-300 rounded-xl p-8 sm:p-10 shadow-sm space-y-6 print:border-none print:p-0">
              
              {/* Document Header in Tunisian Administrative Style */}
              <div className="text-center border-b-2 border-stone-900 pb-4 space-y-1">
                <div className="text-xs font-bold text-stone-700">الجمهورية التونسية</div>
                <div className="text-xs text-stone-600">{reportState.institution}</div>
                <h2 className="text-lg sm:text-xl font-bold text-stone-950 pt-2 tracking-wide font-editorial">
                  تقرير بحث اجتماعي
                </h2>
                <div className="text-xs text-stone-500 font-mono">
                  تاريخ التحرير: {reportState.reportDate}
                </div>
              </div>

              {/* Case info header table */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-stone-50 p-3 rounded border border-stone-200">
                <div>
                  <span className="text-stone-500">الجهة الطالبة: </span>
                  <strong className="text-stone-900">{reportState.requestingEntity || '—'}</strong>
                </div>
                <div>
                  <span className="text-stone-500">الموضوع: </span>
                  <strong className="text-stone-900">{reportState.caseSubject || '—'}</strong>
                </div>
                <div>
                  <span className="text-stone-500">المعني بالأمر: </span>
                  <span className="text-stone-900">{reportState.personName || '—'}</span>
                </div>
                <div>
                  <span className="text-stone-500">العنوان: </span>
                  <span className="text-stone-900">{reportState.address || '—'}</span>
                </div>
              </div>

              {/* Document Body following Golden Rule */}
              <div className="space-y-5 text-xs sm:text-sm text-stone-800 font-serif-ar leading-relaxed">
                
                {reportState.sources && (
                  <div>
                    <h3 className="font-bold text-stone-950 font-sans text-xs border-b border-stone-200 pb-1 mb-1">
                      1. مصادر البحث وتواريخ المعاينات:
                    </h3>
                    <p className="whitespace-pre-line text-stone-700">{reportState.sources}</p>
                  </div>
                )}

                <div>
                  <h3 className="font-bold text-stone-950 font-sans text-xs border-b border-stone-200 pb-1 mb-1">
                    2. الوقائع المعاينة ذاتياً من قِبل الأخصائي:
                  </h3>
                  <p className="whitespace-pre-line text-stone-800 bg-amber-50/20 p-2 rounded">
                    {reportState.observedDirectly || 'لم يتم إدخال معاينات مباشرة بعد.'}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-stone-950 font-sans text-xs border-b border-stone-200 pb-1 mb-1">
                    3. أقوال وتصريحات الغير:
                  </h3>
                  <p className="whitespace-pre-line text-stone-800">
                    {reportState.reportedByOthers || 'لم يتم إدخال تصريحات بعد.'}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-stone-950 font-sans text-xs border-b border-stone-200 pb-1 mb-1">
                    4. التقييم والاستنتاج المهني والمقترحات:
                  </h3>
                  <p className="whitespace-pre-line text-stone-900 font-medium bg-stone-50 p-3 rounded border border-stone-200">
                    {reportState.professionalAssessment || 'لم يتم إدخال المقترحات بعد.'}
                  </p>
                </div>

              </div>

              {/* Sign-off & Signature */}
              <div className="pt-8 border-t border-stone-200 flex items-end justify-between text-xs">
                <div className="text-stone-500">
                  نسخة موجهة للملف الإداري/القضائي
                </div>
                <div className="text-left space-y-1">
                  <div className="font-bold text-stone-900">{reportState.workerName}</div>
                  <div className="text-stone-600">{reportState.workerTitle}</div>
                  <div className="text-stone-400 text-[10px] pt-4 font-mono">
                    التوقيع والختم الإداري
                  </div>
                </div>
              </div>

              {/* Print CTA */}
              <div className="pt-4 no-print flex justify-end">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-semibold inline-flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>طباعة هذا التقرير</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* TAB 2: REFERRAL WIZARD */}
      {activeTab === 'referral-wizard' && (
        <div className="space-y-8">
          
          <div className="text-xs sm:text-sm text-stone-600 max-w-2xl">
            اختر نوع الوضعية الاجتماعية المستعجلة أو الاعتيادية لعرض مسار التعهد القانوني الدقيق، والجهة المختصة، والأرقام، وقائمة الإجراءات الأولى:
          </div>

          {/* Scenario Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { id: 'child', label: 'طفل مهدد أو معنف' },
              { id: 'woman', label: 'امرأة ضحية عنف' },
              { id: 'elderly', label: 'مسن في خطر أو بال سند' },
              { id: 'poverty', label: 'فقر مدقع وأمان اجتماعي' },
              { id: 'addiction', label: 'إدمان وصحة نفسية' },
              { id: 'disability', label: 'إعاقة وتأهيل وإدماج' }
            ].map((btn) => {
              const isSelected = wizardSituation === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => setWizardSituation(btn.id as any)}
                  className={`p-3 rounded-lg text-xs font-bold transition-all text-center border ${
                    isSelected
                      ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>

          {/* Wizard Detail Result Card */}
          <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="border-b border-stone-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-semibold text-amber-800 block">
                  مسار التعهد الميداني المعتمد
                </span>
                <h2 className="text-xl font-bold text-stone-900">
                  {currentWizard.title}
                </h2>
              </div>
              <div className="bg-rose-50 text-rose-900 border border-rose-200 px-3 py-1 rounded text-xs font-bold self-start sm:self-auto">
                درجة الاستعجال: {currentWizard.urgency}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 space-y-1">
                <span className="text-xs text-stone-500 font-semibold block">الجهة المختصة قانوناً:</span>
                <p className="text-sm font-bold text-stone-900">{currentWizard.competent}</p>
              </div>

              <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 space-y-1">
                <span className="text-xs text-stone-500 font-semibold block">الخط الأخضر والاتصال:</span>
                <p className="text-sm font-mono font-bold text-amber-800">{currentWizard.hotline}</p>
              </div>

              <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 space-y-1">
                <span className="text-xs text-stone-500 font-semibold block">السند القانوني التونسي:</span>
                <p className="text-xs font-mono text-stone-700">{currentWizard.law}</p>
              </div>

            </div>

            <div className="space-y-3 pt-2">
              <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-800" />
                <span>قائمة مراجعة الإجراءات والتدابير الأولى المطلوبة من الأخصائي:</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-700 font-serif-ar">
                {currentWizard.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 bg-[#FBF9F5] p-3 rounded border border-stone-200">
                    <span className="font-bold text-amber-800">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
