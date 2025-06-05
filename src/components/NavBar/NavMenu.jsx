import React, { useEffect, useState } from 'react'

function Menu({show, toggleShow}) {
  const [mounted, setMounted] = useState(false)

  useEffect(()=>{setMounted(show)}, [show])
  return (
  show && (<>
  <div className="top-0 tight-0 left-0 bottom-0 ">
    <div className="-z-50 fixed top-0 right-0 left-0 bottom-0 bg-red-500"></div>
      <aside className={`w-screen z-0 h-screen `}>
      <div className='fixed -z-10 top-0 left-0 right-0 bottom-0 bg-[rgba(42,0,99,1)]' onClick={toggleShow} ></div>
      <div className={`text-left z-10 flex flex-col justify-start items-start py-24 px-6 h-full w-2/3 bg-white transition-transform duration-500 ease-in-out absolute top-0 left-0 ${mounted? 'translate-x-0':'-translate-x-full'}`}>
        <a href="#" className='w-full h-8 border-b-2 border-slate-400'>Women</a>
        <a href="#" className='w-full h-8 border-b-2 border-slate-400'>Men</a>
        <a href="#" className='w-full h-8 border-b-2 border-slate-400'>Kids</a>
      </div>
    </aside>
  </div>
  </>)
    
  )
}

export default Menu