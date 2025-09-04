import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { TrendingUp, Shield, Zap, Crown, Calculator, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

export const PlansPage: React.FC = () => {
  const [simulatorAmount, setSimulatorAmount] = useState<number>(1000);
  const [simulatorDuration, setSimulatorDuration] = useState<number>(12);

  const investmentPacks = [
    {
      id: 'starter',
      name: 'Pack Starter',
      description: 'Parfait pour débuter dans l\'investissement crypto avec une approche prudente.',
      min_amount: 100,
      max_amount: 5000,
      estimated_roi: 8,
      duration_months: 6,
      risk_level: 'low' as const,
      icon: Shield,
      features: [
        'Diversification automatique',
        'Stratégie conservatrice',
        'Support dédié',
        'Retraits flexibles'
      ],
      popular: false
    },
    {
      id: 'growth',
      name: 'Pack Growth',
      description: 'Optimisé pour une croissance équilibrée de votre portefeuille crypto.',
      min_amount: 1000,
      max_amount: 25000,
      estimated_roi: 15,
      duration_months: 12,
      risk_level: 'medium' as const,
      icon: TrendingUp,
      features: [
        'IA de trading avancée',
        'Rééquilibrage automatique',
        'Analyses hebdomadaires',
        'Accès anticipé nouvelles cryptos'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Pack Premium',
      description: 'Pour les investisseurs expérimentés cherchant des rendements maximaux.',
      min_amount: 5000,
      max_amount: 100000,
      estimated_roi: 25,
      duration_months: 18,
      risk_level: 'high' as const,
      icon: Crown,
      features: [
        'Stratégies exclusives',
        'Gestionnaire dédié',
        'Accès DeFi premium',
        'Rapports personnalisés'
      ],
      popular: false
    }
  ];

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-accent/20 text-accent border-accent/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case 'low': return 'Risque faible';
      case 'medium': return 'Risque modéré';
      case 'high': return 'Risque élevé';
      default: return 'Risque inconnu';
    }
  };

  const calculateEstimatedReturn = () => {
    const selectedPack = investmentPacks[1]; // Default to Growth pack
    const monthlyRate = selectedPack.estimated_roi / 100 / 12;
    const estimatedReturn = simulatorAmount * Math.pow(1 + monthlyRate, simulatorDuration);
    return estimatedReturn;
  };

  return (
    <Layout>
      <div className="py-20">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Plans d'<span className="text-primary glow-text">investissement</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choisissez le pack qui correspond à vos objectifs et votre profil de risque.
          </p>
        </section>

        {/* Investment Packs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {investmentPacks.map((pack) => (
              <Card 
                key={pack.id} 
                className={`glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 relative mx-4 lg:mx-0 ${
                  pack.popular ? 'ring-2 ring-secondary/50' : ''
                }`}
              >
                {pack.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-secondary to-accent text-black font-bold px-4 py-1">
                      Le plus populaire
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="mb-4 inline-flex p-3 lg:p-4 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20">
                    <pack.icon className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-xl lg:text-2xl font-bold text-white">{pack.name}</CardTitle>
                  <p className="text-gray-400 text-sm lg:text-base px-2">{pack.description}</p>
                  
                  <div className="pt-4">
                    <div className="text-3xl lg:text-4xl font-bold text-primary glow-text">
                      {pack.estimated_roi}%
                    </div>
                    <div className="text-sm text-gray-400">ROI estimé annuel</div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm lg:text-base">Montant minimum</span>
                    <span className="text-white font-semibold text-sm lg:text-base">{formatCurrency(pack.min_amount)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm lg:text-base">Montant maximum</span>
                    <span className="text-white font-semibold text-sm lg:text-base">{formatCurrency(pack.max_amount)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm lg:text-base">Durée recommandée</span>
                    <span className="text-white font-semibold text-sm lg:text-base">{pack.duration_months} mois</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm lg:text-base">Niveau de risque</span>
                    <Badge className={getRiskBadgeColor(pack.risk_level)}>
                      {getRiskLabel(pack.risk_level)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white text-sm lg:text-base">Fonctionnalités incluses :</h4>
                    <ul className="space-y-1">
                      {pack.features.map((feature, index) => (
                        <li key={index} className="text-gray-400 text-xs lg:text-sm flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    asChild 
                    className={`w-full font-semibold ${
                      pack.popular 
                        ? 'bg-gradient-to-r from-secondary to-accent text-black hover:from-secondary/80 hover:to-accent/80' 
                        : 'bg-gradient-to-r from-primary to-secondary text-black hover:from-primary/80 hover:to-secondary/80'
                    }`}
                  >
                    <Link to="/auth/register">
                      Commencer maintenant
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Simulator */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="glass-effect border-primary/20">
            <CardHeader className="text-center">
              <div className="mb-4 inline-flex p-4 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 mx-auto">
                <Calculator className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold text-white">
                Simulateur de <span className="text-primary glow-text">rendement</span>
              </CardTitle>
              <p className="text-gray-400">
                Estimez vos gains potentiels avec nos packs d'investissement.
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-white">Montant d'investissement (€)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={simulatorAmount}
                    onChange={(e) => setSimulatorAmount(Number(e.target.value))}
                    className="bg-black/50 border-primary/30 text-white"
                    min="100"
                    max="100000"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-white">Durée (mois)</Label>
                  <Select value={simulatorDuration.toString()} onValueChange={(value) => setSimulatorDuration(Number(value))}>
                    <SelectTrigger className="bg-black/50 border-primary/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-primary/20">
                      <SelectItem value="6">6 mois</SelectItem>
                      <SelectItem value="12">12 mois</SelectItem>
                      <SelectItem value="18">18 mois</SelectItem>
                      <SelectItem value="24">24 mois</SelectItem>
                      <SelectItem value="36">36 mois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 border border-primary/20">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold text-white">Estimation de rendement</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-primary">{formatCurrency(simulatorAmount)}</div>
                      <div className="text-sm text-gray-400">Investissement initial</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent">{formatCurrency(calculateEstimatedReturn() - simulatorAmount)}</div>
                      <div className="text-sm text-gray-400">Gains estimés</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary">{formatCurrency(calculateEstimatedReturn())}</div>
                      <div className="text-sm text-gray-400">Total estimé</div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      asChild 
                      className="bg-gradient-to-r from-primary to-secondary text-black font-bold px-8"
                    >
                      <Link to="/auth/register">
                        Commencer avec ce montant
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-xs text-red-400 border border-red-400/30 rounded p-3">
                  ⚠️ <strong>Avertissement :</strong> Les performances passées ne préjugent pas des performances futures. 
                  Tout investissement comporte des risques de perte en capital. Les estimations sont données à titre indicatif.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
};