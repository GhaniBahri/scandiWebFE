import React from 'react'

function Menu({show}) {
  return (
  <>
    <div className={`text-left flex flex-col justify-start items-start py-24 px-6 h-svh w-5/6 ring-amber-500 shadow-[30px_0_20px_2px_rgba(0,0,0,0.05)]
      transition-transform duration-500 ease-in-out absolute top-0 left-0   ${show? '':'-translate-x-full'}`}>
      <a href="#" className='w-full h-8 border-b-2 border-slate-400'>Women</a>
      <a href="#" className='w-full h-8 border-b-2 border-slate-400'>Men</a>
      <a href="#" className='w-full h-8 border-b-2 border-slate-400'>Kids</a>
    </div>
  </>
    
  )
}

export default Menu