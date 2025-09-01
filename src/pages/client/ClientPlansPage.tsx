import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { TrendingUp, Shield, Crown, Calculator, CheckCircle, AlertTriangle } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../../lib/utils';

export const ClientPlansPage: React.FC = () => {
  const [simulatorAmount, setSimulatorAmount] = useState<number>(1000);
  const [simulatorDuration, setSimulatorDuration] = useState<number>(12);
  const [selectedPack, setSelectedPack] = useState('growth');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

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
      active: false
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
      active: true
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
      active: false
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
    const pack = investmentPacks.find(p => p.id === selectedPack) || investmentPacks[1];
    const monthlyRate = pack.estimated_roi / 100 / 12;
    const estimatedReturn = simulatorAmount * Math.pow(1 + monthlyRate, simulatorDuration);
    return estimatedReturn;
  };

  const handleSubscribe = async (packId: string) => {
    setIsSubscribing(true);
    
    // Simulate subscription process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubscribing(false);
    setShowConfirmation(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Plans d'investissement
        </h1>
        <p className="text-gray-400">
          Gérez vos packs actifs et découvrez de nouvelles opportunités.
        </p>
      </div>

      {/* Active Packs */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Vos packs actifs</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {investmentPacks.filter(pack => pack.active).map((pack) => (
            <Card key={pack.id} className="glass-effect border-primary/20 ring-2 ring-primary/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20">
                      <pack.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-white">{pack.name}</CardTitle>
                      <Badge className="bg-accent/20 text-accent border-accent/30 mt-1">
                        Actif
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Investissement</p>
                    <p className="text-white font-semibold">{formatCurrency(2500)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Gains actuels</p>
                    <p className="text-accent font-semibold">+{formatCurrency(325)}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">ROI</p>
                    <p className="text-primary font-semibold">{formatPercentage(13)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Durée restante</p>
                    <p className="text-white font-semibold">8 mois</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Available Packs */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Packs disponibles</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {investmentPacks.filter(pack => !pack.active).map((pack) => (
            <Card key={pack.id} className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="mb-4 inline-flex p-4 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20">
                  <pack.icon className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-white">{pack.name}</CardTitle>
                <p className="text-gray-400 text-sm">{pack.description}</p>
                
                <div className="pt-4">
                  <div className="text-3xl font-bold text-primary glow-text">
                    {pack.estimated_roi}%
                  </div>
                  <div className="text-sm text-gray-400">ROI estimé annuel</div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Montant min</span>
                    <span className="text-white font-semibold">{formatCurrency(pack.min_amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Montant max</span>
                    <span className="text-white font-semibold">{formatCurrency(pack.max_amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Durée</span>
                    <span className="text-white font-semibold">{pack.duration_months} mois</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Risque</span>
                    <Badge className={getRiskBadgeColor(pack.risk_level)}>
                      {getRiskLabel(pack.risk_level)}
                    </Badge>
                  </div>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:from-primary/80 hover:to-secondary/80"
                    >
                      Souscrire maintenant
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-effect border-primary/20 max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-white">
                        Souscrire au {pack.name}
                      </DialogTitle>
                    </DialogHeader>
                    
                    {showConfirmation ? (
                      <div className="text-center space-y-4 py-6">
                        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle className="h-8 w-8 text-accent" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">Souscription confirmée !</h3>
                        <p className="text-gray-400">
                          Votre pack {pack.name} est maintenant actif. Vous pouvez suivre 
                          ses performances depuis votre dashboard.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="amount" className="text-white">Montant d'investissement (€)</Label>
                          <Input
                            id="amount"
                            type="number"
                            defaultValue={pack.min_amount}
                            min={pack.min_amount}
                            max={pack.max_amount}
                            className="bg-black/50 border-primary/30 text-white"
                          />
                        </div>
                        
                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <h3 className="font-semibold text-yellow-400 mb-1">Rappel important</h3>
                              <p className="text-gray-300 text-sm">
                                Les investissements en crypto comportent des risques de perte en capital. 
                                Assurez-vous de bien comprendre les risques avant d'investir.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={() => handleSubscribe(pack.id)}
                          disabled={isSubscribing}
                          className="w-full bg-gradient-to-r from-primary to-secondary text-black font-bold"
                        >
                          {isSubscribing ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                              Traitement...
                            </>
                          ) : (
                            'Confirmer la souscription'
                          )}
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Simulator */}
      <Card className="glass-effect border-primary/20">
        <CardHeader className="text-center">
          <div className="mb-4 inline-flex p-4 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 mx-auto">
            <Calculator className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Simulateur de rendement
          </CardTitle>
          <p className="text-gray-400">
            Estimez vos gains potentiels avec nos différents packs.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="pack" className="text-white">Pack d'investissement</Label>
              <Select value={selectedPack} onValueChange={setSelectedPack}>
                <SelectTrigger className="bg-black/50 border-primary/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black border-primary/20">
                  {investmentPacks.map((pack) => (
                    <SelectItem key={pack.id} value={pack.id}>
                      {pack.name} ({pack.estimated_roi}% ROI)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-white">Montant (€)</Label>
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
              <h3 className="text-xl font-semibold text-white">Résultats de la simulation</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-primary">{formatCurrency(simulatorAmount)}</div>
                  <div className="text-sm text-gray-400">Investissement initial</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-accent">{formatCurrency(calculateEstimatedReturn() - simulatorAmount)}</div>
                  <div className="text-sm text-gray-400">Gains estimés</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-secondary">{formatCurrency(calculateEstimatedReturn())}</div>
                  <div className="text-sm text-gray-400">Total estimé</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};