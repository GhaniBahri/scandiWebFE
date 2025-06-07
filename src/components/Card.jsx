import React from 'react'
import { CiShoppingCart } from "react-icons/ci";

function Card({product}) {
  return (
    <>
      <article className={`flex flex-col relative text-primaryText items-center justify-start w-72 h-96 rounded-md p-1 px-3 bg-white text-left font-raleway text-lg border border-gray-200
      hover:scale-105 hover:shadow-[0_0_8px_2px_rgba(0,0,0,0.2)] overflow-hidden transition-all duration-150 ease-in-out ${product.inStock? 'group' : ''}`}>
        
        <div className='w-full h-3/4 rounded-xs overflow-hidden relative'>
          <img src={product.gallery[0]} alt={product.name} className={`w-fit h-fit  group-hover:scale-120 transition-transform ease-out duration-150 ${product.inStock? 'opacity-100' : ' opacity-35'}`} />
          <span className={`absolute w-full text-center text-normal font-semibold text-secondaryText bg-white py-2 top-1/2 -translate-y-1/2 ${product.inStock? 'opacity-0': 'opacity-100'}`}>Out of stock</span>
        </div>
          <CiShoppingCart className={`w-10 h-10 text-white rounded-full p-1 bg-primary absolute right-4 bottom-20 opacity-0 transition-opacity ease-out duration-150 `}/>
        <p className='w-full font-light text-lg mt-4'>{product.name}</p>
        <p className='w-full font-normal'>{product.prices[0].currency.symbol+product.prices[0].amount}</p>
      </article>
    </>
  )
}

export default Card