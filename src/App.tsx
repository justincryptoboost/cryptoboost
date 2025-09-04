import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CryptoProvider } from './contexts/CryptoContext';

// Public pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PlansPage } from './pages/PlansPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { FAQPage } from './pages/FAQPage';

// Auth pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';

// Legal pages
import { TermsPage } from './pages/legal/TermsPage';
import { PrivacyPage } from './pages/legal/PrivacyPage';

// Client pages
import { ClientLayout } from './pages/client/ClientLayout';
import { ClientDashboard } from './pages/client/ClientDashboard';
import { ClientPlansPage } from './pages/client/ClientPlansPage';
import { ClientWalletPage } from './pages/client/ClientWalletPage';

// Route guards
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ 
  children, 
  allowedRoles = ['client', 'admin'] 
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen mesh-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/client/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

// Simple placeholder components for missing pages
const CookiesPage = () => (
  <div className="min-h-screen mesh-bg pt-20 px-4">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-4">Politique de cookies</h1>
      <div className="glass-effect border-primary/20 rounded-lg p-8">
        <p className="text-gray-300">Page en construction - Politique de cookies à venir</p>
      </div>
    </div>
  </div>
);

const ClientExchangePage = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-white">Échange de cryptos</h1>
    <div className="glass-effect border-primary/20 rounded-lg p-8">
      <p className="text-gray-300">Fonctionnalité d'échange en cours de développement</p>
    </div>
  </div>
);

const ClientHistoryPage = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-white">Historique des transactions</h1>
    <div className="glass-effect border-primary/20 rounded-lg p-8">
      <p className="text-gray-300">Historique complet en cours de développement</p>
    </div>
  </div>
);

const ClientNotificationsPage = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-white">Notifications</h1>
    <div className="glass-effect border-primary/20 rounded-lg p-8">
      <p className="text-gray-300">Centre de notifications en cours de développement</p>
    </div>
  </div>
);

const ClientProfilePage = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-white">Profil utilisateur</h1>
    <div className="glass-effect border-primary/20 rounded-lg p-8">
      <p className="text-gray-300">Gestion du profil en cours de développement</p>
    </div>
  </div>
);

const ClientSupportPage = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-white">Support client</h1>
    <div className="glass-effect border-primary/20 rounded-lg p-8">
      <p className="text-gray-300">Système de tickets en cours de développement</p>
    </div>
  </div>
);

const ClientDocumentsPage = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-white">Documents</h1>
    <div className="glass-effect border-primary/20 rounded-lg p-8">
      <p className="text-gray-300">Export de documents en cours de développement</p>
    </div>
  </div>
);

const AdminDashboard = () => (
  <div className="min-h-screen mesh-bg pt-20 px-4">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-4">Dashboard Administrateur</h1>
      <div className="glass-effect border-primary/20 rounded-lg p-8">
        <p className="text-gray-300">Interface d'administration en cours de développement</p>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <CryptoProvider>
        <Router>
          <div className="dark">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/plans" element={<PlansPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/faq" element={<FAQPage />} />

              {/* Legal routes */}
              <Route path="/legal/terms" element={<TermsPage />} />
              <Route path="/legal/privacy" element={<PrivacyPage />} />
              <Route path="/legal/cookies" element={<CookiesPage />} />

              {/* Auth routes */}
              <Route path="/auth/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
              <Route path="/auth/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
              <Route path="/auth/reset" element={<PublicRoute><ResetPasswordPage /></PublicRoute>} />

              {/* Client routes */}
              <Route path="/client" element={<ProtectedRoute allowedRoles={['client']}><ClientLayout /></ProtectedRoute>}>
                <Route index element={<Navigate to="/client/dashboard" replace />} />
                <Route path="dashboard" element={<ClientDashboard />} />
                <Route path="plans" element={<ClientPlansPage />} />
                <Route path="wallet" element={<ClientWalletPage />} />
                <Route path="exchange" element={<ClientExchangePage />} />
                <Route path="history" element={<ClientHistoryPage />} />
                <Route path="notifications" element={<ClientNotificationsPage />} />
                <Route path="profile" element={<ClientProfilePage />} />
                <Route path="support" element={<ClientSupportPage />} />
                <Route path="documents" element={<ClientDocumentsPage />} />
              </Route>

              {/* Admin routes */}
              <Route path="/admin/*" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </CryptoProvider>
    </AuthProvider>
  );
}

export default App;
