import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { HistoryPage } from './pages/HistoryPage';
import { TeachersPage } from './pages/TeachersPage';
import { StudentsPage } from './pages/StudentsPage';
import { StudentStatsPage } from './pages/StudentStatsPage';
import { PaymentHistoryPage } from './pages/PaymentHistoryPage';
import { NoticesPage } from './pages/NoticesPage';
import { NoticeDetailPage } from './pages/NoticeDetailPage';
import { NewsPage } from './pages/NewsPage';
import { DownloadsPage } from './pages/DownloadsPage';
import { ExamResultsPage } from './pages/ExamResultsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        
        {/* About Routes */}
        <Route path="about" element={<Navigate to="/about/at-a-glance" replace />} />
        <Route path="about/at-a-glance" element={<AboutPage />} />
        <Route path="about/history" element={<HistoryPage />} />

        {/* Teachers */}
        <Route path="teachers" element={<TeachersPage />} />

        {/* Students */}
        <Route path="students" element={<StudentsPage />} />
        <Route path="students/statistics" element={<StudentStatsPage />} />
        <Route path="students/payments" element={<PaymentHistoryPage />} />
        <Route path="payment-history.aspx" element={<PaymentHistoryPage />} />
        <Route path="payment-history" element={<PaymentHistoryPage />} />

        {/* Notices */}
        <Route path="notices" element={<NoticesPage />} />
        <Route path="notices/:id" element={<NoticeDetailPage />} />

        {/* News & Downloads */}
        <Route path="news" element={<NewsPage />} />
        <Route path="downloads" element={<DownloadsPage />} />

        {/* Academics & Results */}
        <Route path="academics/results" element={<ExamResultsPage />} />

        {/* Media & Contact */}
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="contact" element={<ContactPage />} />

        {/* 404 Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
