import { NavLink } from "react-router"
import logo from "../assets/images/footerLogo.svg"
import { CgProfile } from "react-icons/cg"
import { CiLinkedin } from "react-icons/ci"
import { FaGithub } from "react-icons/fa"

function Footer() {
  const links = [{link:"https://abdelghani-bahri.vercel.app/", icon: <CgProfile className="w-12 h-12 text-white" />, name:"portfolio"},
    {link:"https://github.com/GhaniBahri", icon: <FaGithub className="w-12 h-12 text-white" />, name:"gitHub"},
    {link:"https://www.linkedin.com/in/abdelghani-bahri-0a190a159/", icon: <CiLinkedin className="w-12 h-12 text-white" />, name:"linkedIn"},]
  return (
    <footer className='mt-auto h-fit w-full bg-primary text-white text-center text-7xl font-black font-raleway flex flex-col md:flex-row justify-between items-center'>
      <div className='w-full md:w-1/2 flex flex-col justify-center items-center py-8'>
        <img src={logo} alt="ScandiWeb" width={100} height={100} className="aspect-square w-32 h-32 md:w-48 md:h-48" />
        <p className="w-full text-center p-3 text-xl md:text-3xl font-semibold">ScandiMerket, we redefine online shopping</p>
      </div>
      <div className='w-full md:w-1/2 flex flex-col-reverse  justify-center items-center py-8'>
        <p className="w-full text-left p-3 text-xl md:text-3xl font-semibold leading-loose md:leading-12 whitespace-normal">
          This project was developed by {" "}
          <span className="w-fit h-fit px-2.5 py-1.5 bg-white text-primary rounded-sm mx-1.5 break-words">Abdelghani Bahri</span>, for {" "}
          <span className="w-fit h-fit px-2.5 py-1.5 bg-white text-primary rounded-sm mx-1.5 break-words">ScandiWeb</span> Junior Fullstack Developer test task.</p>
        <div className="w-full flex flex-row justify-center items-center gap-14">
          {links.map(link =>{
            return(
              <NavLink key={link.name} to={link.link} >
                {link.icon}
              </NavLink>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

export default Footer