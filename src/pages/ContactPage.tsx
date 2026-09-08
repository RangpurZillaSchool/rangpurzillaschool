import React from 'react';
import { MapPin, Phone, Mail, Clock, Globe, ExternalLink, School, Info, Building2, User } from 'lucide-react';
import { schoolInfo } from '../data/schoolInfo';

export const ContactPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-institutional-navy dark:text-sky-400 mb-1">
          <MapPin className="w-4 h-4" />
          <span>যোগাযোগ ও অবস্থান</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 font-serif">
          যোগাযোগ করুন
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          বিদ্যালয় প্রশাসন, কার্যালয়ের ঠিকানা ও প্রাতিষ্ঠানিক যোগাযোগ তথ্য
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info & Office Details (7 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main Office Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Building2 className="w-5 h-5 text-institutional-navy dark:text-sky-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 font-serif">
                বিদ্যালয় কার্যালয় ও প্রশাসন
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">ঠিকানা ও ভৌগোলিক অবস্থান</div>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">{schoolInfo.address.fullBn}</p>
                  <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5 font-mono">{schoolInfo.address.fullEn}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">টেলিফোন ও অফিস মোবাইল</div>
                  <p className="mt-0.5">
                    <a
                      href={`tel:${schoolInfo.contact.phone.replace(/[^0-9+]/g, '')}`}
                      className="text-institutional-navy dark:text-sky-400 font-mono font-semibold hover:underline"
                    >
                      {schoolInfo.contact.phoneBn} ({schoolInfo.contact.phone})
                    </a>
                  </p>
                  <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">অফিস চলাকালীন ফোন করার অনুরোধ করা যাচ্ছে</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">দাপ্তরিক ই-মেইল</div>
                  <p className="mt-0.5">
                    <a
                      href={`mailto:${schoolInfo.contact.email}`}
                      className="text-institutional-navy dark:text-sky-400 font-mono font-semibold hover:underline"
                    >
                      {schoolInfo.contact.email}
                    </a>
                  </p>
                  <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">যেকোনো প্রাতিষ্ঠানিক পত্রালাপ ও তথ্যের জন্য</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">অফিস ও একাডেমিক সময়সূচি</div>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                    রবিবার – বৃহস্পতিবার: সকাল ৯:০০ – বিকাল ৫:০০
                  </p>
                  <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">
                    (শুক্রবার ও শনিবার এবং সরকারি ছুটির দিনে কার্যালয় বন্ধ থাকে)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">অফিসিয়াল ওয়েবসাইট</div>
                  <p className="mt-0.5">
                    <a
                      href={schoolInfo.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-institutional-navy dark:text-sky-400 font-mono text-xs font-semibold hover:underline"
                    >
                      <span>{schoolInfo.contact.website}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Institutional Metadata Grid */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">EIIN</div>
                <div className="font-mono font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5">{schoolInfo.eiin}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">পোস্ট কোড</div>
                <div className="font-mono font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5">{schoolInfo.address.postCode}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">থানা</div>
                <div className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5">{schoolInfo.address.thana}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">প্রতিষ্ঠাকাল</div>
                <div className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5">{schoolInfo.established}</div>
              </div>
            </div>
          </div>

          {/* Headmaster Office Note */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold text-xs sm:text-sm">
              <User className="w-4 h-4 text-institutional-navy dark:text-sky-400" />
              <span>প্রধান শিক্ষক কার্যালয়</span>
            </div>
            <div className="flex items-start gap-3.5 pt-1">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700">
                <img
                  src={schoolInfo.headmaster.photo}
                  alt={schoolInfo.headmaster.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(schoolInfo.headmaster.name)}&background=1e293b&color=38bdf8`;
                  }}
                />
              </div>
              <div className="space-y-0.5 text-xs">
                <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">{schoolInfo.headmaster.name}</div>
                <div className="text-slate-500 dark:text-slate-400">{schoolInfo.headmaster.designation} | PDS ID: {schoolInfo.headmaster.pdsId}</div>
                <div className="text-slate-600 dark:text-slate-400 pt-1">
                  মোবাইল: <a href={`tel:${schoolInfo.headmaster.mobile}`} className="font-mono font-semibold text-institutional-navy dark:text-sky-400 hover:underline">{schoolInfo.headmaster.mobile}</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map & Official Guidelines (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Map Embed Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-institutional-navy dark:text-sky-400" />
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 font-serif">
                  গুগল ম্যাপে রংপুর জিলা স্কুল
                </h2>
              </div>
              <a
                href="https://maps.google.com/?q=Rangpur+Zilla+School"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-institutional-navy dark:text-sky-400 font-semibold hover:underline"
              >
                <span>ম্যাপে খুলুন</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="h-80 w-full bg-slate-100 dark:bg-slate-800">
              <iframe
                title="Google Map Rangpur Zilla School"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.4216851216664!2d89.24357731502013!3d25.756608983638407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e32de22f676449%3A0x6a0f4a7c8db054a3!2sRangpur%20Zilla%20School!5e0!3m2!1sen!2sbd!4v1680000000000!5m2!1sen!2sbd"
                className="w-full h-full border-none"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
              কাচারী বাজার সংলগ্ন, প্রধান সড়ক, রংপুর সদর, রংপুর।
            </div>
          </div>

          {/* Official Communication Guidelines Card */}
          <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300">
              <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>দাপ্তরিক ও প্রাতিষ্ঠানিক যোগাযোগ সংক্রান্ত নির্দেশনা</span>
            </div>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
              <li>
                <strong>ভর্তি, প্রত্যয়নপত্র ও প্রশংসাপত্র:</strong> শিক্ষার্থীর ভর্তি, ছাড়পত্র (TC), প্রশংসাপত্র বা সনদ সংক্রান্ত প্রয়োজনে সরাসরি বিদ্যালয় কার্যালয়ে নির্ধারিত ফরমে আবেদন করতে হবে।
              </li>
              <li>
                <strong>অফিস সময়ে যোগাযোগ:</strong> যেকোনো তথ্য বা অনুসন্ধানের জন্য অফিস চলাকালীন (সকাল ৯:০০ – বিকাল ৫:০০) উপরোক্ত প্রাতিষ্ঠানিক ফোন বা ই-মেইলে যোগাযোগের অনুরোধ করা যাচ্ছে।
              </li>
              <li>
                <strong>অনানুষ্ঠানিক ডেমো প্রকল্প দ্রষ্টব্য:</strong> এই ওয়েবসাইটটি একটি শিক্ষামূলক ও ডেমো শিক্ষার্থী প্রকল্প। প্রাতিষ্ঠানিক কোনো আবেদন এখানে অনলাইন ফরমের মাধ্যমে গ্রহণ করা হয় না; সকল আনুষ্ঠানিক কার্যাবলি সরকারি বিধিমোতাবেক বিদ্যালয় অফিসে সরাসরি সম্পন্ন করতে হবে।
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Official Government Record Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="bg-slate-50 dark:bg-slate-800/80 px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <School className="w-4 h-4 text-institutional-navy dark:text-sky-400" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-serif">
              যোগাযোগ সংক্রান্ত সরকারি তথ্য বিবরণী (অফিসিয়াল ছক)
            </h2>
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-2.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
            EIIN: {schoolInfo.eiin}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="py-2.5 px-5 font-semibold text-slate-700 dark:text-slate-300 w-1/3 sm:w-1/4 border-r border-slate-100 dark:border-slate-800">
                  বিদ্যালয়ের নাম
                </td>
                <td className="py-2.5 px-5 text-slate-900 dark:text-slate-100 font-semibold">
                  {schoolInfo.nameBn}
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="py-2.5 px-5 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-100 dark:border-slate-800">
                  গ্রাম/বাড়ী ও সড়কের বিবরণ
                </td>
                <td className="py-2.5 px-5 text-slate-800 dark:text-slate-200">
                  {schoolInfo.address.road}
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="py-2.5 px-5 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-100 dark:border-slate-800">
                  ওয়ার্ড নম্বর
                </td>
                <td className="py-2.5 px-5 text-slate-800 dark:text-slate-200 font-mono">
                  ১৯
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="py-2.5 px-5 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-100 dark:border-slate-800">
                  ইউনিয়ন/পৌরসভা/সিটি কর্পোরেশন
                </td>
                <td className="py-2.5 px-5 text-slate-800 dark:text-slate-200">
                  {schoolInfo.address.city}
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="py-2.5 px-5 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-100 dark:border-slate-800">
                  পোস্ট অফিস
                </td>
                <td className="py-2.5 px-5 text-slate-800 dark:text-slate-200">
                  {schoolInfo.address.postOffice}
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="py-2.5 px-5 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-100 dark:border-slate-800">
                  পোস্ট কোড
                </td>
                <td className="py-2.5 px-5 text-slate-800 dark:text-slate-200 font-mono">
                  {schoolInfo.address.postCode}
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="py-2.5 px-5 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-100 dark:border-slate-800">
                  পুলিশ স্টেশন
                </td>
                <td className="py-2.5 px-5 text-slate-800 dark:text-slate-200">
                  {schoolInfo.address.policeStation}
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="py-2.5 px-5 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-100 dark:border-slate-800">
                  উপজেলা
                </td>
                <td className="py-2.5 px-5 text-slate-800 dark:text-slate-200">
                  {schoolInfo.address.upazila}
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="py-2.5 px-5 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-100 dark:border-slate-800">
                  জেলা
                </td>
                <td className="py-2.5 px-5 text-slate-800 dark:text-slate-200">
                  {schoolInfo.address.district}
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="py-2.5 px-5 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-100 dark:border-slate-800">
                  বিভাগ
                </td>
                <td className="py-2.5 px-5 text-slate-800 dark:text-slate-200">
                  {schoolInfo.address.division}
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="py-2.5 px-5 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-100 dark:border-slate-800">
                  টেলিফোন
                </td>
                <td className="py-2.5 px-5">
                  <a
                    href={`tel:${schoolInfo.contact.phone.replace(/[^0-9+]/g, '')}`}
                    className="font-mono font-bold text-institutional-navy dark:text-sky-400 hover:underline"
                  >
                    {schoolInfo.contact.phoneBn} ({schoolInfo.contact.phone})
                  </a>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="py-2.5 px-5 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-100 dark:border-slate-800">
                  E-Mail
                </td>
                <td className="py-2.5 px-5">
                  <a
                    href={`mailto:${schoolInfo.contact.email}`}
                    className="font-mono text-institutional-navy dark:text-sky-400 hover:underline"
                  >
                    {schoolInfo.contact.email}
                  </a>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="py-2.5 px-5 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-100 dark:border-slate-800">
                  Website
                </td>
                <td className="py-2.5 px-5">
                  <a
                    href={schoolInfo.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-institutional-navy dark:text-sky-400 hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>{schoolInfo.contact.website.replace(/^https?:\/\//, '')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
