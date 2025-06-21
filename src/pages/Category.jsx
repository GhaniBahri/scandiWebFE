import React from 'react'
import { useParams } from "react-router";
import Card from '../components/Card'
import { useAppcontext } from '../store/state'
import ErrorPage from '../components/ErrorPage';

function Category() {
  const {ProductsByCategory, AllProducts} = useAppcontext()
  const {cat} = useParams()
  const {loading, data, error} = cat === 'all'? AllProducts() : ProductsByCategory(cat)

  if (loading) return <p className="animate-pulse">Loading navigation...</p>;
  if (error) return <ErrorPage error={error} />;

  const ProductsList = data?.products || []
  if (!ProductsList) return <ErrorPage />
  return (
    <main className='w-full h-fit'>
      <div className='w-full h-full px-20 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-x-6 gap-y-10'>
        {ProductsList.map(product => <Card product={product} key={product.id} />)}
      </div>
    </main>
  )
}

export default Category