import { createContext, useContext, useState } from 'react';
import { useStoreData } from './useStoreData'

const AppContext = createContext()

export function AppWrapper ({children}) {
    const [menu, setMenu] = useState(false)
    const [cart, setCart] = useState(false)
    const { AllProducts, ProductsByCategory, ProductById } = useStoreData()

    function showMenu(){
        setMenu (!menu)
      }
      function showCart(){
        setCart(!cart)
      }
      

    return (
        <AppContext.Provider
            value={{
                menu, showMenu,
                cart, showCart,
                AllProducts,
                ProductsByCategory,
                ProductById
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export function useAppcontext(){
    return useContext(AppContext)
}