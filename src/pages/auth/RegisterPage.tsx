import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Checkbox } from '../../components/ui/checkbox';
import { Zap, Mail, Lock, ArrowRight, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false,
    acknowledgeRisks: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (!formData.acceptedTerms) {
      setError('Vous devez accepter les conditions générales');
      return;
    }

    if (!formData.acknowledgeRisks) {
      setError('Vous devez reconnaître les risques liés aux investissements crypto');
      return;
    }

    setIsLoading(true);

    try {
      const result = await signUp(formData.email, formData.password, formData.acceptedTerms);
      
      if (result.error) {
        setError(result.error);
      } else {
        navigate('/client/dashboard');
      }
    } catch (err) {
      setError('Une erreur inattendue s\'est produite');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
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

        {/* Registration Form */}
        <Card className="glass-effect border-primary/20">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-white">
              Créer votre compte
            </CardTitle>
            <p className="text-gray-400">
              Rejoignez CryptoBoost et commencez à investir intelligemment
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">Confirmer le mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="pl-10 bg-black/50 border-primary/30 text-white"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Risk Warning */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-400 mb-1">Avertissement sur les risques</h3>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      Les investissements en cryptomonnaies présentent des risques de perte en capital. 
                      Les performances passées ne garantissent pas les résultats futurs. 
                      N'investissez que ce que vous pouvez vous permettre de perdre.
                    </p>
                  </div>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptedTerms}
                    onCheckedChange={(checked) => handleInputChange('acceptedTerms', checked as boolean)}
                    className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-300 leading-relaxed cursor-pointer">
                    J'accepte les{' '}
                    <Link to="/legal/terms" className="text-primary hover:underline">
                      conditions générales d'utilisation
                    </Link>{' '}
                    et la{' '}
                    <Link to="/legal/privacy" className="text-primary hover:underline">
                      politique de confidentialité
                    </Link>
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="risks"
                    checked={formData.acknowledgeRisks}
                    onCheckedChange={(checked) => handleInputChange('acknowledgeRisks', checked as boolean)}
                    className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label htmlFor="risks" className="text-sm text-gray-300 leading-relaxed cursor-pointer">
                    Je reconnais avoir pris connaissance des risques liés aux investissements 
                    en cryptomonnaies et comprends que je peux perdre tout ou partie de mon capital.
                  </Label>
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
                    Création du compte...
                  </>
                ) : (
                  <>
                    Créer mon compte
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="text-center">
              <span className="text-gray-400 text-sm">Déjà un compte ? </span>
              <Link 
                to="/auth/login" 
                className="text-primary hover:underline text-sm font-medium"
              >
                Se connecter
              </Link>
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