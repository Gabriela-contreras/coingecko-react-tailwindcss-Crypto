import React from 'react'
import { useTranslation } from 'react-i18next'
import LanguageToggle from '../../components/Traduccion/Traduccion';

const About = () => {
  const { t } = useTranslation();
  
  return (
    <section className='px-4 pt-20 pb-24 mx-auto max-w-7xl md:px-2 text-white'>

      <div className='grid grid-cols-1 gap-24 md:grid-cols-2'>
        <div>
          <h1 className='mb-6 text-2xl font-light  md:text-3xl'>
            {t('Basic Questions')}
          </h1>
          <p className='mt-10 mb-3 font-semibold '>
            {t('What is accessibility?')}
          </p>
          <p className='text-white'>
            {t('accessibility_content')}
          </p>
          <p className='mt-10 mb-3 font-semibold '>
            {t('HTML: A good basis for accessibility?')}
          </p>
          <p className='text-white'>
            {t('html_accessibility_content')}
          </p>
          <p className='mt-10 mb-3 font-semibold '>
            {t('CSS and JavaScript accessibility best practices?')}
          </p>
          <p className='text-white'>
            {t('css_js_accessibility_content')}
          </p>
        </div>
        <div>
          <h1 className='mb-6 text-2xl font-light md:text-3xl'>
            {t('Advanced Questions')}
          </h1>
          <p className='mt-10 mb-3 font-semibold '>
            {t('WAI-ARIA basics?')}
          </p>
          <p className='text-white'>
            {t('wai_aria_content')}
          </p>
          <p className='mt-10 mb-3 font-semibold '>
            {t('Accessible multimedia?')}
          </p>
          <p className='text-white'>
            {t('multimedia_content')}
          </p>
          <p className='mt-10 mb-3 font-semibold '>
            {t('Mobile accessibility?')}
          </p>
          <p className='text-white'>
            {t('mobile_content')}
          </p>
        </div>
      </div>
    </section>
  )
}

export default About