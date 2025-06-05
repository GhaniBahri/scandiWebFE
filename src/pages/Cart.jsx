import React from 'react'
import Card from '../components/Card'
import { useAppcontext } from '../store/state'

function Cart() {
  const {products, getProductsByCategory, productCategory} = useAppcontext()
  getProductsByCategory('tech')
  console.log('tech', productCategory)
  return (
    <div className='flex flex-row flex-wrap justify-baseline items-start gap-8 w-full h-full px-20 py-20'>
      {products.map(product => <Card product={product} key={product.id} />)}

    </div>
  )
}

export default Cart