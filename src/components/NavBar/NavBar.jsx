import React from 'react'
import { CiMenuBurger, CiShoppingCart } from "react-icons/ci";
import { NavLink } from "react-router";
import logo from "@/assets/images/logo.svg";


function NavBar({showMenu, showCart, categories}) {
  
  // console.table(categories)
  return (
  <>
    <nav className='z-10 flex lg:hidden justify-between items-center w-full h-14 text-primaryText font-raleway fixed px-10 shadow-[0_6px_10px_4px_rgba(0,0,0,0.05)] bg-white z-50'>
      <CiMenuBurger className='w-6 h-6' onClick={showMenu}/>
      <div>
        <img src={logo} alt="ScandiMarket Logo"  width={40} height={40} />
      </div>
      <CiShoppingCart className='w-6 h-6 text-primaryText' onClick={showCart}/>
    </nav>
    <nav className='hidden lg:flex  justify-between items-center w-full h-20 fixed px-10 shadow-[0_6px_10px_4px_rgba(0,0,0,0.05)] bg-white z-50'>
      <div className='h-full w-1/3 flex justify-start items-center text-center'>
          {categories.map(cat => 
            (<NavLink to={"/categories/"+cat.name} className={({isActive})=> `w-20 py-5 h-full flex items-center justify-center capitalize
              ${isActive? "border-b-2 border-primary text-primary" : "text-primaryText " }`} key={cat.name}>{cat.name} 
            </NavLink>)
          )}
      </div>
      <div className='w-1/3 flex py-5 justify-center items-center'>
          <img src={logo} alt="ScandiMarket Logo"  width={50} height={50} />
      </div>
      <div className='w-1/3 flex justify-end items-center py-5'>
          <CiShoppingCart className='w-8 h-8 text-primaryText' onClick={showCart} />
      </div>
    </nav>
  </>
  )
}

export default NavBar