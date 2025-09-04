import React, { createContext, useContext, useEffect, useState } from 'react';
import { CryptoPrice } from '../types';
import { fetchCryptoPrices } from '../lib/coinapi';

interface CryptoContextType {
  prices: CryptoPrice[];
  loading: boolean;
  refreshPrices: () => Promise<void>;
}

const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

export const CryptoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshPrices = async () => {
    try {
      setLoading(true);
      const apiPrices = await fetchCryptoPrices();
      
      const formattedPrices: CryptoPrice[] = apiPrices.map((price, index) => ({
        id: `crypto-${index + 1}`,
        symbol: price.symbol_id,
        name: getCryptoName(price.symbol_id),
        price_eur: price.rate,
        change_24h: Math.random() * 10 - 5, // Mock 24h change
        updated_at: price.time,
      }));

      setPrices(formattedPrices);
    } catch (error) {
      console.error('Failed to fetch crypto prices:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshPrices();
    
    // Refresh prices every 5 minutes
    const interval = setInterval(refreshPrices, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <CryptoContext.Provider value={{ prices, loading, refreshPrices }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (context === undefined) {
    throw new Error('useCrypto must be used within a CryptoProvider');
  }
  return context;
};

const getCryptoName = (symbol: string): string => {
  const names: Record<string, string> = {
    BTC: 'Bitcoin',
    ETH: 'Ethereum',
    USDT: 'Tether',
    USDC: 'USD Coin',
  };
  return names[symbol] || symbol;
};
