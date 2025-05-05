import React from 'react'
import { Translation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Footer = () => {
  const t = Translation
  return (
    <footer className='bg-gray-800  w-full py-8 mt-8'>
      <div className='max-w-screen-xl mx-auto px-4'>
        <div>
        </div>
        <div className='text-center text-cyan-600 pt-10 sm:pt-12 font-light flex items-center justify-center'>
          All Rights Reserved By &copy; Crypto | 2025 PWA
        </div>
      </div>
    </footer>
  )
}

export default Footer
