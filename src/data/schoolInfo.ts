export interface SchoolInfo {
  nameBn: string;
  nameEn: string;
  eiin: string;
  established: string;
  founders: string;
  type: string;
  shifts: string[];
  levels: string;
  totalStudents: number;
  totalTeachers: number;
  address: {
    road: string;
    ward: string;
    city: string;
    postOffice: string;
    postCode: string;
    policeStation: string;
    thana: string;
    upazila: string;
    district: string;
    division: string;
    fullBn: string;
    fullEn: string;
  };
  contact: {
    phone: string;
    phoneBn: string;
    email: string;
    website: string;
    facebook: string;
  };
  headmaster: {
    name: string;
    designation: string;
    pdsId: string;
    joiningDate: string;
    mobile: string;
    photo: string;
    message: string;
  };
  historyNarrative: string[];
}

export const schoolInfo: SchoolInfo = {
  nameBn: "রংপুর জিলা স্কুল",
  nameEn: "Rangpur Zilla School",
  eiin: "127372",
  established: "১৮৩২ খ্রিষ্টাব্দ",
  founders: "লর্ড উইলিয়াম বেন্টিংক ও স্থানীয় জমিদারবর্গ",
  type: "সরকারি বালক উচ্চ বিদ্যালয়",
  shifts: ["প্রভাতি (Morning)", "দিবা (Day)"],
  levels: "৩য় শ্রেণি থেকে ১০ম শ্রেণি (এসএসসি)",
  totalStudents: 2109,
  totalTeachers: 55,
  address: {
    road: "প্রধান সড়ক, কাচারী বাজার",
    ward: "১৯ নম্বর ওয়ার্ড",
    city: "সিটি কর্পোরেশন",
    postOffice: "রংপুর",
    postCode: "৫৪০০",
    policeStation: "কোতয়ালী",
    thana: "কোতয়ালী",
    upazila: "রংপুর সদর",
    district: "রংপুর",
    division: "রংপুর",
    fullBn: "প্রধান সড়ক, কাচারী বাজার, ১৯ নম্বর ওয়ার্ড, কোতয়ালী, রংপুর সদর, রংপুর - ৫৪০০",
    fullEn: "Main Road, Kachari Bazar, Ward 19, Kotwali, Rangpur Sadar, Rangpur - 5400"
  },
  contact: {
    phone: "01339-127372",
    phoneBn: "০১৩৩৯১২৭৩৭২",
    email: "rzsrangpur@gmail.com",
    website: "http://www.rangpurzillaschool.edu.bd",
    facebook: "https://facebook.com"
  },
  headmaster: {
    name: "মোঃ আবুল কালাম আজাদ",
    designation: "প্রধান শিক্ষক",
    pdsId: "2016205603",
    joiningDate: "১৬.০১.২০২৪",
    mobile: "01716-386096",
    photo: "/headmaster.jpg",
    message: "রংপুর জিলা স্কুল ১৮৩২ সাল থেকে উত্তরবঙ্গের বাতিঘর হিসেবে শিক্ষার আলো ছড়িয়ে আসছে। মানসম্মত শিক্ষা, সুশৃঙ্খল চরিত্র গঠন এবং মেধার সার্বিক বিকাশে আমাদের শিক্ষক-শিক্ষিকাবৃন্দ নিরলসভাবে কাজ করে যাচ্ছেন। আধুনিক তথ্যপ্রযুক্তির সাথে তাল মিলিয়ে আমরা একটি তথ্যসমৃদ্ধ, স্বচ্ছ এবং যুগোপযোগী ডিজিটাল শিক্ষা ব্যবস্থা বিনির্মাণে অঙ্গীকারাবদ্ধ।"
  },
  historyNarrative: [
    "অখন্ড বাংলার উত্তর জনপদে শিক্ষার আলো জ্বালানোর জন্য রংপুর এবং এর নিকটবর্তী এলাকার জমিদারবর্গের উদার মনোবৃত্তির ফলশ্রুতি আজকের ‘রংপুর জিলা স্কুল’।",
    "১৮৩২ সালে বাংলার তৎকালীন গভর্ণর লর্ড উইলিয়াম বেন্টিংক ‘জমিদার স্কুল’ নামে এ বিদ্যালয়ের ভিত্তিপ্রস্তর স্থাপন করেন। ইতোপূর্বে ১৮২৮ সালে (জনশ্রুত অনুযায়ী ১৮২৫ সালে) এর শিখন কার্যক্রম শুরু হয়।",
    "অনেক চড়াই-উতরাই পেরিয়ে বিদ্যালয়টি উন্নতির পথে অগ্রসর হয়। ১৮৬২ সালে তৎকালীন ব্রিটিশ ভারতের প্রাদেশিক সরকারের শিক্ষা বিভাগের আওতায় বিদ্যালয়টি পূর্ণাঙ্গ সরকারি ‘রংপুর জিলা স্কুল’ হিসেবে আত্মপ্রকাশ করে।",
    "দীর্ঘ প্রায় দুই শতাব্দীর পথপরিক্রমায় এ বিদ্যালয় দেশের প্রখ্যাত শিক্ষাবিদ, বিজ্ঞানী, চিকিৎসক, প্রকৌশলী, আমলা, সাহিত্যিক ও জাতীয় নেতৃবৃন্দ তৈরি করেছে। শতবর্ষের ঐতিহ্য ও গৌরবে সমুজ্জ্বল এ প্রতিষ্ঠান উত্তরবঙ্গের অন্যতম শ্রেষ্ঠ বিদ্যাপীঠ হিসেবে আজ সুপ্রতিষ্ঠিত।"
  ]
};
