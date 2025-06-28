import { createContext, useContext, useEffect, useState } from 'react';
import { useStoreData } from './useStoreData'
import itemInCart from '../helpers/itemInCart';

const AppContext = createContext()

export function AppWrapper ({children}) {
    const [menu, setMenu] = useState(false)
    const [cart, setCart] = useState(false)
    const [openProduct, setOpenProduct] = useState({})
    const [cartItems, setCartItems] = useState({ items: [], currency:'USD', total: 0 })
    const [allProducts, setAllProducts] = useState([])
    const { AllProducts, ProductsByCategory, ProductById,  } = useStoreData()
    const {loading, data, error} = AllProducts()
    useEffect(()=>{
        if(!loading && !error && data){
            setAllProducts(data.products)
        }
        if (error){
            console.error('Error loading data',error)
            setAllProducts([])
        }
    }, [loading, error, data])

    function showMenu(){
        setMenu (!menu)
    }
    function showCart(){
        setCart(!cart)
    }
    // function selectCartItem(item){
    //     setOpenProduct(item)
    // }
    function addCartItem(item, next) {
        const items = cartItems.items
        const itemExists = itemInCart(items, item)
        console.log('item', item)
        let total = cartItems.total
        let newItemsList = [...items]
        const subTotal = parseFloat((item.price * item.quantity).toFixed(2))
        if (itemExists === false){
            const newItem = {
                productId :item.id,
                quantity: item.quantity,
                price: item.price,
                attributes: [...item.attributes]
            }
            newItemsList.push(newItem)
            total = parseFloat((total + subTotal).toFixed(2))
        } else {
            const exisitingItem = items[itemExists]
            const newQuantity = exisitingItem.quantity + item.quantity
            const updatedItem = {
                ...exisitingItem,
                quantity : newQuantity
            }
            newItemsList[itemExists] = updatedItem
            total = parseFloat((total + subTotal).toFixed(2))
        }
        setCartItems({...cartItems, total: total, items: newItemsList})
        next()
    }
    function removeCartItem(item, next){
        const items = cartItems.items;
        const itemExists = itemInCart(items, item)
        let total = cartItems.total;
        let newItemsList = [...items];
        console.log('exists????', itemExists)
        if (itemExists === false){
            next() 
            return
        }
        console.log('it does')
        const exisitingItem = items[itemExists]
        console.log('existing', exisitingItem)
        const subTotal = exisitingItem.price * exisitingItem.quantity

        total -= subTotal
        newItemsList.splice(itemExists, 1)
        console.log('the new list', newItemsList)
        setCartItems({...cartItems, total: total, items: newItemsList})
        next()

    }
    function updateCartItem(existingItem, newAttributes){
        console.log('before', cartItems.items, '\n', existingItem)
        const items = cartItems.items
        const itemExists = itemInCart(items, existingItem)
        if (itemExists === false) return
        console.log('passed false')
        const oldItem = items[itemExists]
        const updatedItem = {...oldItem , attributes: [...newAttributes]}
        const newItemsList = [...items]
        newItemsList[itemExists] = updatedItem
        setCartItems({...cartItems, items : newItemsList})
        console.log('after', cartItems)
    }

    return (
        <AppContext.Provider
            value={{
                menu, showMenu,
                cart, showCart,
                AllProducts,
                ProductsByCategory,
                ProductById,
                openProduct, setOpenProduct,
                cartItems, addCartItem, removeCartItem, updateCartItem,
                allProducts
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export function useAppcontext(){
    return useContext(AppContext)
}