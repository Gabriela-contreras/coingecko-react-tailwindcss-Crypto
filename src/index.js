import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
// import "./i18n"; // Importa la configuración de i18next

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {' '}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
