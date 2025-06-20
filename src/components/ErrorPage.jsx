import { NavLink } from 'react-router'
import errorImage from '../assets/images/errorImage.svg'

function ErrorPage() {
  return (
    <section className='w-full h-fit p-10 lg:px-48 flex flex-col-reverse lg:flex-row justify-center items-center'>
        <div className='max-w-3xl w:full lg:w-1/2 flex justify-center items-start flex-col gap-12'>
            <h1 className='w-full lg:text-left text-7xl md:text-9xl text-center lg:text-9xl font-black  text-primary'>Oops!</h1>
            <p className='w-full lg:text-4xl text-2xl wrap-normal font-semibold text-center lg:text-left'>Something went wrong! Please try again later.</p>
            <NavLink to={'/'} className="w-48 h-12 px-5 py-3 text-white bg-primary text-center rounded text-lg font-bold mx-auto lg:mr-auto lg:ml-0" > Home Page </NavLink>
        </div>
        <div className='w-full lg:w-1/2'>
            <img src={errorImage} alt="Error Image" className='' />
        </div>
    </section>
  )
}

export default ErrorPage