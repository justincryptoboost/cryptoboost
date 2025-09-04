const COINAPI_KEY = '0ff4f88a-0673-403e-8773-8eeac3e46d66';
const COINAPI_BASE_URL = 'https://rest.coinapi.io/v1';

export interface CoinAPIPrice {
  symbol_id: string;
  rate: number;
  time: string;
}

const cryptoSymbols = ['BTC', 'ETH', 'USDT', 'USDC'];

export const fetchCryptoPrices = async (): Promise<CoinAPIPrice[]> => {
  const promises = cryptoSymbols.map(async (symbol) => {
    try {
      const response = await fetch(
        `${COINAPI_BASE_URL}/exchangerate/${symbol}/EUR`,
        {
          headers: {
            'X-CoinAPI-Key': COINAPI_KEY,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return {
        symbol_id: symbol,
        rate: data.rate,
        time: data.time,
      };
    } catch (error) {
      console.warn(`Failed to fetch ${symbol} price:`, error);
      // Return fallback data for this specific symbol
      const fallbackRates: Record<string, number> = {
        'BTC': 45000,
        'ETH': 3000,
        'USDT': 0.92,
        'USDC': 0.91,
      };
      return {
        symbol_id: symbol,
        rate: fallbackRates[symbol] || 1,
        time: new Date().toISOString(),
      };
    }
  });

  return await Promise.all(promises);
};
