import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CoinCard = ({ coin, onFavoriteUpdate }) => {
  const { t } = useTranslation();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if the coin is in favorites
    const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    setIsFavorite(favorites[coin.id] === true);
  }, [coin.id]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get current favorites
    const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    
    // Toggle favorite status
    const newStatus = !isFavorite;
    favorites[coin.id] = newStatus;
    
    // Update localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Update state
    setIsFavorite(newStatus);
    
    // Notify parent if callback exists
    if (onFavoriteUpdate) {
      onFavoriteUpdate();
    }
  };

  return (
    <Link to={`/coin-details/${coin.id}`}>
      <div className='w-[250px] border-2 rounded-2xl shadow-xl p-4 flex flex-col'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start gap-4'>
            <img className='w-16 h-16' src={coin.image} alt={coin.name} />
            <div>
              <p className='text-xl font-bold'>{coin.name}</p>
              <p>{coin.symbol}</p>
            </div>
          </div>
          <button 
            onClick={toggleFavorite}
            className='text-2xl text-yellow-500'
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>

        <div className='mt-5 flex justify-between'>
          <div>
            <p className='text-gray-500'>{t('Price')}</p>
            <p>${coin.current_price}</p>
          </div>
          <div>
            <p className='text-gray-500'>{t('Change')}</p>
            <p className={coin.price_change_percentage_24h < 0 ? 'text-red-500' : 'text-green-500'}>
              {coin.price_change_percentage_24h?.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CoinCard;