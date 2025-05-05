import React, { useEffect, useState } from 'react';
import CoinCard from '../../components/CoinCard/CoinCard';
import Spinner from '../../components/Spinner/Spinner';
import { useTranslation } from 'react-i18next';
import { SearchIcon, ChevronDownIcon, TrendingUpIcon, GlobeIcon, ShieldIcon } from 'lucide-react';
import BitcoinChart from '../../components/Graficos/GraficoBTC';
import FloatingBitcoin from '../../components/Animation/FloatingBitcoin';
import FadeInSection from '../../components/Animation/FadeInSection';
import FadeInStagger, { FadeInItem } from '../../components/Animation/FadeInStagger';

const Home = () => {
  const { t } = useTranslation();

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterName, setFilterName] = useState([]);
  const [clickInput, setClickInput] = useState(false);
  const [sortBy, setSortBy] = useState('market_cap');

  useEffect(() => {
    setLoading(true);
    fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
    )
      .then(res => res.json())
      .then(data => {
        setCoins(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Aplicar ordenamiento cuando cambie sortBy
    if (coins.length > 0) {
      const sortedCoins = [...coins];
      
      switch (sortBy) {
        case 'market_cap':
          sortedCoins.sort((a, b) => b.market_cap - a.market_cap);
          break;
        case 'volume':
          sortedCoins.sort((a, b) => b.total_volume - a.total_volume);
          break;
        case 'price_change':
          sortedCoins.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
          break;
        default:
          break;
      }
      
      setCoins(sortedCoins);
    }
  }, [sortBy]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase().trim();
    if (searchValue === '') {
      setClickInput(false);
      return;
    }
    
    setClickInput(true);
    // Filtrar monedas que contengan el texto de búsqueda en su nombre o símbolo
    const filteredCoins = coins.filter(coin =>
      coin.name.toLowerCase().includes(searchValue) || 
      coin.symbol.toLowerCase().includes(searchValue)
    );
    setFilterName(filteredCoins);
  };

  const displayCoins = !clickInput ? coins : filterName;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-gray-900 min-h-screen pb-20">
          {/* Hero Section - Nueva sección de presentación */}
          <div className="relative overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 pt-12 pb-20">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-blue-500 opacity-5"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left side - Text content */}
                <FadeInStagger className="z-10">
                  <FadeInItem>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                      {t('Discover')}
                    </h1>
                  </FadeInItem>
                  
                  <FadeInItem>
                    <p className="text-xl text-gray-300 mb-8">
                      {t('SubtitleHome')}
                    </p>
                  </FadeInItem>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <FadeInItem>
                      <div className="bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
                        <div className="bg-blue-500/20 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-3">
                          <TrendingUpIcon className="text-blue-400" />
                        </div>
                        <h3 className="font-medium text-white">{t('Real-time Data')}</h3>
                        <p className="text-gray-400 text-sm mt-1">{t('Live prices updated in real-time')}</p>
                      </div>
                    </FadeInItem>
                    
                    <FadeInItem>
                      <div className="bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
                        <div className="bg-green-500/20 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-3">
                          <GlobeIcon className="text-green-400" />
                        </div>
                        <h3 className="font-medium text-white">{t('Global Markets')}</h3>
                        <p className="text-gray-400 text-sm mt-1">{t('Access to worldwide crypto markets')}</p>
                      </div>
                    </FadeInItem>
                    
                    <FadeInItem>
                      <div className="bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
                        <div className="bg-purple-500/20 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-3">
                          <ShieldIcon className="text-purple-400" />
                        </div>
                        <h3 className="font-medium text-white">{t('Secure Analytics')}</h3>
                        <p className="text-gray-400 text-sm mt-1">{t('Reliable data for informed decisions')}</p>
                      </div>
                    </FadeInItem>
                  </div>
                </FadeInStagger>
                
                {/* Right side - Bitcoin image */}
                <div className="flex justify-center items-center z-10">
                  <FloatingBitcoin />
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="max-w-7xl mx-auto px-4 mt-10 relative z-10">
            <FadeInSection delay={0.4}>
              {/* Top section with title and stats */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {t('Available Crypto Currencies')}
                  </h2>
                  <p className="text-gray-400 mt-1">
                    {t('Total coins')}: {displayCoins.length}
                  </p>
                </div>
              </div>

              {/* Search and filters */}
              <div className="bg-gray-800 rounded-xl p-4 mb-8 shadow-lg border border-gray-700/50">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder={t('look up coin')}
                      className="bg-gray-700 text-white placeholder-gray-400 w-full py-2 pl-10 pr-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleSearch}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <select 
                        className="bg-gray-700 text-white py-2 px-4 rounded-lg appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setSortBy(e.target.value)}
                        value={sortBy}
                      >
                        <option value="market_cap">Market Cap</option>
                        <option value="volume">Volume</option>
                        <option value="price_change">Price Change</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coin list */}
              <div className="bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700/50">
                {/* Table header - solo visible en desktop */}
                <div className="hidden md:grid grid-cols-5 text-sm font-medium text-gray-400 pb-2 mb-2 border-b border-gray-700">
                  <div className="col-span-2">Token</div>
                  <div className="text-right">Price</div>
                  <div className="text-right">24h Change</div>
                  <div className="text-right">Favorite</div>
                </div>

                {/* No coins found message */}
                {displayCoins.length === 0 && (
                  <div className="text-center py-10 text-gray-400">
                    {t('No coins found matching your search')}
                  </div>
                )}

                {/* Coins grid for mobile */}
                <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4 mb-6">
                  {displayCoins.map(coin => (
                    <FadeInItem key={coin.id}>
                      <CoinCard coin={coin} isDesktop={false} />
                    </FadeInItem>
                  ))}
                </FadeInStagger>

                {/* Coins table for desktop - Ahora usando CoinCard con prop isDesktop */}
                <FadeInStagger className="hidden lg:block">
                  {displayCoins.map(coin => (
                    <FadeInItem key={coin.id}>
                      <CoinCard coin={coin} isDesktop={true} />
                    </FadeInItem>
                  ))}
                </FadeInStagger>
              </div>
            </FadeInSection>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;