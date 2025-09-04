import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu';
import { Menu, X, Zap, User, LogOut, Settings, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const publicLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/about', label: 'À propos' },
    { href: '/plans', label: 'Plans' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  const clientLinks = [
    { href: '/client/dashboard', label: 'Dashboard' },
    { href: '/client/plans', label: 'Plans' },
    { href: '/client/wallet', label: 'Portefeuille' },
    { href: '/client/exchange', label: 'Échange' },
    { href: '/client/history', label: 'Historique' },
  ];

  const adminLinks = [
    { href: '/admin/dashboard', label: 'Dashboard Admin' },
    { href: '/admin/users', label: 'Utilisateurs' },
    { href: '/admin/transactions', label: 'Transactions' },
    { href: '/admin/packs', label: 'Packs' },
  ];

  const getLinks = () => {
    if (user?.role === 'admin') return adminLinks;
    if (user?.role === 'client') return clientLinks;
    return publicLinks;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-secondary group-hover:animate-pulse">
              <Zap className="h-6 w-6 text-black" />
            </div>
            <span className="text-xl font-bold text-primary glow-text">
              CryptoBoost
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {getLinks().map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-all duration-200 hover:text-primary hover:glow-text ${
                  isActive(link.href) 
                    ? 'text-primary glow-text' 
                    : 'text-gray-300 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 text-primary hover:bg-primary/10">
                    <User className="h-4 w-4" />
                    <span>{user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-effect border-primary/20">
                  <DropdownMenuItem asChild>
                    <Link to={user.role === 'admin' ? '/admin/settings' : '/client/profile'} className="flex items-center space-x-2">
                      <Settings className="h-4 w-4" />
                      <span>Profil</span>
                    </Link>
                  </DropdownMenuItem>
                  {user.role === 'client' && (
                    <DropdownMenuItem asChild>
                      <Link to="/client/notifications" className="flex items-center space-x-2">
                        <Bell className="h-4 w-4" />
                        <span>Notifications</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center space-x-2 text-red-400">
                    <LogOut className="h-4 w-4" />
                    <span>Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" asChild className="text-primary hover:bg-primary/10">
                  <Link to="/auth/login">Connexion</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:from-primary/80 hover:to-secondary/80 glow-text">
                  <Link to="/auth/register">Ouvrir un compte</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
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

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-primary/20 py-4">
            <div className="space-y-4">
              {getLinks().map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-primary bg-primary/10 glow-text'
                      : 'text-gray-300 hover:text-primary hover:bg-primary/5'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {user ? (
                <div className="pt-4 border-t border-primary/20 space-y-2">
                  <div className="px-4 py-2 text-sm text-gray-400">
                    {user.email}
                  </div>
                  <Link
                    to={user.role === 'admin' ? '/admin/settings' : '/client/profile'}
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-primary rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profil
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg"
                  >
                    Déconnexion
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-primary/20 space-y-2">
                  <Link
                    to="/auth/login"
                    className="block px-4 py-2 text-sm text-primary rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/auth/register"
                    className="block px-4 py-2 text-sm bg-gradient-to-r from-primary to-secondary text-black font-semibold rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Ouvrir un compte
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
