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
    <main>
      {productsByCategory.map(product => <Card product={product} key={product.id} />)}
    </main>
  )
}

export default Category