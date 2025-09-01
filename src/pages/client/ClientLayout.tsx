import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { CryptoTicker } from '../../components/CryptoTicker';
import { 
  LayoutDashboard, 
  Target, 
  Wallet, 
  Repeat, 
  History, 
  Bell, 
  User, 
  HeadphonesIcon,
  FileText,
  Zap
} from 'lucide-react';

export const ClientLayout: React.FC = () => {
  const location = useLocation();

  const sidebarItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      href: '/client/dashboard'
    },
    {
      icon: Target,
      label: 'Plans',
      href: '/client/plans'
    },
    {
      icon: Wallet,
      label: 'Portefeuille',
      href: '/client/wallet'
    },
    {
      icon: Repeat,
      label: 'Échange',
      href: '/client/exchange'
    },
    {
      icon: History,
      label: 'Historique',
      href: '/client/history'
    },
    {
      icon: Bell,
      label: 'Notifications',
      href: '/client/notifications'
    },
    {
      icon: User,
      label: 'Profil',
      href: '/client/profile'
    },
    {
      icon: HeadphonesIcon,
      label: 'Support',
      href: '/client/support'
    },
    {
      icon: FileText,
      label: 'Documents',
      href: '/client/documents'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen mesh-bg">
      <CryptoTicker />
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen glass-effect border-r border-primary/20 fixed left-0 top-0 pt-20 z-40">
          <div className="p-6">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 mb-8 group">
              <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-secondary group-hover:animate-pulse">
                <Zap className="h-5 w-5 text-black" />
              </div>
              <span className="text-lg font-bold text-primary glow-text">
                CryptoBoost
              </span>
            </Link>

            {/* Navigation */}
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'text-gray-400 hover:text-primary hover:bg-primary/10'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 p-8 pt-28">
          <Outlet />
        </div>
      </div>
    </div>
  );
};