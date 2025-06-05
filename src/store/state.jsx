import { createContext, useContext, useState } from 'react';
import { client } from './ApolloClient.js'
import { useStoreData } from './useStoreData'

const AppContext = createContext()

export function AppWrapper ({children}) {
    const [menu, setMenu] = useState(false)
    const [cart, setCart] = useState(false)
    const {products, categories, getCategoryProducts, productCategory} = useStoreData(client)

    function showMenu(){
        setMenu (!menu)
      }
      function showCart(){
        setCart(!cart)
      }
      function getProductsByCategory(category){
        getCategoryProducts(category)
      }

    return (
        <AppContext.Provider
            value={{
                menu, showMenu,
                cart, showCart,
                products,
                categories,
                productCategory,
                getProductsByCategory
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export function useAppcontext(){
    return useContext(AppContext)
}