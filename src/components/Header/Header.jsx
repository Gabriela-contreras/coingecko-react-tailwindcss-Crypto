import React from 'react'
import { Link } from 'react-router-dom'
import CustomLink from '../CustomLink/CustomLink'
import Traduccion from '../Traduccion/Traduccion'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className='sticky top-0 bg-gray-900 border-b border-gray-800 px-4 py-4 flex justify-between items-center z-10'>
      <div className='flex items-center'>
        <Link className='font-sans font-bold text-xl text-blue-500 mr-8' to='/'>
          Crypto
        </Link>
        <div className='hidden md:flex gap-6 text-sm font-medium'>
          <CustomLink to='/'>{t('Home')}</CustomLink>
          <CustomLink to='/favorite'>{t('Favorite')}</CustomLink>
          <CustomLink to='/about'>{t('About')}</CustomLink>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <Traduccion />
      </div>
    </div>
  )
}

export default Header
