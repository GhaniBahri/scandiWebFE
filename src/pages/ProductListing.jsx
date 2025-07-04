import React from 'react'
import { useParams } from "react-router";
import Card from '../components/Cards/Card'
import { useAppcontext } from '../store/state'
import ErrorPage from '../components/ErrorPage';

function Category() {
  const {ProductsByCategory, AllProducts} = useAppcontext()
  const {cat} = useParams()
  const {loading, data, error} = cat === 'all'? AllProducts() : ProductsByCategory(cat)

  function Loading(){
    const fakeCards=["01","02","03","04", "05", "06"]
    return(
      <section className='w-full h-screen p-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-items-center align-middle items-center bg-white gap-20 overflow-hidden'>
            {fakeCards.map((card)=>{
              return (<div key={card} className='w-60 h-80  rounded-lg  bg-lightGray animate-pulse duration-300'></div>)
            })}
        </section>
    )
  }

  if (loading) return <Loading />;
  if (error) return <ErrorPage error={error} />;

  const ProductsList = data?.products || []
  if (ProductsList.length == 0) return <ErrorPage />
  return (
    <main className='w-full h-fit'>
      <div className='w-full px-4 md:px-8 lg:p-14 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  justify-items-center gap-[1rem] gap-y-12 '>
        {ProductsList.map(product => <Card product={product} key={product.id} />)}
      </div>
    </main>
  )
}

export default Category