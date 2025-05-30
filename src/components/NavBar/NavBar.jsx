import React from 'react'
import { CiMenuBurger, CiShoppingCart } from "react-icons/ci";
import logo from "@/assets/images/logo.svg";

function NavBar({showMenu, showCart}) {
  return (
  <>
    <nav className='z-10 flex lg:hidden justify-between items-center w-full h-14 fixed px-10 py-5 shadow-[0_6px_10px_4px_rgba(0,0,0,0.05)]'>
      <CiMenuBurger className='w-6 h-6' onClick={showMenu}/>
      <div>
        <img src={logo} alt="ScandiMarket Logo"  width={40} height={40} />
      </div>
      <CiShoppingCart className='w-6 h-6' onClick={showCart}/>
    </nav>
    <nav className='hidden lg:flex  justify-between items-center w-full h-20 fixed px-10 py-5'>
      <div className='h-full w-1/3 flex justify-start items-center text-center'>
          <a href="#" className='w-20 h-full'>Women</a>
          <a href="#" className='w-20 h-full'>Men</a>
          <a href="#" className='w-20 h-full'>Kids</a>
      </div>
      <div className='w-1/3 flex justify-center items-center'>
          <img src={logo} alt="ScandiMarket Logo"  width={50} height={50} />
      </div>
      <div className='w-1/3 flex justify-end items-center'>
          <CiShoppingCart className='w-8 h-8' />
      </div>
    </nav>
  </>
  )
}

export default NavBar