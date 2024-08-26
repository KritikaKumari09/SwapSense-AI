import React from 'react'
import { Link , useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  return (
    <nav className=" absolute w-full py-3 px-4  top-0 z-50 " >
      <div className=" mx-auto flex justify-between items-center py-2 px-4 rounded-full" style={{backgroundColor:"#353645bd"}}>
        <div className="text-2xl font-bold text-white cursor-pointer" onClick={()=>{
          navigate("/")
        }}>SwapSense AI</div>
        <ul className="flex space-x-6">
          {['Home', 'About', 'Contact'].map((item) => (
            <li key={item}>
              <Link to={`${item.toLowerCase()}`} className="text-white hover:text-blue-300 transition-colors duration-300 hover:underline hover:font-semibold ">
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Header
