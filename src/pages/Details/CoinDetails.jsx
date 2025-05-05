import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner/Spinner'
import BitcoinChart from '../../components/Graficos/GraficoBTC'
import Venta from '../../components/Graficos/GraficoVenta'

const CoinDetails = () => {
  const [coin, setCoin] = useState({})
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    setLoading(true)
    const url = `https://api.coingecko.com/api/v3/coins/${id}`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setCoin(data)
        setLoading(false)
      })
  }, [id])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className='bg-gray-900 min-h-screen text-white'>
          <div className='max-w-7xl mx-auto px-4 py-10'>
            <div className='bg-gray-800 rounded-xl p-6 shadow-lg'>
              {/* Header section with coin image and basic info */}
              <div className='flex flex-col md:flex-row items-center md:items-start gap-8 mb-8'>
                <div className='flex justify-center'>
                  <img src={coin.image?.large} alt={coin.name} className='w-32 h-32 rounded-full' />
                </div>

                <div className='flex-1'>
                  <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
                    <div>
                      <h1 className='text-3xl font-bold'>{coin.name}</h1>
                      <p className='text-gray-400'>{coin.symbol?.toUpperCase()}</p>
                    </div>

                    <div className='mt-4 md:mt-0 flex items-center bg-gray-700 px-4 py-2 rounded-lg'>
                      <p className='text-gray-300 mr-2'>Rank #{coin.market_cap_rank}</p>
                    </div>
                  </div>

                  {coin.market_data && (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
                      <div className='bg-gray-700 p-4 rounded-lg'>
                        <p className='text-gray-400 text-sm'>Current Price</p>
                        <p className='text-xl font-bold'>${coin.market_data.current_price?.usd?.toLocaleString()}</p>
                      </div>

                      <div className='bg-gray-700 p-4 rounded-lg'>
                        <p className='text-gray-400 text-sm'>24h Change</p>
                        <p className={coin.market_data?.price_change_percentage_24h < 0
                          ? 'text-red-500 text-xl font-bold'
                          : 'text-green-500 text-xl font-bold'}>
                          {coin.market_data?.price_change_percentage_24h?.toFixed(2)}%
                        </p>
                      </div>

                      <div className='bg-gray-700 p-4 rounded-lg'>
                        <p className='text-gray-400 text-sm'>Market Cap</p>
                        <p className='text-xl font-bold'>${coin.market_data?.market_cap?.usd?.toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>


              {/* Info sections */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='bg-gray-700 p-6 rounded-lg'>
                  <h2 className='text-xl font-bold mb-4 border-b border-gray-600 pb-2'>General Info</h2>
                  <div className='space-y-3'>
                    <div className='flex justify-between'>
                      <span className='text-gray-400'>Genesis Date</span>
                      <span>{coin.genesis_date || 'Not Available'}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-400'>Hashing Algorithm</span>
                      <span>{coin.hashing_algorithm || 'Not Available'}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-400'>Origin</span>
                      <span>{coin.country_origin || 'Not Available'}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-400'>Last Updated</span>
                      <span>{new Date(coin.last_updated).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className='bg-gray-700 p-6 rounded-lg'>
                  <h2 className='text-xl font-bold mb-4 border-b border-gray-600 pb-2'>Scores</h2>
                  <div className='space-y-3'>
                    <div className='flex justify-between'>
                      <span className='text-gray-400'>Community Score</span>
                      <span>{coin.community_score?.toFixed(1) || 'Not Available'}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-400'>Developer Score</span>
                      <span>{coin.developer_score?.toFixed(1) || 'Not Available'}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-400'>Liquidity Score</span>
                      <span>{coin.liquidity_score?.toFixed(1) || 'Not Available'}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-400'>Public Interest Score</span>
                      <span>{coin.public_interest_score?.toFixed(1) || 'Not Available'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className=''>
                <BitcoinChart />
                <Venta />
              </div>


              {/* Description section */}
              {coin.description?.en && (
                <div className='mt-8 bg-gray-700 p-6 rounded-lg'>
                  <h2 className='text-xl font-bold mb-4 border-b border-gray-600 pb-2'>About {coin.name}</h2>
                  <div className='prose prose-invert max-w-none'
                    dangerouslySetInnerHTML={{ __html: coin.description.en }}>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CoinDetails