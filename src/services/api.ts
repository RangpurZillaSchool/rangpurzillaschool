import { Teacher, Notice, NewsItem, DownloadItem, Student, StudentSectionStat, ExamResult } from '../types';
import teachersData from '../data/teachers.json';
import noticesData from '../data/notices.json';
import newsData from '../data/news.json';
import downloadsData from '../data/downloads.json';
import statsData from '../data/student_stats.json';
import examData from '../data/exam_results.json';
import galleryData from '../data/gallery.json';

const API_TIMEOUT = 5000;

// In-flight client promise map to deduplicate identical concurrent component requests
const clientInFlight = new Map<string, Promise<Response>>();

async function fetchWithTimeout(url: string, timeoutMs = API_TIMEOUT): Promise<Response> {
  const existing = clientInFlight.get(url);
  if (existing) {
    // Clone response for each caller so body can be read independently
    const res = await existing;
    return res.clone();
  }

  const promise = (async () => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    } finally {
      // Clear after completion so future distinct actions can re-query
      setTimeout(() => clientInFlight.delete(url), 100);
    }
  })();

  clientInFlight.set(url, promise);
  const finalRes = await promise;
  return finalRes.clone();
}

export const api = {
  // Notices
  async getNotices(): Promise<Notice[]> {
    try {
      const res = await fetchWithTimeout('/api/notices');
      if (res.ok) {
        const data = await res.json();
        if (data.notices && data.notices.length > 0) {
          return data.notices;
        }
      }
    } catch (err) {
      console.warn('Live notices fetch failed, using verified fallback:', err);
    }
    return noticesData as Notice[];
  },

  async getNoticeById(id: string): Promise<Notice | null> {
    try {
      const res = await fetchWithTimeout(`/api/notices/${id}`);
      if (res.ok) {
        const data = await res.json();
        return {
          id: data.id,
          sl: '',
          title: data.title,
          date: '',
          description: data.description,
          attachmentUrl: data.fileUrl,
          lastUpdate: data.lastUpdate
        };
      }
    } catch (err) {
      console.warn(`Live notice details fetch failed for ${id}:`, err);
    }
    const found = (noticesData as Notice[]).find(n => n.id === id);
    return found || null;
  },

  // News
  async getNews(): Promise<NewsItem[]> {
    try {
      const res = await fetchWithTimeout('/api/news');
      if (res.ok) {
        const data = await res.json();
        if (data.news && data.news.length > 0) {
          return data.news;
        }
      }
    } catch (err) {
      console.warn('Live news fetch failed, using fallback:', err);
    }
    return newsData as NewsItem[];
  },

  // Downloads
  async getDownloads(): Promise<DownloadItem[]> {
    try {
      const res = await fetchWithTimeout('/api/downloads');
      if (res.ok) {
        const data = await res.json();
        if (data.downloads && data.downloads.length > 0) {
          return data.downloads;
        }
      }
    } catch (err) {
      console.warn('Live downloads fetch failed, using fallback:', err);
    }
    return downloadsData as DownloadItem[];
  },

  // Teachers
  async getTeachers(): Promise<Teacher[]> {
    try {
      const res = await fetchWithTimeout('/api/teachers');
      if (res.ok) {
        const data = await res.json();
        if (data.teachers && data.teachers.length > 0) {
          return data.teachers;
        }
      }
    } catch (err) {
      console.warn('Live teachers fetch failed, using fallback:', err);
    }
    return teachersData as Teacher[];
  },

  // Student Filter Options
  async getStudentOptions(cls?: string, shift?: string) {
    try {
      const params = new URLSearchParams();
      if (cls) params.set('class', cls);
      if (shift) params.set('shift', shift);
      const res = await fetchWithTimeout(`/api/students/options?${params.toString()}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('Live student options fetch failed, using calculated options:', err);
    }

    // Static fallback options
    const classes = [
      { value: 'Three', label: 'শ্রেণি ৩ (Class Three)' },
      { value: 'Four', label: 'শ্রেণি ৪ (Class Four)' },
      { value: 'Five', label: 'শ্রেণি ৫ (Class Five)' },
      { value: 'Six', label: 'শ্রেণি ৬ (Class Six)' },
      { value: 'Seven', label: 'শ্রেণি ৭ (Class Seven)' },
      { value: 'Eight', label: 'শ্রেণি ৮ (Class Eight)' },
      { value: 'Nine', label: 'শ্রেণি ৯ (Class Nine)' },
      { value: 'Ten', label: 'শ্রেণি ১০ (Class Ten)' },
      { value: 'S.S.C', label: 'এসএসসি (S.S.C)' }
    ];

    const shifts = [
      { value: 'Morning', label: 'প্রভাতি শাখা (Morning)' },
      { value: 'Day', label: 'দিবা শাখা (Day)' }
    ];

    const sections = (shift && shift.toLowerCase() === 'day')
      ? [{ value: 'B', label: 'শাখা খ (Section B)' }, { value: 'D', label: 'শাখা ঘ (Section D)' }]
      : [{ value: 'A', label: 'শাখা ক (Section A)' }, { value: 'C', label: 'শাখা গ (Section C)' }];

    return { classes, shifts, sections };
  },

  // Live Student Query - Strictly live from legacy server, NEVER fallback to local individual records
  async getStudents(cls: string, shift: string, section: string): Promise<{
    students: Student[];
    total: number;
    unavailable?: boolean;
    code?: string;
    message?: string;
  }> {
    try {
      const res = await fetchWithTimeout(
        `/api/students?class=${encodeURIComponent(cls)}&shift=${encodeURIComponent(shift)}&section=${encodeURIComponent(section)}`,
        15000
      );
      const data = await res.json().catch(() => ({}));
      if (res.ok && !data.error) {
        return {
          students: data.students || [],
          total: data.total || (data.students ? data.students.length : 0),
          unavailable: false
        };
      }

      return {
        students: [],
        total: 0,
        unavailable: true,
        code: data.code || 'LEGACY_UNAVAILABLE',
        message: data.message || 'Student information is temporarily unavailable.'
      };
    } catch (err: any) {
      console.warn(`Live student fetch failed for ${cls}/${shift}/${section}:`, err);
      return {
        students: [],
        total: 0,
        unavailable: true,
        code: 'LEGACY_UNAVAILABLE',
        message: 'Student information is temporarily unavailable.'
      };
    }
  },

  // Student Section Statistics
  getStudentStats(): StudentSectionStat[] {
    return statsData as StudentSectionStat[];
  },

  // Public Exam Results
  getExamResults(): ExamResult[] {
    return examData as ExamResult[];
  },

  // Photo Gallery
  getGalleryPhotos(): string[] {
    return galleryData as string[];
  }
};
