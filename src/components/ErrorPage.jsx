import { NavLink } from 'react-router'
import { image } from '../assets/images/error.svg'

function ErrorPage() {
  return (
    <section className='w-full h-fit p-10 flex justify-center items-center'>
        <div className='max-w-3xl w-1/2 flex justify-center items-start flex-col'>
            <h1 className='w-full text-left text-7xl font-bold  text-primary'>Error!</h1>
            <p className='w-full text-lg font-medium text-left'>Something went wrong! Please try again later.</p>
            <NavLink to={'/'} />
        </div>
        <div>
            <img src={image} alt="Error Image" />
        </div>
    </section>
  )
}

export default ErrorPage