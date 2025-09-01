import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Layout } from '../components/Layout';
import { 
  Zap, 
  Shield, 
  TrendingUp, 
  Users, 
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Target,
  Clock
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const benefits = [
    {
      icon: Shield,
      title: 'Sécurité renforcée',
      description: 'Protection de niveau bancaire avec authentification multi-facteurs et cold storage.'
    },
    {
      icon: TrendingUp,
      title: 'Performance optimisée',
      description: 'Algorithmes d\'IA pour maximiser vos rendements selon votre profil de risque.'
    },
    {
      icon: Sparkles,
      title: 'Interface intuitive',
      description: 'Design futuriste et ergonomique pensé pour tous les niveaux d\'expertise.'
    },
    {
      icon: Target,
      title: 'Packs sur-mesure',
      description: 'Solutions d\'investissement adaptées à vos objectifs et votre capital.'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Créez votre compte',
      description: 'Inscription rapide et sécurisée en moins de 2 minutes.'
    },
    {
      step: '02',
      title: 'Choisissez votre pack',
      description: 'Sélectionnez le plan d\'investissement adapté à vos objectifs.'
    },
    {
      step: '03',
      title: 'Effectuez votre dépôt',
      description: 'Alimentez votre portefeuille de manière sécurisée.'
    },
    {
      step: '04',
      title: 'Suivez vos gains',
      description: 'Monitorer vos performances en temps réel sur votre dashboard.'
    }
  ];

  const testimonials = [
    {
      name: 'Marie Dubois',
      role: 'Investisseuse débutante',
      content: 'CryptoBoost m\'a permis de commencer le trading crypto en toute confiance. Interface claire et support excellent !',
      rating: 5
    },
    {
      name: 'Thomas Martin',
      role: 'Entrepreneur',
      content: 'Parfait pour diversifier mon portefeuille. Les packs automatisés me font gagner du temps tout en optimisant mes rendements.',
      rating: 5
    },
    {
      name: 'Sophie Laurent',
      role: 'Consultante finance',
      content: 'Transparence totale sur les frais et performances. Exactement ce que je cherchais pour mes investissements crypto.',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'CryptoBoost est-il sécurisé ?',
      answer: 'Oui, nous utilisons un chiffrement de niveau bancaire et stockons 95% des fonds en cold storage.'
    },
    {
      question: 'Quel est le montant minimum pour commencer ?',
      answer: 'Vous pouvez commencer avec seulement 100€ sur nos packs d\'entrée de gamme.'
    },
    {
      question: 'Puis-je retirer mes fonds à tout moment ?',
      answer: 'Oui, les retraits sont possibles 24h/24 avec traitement sous 24-48h.'
    },
    {
      question: 'Quels sont les frais appliqués ?',
      answer: 'Nos frais sont transparents : 1% sur les dépôts, 0.5% sur les retraits, 2% de frais de gestion annuels.'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
              <span className="block">Investissez</span>
              <span className="text-primary glow-text">clair,</span>
              <span className="block">performez</span>
              <span className="text-secondary glow-text">net.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              La plateforme crypto nouvelle génération qui démocratise l'investissement 
              grâce à l'IA et des packs sur-mesure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary text-black font-bold px-8 py-4 text-lg hover:scale-105 transition-transform animate-glow"
              >
                <Link to="/auth/register">
                  Ouvrir un compte
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild
                className="border-primary text-primary hover:bg-primary/10 px-8 py-4 text-lg"
              >
                <Link to="/plans">Découvrir les packs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Pourquoi choisir <span className="text-primary glow-text">CryptoBoost</span> ?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Notre approche révolutionnaire combine sécurité, performance et simplicité.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 inline-flex p-3 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Comment <span className="text-secondary glow-text">commencer</span> ?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              4 étapes simples pour démarrer votre parcours d'investissement crypto.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-primary to-secondary text-black font-bold text-xl flex items-center justify-center group-hover:scale-110 transition-transform animate-float">
                    {step.step}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Ils nous font <span className="text-accent glow-text">confiance</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Découvrez les témoignages de nos utilisateurs satisfaits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-accent fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mini FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Questions <span className="text-primary glow-text">fréquentes</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-start">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary/10">
              <Link to="/faq">Voir toutes les questions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-5xl font-bold text-white">
              Prêt à <span className="text-primary glow-text">booster</span> vos investissements ?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Rejoignez des milliers d'investisseurs qui font confiance à CryptoBoost 
              pour optimiser leurs portefeuilles crypto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary text-black font-bold px-12 py-6 text-xl hover:scale-105 transition-transform animate-glow"
              >
                <Link to="/auth/register">
                  Ouvrir un compte gratuit
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild
                className="border-primary text-primary hover:bg-primary/10 px-12 py-6 text-xl"
              >
                <Link to="/plans">Découvrir les packs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};