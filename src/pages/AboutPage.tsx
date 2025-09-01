import React from 'react';
import { Layout } from '../components/Layout';
import { Card, CardContent } from '../components/ui/card';
import { Shield, Target, Users, Zap, Award, Globe } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Shield,
      title: 'Sécurité',
      description: 'Protection maximale de vos actifs avec les plus hauts standards de sécurité.'
    },
    {
      icon: Target,
      title: 'Transparence',
      description: 'Frais clairs, performance réelle, aucune surprise dans nos services.'
    },
    {
      icon: Users,
      title: 'Accessibilité',
      description: 'Démocratiser l\'investissement crypto pour tous les profils d\'investisseurs.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Technologie de pointe et IA pour optimiser vos stratégies d\'investissement.'
    }
  ];

  const commitments = [
    {
      icon: Award,
      title: 'Excellence opérationnelle',
      description: 'Support client 24h/7j et résolution rapide de vos demandes.'
    },
    {
      icon: Globe,
      title: 'Conformité réglementaire',
      description: 'Respect strict des réglementations européennes et françaises.'
    }
  ];

  return (
    <Layout>
      <div className="py-20">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            À propos de <span className="text-primary glow-text">CryptoBoost</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Nous révolutionnons l'investissement crypto en le rendant accessible, 
            sécurisé et performant pour tous.
          </p>
        </section>

        {/* Mission */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Notre <span className="text-secondary glow-text">mission</span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Démocratiser l'accès aux investissements crypto en proposant une plateforme 
                intuitive, sécurisée et performante. Nous croyons que chacun devrait pouvoir 
                bénéficier des opportunités offertes par les cryptomonnaies, quel que soit 
                son niveau d'expertise.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Grâce à notre technologie d'intelligence artificielle et nos packs 
                d'investissement sur-mesure, nous simplifions la complexité du marché 
                crypto tout en maximisant vos chances de succès.
              </p>
            </div>
            <div className="glass-effect rounded-2xl p-8 border border-primary/20">
              <h3 className="text-2xl font-bold text-primary mb-4">Notre vision</h3>
              <p className="text-gray-300 leading-relaxed">
                Devenir la référence européenne de l'investissement crypto intelligent, 
                en alliant innovation technologique et approche humaine pour créer 
                un écosystème financier plus équitable et accessible.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Nos <span className="text-accent glow-text">valeurs</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Les principes qui guident chacune de nos décisions et actions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 group">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 inline-flex p-3 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Commitments */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Nos <span className="text-primary glow-text">engagements</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {commitments.map((commitment, index) => (
                <Card key={index} className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20">
                        <commitment.icon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3">{commitment.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{commitment.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};