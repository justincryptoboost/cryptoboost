const COINAPI_KEY = '0ff4f88a-0673-403e-8773-8eeac3e46d66';
const COINAPI_BASE_URL = 'https://rest.coinapi.io/v1';

export interface CoinAPIPrice {
  symbol_id: string;
  rate: number;
  time: string;
}

const cryptoSymbols = ['BTC', 'ETH', 'USDT', 'USDC'];

export const fetchCryptoPrices = async (): Promise<CoinAPIPrice[]> => {
  try {
    const promises = cryptoSymbols.map(async (symbol) => {
      const response = await fetch(
        `${COINAPI_BASE_URL}/exchangerate/${symbol}/EUR`,
        {
          headers: {
            'X-CoinAPI-Key': COINAPI_KEY,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${symbol} price`);
      }
      
      const data = await response.json();
      return {
        symbol_id: symbol,
        rate: data.rate,
        time: data.time,
      };
    });

    return await Promise.all(promises);
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    // Fallback mock data
    return [
      { symbol_id: 'BTC', rate: 45000, time: new Date().toISOString() },
      { symbol_id: 'ETH', rate: 3000, time: new Date().toISOString() },
      { symbol_id: 'USDT', rate: 0.92, time: new Date().toISOString() },
      { symbol_id: 'USDC', rate: 0.91, time: new Date().toISOString() },
    ];
  }
};