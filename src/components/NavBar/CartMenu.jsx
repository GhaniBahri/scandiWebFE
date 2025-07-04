import { useEffect, useRef, useState } from 'react'
import { useAppcontext } from '../../store/state'
import CartCard from '../Cards/CartCard'
import logo from '../../assets/images/logo.svg'

function CartMenu({cart, showCart}) {
  const [mounted, setMounted] = useState(false)
  const menuRef = useRef(null)
  const {cartItems, allProducts, placeOrder, orderLoading} = useAppcontext()
  const allItems = cartItems.items
  const cardsItems = []

  allItems.forEach(product => {
    const matchingProduct = allProducts.filter(prod => prod.id == product.productId )[0]
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

  useEffect(()=>{
    setMounted(cart)
  }, [cart])
  useEffect(() => {
    function handleOutsideClick(event) {
      if (event.target.closest('.CartMenuBtn')) return
      if (event.target.closest('aside')) return
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
    showCart()
  }
  async function orderItems(){
    try{
      const response = await placeOrder(cartItems)
      console.log('placed order', response)
    } catch(err){
      console.error(err)
    }
  }

  if (!cart) return null;
  if (orderLoading) return <div className='flex'></div>
  return (
  cart && (
    <>
      <div className="fixed inset-0 lg:hidden flex z-50">
      {/* <div className="-z-50 fixed top-0 right-0 left-0 bottom-0 "></div> */}
        <div className='absolute -z-10 inset-0 bg-[rgba(0,0,0,0.6)]' onClick={showCart} ></div>
        <aside className={`z-0 h-screen w-2/3 ml-auto text-left flex flex-col justify-start items-start py-24 px-6  max-w-sm
          top-0 right-0 relative bg-white  transform transition-transform duration-500 ease-in-out overflow-hidden
          ${mounted? 'translate-x-0':'translate-x-full'}`} ref={menuRef} onClick={(e)=>{e.stopPropagation()}}>
        {/* <div className={`z-0 h-screen w-2/3 ml-auto text-left z-10 flex flex-col justify-start items-start py-24 px-6 w-full  max-w-sm
          top-0 right-0 relative ml-auto h-full bg-white  transform transition-transform duration-500 ease-in-out
          ${mounted? 'translate-x-0':'translate-x-full'}`}> */}
            <p className='font-medium max-h-2/12 text-xl px-1 py-3 mb-4 w-full text-left'><span className='font-bold'>My Bag:</span>{' ' + cardsItems.length +' '+ (cardsItems.length > 1 ? 'items' : 'item')}</p>
          <div className='flex flex-col justify-start items-center w-full max-h-8/12 overflow-y-auto'>
            {
              cardsItems.map(item => {
                return (
                  <CartCard key={item.productId} item={item} />
                )
              })
            }
          </div>
          <p className='text-xl px-1 py-3 font-bold w-full flex flex-row justify-between items-center mt-auto mb-2 max-h-2/12'>
            <span >Total:</span>
            <span data-testid='cart-total'>${cartItems.total}</span>
          </p>
          <button className={`uppercase text-xl text-nowrap font-medium text-center bg-primary text-white w-11/12 mx-auto h-14 py-1 px-4 rounded-sm ${cartItems.items.length == 0 ? 'cursor-not-allowed opacity-75' : 'opacity-100'}`}
          onClick={orderItems} disabled={cartItems.items.length == 0}>place Orders</button>
        {/* </div> */}
        </aside>
      </div>
      <div className='top-0 right-0 left-0 bottom-0 fixed hidden lg:block z-40'>
        <div className='-z-50 fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.4)]' onClick={switchCart}></div>
        <aside ref={menuRef} className={`z-10 absolute top-20 right-8 bg-white w-96 overflow-hidden transition-all duration-500 ease-in-out ${mounted ? 'h-[38rem]' : 'h-0'}`}  onClick={(e)=>{e.stopPropagation()}}>
          <div className="relative w-full h-full flex flex-col justify-start items-center p-4 pt-0">
            {orderLoading && (
              <div className='w-full h-full flex justify-center items-center absolute top-0 bottom-0 left-0 right-0'>
                <div className='fixed top-0 bottom-0 left-0 right-0 bg-[rgba(255,255,255,0.4)] z-0'></div>
                <span className="w-16 h-16 p-8 rounded-full border-4 border-lightGray border-t-primary animate-spin absolute top-1/2 left-1/2 -translate-1/2"></span>
                <img src={logo} alt="scandiMarket" width={50} height={50} className='w-10 h-10 aspect-square animate-ping duration-1000' />
              </div>
            )}
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
              <span >Total:</span>
              <span data-testid='cart-total'>${cartItems.total}</span>
            </p>
            <button className={`uppercase text-xl font-medium text-center bg-primary text-white w-11/12 mx-auto h-14 py-1 px-4 rounded-sm ${cartItems.items.length == 0 ? 'cursor-not-allowed opacity-75' : 'opacity-100'}`}
            onClick={orderItems} disabled={cartItems.items.length == 0}>{orderLoading ? 'Placing…' : 'Place Order'}</button>
          </div>
          
        </aside>    
      </div>
    </>
  )
  )
}

export default CartMenu