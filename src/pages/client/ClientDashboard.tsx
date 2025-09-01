import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Repeat, 
  Plus,
  Bell,
  Calendar,
  PieChart
} from 'lucide-react';
import { formatCurrency, formatPercentage, formatDateTime } from '../../lib/utils';
import { useCrypto } from '../../contexts/CryptoContext';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Tooltip } from 'recharts';

export const ClientDashboard: React.FC = () => {
  const { prices } = useCrypto();
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '1y'>('30d');

  // Mock user data
  const userBalance = 12450.75;
  const totalROI = 18.5;
  const portfolioValue = 14750.25;

  // Mock portfolio distribution
  const portfolioData = [
    { name: 'Bitcoin', value: 40, amount: 5900.10, color: '#F59E0B' },
    { name: 'Ethereum', value: 30, amount: 4425.08, color: '#8B5CF6' },
    { name: 'USDT', value: 20, amount: 2950.05, color: '#10B981' },
    { name: 'USDC', value: 10, amount: 1475.02, color: '#06B6D4' },
  ];

  // Mock performance data
  const performanceData = {
    '7d': [
      { date: 'Lun', value: 12000 },
      { date: 'Mar', value: 12300 },
      { date: 'Mer', value: 11800 },
      { date: 'Jeu', value: 13100 },
      { date: 'Ven', value: 13500 },
      { date: 'Sam', value: 14200 },
      { date: 'Dim', value: 14750 },
    ],
    '30d': [
      { date: 'S1', value: 10500 },
      { date: 'S2', value: 11200 },
      { date: 'S3', value: 12100 },
      { date: 'S4', value: 14750 },
    ],
    '1y': [
      { date: 'Jan', value: 8000 },
      { date: 'Mar', value: 9500 },
      { date: 'Mai', value: 11000 },
      { date: 'Jul', value: 10200 },
      { date: 'Sep', value: 12800 },
      { date: 'Nov', value: 14750 },
    ],
  };

  // Mock recent transactions
  const recentTransactions = [
    {
      id: 'tx-1',
      type: 'investment' as const,
      amount: 1000,
      description: 'Investissement Pack Growth',
      date: '2024-01-15T10:30:00Z',
      status: 'completed' as const
    },
    {
      id: 'tx-2',
      type: 'roi' as const,
      amount: 125.50,
      description: 'Rendement mensuel Pack Growth',
      date: '2024-01-14T09:15:00Z',
      status: 'completed' as const
    },
    {
      id: 'tx-3',
      type: 'deposit' as const,
      amount: 2000,
      description: 'Dépôt par virement SEPA',
      date: '2024-01-12T16:45:00Z',
      status: 'completed' as const
    },
  ];

  // Mock notifications
  const notifications = [
    {
      id: 'notif-1',
      title: 'Nouveau rendement disponible',
      message: 'Votre Pack Growth a généré +125.50€ ce mois-ci',
      date: '2024-01-15T08:00:00Z',
      type: 'success' as const
    },
    {
      id: 'notif-2',
      title: 'Mise à jour de sécurité',
      message: 'Nous avons renforcé la sécurité de nos serveurs',
      date: '2024-01-14T12:00:00Z',
      type: 'info' as const
    },
  ];

  const quickActions = [
    {
      title: 'Effectuer un dépôt',
      description: 'Alimenter votre portefeuille',
      icon: ArrowDownLeft,
      color: 'from-accent to-green-400',
      action: () => console.log('Deposit')
    },
    {
      title: 'Retirer des fonds',
      description: 'Transférer vers votre banque',
      icon: ArrowUpRight,
      color: 'from-primary to-blue-400',
      action: () => console.log('Withdraw')
    },
    {
      title: 'Nouveau pack',
      description: 'Découvrir nos offres',
      icon: Plus,
      color: 'from-secondary to-purple-400',
      action: () => console.log('New pack')
    },
    {
      title: 'Échanger des cryptos',
      description: 'Convertir vos actifs',
      icon: Repeat,
      color: 'from-yellow-400 to-orange-400',
      action: () => console.log('Exchange')
    },
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit': return ArrowDownLeft;
      case 'withdrawal': return ArrowUpRight;
      case 'investment': return TrendingUp;
      case 'exchange': return Repeat;
      case 'roi': return PieChart;
      default: return Wallet;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'deposit': return 'text-accent';
      case 'withdrawal': return 'text-blue-400';
      case 'investment': return 'text-primary';
      case 'exchange': return 'text-yellow-400';
      case 'roi': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Tableau de bord
          </h1>
          <p className="text-gray-400">
            Vue d'ensemble de vos investissements et performances.
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 lg:mt-0">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-gray-400 text-sm">
            Dernière mise à jour : {formatDateTime(new Date())}
          </span>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-effect border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Solde total</p>
                <p className="text-3xl font-bold text-white">{formatCurrency(userBalance)}</p>
              </div>
              <div className="p-3 rounded-full bg-primary/20">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-secondary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Valeur du portefeuille</p>
                <p className="text-3xl font-bold text-white">{formatCurrency(portfolioValue)}</p>
              </div>
              <div className="p-3 rounded-full bg-secondary/20">
                <PieChart className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">ROI global</p>
                <div className="flex items-center space-x-2">
                  <p className="text-3xl font-bold text-accent">{formatPercentage(totalROI)}</p>
                  <TrendingUp className="h-5 w-5 text-accent" />
                </div>
              </div>
              <div className="p-3 rounded-full bg-accent/20">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-white">Performance du portefeuille</CardTitle>
            <div className="flex space-x-2">
              {(['7d', '30d', '1y'] as const).map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedPeriod(period)}
                  className={selectedPeriod === period 
                    ? 'bg-primary text-black' 
                    : 'text-gray-400 hover:text-primary hover:bg-primary/10'
                  }
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData[selectedPeriod]}>
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  tickFormatter={(value) => `${value / 1000}k€`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(0, 255, 255, 0.3)',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                  formatter={(value: number) => [formatCurrency(value), 'Valeur']}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#00FFFF" 
                  strokeWidth={3}
                  dot={{ fill: '#00FFFF', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#00FFFF', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">Actions rapides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={action.action}
                className="w-full justify-start h-auto p-4 hover:bg-primary/10 border border-primary/20 hover:border-primary/40 transition-all"
              >
                <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color} mr-4`}>
                  <action.icon className="h-5 w-5 text-black" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">{action.title}</div>
                  <div className="text-sm text-gray-400">{action.description}</div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-primary ml-auto" />
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Portfolio Distribution */}
        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">Répartition du portefeuille</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolioData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-white font-medium">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{formatCurrency(item.amount)}</div>
                    <div className="text-gray-400 text-sm">{item.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-white">Dernières transactions</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                Voir tout
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTransactions.map((transaction) => {
              const Icon = getTransactionIcon(transaction.type);
              const color = getTransactionColor(transaction.type);
              
              return (
                <div key={transaction.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                  <div className={`p-2 rounded-lg bg-gradient-to-r from-black/20 to-black/40 ${color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{transaction.description}</p>
                    <p className="text-gray-400 text-sm">{formatDateTime(transaction.date)}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'withdrawal' ? 'text-red-400' : 'text-accent'
                    }`}>
                      {transaction.type === 'withdrawal' ? '-' : '+'}{formatCurrency(transaction.amount)}
                    </p>
                    <Badge 
                      className={`text-xs ${
                        transaction.status === 'completed' 
                          ? 'bg-accent/20 text-accent border-accent/30' 
                          : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                      }`}
                    >
                      {transaction.status === 'completed' ? 'Terminé' : 'En cours'}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-white flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notifications
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                Voir tout
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-4 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{notification.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{notification.message}</p>
                    <p className="text-gray-500 text-xs mt-2">{formatDateTime(notification.date)}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    notification.type === 'success' ? 'bg-accent' : 'bg-primary'
                  }`}></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Live Crypto Prices */}
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">Prix en temps réel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {prices.map((price) => (
              <div key={price.id} className="p-4 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">{price.symbol}</span>
                  <div className={`flex items-center space-x-1 ${
                    price.change_24h >= 0 ? 'text-accent' : 'text-red-400'
                  }`}>
                    {price.change_24h >= 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span className="text-sm">{formatPercentage(price.change_24h)}</span>
                  </div>
                </div>
                <div className="text-lg font-bold text-primary">
                  {formatCurrency(price.price_eur)}
                </div>
                <div className="text-xs text-gray-400">{price.name}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};