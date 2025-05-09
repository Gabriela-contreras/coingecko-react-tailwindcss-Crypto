import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner/Spinner'
import BitcoinChart from '../../components/Graficos/GraficoBTC'
import Venta from '../../components/Graficos/GraficoVenta'
import FadeInStagger, { FadeInItem } from '../../components/Animation/FadeInStagger'
import FadeInSection from '../../components/Animation/FadeInSection'

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
        <FadeInStagger>
          <div className='bg-gray-900 min-h-screen text-white'>
            <div className='max-w-7xl mx-auto px-4 py-8'>
              {/* Header section with coin image and basic info */}
              <FadeInItem>
                <div className='bg-gray-800 rounded-xl p-4 md:p-6 shadow-lg mb-6'>
                  <div className='flex flex-col md:flex-row items-center md:items-start gap-6'>
                    <div className='flex justify-center'>
                      <img src={coin.image?.large} alt={coin.name} className='w-24 h-24 md:w-32 md:h-32 rounded-full' />
                    </div>

                    <div className='flex-1'>
                      <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
                        <div className='text-center md:text-left'>
                          <h1 className='text-2xl md:text-3xl font-bold'>{coin.name}</h1>
                          <p className='text-gray-400'>{coin.symbol?.toUpperCase()}</p>
                        </div>

                        <div className='mt-3 md:mt-0 flex items-center bg-gray-700 px-3 py-1 rounded-lg'>
                          <p className='text-gray-300'>Rank #{coin.market_cap_rank}</p>
                        </div>
                      </div>

                      {coin.market_data && (
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4'>
                          <div className='bg-gray-700 p-3 rounded-lg'>
                            <p className='text-gray-400 text-sm'>Current Price</p>
                            <p className='text-lg md:text-xl font-bold'>${coin.market_data.current_price?.usd?.toLocaleString()}</p>
                          </div>

                          <div className='bg-gray-700 p-3 rounded-lg'>
                            <p className='text-gray-400 text-sm'>24h Change</p>
                            <p className={coin.market_data?.price_change_percentage_24h < 0
                              ? 'text-red-500 text-lg md:text-xl font-bold'
                              : 'text-green-500 text-lg md:text-xl font-bold'}>
                              {coin.market_data?.price_change_percentage_24h?.toFixed(2)}%
                            </p>
                          </div>

                          <div className='bg-gray-700 p-3 rounded-lg'>
                            <p className='text-gray-400 text-sm'>Market Cap</p>
                            <p className='text-lg md:text-xl font-bold'>${coin.market_data?.market_cap?.usd?.toLocaleString()}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </FadeInItem>
              {/* Charts section - Optimized for responsive display */}
              <FadeInSection delay={0.4}>
                <FadeInStagger>
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
                    <FadeInItem>
                      <div className='bg-gray-800 rounded-xl p-4 shadow-lg'>
                        <h2 className='text-xl font-bold mb-4 border-b border-gray-700 pb-2'>Price Chart</h2>
                        <div className='h-64 md:h-80'>
                          <BitcoinChart />
                        </div>
                      </div>
                    </FadeInItem>
                    <FadeInItem>
                      <div className='bg-gray-800 rounded-xl p-4 shadow-lg'>
                        <h2 className='text-xl font-bold mb-4 border-b border-gray-700 pb-2'>Volume Chart</h2>
                        <div className='h-64 md:h-80'>
                          <Venta />
                        </div>
                      </div>
                    </FadeInItem>
                  </div>
                </FadeInStagger>
              </FadeInSection>
              {/* Info sections */}
              <FadeInSection delay={0.8}>
                <FadeInStagger>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                    <FadeInItem>
                      <div className='bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg'>
                        <h2 className='text-xl font-bold mb-4 border-b border-gray-700 pb-2'>General Info</h2>
                        <div className='space-y-3'>
                          <div className='flex justify-between'>
                            <span className='text-gray-400'>Genesis Date</span>
                            <span>{coin.genesis_date || 'Not Available'}</span>
                          </div>
                          <div className='flex justify-between'>
                            <span className='text-gray-400'>Hashing Algorithm</span>
                            <span className='text-right'>{coin.hashing_algorithm || 'Not Available'}</span>
                          </div>
                          <div className='flex justify-between'>
                            <span className='text-gray-400'>Origin</span>
                            <span>{coin.country_origin || 'Not Available'}</span>
                          </div>
                          <div className='flex justify-between'>
                            <span className='text-gray-400'>Last Updated</span>
                            <span className='text-right'>{new Date(coin.last_updated).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </FadeInItem>
                    <FadeInItem>
                      <div className='bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg'>
                        <h2 className='text-xl font-bold mb-4 border-b border-gray-700 pb-2'>Scores</h2>
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
                    </FadeInItem>
                  </div>

                  {/* Description section */}
                  {coin.description?.en && (
                    <FadeInItem>
                      <div className='bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg'>
                        <h2 className='text-xl font-bold mb-4 border-b border-gray-700 pb-2'>About {coin.name}</h2>
                        <div className='prose prose-invert max-w-none text-sm md:text-base'
                          dangerouslySetInnerHTML={{ __html: coin.description.en }}>
                        </div>
                      </div>
                    </FadeInItem>
                  )}
                </FadeInStagger>  
              </FadeInSection>
            </div>
          </div>
        </FadeInStagger>
      )}
    </>
  )
}

export default CoinDetails