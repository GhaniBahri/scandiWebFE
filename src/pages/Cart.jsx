import React from 'react'
import Card from '../components/Card'
import { useAppcontext } from '../store/state'

function Cart() {
  const {cartItems} = useAppcontext()
  console.log('cart', cartItems)
  return (
    <section>

    </section>
  )
}

export default Cart