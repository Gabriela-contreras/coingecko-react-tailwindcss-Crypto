import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import CoinDetails from './pages/Details/CoinDetails'
import NotFound from './components/NotFound/NotFound'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Favorite from './pages/Favorite/Favorite'
import ROUTES from './const/ROUTES.js'


const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path={ROUTES.home} element={<Home/>} />
        <Route path={ROUTES.detail} element={<CoinDetails />} />
        <Route path={ROUTES.about} element={<About/>} />
        <Route path={ROUTES.favorite} element={<Favorite/>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
