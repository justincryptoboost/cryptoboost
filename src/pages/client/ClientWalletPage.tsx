import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  Wallet, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Copy, 
  QrCode, 
  AlertCircle,
  CheckCircle,
  Repeat
} from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import { useCrypto } from '../../contexts/CryptoContext';

export const ClientWalletPage: React.FC = () => {
  const { prices } = useCrypto();
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [withdrawAddress, setWithdrawAddress] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock wallet balances
  const walletBalances = [
    { symbol: 'BTC', amount: 0.15420000, valueEur: 6921.50 },
    { symbol: 'ETH', amount: 2.45600000, valueEur: 7368.00 },
    { symbol: 'USDT', amount: 1250.00000000, valueEur: 1150.00 },
    { symbol: 'USDC', amount: 890.50000000, valueEur: 810.76 },
  ];

  const totalBalance = walletBalances.reduce((sum, balance) => sum + balance.valueEur, 0);

  const depositAddress = {
    BTC: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    ETH: '0x742d35Cc74C3c03F62ac4A1c2e7c8A4E8e1B6A7D',
    USDT: '0x742d35Cc74C3c03F62ac4A1c2e7c8A4E8e1B6A7D',
    USDC: '0x742d35Cc74C3c03F62ac4A1c2e7c8A4E8e1B6A7D',
  };

  const depositReference = 'CBST-' + Math.random().toString(36).substr(2, 8).toUpperCase();

  const handleDeposit = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleWithdraw = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getCurrentPrice = (symbol: string) => {
    const price = prices.find(p => p.symbol === symbol);
    return price ? price.price_eur : 0;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Portefeuille crypto
        </h1>
        <p className="text-gray-400">
          Gérez vos dépôts, retraits et suivez vos balances crypto.
        </p>
      </div>

      {/* Total Balance */}
      <Card className="glass-effect border-primary/20">
        <CardContent className="p-6">
          <div className="text-center space-y-2">
            <p className="text-gray-400">Valeur totale du portefeuille</p>
            <p className="text-4xl font-bold text-primary glow-text">
              {formatCurrency(totalBalance)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Crypto Balances */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Vos cryptomonnaies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {walletBalances.map((balance) => (
            <Card key={balance.symbol} className="glass-effect border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-white text-lg">{balance.symbol}</span>
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    {formatCurrency(getCurrentPrice(balance.symbol))}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">
                    {balance.amount.toFixed(8)}
                  </p>
                  <p className="text-gray-400 text-sm">
                    ≈ {formatCurrency(balance.valueEur)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Deposit/Withdraw Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deposit */}
        <Card className="glass-effect border-accent/20">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white flex items-center">
              <ArrowDownLeft className="h-5 w-5 mr-2 text-accent" />
              Effectuer un dépôt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="crypto" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-black/50">
                <TabsTrigger value="crypto" className="data-[state=active]:bg-primary data-[state=active]:text-black">
                  Crypto
                </TabsTrigger>
                <TabsTrigger value="bank" className="data-[state=active]:bg-primary data-[state=active]:text-black">
                  Virement
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="crypto" className="space-y-4">
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">Adresse Bitcoin</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyToClipboard(depositAddress.BTC)}
                      className="text-primary hover:bg-primary/10"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-gray-300 text-sm font-mono break-all mb-3">
                    {depositAddress.BTC}
                  </p>
                  <div className="flex items-center space-x-2">
                    <QrCode className="h-4 w-4 text-primary" />
                    <span className="text-primary text-sm">QR Code disponible</span>
                  </div>
                </div>
                
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300 text-sm">
                      Utilisez uniquement cette adresse pour les dépôts Bitcoin. 
                      Minimum 0.001 BTC. Confirmations requises : 3.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="bank" className="space-y-4">
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 space-y-3">
                  <div>
                    <span className="text-gray-400 text-sm">IBAN :</span>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-mono">FR76 1234 5678 9012 3456 7890 123</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => copyToClipboard('FR76 1234 5678 9012 3456 7890 123')}
                        className="text-primary hover:bg-primary/10"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Référence obligatoire :</span>
                    <div className="flex items-center justify-between">
                      <span className="text-accent font-bold">{depositReference}</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => copyToClipboard(depositReference)}
                        className="text-primary hover:bg-primary/10"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                  <p className="text-gray-300 text-sm">
                    <strong>Important :</strong> N'oubliez pas d'inclure la référence dans le virement. 
                    Les fonds sans référence ne pourront pas être crédités automatiquement.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Withdraw */}
        <Card className="glass-effect border-blue-400/20">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white flex items-center">
              <ArrowUpRight className="h-5 w-5 mr-2 text-blue-400" />
              Effectuer un retrait
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700">
                  Retirer des fonds
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-effect border-primary/20">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-white">
                    Retrait de fonds
                  </DialogTitle>
                </DialogHeader>
                
                {showSuccess ? (
                  <div className="text-center space-y-4 py-6">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Retrait initié !</h3>
                    <p className="text-gray-400">
                      Votre demande de retrait est en cours de traitement. 
                      Vous recevrez une confirmation par email.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="withdraw-amount" className="text-white">Montant (€)</Label>
                      <Input
                        id="withdraw-amount"
                        type="number"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="bg-black/50 border-primary/30 text-white"
                        placeholder="0.00"
                        max={totalBalance}
                      />
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Disponible : {formatCurrency(totalBalance)}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setWithdrawAmount(totalBalance.toString())}
                          className="text-primary hover:bg-primary/10 p-0 h-auto"
                        >
                          Max
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="withdraw-address" className="text-white">Adresse de destination</Label>
                      <Input
                        id="withdraw-address"
                        value={withdrawAddress}
                        onChange={(e) => setWithdrawAddress(e.target.value)}
                        className="bg-black/50 border-primary/30 text-white"
                        placeholder="IBAN ou adresse crypto"
                      />
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Montant demandé :</span>
                          <span className="text-white">{formatCurrency(Number(withdrawAmount) || 0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Frais de retrait (0.5%) :</span>
                          <span className="text-white">{formatCurrency((Number(withdrawAmount) || 0) * 0.005)}</span>
                        </div>
                        <div className="flex justify-between border-t border-primary/20 pt-2">
                          <span className="text-white font-semibold">Montant net :</span>
                          <span className="text-primary font-semibold">
                            {formatCurrency((Number(withdrawAmount) || 0) * 0.995)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={handleWithdraw}
                      disabled={isProcessing || !withdrawAmount || !withdrawAddress}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold"
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Traitement...
                        </>
                      ) : (
                        'Confirmer le retrait'
                      )}
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            <div className="mt-4 space-y-3">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-gray-300 text-sm">
                      <strong>Limites de retrait :</strong>
                    </p>
                    <ul className="text-gray-400 text-xs space-y-1">
                      <li>• Maximum 10 000€ par jour</li>
                      <li>• Maximum 50 000€ par mois</li>
                      <li>• Traitement sous 24-48h ouvrables</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">Dernières transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: 'tx-1',
                type: 'Dépôt BTC',
                amount: 0.05,
                valueEur: 2250,
                date: '2024-01-15T14:30:00Z',
                status: 'completed' as const,
                icon: ArrowDownLeft,
                color: 'text-accent'
              },
              {
                id: 'tx-2',
                type: 'Retrait USDT',
                amount: 500,
                valueEur: 460,
                date: '2024-01-12T09:15:00Z',
                status: 'pending' as const,
                icon: ArrowUpRight,
                color: 'text-blue-400'
              },
              {
                id: 'tx-3',
                type: 'Échange ETH→BTC',
                amount: 0.5,
                valueEur: 1500,
                date: '2024-01-10T16:45:00Z',
                status: 'completed' as const,
                icon: Repeat,
                color: 'text-yellow-400'
              }
            ].map((transaction) => (
              <div key={transaction.id} className="flex items-center space-x-4 p-4 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors">
                <div className={`p-2 rounded-lg bg-gradient-to-r from-black/20 to-black/40 ${transaction.color}`}>
                  <transaction.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{transaction.type}</p>
                  <p className="text-gray-400 text-sm">{new Date(transaction.date).toLocaleString('fr-FR')}</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${transaction.color}`}>
                    {formatCurrency(transaction.valueEur)}
                  </p>
                  <Badge className={`text-xs ${
                    transaction.status === 'completed' 
                      ? 'bg-accent/20 text-accent border-accent/30' 
                      : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                  }`}>
                    {transaction.status === 'completed' ? 'Terminé' : 'En cours'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
