export interface Teacher {
  sl: number;
  pdsId: string;
  name: string;
  originalPost: string;
  designation: string;
  joiningDate: string;
  homeDistrict: string;
  mobile: string;
  photo: string | null;
}

export interface Student {
  roll: string;
  id: string;
  name: string;
  photo: string | null;
}

export interface Notice {
  id: string;
  sl: string;
  title: string;
  date: string;
  attachmentUrl?: string;
  fileUrl?: string;
  fileType?: 'image' | 'pdf';
  description?: string;
  lastUpdate?: string;
}

export interface NewsItem {
  id: string;
  sl: string;
  title: string;
  date: string;
  description?: string;
}

export interface DownloadItem {
  sl: string;
  title: string;
  date: string;
  fileUrl: string;
}

export interface StudentSectionStat {
  className: string;
  shift: string;
  section: string;
  total: number;
  muslim: number;
  hindu: number;
  science: number;
  business: number;
  humanities: number;
}

export interface ExamResult {
  examName: string;
  year: string;
  total: number;
  passed: number;
  gpa5: number;
  passRate: string;
  scholarships: number;
}

export interface PaymentStudentInfo {
  id: string;
  name: string;
  session: string;
  className: string;
  shift: string;
  section: string;
  roll: string;
  photo: string | null;
}

export interface PaymentQuarterOption {
  value: string;
  label: string;
}

export interface PaymentReceiptItem {
  head: string;
  amount: string;
}

export interface PaymentReceipt {
  quarter: string;
  date: string;
  trxId: string;
  status: string;
  items: PaymentReceiptItem[];
  totalGovt: string;
  totalNonGovt: string;
  grandTotal: string;
}

export interface PaymentHistoryResponse {
  success: boolean;
  message?: string;
  student?: PaymentStudentInfo;
  quarters?: PaymentQuarterOption[];
  selectedQuarter?: string;
  receipt?: PaymentReceipt | null;
}

