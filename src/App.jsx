// import { useState } from 'react'
// import './App.css'
import { useAppcontext } from './store/state'

function App() {
  const {count, setCount} = useAppcontext()
  return (
    <>
      <div className='bg-white dark:bg-black font-raleway'>
        
      </div>
      <h1 className='font-bold text-5xl font-raleway '>Vite + React</h1>
      <div className="card  font-raleway">
        <button onClick={() => setCount((count) => count + 5)}>
          count is {count}
        </button>
        <p>
          Women <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
