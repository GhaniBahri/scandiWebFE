import { StrictMode } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createRoot } from 'react-dom/client'
import { AppWrapper } from './store/state.jsx'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route, Navigate, HashRouter } from 'react-router'
import Category from './pages/ProductListing.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import ErrorPage from './components/ErrorPage.jsx'

const client = new ApolloClient({
  uri: 'https://scandi-market.x10.mx/graphql',
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <AppWrapper>
        <StrictMode>
        <Routes>
            <Route path="/" element={<App />} >
              {/* <Route index element={<Navigate to="/categories/all" replace />} /> */}
              <Route path="categories/:cat" element={<Category />} />
              <Route path="products/:product" element={<ProductDetails />} />
              <Route path="*" element={<ErrorPage/>} />
            </Route>
          </Routes>
        </StrictMode>
      </AppWrapper>
    </ApolloProvider>
  </BrowserRouter>,
)
