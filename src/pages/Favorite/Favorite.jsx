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
                <div className='px-4 pt-20 pb-24 mx-auto max-w-7xl md:px-2'>
                    <h1 className='text-2xl font-bold text-center mb-6'>{t('Favorite Coins')}</h1>
                    
                    {favoriteCoins.length === 0 ? (
                        <div className='text-center py-10'>
                            <p className='text-lg text-gray-600'>{t('No favorite coins added yet.')}</p>
                            <p className='text-gray-500 mt-2'>{t('Add coins to your favorites to see them here.')}</p>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center'>
                            {favoriteCoins.map(coin => (
                                <CoinCard 
                                    key={coin.id} 
                                    coin={coin} 
                                    onFavoriteUpdate={handleFavoriteUpdate}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default Favorite