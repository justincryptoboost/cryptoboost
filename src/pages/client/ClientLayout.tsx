import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
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
  Zap,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const ClientLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

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

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen mesh-bg">
      <CryptoTicker />
      
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-effect border-b border-primary/20 h-16">
        <div className="flex items-center justify-between px-4 h-full">
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-secondary">
              <Zap className="h-5 w-5 text-black" />
            </div>
            <span className="text-lg font-bold text-primary glow-text">
              CryptoBoost
            </span>
          </Link>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-primary"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm">
          <div className="fixed left-0 top-16 bottom-0 w-64 glass-effect border-r border-primary/20 overflow-y-auto">
            <div className="p-6">
              <nav className="space-y-2">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'text-gray-400 hover:text-primary hover:bg-primary/10'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
                
                <div className="pt-4 border-t border-primary/20">
                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="w-full justify-start text-red-400 hover:bg-red-400/10"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Déconnexion
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:block w-64 min-h-screen glass-effect border-r border-primary/20 fixed left-0 top-0 pt-20 z-40">
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
        <div className="flex-1 lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-28">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
