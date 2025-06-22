import { createContext, useContext, useState } from 'react';
import { useStoreData } from './useStoreData'

const AppContext = createContext()

export function AppWrapper ({children}) {
    const [menu, setMenu] = useState(false)
    const [cart, setCart] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})
    const [cartItems, setCartItems] = useState([])
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
                ProductById,
                selectedItem, setSelectedItem,
                cartItems, setCartItems
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export function useAppcontext(){
    return useContext(AppContext)
}