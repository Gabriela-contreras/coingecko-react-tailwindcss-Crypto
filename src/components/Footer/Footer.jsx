import React from 'react'
import { Translation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Footer = () => {
  const t = Translation
  return (
    <footer className='bg-gray-900 border-t border-gray-800 w-full py-6'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='mb-4 md:mb-0'>
            <Link to='/' className='text-blue-500 font-bold text-xl'>Crypto</Link>
          </div>
          <div className='flex flex-col md:flex-row gap-6 text-sm text-gray-400'>
            <Link to='/' className='hover:text-white transition-colors'>Home</Link>
            <Link to='/favorite' className='hover:text-white transition-colors'>Favorites</Link>
            <Link to='/about' className='hover:text-white transition-colors'>About</Link>
          </div>
        </div>
        <div className='text-center text-gray-500 text-sm mt-6'>
          All Rights Reserved By &copy; Crypto | 2025 PWA
        </div>
      </div>
    </footer>
  )
}

export default Footer