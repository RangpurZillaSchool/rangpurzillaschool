import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ShieldCheck } from 'lucide-react';
import { schoolInfo } from '../data/schoolInfo';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-institutional-navy mb-1">
          <MapPin className="w-4 h-4" />
          <span>যোগাযোগ ও অবস্থান</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
          যোগাযোগ করুন
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          বিদ্যালয় প্রশাসন, হেল্পডেস্ক ও কার্যালয়ের ঠিকানা
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info & Office Hours */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
            <h2 className="text-base font-bold text-slate-900 font-serif border-b border-slate-100 pb-3">
              বিদ্যালয় কার্যালয়
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">ঠিকানা ও অবস্থান</div>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">{schoolInfo.address.fullBn}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">টেলিফোন ও মোবাইল</div>
                  <p className="text-slate-600 mt-0.5 font-mono">{schoolInfo.contact.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">ই-মেইল</div>
                  <p className="text-slate-600 mt-0.5 font-mono">{schoolInfo.contact.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">অফিস সময়সূচি</div>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    রবিবার – বৃহস্পতিবার: সকাল ৯:০০ – বিকাল ৫:০০ <br />
                    (শুক্রবার ও শনিবার সাপ্তাহিক ছুটি)
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>EIIN: <strong>{schoolInfo.eiin}</strong></span>
              <span>থানা: <strong>কোতয়ালী</strong></span>
            </div>
          </div>

          {/* Map Embed */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs h-72">
            <iframe
              title="Google Map Rangpur Zilla School"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.4216851216664!2d89.24357731502013!3d25.756608983638407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e32de22f676449%3A0x6a0f4a7c8db054a3!2sRangpur%20Zilla%20School!5e0!3m2!1sen!2sbd!4v1680000000000!5m2!1sen!2sbd"
              className="w-full h-full border-none"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Feedback / Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 font-serif border-b border-slate-100 pb-3 mb-5">
              বার্তা বা অভিযোগ প্রেরণ করুন
            </h2>

            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-950 font-serif">
                  আপনার বার্তা সফলভাবে গৃহীত হয়েছে
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  রংপুর জিলা স্কুল প্রশাসনের পক্ষ থেকে বিষয়টি যথাসময়ে পর্যালোচনা করা হবে। ধন্যবাদ।
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-md bg-institutional-navy text-white text-xs font-semibold hover:bg-institutional-navyDark transition-colors"
                >
                  আরেকটি বার্তা পাঠান
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      আপনার নাম <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="উদাঃ মোঃ রফিকুল ইসলাম"
                      className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-institutional-navy focus:bg-white text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      মোবাইল নম্বর <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="01XXXXXXXXX"
                      className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-institutional-navy focus:bg-white text-xs sm:text-sm font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      ই-মেইল (ঐচ্ছিক)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@mail.com"
                      className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-institutional-navy focus:bg-white text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      বিষয় <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="উদাঃ ভর্তি সংক্রান্ত অনুসন্ধান"
                      className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-institutional-navy focus:bg-white text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    বিস্তারিত বার্তা <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="আপনার বার্তা বা প্রশ্ন এখানে লিখুন..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-institutional-navy focus:bg-white text-xs sm:text-sm"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-md bg-institutional-navy hover:bg-institutional-navyDark text-white font-semibold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>বার্তা প্রেরণ করুন</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
