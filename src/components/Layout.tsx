import React from 'react';
import { Navbar } from './ui/navbar';
import { Footer } from './ui/footer';
import { CryptoTicker } from './CryptoTicker';

interface LayoutProps {
  children: React.ReactNode;
  showTicker?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, showTicker = true }) => {
  return (
    <div className="min-h-screen mesh-bg">
      <Navbar />
      {showTicker && <div className="pt-16 hidden sm:block"><CryptoTicker /></div>}
      <main className={showTicker ? 'pt-0' : 'pt-16'}>
        {children}
      </main>
      <Footer />
    </div>
  );
};
