import React, { useEffect, useRef, useState } from 'react'

function CartMenu({cart, showCart}) {
  const [mounted, setMounted] = useState(false)
  const menuRef = useRef(null)

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
          <a href="#" className='w-full h-8 border-b-2 border-slate-400'>Women</a>
          <a href="#" className='w-full h-8 border-b-2 border-slate-400'>Men</a>
          <a href="#" className='w-full h-8 border-b-2 border-slate-400'>Kids</a>
        </div>
        </aside>
      </div>
      <div className='top-0 right-0 left-0 bottom-0 hidden lg:block z-40' ref={menuRef}>
        <div className='-z-50 fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.4)]' onClick={showCart}></div>
        <aside className={`z-10 absolute top-20 right-8 bg-white w-72 transition-all duration-500 ease-in-out ${mounted ? 'h-[32rem]' : 'h-0'}`}>
    
        </aside>    
      </div>
    </>
  )
  )
}

export default CartMenu