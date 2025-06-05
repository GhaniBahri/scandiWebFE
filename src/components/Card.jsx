import React from 'react'

function Card({product}) {
  return (
    <>
      <article className='flex flex-col items-center justify-start w-72 h-96 rounded-md p-1 bg-white text-left font-raleway text-lg border border-gray-200
      hover:scale-105 hover:shadow-[0_0_8px_2px_rgba(0,0,0,0.2)] overflow-hidden transition-all duration-150 ease-in-out group'>
        
        <div className='w-full h-3/4 rounded-xs overflow-hidden'>
          <img src={product.gallery[0]} alt={product.name} className='w-fit h-fit group-hover:object-fill object-cover group-hover:inset-shadow-[0_0_20px_2px_rgba(0,0,0,0.9)]' />
        </div>
        <p className='w-full font-light text-lg mt-4'>{product.name}</p>
        <p className='w-full font-normal'>{product.prices[0].currency.symbol+product.prices[0].amount}</p>
      </article>
    </>
  )
}

export default Card