import { CiMenuBurger, CiShoppingCart } from "react-icons/ci";
import { NavLink, useParams } from "react-router";
import { useAppcontext } from '../../store/state'
import logo from "@/assets/images/logo.svg";

function NavBar({showMenu, showCart}) {
  const {cartItems} = useAppcontext()
  // console.log('cartITems', cartItems)
  const categories = [{name: "all"}, {name: "clothes"}, {name: "tech"}];
  const {cat} = useParams()
  function switchCart(e){
    console.log('navbar',e)
    showCart()
  }
  return (
  <>
    <nav className='flex lg:hidden justify-between items-center w-full h-14 text-primaryText font-raleway fixed px-10 shadow-[0_6px_10px_4px_rgba(0,0,0,0.05)] bg-white z-50'>
      <CiMenuBurger className='w-6 h-6' onClick={showMenu}/>
      <div>
        <NavLink to={'/'}>
          <img src={logo} alt="ScandiMarket Logo"  width={40} height={40} />
        </NavLink>
      </div>
      <button  onClick={showCart} data-testid='cart-btn' className="relative">
        <span className={`absolute -top-3 -right-3 w-7 h-7 rounded-full flex justify-center items-center bg-black text-white text-base font-bold ${cartItems.items.length > 0 ? 'opacity-100' : 'opacity-0'}`}>{cartItems.items.length}</span>
        <CiShoppingCart className='w-6 h-6 text-primaryText'/>
      </button>
    </nav>
    <nav className='hidden lg:flex  justify-between items-center w-full h-20 fixed px-10 shadow-[0_6px_10px_4px_rgba(0,0,0,0.05)] bg-white z-50'>
      <div className='h-full w-1/3 flex justify-start items-center text-center'>
          {categories.map(category => 
            (<NavLink to={"/categories/"+category.name} className={({isActive})=> `w-20 py-5 h-full flex items-center justify-center capitalize
              ${isActive? "border-b-2 border-primary text-primary" : "text-primaryText " }`} key={category.name} data-testid={(cat == category.name) ? 'active-category-link' : 'category-link'} >
                {category.name} 
            </NavLink>)
          )}
      </div>
      <div className='w-1/3 flex py-5 justify-center items-center'>
        <NavLink to={'/'}>
          <img src={logo} alt="ScandiMarket Logo"  width={50} height={50} />
        </NavLink>
      </div>
      <div className='w-1/3 flex justify-end items-center py-5'>
      <button onClick={switchCart} data-testid='cart-btn' className="relative" >
        <span className={`absolute -top-3 -right-3 w-7 h-7 rounded-full flex justify-center items-center bg-black text-white text-base font-bold ${cartItems.items.length > 0 ? 'opacity-100' : 'opacity-0'}`}>{cartItems.items.length}</span>
        <CiShoppingCart className='w-8 h-8 text-primaryText'/>
      </button>
      </div>
    </nav>
  </>
  )
}

export default NavBar