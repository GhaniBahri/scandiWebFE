import React, { useEffect, useRef, useState } from 'react'
import { useAppcontext } from '../../store/state'
import CartCard from '../Cards/CartCard'

function CartMenu({cart, showCart}) {
  const [mounted, setMounted] = useState(false)
  const menuRef = useRef(null)
  const {cartItems, allProducts, placeOrder} = useAppcontext()

  // const itemsIds = cartItems.items.map(item => item.productId)
  const allItems = cartItems.items
  // const itemsData = allProducts.filter(item => itemsIds.includes(item.id))
  const cardsItems = []
  console.log('cart', cartItems)

  allItems.forEach(product => {
    const matchingProduct = allProducts.filter(prod => prod.id == product.productId )[0]
    console.log('name of ', matchingProduct)
    const cardItem = {
      productId: product.productId,
      name: matchingProduct.name,
      image: matchingProduct.gallery[0],
      quantity: product.quantity,
      price: product.price,
      attributes: matchingProduct.attributes,
      selectedAttributes : product.attributes
    }
    cardsItems.push(cardItem)
  })

  // console.info('itemsIds')
  console.log('items to order', cartItems)
  // // console.info('allproducts')
  // // console.table(allProducts)
  // console.info('itemsdata')
  // console.table(itemsData)
  // console.info('cards')
  // console.table(cardsItems)

  useEffect(()=>{
    setMounted(cart)
  }, [cart])
  useEffect(() => {
    function handleOutsideClick(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        showCart();
      }
    }
    if (cart) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [cart, showCart]);

  function switchCart(){
    console.log('cartMenu')
    showCart()
  }
  function orderItems(){
    const orders = placeOrder(cartItems)
    console.log(orders)
  }

  if (!cart) return null;
  return (
  cart && (
    <>
      <div className="fixed inset-0 lg:hidden flex not-only:not-only-of-type:z-50">
      <div className="-z-50 fixed top-0 right-0 left-0 bottom-0 "></div>
        <div className='absolute inset-0 bg-[rgba(0,0,0,0.6)]' onClick={showCart} ></div>
        <aside className="w-full z-0 h-screen">
        <div className={`text-left z-10 flex flex-col justify-start items-start py-24 px-6 w-2/3  max-w-sm
          top-0 right-0 relative ml-auto h-full bg-white  transform transition-transform duration-500 ease-in-out
          ${mounted? 'translate-x-0':'translate-x-full'}`}>
        </div>
        </aside>
      </div>
      <div className='top-0 right-0 left-0 bottom-0 fixed hidden lg:block z-40' ref={menuRef}>
        <div className='-z-50 fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.4)]' onClick={switchCart}></div>
        <aside className={`z-10 absolute top-20 right-8 bg-white w-96 flex flex-col justify-start items-center p-4 pt-0 transition-all duration-500 ease-in-out ${mounted ? 'h-[38rem]' : 'h-0'}`}>
          <p className='font-medium max-h-2/12 text-xl px-1 py-3 mb-4 w-full text-left'><span className='font-bold'>My Bag:</span>{' ' + cardsItems.length +' '+ (cardsItems.length > 1 ? 'items' : 'item')}</p>
          <div className='flex flex-col justify-start items-center max-h-8/12 overflow-y-auto'>
            {
              cardsItems.map(item => {
                return (
                  <CartCard key={item.productId} item={item} />
                )
              })
            }
          </div>
          <p className='text-xl px-1 py-3 font-bold w-full flex flex-row justify-between items-center mt-auto mb-2 max-h-2/12'>
            <span >My Bag:</span>
            <span>${cartItems.total}</span>
          </p>
          <button className='uppercase text-xl font-medium text-center bg-primary text-white w-11/12 mx-auto h-14 py-1 px-4 rounded-sm'
          onClick={orderItems}>place Orders</button>
        </aside>    
      </div>
    </>
  )
  )
}

export default CartMenu