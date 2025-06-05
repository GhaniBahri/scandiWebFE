import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppWrapper } from './store/state.jsx'
import './index.css'
import App from './App.jsx'
// import { client } from './store/ApolloClient.js'
import { BrowserRouter, Routes, Route } from 'react-router'
import Category from './pages/Category.jsx'
import Cart from './pages/Cart.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppWrapper>
      <StrictMode>
      <Routes>
          <Route path="/" element={<App />} >
            {/* <Route index element={<Category/>} /> */}
            <Route path="categories/:cat" element={<Category />} />
          </Route>
        </Routes>
      </StrictMode>
    </AppWrapper>
  </BrowserRouter>,
)
