import { createContext, useContext, useState } from 'react';
import { useStoreData } from './useStoreData'

const AppContext = createContext()

export function AppWrapper ({children}) {
    const [menu, setMenu] = useState(false)
    const [cart, setCart] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})
    const [cartItems, setCartItems] = useState({ items: [], currency:'USD', total: 0 })
    const { AllProducts, ProductsByCategory, ProductById,  } = useStoreData()

    function showMenu(){
        setMenu (!menu)
    }
    function showCart(){
        setCart(!cart)
    }
    function selectCartItem(item){
        setSelectedItem(item)
    }
    function addCartItem(item, next) {
        let total = cartItems.total
        const subTotal = item.price * item.quantity
        total += subTotal
        const attributes = []
        for (let attribute in item.attributes){
            const attr = `${attribute.toLowerCase()}:${item.attributes[attribute]}`
            attributes.push(attr)
        }
        setCartItems({...cartItems, total: total, items: attributes})
        next()
    }

    return (
        <AppContext.Provider
            value={{
                menu, showMenu,
                cart, showCart,
                AllProducts,
                ProductsByCategory,
                ProductById,
                selectedItem, selectCartItem,
                cartItems, addCartItem
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export function useAppcontext(){
    return useContext(AppContext)
}