import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Header } from './Header';
import { NoticeTicker } from './NoticeTicker';
import { Footer } from './Footer';
import { DisclaimerModal } from '../common/DisclaimerModal';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <DisclaimerModal />
      <TopBar />
      <Header />
      <NoticeTicker />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
