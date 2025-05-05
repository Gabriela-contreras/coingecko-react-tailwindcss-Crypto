import React, { useEffect, useState } from 'react'
import CoinCard from '../../components/CoinCard/CoinCard'
import Spinner from '../../components/Spinner/Spinner'
import MarkOptimization from '../../components/Graficos/GraficoBTC'
import { useTranslation } from 'react-i18next'
import LanguageToggle from '../../components/Traduccion/Traduccion'
// import LanguageToggle from '../../components/LanguageToggle/LanguageToggle'

const Home = () => {
  const { t } = useTranslation();

  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [filterName, setFilterName] = useState([])
  const [clickInput, setClickInput] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
    )
      .then(res => res.json())
      .then(data => {
        setCoins(data)
        setLoading(false)
      })
  }, [])

  const handleClick = (e) => {
    e.preventDefault();
    const searchValue = e.target.value.toLowerCase().trim();
    console.log("Buscando:", searchValue);
    setClickInput(true)
    // Filtrar monedas que contengan el texto de búsqueda en su nombre
    const filteredCoins = coins.filter(coin =>
      coin.name.toLowerCase().includes(searchValue)
    );
    setFilterName(filteredCoins);
    console.log("Resultados:", filteredCoins);
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className='  mx-auto max-w-7xl pt-10  text-white'>

          <input
            placeholder={t('look up coin')}
            className='w-[40%] p-2 h-[40px] m-6 rounded-xl text-gray-800 mt-6'
            onChange={handleClick}
          />

          <p className='text-center text-3xl font-bold '>
            {t('Available Crypto Currencies')}
          </p>

          <p className='text-center mb-12 text-xl font-normal '>
            {t('Total coins')}: {!clickInput ? coins.length : filterName.length}
          </p>
          {/* <p className=' text-xl text-white font-semibold'>{ !clickInput && filterName.length > 0 ?  "": t('vacio') }</p> */}

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center'>
            {!clickInput ? coins.map(coin => (
              <CoinCard key={coin.id} coin={coin} />
            ))
              :
              filterName.map(coin => (
                <CoinCard key={coin.id} coin={coin} />
              ))
            }
          </div>
        </div>
      )}
    </>
  )
}

export default Home