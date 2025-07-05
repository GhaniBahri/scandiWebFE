import React, { useEffect} from 'react'
import { useAppcontext } from '../store/state'

function Toast({ duration = 5000 }) {
    // const [mounted, setMounted] = useState(false)
    const {showToast, setShowToast, toastMessage, toastColor} = useAppcontext()
    console.log('toast', showToast)
    
    // useEffect(()=>{setMounted(showToast)}, [showToast])
    useEffect(() => {
        console.log('effect')
        if (!showToast) return;
        console.log('return')
        const timer = setTimeout(() => setShowToast(false), duration);
        return () => clearTimeout(timer);
    }, [showToast, setShowToast, duration]);
    if (!showToast) return null
  return (
    (<div style={{ backgroundColor: toastColor.bg, color: toastColor.text}} 
    className={`z-50 fixed flex justify-center items-center px-4 py-6 rounded w-11/12 md:w-96 h-fit max-h-28 min-h-16 overflow-y-auto 
    bottom-8 md:-left-96 left-0 translate-x-4  md:translate-x-[26rem] delay-1000 duration-700 ease-out transition-transform`}>
        <p className={`w-full text-left font-semibold text-xl text-[${toastColor?.text}]`}>{toastMessage}</p>
    </div>)
  )
}

export default Toast