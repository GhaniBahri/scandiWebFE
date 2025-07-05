import React from 'react'
import NavBar from './NavBar/NavBar'
import Footer from './Footer'
import { useAppcontext } from '@/store/state'
import Menu from './NavBar/NavMenu'
import CartMenu from './NavBar/CartMenu'
import Toast from './Toast'

function Layout({children}) {
    const {menu, cart, showMenu, showCart} = useAppcontext()
  return (
    <div className='font-raleway relative flex flex-col max-w-screen overflow-hidden'>
      <Toast  />
    <Menu show={menu} toggleShow={showMenu} />
    <CartMenu cart={cart} showCart={showCart} />
    <NavBar showMenu={showMenu} showCart={showCart} />
    <main className='pt-20 pb-6 '>
        {children}
    </main>
    <Footer />
    </div>
  )
}

export default Layout