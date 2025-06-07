import React, { useEffect, useState } from 'react'

function CartMenu({cart, showCart}) {
  const [mounted, setMounted] = useState(false)
  useEffect(()=>{
    setMounted(cart)
  }, [cart])
  return (
  cart && (
    <>
      <div className="lg:hidden block">
      <div className="-z-50 fixed top-0 right-0 left-0 bottom-0 bg-red-500"></div>
        <aside className={`w-screen z-0 h-screen `}>
        <div className='fixed -z-10 top-0 left-0 right-0 bottom-0 bg-[rgba(81,219,243,0.75)] border-4 border-primary max-w-full' onClick={showCart} ></div>
        <div className={`text-left z-10 flex flex-col justify-start items-start py-24 px-6 h-full w-2/3 bg-white transition-transform duration-500 ease-in-out absolute top-0 right-0 ${mounted? 'translate-x-0':'translate-x-full'}`}>
          <a href="#" className='w-full h-8 border-b-2 border-slate-400'>Women</a>
          <a href="#" className='w-full h-8 border-b-2 border-slate-400'>Men</a>
          <a href="#" className='w-full h-8 border-b-2 border-slate-400'>Kids</a>
        </div>
        </aside>
      </div>
      <div className='top-0 right-0 left-0 bottom-0 hidden lg:block z-40'>
        <div className='-z-50 fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.4)]' onClick={showCart}></div>
        <aside className={`z-10 absolute top-20 right-8 bg-white w-72 transition-all duration-500 ease-in-out ${mounted ? 'h-[32rem]' : 'h-0'}`}>
    
        </aside>    
      </div>
    </>
  )
  )
}

export default CartMenu