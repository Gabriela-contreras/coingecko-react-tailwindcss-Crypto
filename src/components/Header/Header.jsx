import React from 'react'
import { Link } from 'react-router-dom'
import CustomLink from '../CustomLink/CustomLink'
import Traduccion from '../Traduccion/Traduccion'
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'
// import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
const Header = () => {
  const { t } = useTranslation();

  return (
    <div className='sticky top-0 bg-white px-12 py-8 flex justify-center md:justify-between'>
      <div className='hidden md:block'>
        <Link className='font-sans font-bold text-xl text-gray-600' to='/'>
          Crypto
        </Link>
      </div>
      <div>
        <Traduccion/>
      </div>
      <div className='flex gap-4 text-xl'>
        <CustomLink to='/'>{t('Home')}</CustomLink>
        <CustomLink to='/favorite'>{t('Favorite')}</CustomLink>
        <CustomLink to='/about'>{t('About')}</CustomLink>
      </div>
    </div>
  )
}

export default Header
