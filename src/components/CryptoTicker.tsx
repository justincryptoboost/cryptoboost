import React from 'react';
import { useCrypto } from '../contexts/CryptoContext';
import { formatCurrency, formatPercentage } from '../lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const CryptoTicker: React.FC = () => {
  const { prices, loading } = useCrypto();

  if (loading) {
    return (
      <div className="bg-black/30 border-y border-primary/20 py-2 overflow-hidden">
        <div className="animate-pulse flex space-x-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center space-x-2 min-w-0">
              <div className="h-4 w-12 bg-gray-600 rounded"></div>
              <div className="h-4 w-16 bg-gray-600 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/30 border-y border-primary/20 py-2 overflow-hidden hidden sm:block">
      <div className="flex animate-slide">
        {prices.concat(prices).map((price, index) => (
          <div key={`${price.id}-${index}`} className="flex items-center space-x-2 px-4 lg:px-8 min-w-0 flex-shrink-0">
            <span className="text-primary font-semibold">{price.symbol}</span>
            <span className="text-white text-sm lg:text-base">{formatCurrency(price.price_eur)}</span>
            <div className={`flex items-center space-x-1 ${
              price.change_24h >= 0 ? 'text-accent' : 'text-red-400'
            }`}>
              {price.change_24h >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span className="text-xs lg:text-sm">{formatPercentage(price.change_24h)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
