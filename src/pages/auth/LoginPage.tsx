import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Zap, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn(formData.email, formData.password);
      
      if (result.error) {
        setError(result.error);
      } else {
        // Redirect based on user role
        if (formData.email === 'admin@demo.com') {
          navigate('/admin/dashboard');
        } else {
          navigate('/client/dashboard');
        }
      }
    } catch (err) {
      setError('Une erreur inattendue s\'est produite');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 group">
            <div className="p-3 rounded-xl bg-gradient-to-r from-primary to-secondary group-hover:animate-pulse">
              <Zap className="h-8 w-8 text-black" />
            </div>
            <span className="text-2xl font-bold text-primary glow-text">
              CryptoBoost
            </span>
          </Link>
        </div>

        {/* Login Form */}
        <Card className="glass-effect border-primary/20">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-white">
              Connexion à votre compte
            </CardTitle>
            <p className="text-gray-400">
              Accédez à votre dashboard et gérez vos investissements
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Demo Accounts Info */}
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 space-y-2">
              <h3 className="text-sm font-semibold text-primary">Comptes de démonstration :</h3>
              <div className="text-xs text-gray-300 space-y-1">
                <div><strong>Client :</strong> client@demo.com / demo123</div>
                <div><strong>Admin :</strong> admin@demo.com / demo123</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10 bg-black/50 border-primary/30 text-white"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 bg-black/50 border-primary/30 text-white"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary to-secondary text-black font-bold py-3 hover:from-primary/80 hover:to-secondary/80"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                    Connexion...
                  </>
                ) : (
                  <>
                    Se connecter
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="space-y-4">
              <div className="text-center">
                <Link 
                  to="/auth/reset" 
                  className="text-sm text-primary hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <div className="text-center">
                <span className="text-gray-400 text-sm">Pas encore de compte ? </span>
                <Link 
                  to="/auth/register" 
                  className="text-primary hover:underline text-sm font-medium"
                >
                  Créer un compte
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Link 
            to="/" 
            className="text-gray-400 hover:text-primary transition-colors text-sm"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};
