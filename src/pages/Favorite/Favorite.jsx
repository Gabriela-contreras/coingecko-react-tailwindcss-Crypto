import React, { useEffect, useState } from 'react'
import Spinner from '../../components/Spinner/Spinner'
import CoinCard from '../../components/CoinCard/CoinCard'
import { useTranslation } from 'react-i18next'

const Favorite = () => {
    const { t } = useTranslation();
    const [allCoins, setAllCoins] = useState([])
    const [favoriteCoins, setFavoriteCoins] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // Get all coins 
        setLoading(true)
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1')
            .then(res => res.json())
            .then(data => {
                setAllCoins(data)
                filterFavoriteCoins(data)
                setLoading(false)
            })
            .catch(error => {
                console.error('Error fetching coin data:', error)
                setLoading(false)
            })
    }, [])

    // Filtrar los favoritos del localStorage
    const filterFavoriteCoins = (coins) => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '{}')
        const favoriteCoinsList = coins.filter(coin => favorites[coin.id] === true)
        setFavoriteCoins(favoriteCoinsList)
    }

    const handleFavoriteUpdate = () => {
        filterFavoriteCoins(allCoins)
    }

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div className='bg-gray-900 min-h-screen text-white'>
                    <div className='max-w-7xl mx-auto px-4 py-10'>
                        <h1 className='text-2xl font-bold mb-6'>{t('Favorite Coins')}</h1>
                        
                        <div className='bg-gray-800 rounded-xl p-6'>
                            {favoriteCoins.length === 0 ? (
                                <div className='text-center py-16'>
                                    <div className='text-yellow-500 text-4xl mb-4'>★</div>
                                    <p className='text-xl text-gray-300'>{t('No favorite coins added yet.')}</p>
                                    <p className='text-gray-400 mt-2'>{t('Add coins to your favorites to see them here.')}</p>
                                </div>
                            ) : (
                                <>
                                    {/* Table header - desktop only */}
                                    <div className='hidden md:grid grid-cols-5 text-sm font-medium text-gray-400 pb-2 mb-4 border-b border-gray-700'>
                                        <div className='col-span-2'>Token</div>
                                        <div className='text-right'>Price</div>
                                        <div className='text-right'>24h Change</div>
                                        <div className='text-right'>Favorite</div>
                                    </div>
                                    
                                    {/* Grid for mobile */}
                                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4'>
                                        {favoriteCoins.map(coin => (
                                            <CoinCard 
                                                key={coin.id} 
                                                coin={coin} 
                                                onFavoriteUpdate={handleFavoriteUpdate}
                                            />
                                        ))}
                                    </div>
                                    
                                    {/* Table for desktop */}
                                    <div className='hidden lg:block'>
                                        {favoriteCoins.map(coin => (
                                            <div key={coin.id} className='grid grid-cols-5 items-center py-4 border-b border-gray-700 hover:bg-gray-750 transition-colors'>
                                                <div className='col-span-2 flex items-center space-x-3'>
                                                    <img src={coin.image} alt={coin.name} className='w-8 h-8' />
                                                    <div>
                                                        <div className='font-medium text-white'>{coin.name}</div>
                                                        <div className='text-sm text-gray-400'>{coin.symbol.toUpperCase()}</div>
                                                    </div>
                                                </div>
                                                <div className='text-right text-white font-medium'>${coin.current_price.toLocaleString()}</div>
                                                <div className={`text-right font-medium ${coin.price_change_percentage_24h < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                                    {coin.price_change_percentage_24h?.toFixed(2)}%
                                                </div>
                                                <div className='flex justify-end'>
                                                    <button 
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            // Toggle favorite
                                                            const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
                                                            favorites[coin.id] = !favorites[coin.id];
                                                            localStorage.setItem('favorites', JSON.stringify(favorites));
                                                            handleFavoriteUpdate();
                                                        }}
                                                        className='text-2xl text-yellow-500 p-1'
                                                    >
                                                        ★
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>  
            )}
        </>
    )
}

export default Favorite