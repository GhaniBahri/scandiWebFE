import React from 'react'

function Menu({show, toggleShow}) {
  return (
  <>
  <aside className={`w-screen z-0 h-screen transition-transform duration-500 ease-in-out absolute top-0 left-0 ${show? '':'-translate-x-full'}`}>
    <div className={`fixed -z-10 top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.2)]`} onClick={toggleShow} ></div>
    <div className='text-left z-10 flex flex-col justify-start items-start py-24 px-6 h-full w-3/5 bg-white'>
      <a href="#" className='w-full h-8 border-b-2 border-slate-400'>Women</a>
      <a href="#" className='w-full h-8 border-b-2 border-slate-400'>Men</a>
      <a href="#" className='w-full h-8 border-b-2 border-slate-400'>Kids</a>
    </div>
  </aside>
  </>
    
  )
}

export default Menu