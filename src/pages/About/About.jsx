import React from 'react'
import { useTranslation } from 'react-i18next'
import LanguageToggle from '../../components/Traduccion/Traduccion';
import FadeInStagger, { FadeInItem } from '../../components/Animation/FadeInStagger';

const About = () => {
  const { t } = useTranslation();
  
  return (
    <div className='bg-gray-900 min-h-screen text-white'>
      <section className='px-4 pt-20 pb-24 mx-auto max-w-7xl md:px-2'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-blue-400 mb-4'>{t('About Cryptos')}</h1>
          <p className='text-gray-300 max-w-2xl mx-auto'>{t('Understanding cryptocurrency and blockchain technology')}</p>
        </div>

        <div className='grid grid-cols-1 gap-12 md:gap-24 md:grid-cols-2'>
          <div className='bg-gray-800 p-8 rounded-xl shadow-lg'>
            <h2 className='mb-6 text-2xl font-bold text-blue-400 border-b border-gray-700 pb-3'>
              {t('Basic Questions')}
            </h2>
            <div className='space-y-8'>
              <div>
                <p className='mb-3 font-semibold text-lg text-gray-200'>
                  {t('What is accessibility?')}
                </p>
                <p className='text-gray-300'>
                  {t('accessibility_content')}
                </p>
              </div>
              <div>
                <p className='mb-3 font-semibold text-lg text-gray-200'>
                  {t('HTML: A good basis for accessibility?')}
                </p>
                <p className='text-gray-300'>
                  {t('html_accessibility_content')}
                </p>
              </div>
              <div>
                <p className='mb-3 font-semibold text-lg text-gray-200'>
                  {t('CSS and JavaScript accessibility best practices?')}
                </p>
                <p className='text-gray-300'>
                  {t('css_js_accessibility_content')}
                </p>
              </div>
            </div>
          </div>
          
          <div className='bg-gray-800 p-8 rounded-xl shadow-lg'>
            <h2 className='mb-6 text-2xl font-bold text-blue-400 border-b border-gray-700 pb-3'>
              {t('Advanced Questions')}
            </h2>
            <div className='space-y-8'>
              <div>
                <p className='mb-3 font-semibold text-lg text-gray-200'>
                  {t('WAI-ARIA basics?')}
                </p>
                <p className='text-gray-300'>
                  {t('wai_aria_content')}
                </p>
              </div>
              <div>
                <p className='mb-3 font-semibold text-lg text-gray-200'>
                  {t('Accessible multimedia?')}
                </p>
                <p className='text-gray-300'>
                  {t('multimedia_content')}
                </p>
              </div>
              <div>
                <p className='mb-3 font-semibold text-lg text-gray-200'>
                  {t('Mobile accessibility?')}
                </p>
                <p className='text-gray-300'>
                  {t('mobile_content')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About