import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CoinCard = ({ coin, onFavoriteUpdate, isDesktop }) => {
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

  if (isDesktop) {
    // Vista para desktop (formato de tabla)
    return (
      <Link to={`/coin-details/${coin.id}`}>
      <div 
        className="grid grid-cols-5 items-center py-4 border-b border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer"
      >
        <div className="col-span-2 flex items-center space-x-3">
          <img src={coin.image} alt={coin.name} className="w-8 h-8" />
          <div>
            <div className="font-medium text-white">{coin.name}</div>
            <div className="text-sm text-gray-400">{coin.symbol.toUpperCase()}</div>
          </div>
        </div>
        <div className="text-right text-white font-medium">{t(coin.current_price.toLocaleString())}</div>
        <div className={`text-right font-medium ${coin.price_change_percentage_24h < 0 ? 'text-red-500' : 'text-green-500'}`}>
          {coin.price_change_percentage_24h?.toFixed(2)}%
        </div>
        <div className="flex justify-end">
          <button 
            onClick={toggleFavorite}
            className="text-2xl text-yellow-500 p-1"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>
      </div>
      </Link>
    );
  }

  // Vista para móvil (formato de tarjeta)
  return (
    <Link to={`/coin-details/${coin.id}`}>
      <div 
        className="bg-gray-750 rounded-xl p-4 cursor-pointer transition-transform hover:scale-105"
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            <img src={coin.image} alt={coin.name} className="w-6 h-6" />
            <h3 className="text-white font-medium">{coin.name}</h3>
          </div>
          <button 
            onClick={toggleFavorite}
            className="text-xl text-yellow-500"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>
        
        <div className="text-sm text-gray-400 mb-2">{coin.symbol.toUpperCase()}</div>
        
        <div className="flex justify-between mt-3">
          <div className="text-white font-medium">${coin.current_price.toLocaleString()}</div>
          <div className={`font-medium ${coin.price_change_percentage_24h < 0 ? 'text-red-500' : 'text-green-500'}`}>
            {coin.price_change_percentage_24h?.toFixed(2)}%
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CoinCard;