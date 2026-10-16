import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { referralDirectory } from '../data/referenceData';
import { ReferralItem } from '../types';
import { 
  PhoneCall, 
  ShieldAlert, 
  AlertTriangle, 
  Printer, 
  Search, 
  Building2, 
  Scale, 
  Clock, 
  CheckCircle2,
  FileCheck
} from 'lucide-react';

export const ReferralMapView: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'emergency' | 'social'>('all');
  const [search, setSearch] = useState('');

  const filteredItems = referralDirectory.filter(item => {
    const matchesType = 
      filterType === 'all' || 
      (filterType === 'emergency' && item.isEmergency) ||
      (filterType === 'social' && !item.isEmergency);
    
    const q = search.trim().toLowerCase();
    const matchesSearch = !q ||
      item.situation.toLowerCase().includes(q) ||
      item.competentEntity.toLowerCase().includes(q) ||
      item.notes.toLowerCase().includes(q) ||
      (item.contactNumber && item.contactNumber.includes(q));

    return matchesType && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs text-stone-500 font-medium mb-1">
            الباب الثامن من الدليل المرجعي · خريطة الإحالة والتشبيك
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
            دليل الإحالة السريعة والخطوط الخضراء التونسية
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            تحديد الجهة المختصة قانونياً في كل وضعية اجتماعية أو طارئة، ومسارات التعهد الآمن
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="no-print px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg inline-flex items-center gap-2 self-start md:self-auto"
        >
          <Printer className="w-4 h-4" />
          <span>طباعة دليل الإحالة</span>
        </button>
      </div>

      {/* Emergency First Rule Box */}
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 text-rose-950 space-y-2">
        <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
          <ShieldAlert className="w-5 h-5 text-rose-700" />
          <span>القاعدة الإجرائية في الحالات الاستعجالية والخطرة:</span>
        </div>
        <p className="text-xs sm:text-sm font-serif-ar leading-relaxed text-rose-900">
          في الحالات الاستعجالية التي تمس حياة الأشخاص أو سلامتهم البدنية أو النفسية (كالاعتداء الوشيك، محاولات الانتحار، الطوارئ الطبية)، 
          <strong className="mx-1 font-bold">تُقدّم الحماية الفورية والإنقاذ على كل إجراء إداري أو توثيقي لاحق</strong>.
        </p>
      </div>

      {/* Direct Hotlines Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <a
          href="tel:1899"
          className="bg-white border border-stone-200 hover:border-amber-600 rounded-xl p-4 text-center transition-colors shadow-2xs space-y-1 block"
        >
          <div className="text-xs text-stone-500">العنف ضد المرأة (24/7)</div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-amber-800">1899</div>
          <div className="text-[10px] text-stone-400">مجاني على مدار الساعة</div>
        </a>

        <a
          href="tel:1809"
          className="bg-white border border-stone-200 hover:border-amber-600 rounded-xl p-4 text-center transition-colors shadow-2xs space-y-1 block"
        >
          <div className="text-xs text-stone-500">الطفولة وكبار السن</div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-amber-800">1809</div>
          <div className="text-[10px] text-stone-400">الإشعار والتوجيه الفوري</div>
        </a>

        <a
          href="tel:190"
          className="bg-white border border-stone-200 hover:border-stone-900 rounded-xl p-4 text-center transition-colors shadow-2xs space-y-1 block"
        >
          <div className="text-xs text-stone-500">الإسعاف الطبي (SAMU)</div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-stone-900">190</div>
          <div className="text-[10px] text-stone-400">طوارئ صحية وحوادث</div>
        </a>

        <a
          href="tel:198"
          className="bg-white border border-stone-200 hover:border-stone-900 rounded-xl p-4 text-center transition-colors shadow-2xs space-y-1 block"
        >
          <div className="text-xs text-stone-500">الحماية المدنية</div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-stone-900">198</div>
          <div className="text-[10px] text-stone-400">حرائق وكوارث وإنقاذ</div>
        </a>

        <a
          href="tel:197"
          className="bg-white border border-stone-200 hover:border-stone-900 rounded-xl p-4 text-center transition-colors shadow-2xs space-y-1 block"
        >
          <div className="text-xs text-stone-500">الأمن الوطني (الشرطة)</div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-stone-900">197</div>
          <div className="text-[10px] text-stone-400">مناطق الشرطة والمدن</div>
        </a>

        <a
          href="tel:193"
          className="bg-white border border-stone-200 hover:border-stone-900 rounded-xl p-4 text-center transition-colors shadow-2xs space-y-1 block"
        >
          <div className="text-xs text-stone-500">الحرس الوطني</div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-stone-900">193</div>
          <div className="text-[10px] text-stone-400">المناطق غير الحضرية</div>
        </a>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث في الوضعية (مثلاً: طفل، نفقة، إدمان، مسن، إعاقة)..."
            className="w-full bg-white border border-stone-300 rounded-lg pl-9 pr-9 py-2 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
          />
          <Search className="w-4 h-4 text-stone-400 absolute right-3 top-2.5" />
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg border border-stone-200 w-full sm:w-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              filterType === 'all' ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            جميع الوضعيات ({referralDirectory.length})
          </button>
          <button
            onClick={() => setFilterType('emergency')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              filterType === 'emergency' ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            الاستعجالية والطارئة
          </button>
          <button
            onClick={() => setFilterType('social')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              filterType === 'social' ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            الإجراءات الاجتماعية والمؤسسية
          </button>
        </div>
      </div>

      {/* Main Referral Matrix Table */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-stone-100 text-stone-900 border-b border-stone-300">
                <th className="p-3.5 font-bold w-1/4">الوضعية الاجتماعية أو القانونية</th>
                <th className="p-3.5 font-bold w-1/3">الجهة المختصة قانوناً ومسار التعهد</th>
                <th className="p-3.5 font-bold w-1/8">الاتصال / الرقم</th>
                <th className="p-3.5 font-bold">المقتضيات القانونية والملاحظات الإجرائية</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, idx) => (
                <tr 
                  key={item.id}
                  className={`border-b border-stone-200 hover:bg-stone-50/70 transition-colors ${
                    item.isEmergency ? 'bg-rose-50/20' : ''
                  }`}
                >
                  <td className="p-3.5 align-top">
                    <div className="font-bold text-stone-900">
                      {item.situation}
                    </div>
                    {item.isEmergency && (
                      <span className="text-[11px] text-rose-700 font-semibold block mt-1">
                        ● حالة طارئة / أولوية قصوى
                      </span>
                    )}
                  </td>

                  <td className="p-3.5 align-top font-serif-ar leading-relaxed text-stone-800">
                    {item.competentEntity}
                  </td>

                  <td className="p-3.5 align-top font-mono font-bold">
                    {item.contactNumber ? (
                      <a
                        href={`tel:${item.contactNumber.replace(/[^0-9]/g, '')}`}
                        className="text-amber-800 hover:underline inline-flex items-center gap-1"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-amber-700" />
                        <span>{item.contactNumber}</span>
                      </a>
                    ) : (
                      <span className="text-stone-400 text-xs font-normal font-sans">
                        عبر الهيكل المحلي
                      </span>
                    )}
                  </td>

                  <td className="p-3.5 align-top text-stone-600 font-serif-ar leading-relaxed text-xs">
                    <p>{item.notes}</p>
                    {item.legalReference && (
                      <span className="block mt-1 font-mono text-stone-500 text-[11px]">
                        السند: {item.legalReference}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reporting Duty vs Professional Secrecy Advisory Box */}
      <div className="bg-[#F7F4EE] border border-stone-300 rounded-xl p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <Scale className="w-5 h-5 text-amber-800" />
          <span>ضوابط التوفيق بين السر المهني (فصل 254) وواجب الإشعار القانوني</span>
        </h3>
        <div className="text-xs sm:text-sm text-stone-700 font-serif-ar leading-relaxed space-y-2">
          <p>
            القاعدة أن السر المهني ليس مطلقاً، بل يسقط حيث يوجب القانون صراحة الإشعار، وخاصة لحماية الأطفال المهددين (مجلة حماية الطفل) وحالات العنف الشديد. يُوصى الأخصائي باتباع الخطوات التالية:
          </p>
          <ul className="space-y-1.5 list-disc list-inside pr-2 text-stone-800">
            <li>الاقتصار الدقيق على المعطيات الضرورية لغاية الحماية وتفادي الحشو غير المفيد.</li>
            <li>إعلام المعني بالأمر ما لم يكن في ذلك خطر جسدي أو معنوي إضافي عليه.</li>
            <li>توجيه الإشعار للجهة المخولة حصراً (مندوب حماية الطفولة أو النيابة العمومية).</li>
            <li>توثيق حيثيات وأسباب الإشعار في ملف الحالة بالوحدة المحلية أو المؤسسة.</li>
          </ul>
        </div>
      </div>

    </div>
  );
};
