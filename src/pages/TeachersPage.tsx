import React, { useState, useEffect } from 'react';
import { Search, Users, Phone, MapPin, Calendar, Award, LayoutGrid, List } from 'lucide-react';
import { api } from '../services/api';
import { Teacher } from '../types';

export const TeachersPage: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  useEffect(() => {
    api.getTeachers().then(data => {
      setTeachers(data);
      setLoading(false);
    });
  }, []);

  const subjects = [
    { value: 'all', label: 'সকল শিক্ষক (৫৫)' },
    { value: 'প্রধান শিক্ষক', label: 'প্রশাসন / প্রধান' },
    { value: 'বাংলা', label: 'বাংলা' },
    { value: 'ইংরেজি', label: 'ইংরেজি' },
    { value: 'গণিত', label: 'গণিত' },
    { value: 'বিজ্ঞান', label: 'বিজ্ঞান' },
    { value: 'সামাজিক', label: 'সামাজিক বিজ্ঞান' },
    { value: 'ধর্ম', label: 'ধর্ম' },
    { value: 'চারুকলা', label: 'চারুকলা' },
    { value: 'শারীরিক', label: 'শারীরিক শিক্ষা' },
  ];

  const filteredTeachers = teachers.filter(t => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      t.name.toLowerCase().includes(q) ||
      t.designation.toLowerCase().includes(q) ||
      t.pdsId.includes(q) ||
      t.homeDistrict.toLowerCase().includes(q)
    );

    const matchesSubject = selectedSubject === 'all' || (
      t.originalPost.includes(selectedSubject) ||
      t.designation.includes(selectedSubject)
    );

    return matchesSearch && matchesSubject;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-institutional-navy mb-1">
              <Users className="w-4 h-4" />
              <span>কর্মরত শিক্ষক ও কর্মকর্তা পরিচিতি</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
              শিক্ষক ও কর্মচারীবৃন্দ
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              সরকারি মাধ্যমিক ও উচ্চ শিক্ষা অধিদপ্তর (পিডিএস) অনুমোদিত বর্তমান কর্মরত শিক্ষকমণ্ডলী
            </p>
          </div>

          <div className="bg-institutional-navy text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono self-start sm:self-auto shadow-xs">
            মোট শিক্ষক: {teachers.length} জন
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="শিক্ষকের নাম, পদবী, পিডিএস আইডি বা জেলা দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md pl-9 pr-4 py-2 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-institutional-navy focus:bg-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          {/* View Toggles */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-md p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-sm ${viewMode === 'grid' ? 'bg-white shadow-xs text-institutional-navy font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
                title="কার্ড ভিউ"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-sm ${viewMode === 'table' ? 'bg-white shadow-xs text-institutional-navy font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
                title="টেবিল ভিউ"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Subject Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none text-xs">
          {subjects.map(s => (
            <button
              key={s.value}
              onClick={() => setSelectedSubject(s.value)}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all font-medium ${
                selectedSubject === s.value
                  ? 'bg-institutional-navy text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Teachers Display */}
      {loading ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-sm text-slate-600">
          শিক্ষক তালিকা লোড হচ্ছে...
        </div>
      ) : filteredTeachers.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-sm text-slate-600">
          কোন শিক্ষকের তথ্য পাওয়া যায়নি। অনুগ্রহ করে অন্য নামে অনুসন্ধান করুন।
        </div>
      ) : viewMode === 'grid' ? (
        /* Card Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.pdsId}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-institutional-navy hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Photo & Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-16 h-20 rounded-md overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <img
                      src={teacher.photo || ''}
                      alt={teacher.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&background=0f2b5c&color=fff&size=100`;
                      }}
                    />
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-sm border border-slate-200">
                      PDS: {teacher.pdsId}
                    </span>
                    <div className="text-[11px] text-slate-400 mt-1 font-mono">
                      #{teacher.sl}
                    </div>
                  </div>
                </div>

                {/* Name & Designation */}
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-institutional-navy leading-snug">
                  {teacher.name}
                </h3>
                <p className="text-xs font-semibold text-emerald-800 mt-1">
                  {teacher.designation}
                </p>
                {teacher.originalPost !== teacher.designation && (
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    মূলপদ: {teacher.originalPost}
                  </p>
                )}
              </div>

              {/* Metadata */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>যোগদান: {teacher.joiningDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>নিজ জেলা: {teacher.homeDistrict}</span>
                </div>
                {teacher.mobile && (
                  <div className="flex items-center gap-2 text-institutional-navy font-medium">
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    <a href={`tel:${teacher.mobile}`} className="hover:underline font-mono">
                      {teacher.mobile}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 w-12 text-center">ক্রমিক</th>
                  <th className="py-3 px-4 w-16 text-center">ছবি</th>
                  <th className="py-3 px-4 w-28">PDS আইডি</th>
                  <th className="py-3 px-4">শিক্ষকের নাম</th>
                  <th className="py-3 px-4">পদবী ও বিষয়</th>
                  <th className="py-3 px-4">যোগদান</th>
                  <th className="py-3 px-4">নিজ জেলা</th>
                  <th className="py-3 px-4">মোবাইল নম্বর</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher.pdsId} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-4 text-center font-mono text-slate-500">
                      {teacher.sl}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <div className="w-9 h-11 rounded-sm overflow-hidden bg-slate-100 border border-slate-200 mx-auto">
                        <img
                          src={teacher.photo || ''}
                          alt={teacher.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&background=0f2b5c&color=fff&size=60`;
                          }}
                        />
                      </div>
                    </td>
                    <td className="py-2.5 px-4 font-mono font-medium text-slate-600">
                      {teacher.pdsId}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900">
                      {teacher.name}
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="font-medium text-emerald-800">{teacher.designation}</div>
                      {teacher.originalPost !== teacher.designation && (
                        <div className="text-[11px] text-slate-500">{teacher.originalPost}</div>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-slate-600">
                      {teacher.joiningDate}
                    </td>
                    <td className="py-2.5 px-4 text-slate-600">
                      {teacher.homeDistrict}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-institutional-navy font-medium">
                      {teacher.mobile}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
