import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CoinCard = ({ coin, onFavoriteUpdate }) => {
  // Estado para rastrear el estado favorito
  const [isFavorite, setIsFavorite] = useState(false);

  // Verifica si la moneda es favorita
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    setIsFavorite(favorites[coin.id] === true);
  }, [coin.id]);


  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    //Activar o desactivar el estado de favorito
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);

    // Actualiza localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    favorites[coin.id] = newFavoriteStatus;
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Notificar al componente principal sobre la actualización si existe devolución de llamada
    if (onFavoriteUpdate) {
      onFavoriteUpdate();
    }
  };

  return (
    <div className='shadow-lg rounded-2xl w-[250px] bg-white p-4 hover:shadow-xl transition-shadow'>
      <Link to={`/coin-details/${coin.id}`} className="block">
        <div className='gap-4 flex justify-between items-center'>
          <div className='flex-shrink-0'>
            <div>
              <img
                alt={`${coin.name} logo`}
                src={coin.image}
                className='mx-auto object-cover rounded-full h-16 w-16'
              />
            </div>
          </div>
          <div className='flex flex-col justify-end'>
            <span className='text-gray-700 font-medium'>{coin.name}</span>
            <span className='text-gray-400 text-xs uppercase'>{coin.symbol}</span>
          </div>
          <button
            id="favorite-btn"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            onClick={handleFavoriteClick}
            className={`text-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300 rounded-full p-1 transition-all ${isFavorite
                ? 'text-red-500 transform scale-110'
                : 'text-gray-400 hover:text-red-400'
              }`}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
      </Link>
    </div>
  )
}

export default CoinCard