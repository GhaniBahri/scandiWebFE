import React from 'react'
import { useParams } from "react-router";
import Card from '../components/Card'
import { useAppcontext } from '../store/state'

function Category() {
  const {products, getProductsByCategory, productCategory} = useAppcontext()
  console.table(products)
  const {cat} = useParams()
    getProductsByCategory('tech')
    const productsByCategory = products.filter(prod => prod.category == cat)
    console.log(cat, productsByCategory)
  return (
    <main className='w-full h-fit'>
      <div className='w-full h-full px-20 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-x-6 gap-y-10'>
        {productsByCategory.map(product => <Card product={product} key={product.id} />)}
      </div>
    </main>
  )
}

export default Category