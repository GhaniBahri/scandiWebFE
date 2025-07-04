import { useEffect, useRef, useState } from 'react'
import { NavLink, useParams } from "react-router";

function Menu({show, toggleShow}) {
  const [mounted, setMounted] = useState(false)
  const categories = [{name: "all"}, {name: "clothes"}, {name: "tech"}];
  const {cat} = useParams()
  const menuRef = useRef(null)

  useEffect(()=>{setMounted(show)}, [show])
  useEffect(() => {
    function handleOutsideClick(event) {
      if(event.target.closest('.MenuBurgerBtn')) return
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        toggleShow();
      }
    }
    if (show) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [show, toggleShow])
  return (
  show && (<>
  <div className="top-0 tight-0 left-0 bottom-0 w-screen fixed z-10">
    <div className="-z-50 fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.6)]" onClick={toggleShow} ></div>
      <aside className="relative w-2/3 z-0 h-screen" ref={menuRef}>
      {/* <div className='fixed -z-10 top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.6)]' onClick={toggleShow} ></div> */}
      <div className={`text-left z-10 flex flex-col justify-start items-start py-24 px-6 h-full w-full bg-white 
        transition-transform duration-500 ease-in-out absolute top-0 left-0 ${mounted? 'translate-x-0':'-translate-x-full'}`}>
        {categories.map(category => 
                    (<NavLink to={"/categories/"+category.name} className={({isActive})=> ` text-left capitalize w-full h-12 py-4 border-b-2 border-slate-400
                      ${isActive? "border-b-2 border-primary text-primary" : "text-primaryText " }`} key={category.name} data-testid={(cat == category.name) ? 'active-category-link' : 'category-link'} 
                      onClick={toggleShow}>
                        {category.name} 
                    </NavLink>)
                  )}
      </div>
    </aside>
  </div>
  </>)
    
  )
}

export default Menu