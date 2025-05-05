import React from 'react'
import { Link } from 'react-router-dom'
import CustomLink from '../CustomLink/CustomLink'
import Traduccion from '../Traduccion/Traduccion'
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'
const Header = () => {
  const { t } = useTranslation();

  return (
    <div className='sticky top-0 bg-gray-800 px-12 py-8 flex justify-center md:justify-between'>
      <div className='hidden md:block flex flex-row'>
        <Link className='font-sans font-bold text-xl text-white' to='/'>
          Crypto
        </Link>
      </div>
      <div className='flex gap-4 text-xl text-white'>
          <CustomLink to='/'>{t('Home')}</CustomLink>
          <CustomLink to='/favorite'>{t('Favorite')}</CustomLink>
          <CustomLink to='/about'>{t('About')}</CustomLink>
        </div>
      <div>
        <Traduccion />
      </div>

    </div>
  )
}

export default Header
