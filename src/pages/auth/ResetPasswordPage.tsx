import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Zap, Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const ResetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await resetPassword(email);
      
      if (result.error) {
        setError(result.error);
      } else {
        setIsSuccess(true);
      }
    } catch (err) {
      setError('Une erreur inattendue s\'est produite');
    } finally {
      setIsLoading(false);
    }
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

        {/* Reset Form */}
        <Card className="glass-effect border-primary/20">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-white">
              Réinitialiser votre mot de passe
            </CardTitle>
            <p className="text-gray-400">
              Entrez votre email pour recevoir les instructions de réinitialisation
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {isSuccess ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-white">Email envoyé !</h3>
                <p className="text-gray-400">
                  Si un compte existe avec cette adresse email, vous recevrez 
                  les instructions de réinitialisation sous quelques minutes.
                </p>
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <Link to="/auth/login">Retour à la connexion</Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-black/50 border-primary/30 text-white"
                      placeholder="votre@email.com"
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
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Réinitialiser le mot de passe
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}

            <div className="text-center">
              <Link 
                to="/auth/login" 
                className="text-primary hover:underline text-sm font-medium"
              >
                ← Retour à la connexion
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