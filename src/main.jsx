import { StrictMode } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createRoot } from 'react-dom/client'
import { AppWrapper } from './store/state.jsx'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Category from './pages/Category.jsx'
import ProductDetails from './pages/productDetails.jsx'

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <AppWrapper>
        <StrictMode>
        <Routes>
            <Route path="/" element={<App />} >
              {/* <Route index element={<Category/>} /> */}
              <Route path="categories/:cat" element={<Category />} />
              <Route path="products/:product" element={<ProductDetails />} />
            </Route>
          </Routes>
        </StrictMode>
      </AppWrapper>
    </ApolloProvider>
  </BrowserRouter>,
)
