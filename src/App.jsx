
import React, {useState} from 'react'
// import { useAppcontext } from './store/state'
import NavBar from './components/NavBar/NavBar'
import Menu from './components/NavBar/Menu'

function App() {
  // const {count, setCount} = useAppcontext()
  const [menu, setMenu] = useState(false)
  const [cart, setCart] = useState(false)

  function showMenu(){
    setMenu (!menu)
  }
  function showCart(){
    setCart(!cart)
  }
  return (
    <>
      <main className='font-raleway relative'>
        <Menu show={menu} toggleShow={showMenu}/>
        <NavBar showMenu={showMenu} showCart={showCart}></NavBar>
      </main>
    </>
  )
}

export default App
