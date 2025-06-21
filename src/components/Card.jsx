import React from 'react'
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from 'react-router';
import toKebab from '../helpers/toKebab';

function Card({product}) {
  const navigate = useNavigate()
  const kebabName = toKebab(product.name)
  console.log(kebabName)
  function redirctPdp(){
    navigate(`/products/${product.id}`)
  }
  function addCartItem(event){
    event.stopPropagation()
    console.log('item Added')
  }
  return (
    <>
      <article className={`flex flex-col relative text-primaryText items-center justify-start w-72 h-96 rounded-md p-1 px-3 bg-white text-left font-raleway text-lg border border-gray-200
      hover:scale-105 hover:shadow-[0_0_8px_2px_rgba(0,0,0,0.2)] overflow-hidden transition-all duration-150 ease-in-out group`}
      onClick={redirctPdp} data-testid={`product-${kebabName}`}>
        <div className='w-full h-3/4 rounded-xs overflow-hidden relative'>
          <img src={product.gallery[0]} alt={product.name} className={`w-fit h-fit group-hover:scale-120 transition-transform ease-out duration-150 ${product.inStock? 'opacity-100' : ' opacity-35'}`} />
          <span className={`absolute w-full text-center text-normal font-semibold text-secondaryText bg-white py-2 top-1/2 -translate-y-1/2 ${product.inStock? 'opacity-0': 'opacity-100'}`}>Out of stock</span>
        </div>
        <button onClick={addCartItem} className={` text-white rounded-full p-2 bg-primary absolute right-4 bottom-20 transition-opacity ease-out duration-150 opacity-0 ${product.inStock? 'group-hover:opacity-100': ''}`}>
          <CiShoppingCart className={`w-6 h-6`}/>
        </button>
        <p className='w-full font-light text-lg mt-4'>{product.name}</p>
        <p className='w-full font-normal'>{product.prices[0].currency.symbol+product.prices[0].amount}</p>
      </article>
    </>
  )
}

export default Card