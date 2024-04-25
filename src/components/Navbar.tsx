import React from 'react';
import logo from "../assets/logo512.png"
import { Link, useNavigate } from 'react-router-dom';
import { AUTH_TOKEN, ISLOGGED, USER } from '../config/constants';

const Navbar: React.FC = () => {
    const navigate = useNavigate()
    const logout = () =>{
        localStorage.removeItem(ISLOGGED)
        localStorage.removeItem(AUTH_TOKEN)
        localStorage.removeItem(USER)
        navigate("/")

    }



  return (
    <><nav className="bg-white text-black-800 w-full shadow fixed top-0 z-50">
          <div className="w-5/6 container mx-auto py-4">
              <div className="flex justify-between items-center">
                  <Link to="/" className='flex items-center'>
                      <img width={55} src={logo}></img>
                      <div className="ml-2 text-2xl font-bold">Sportify</div>
                  </Link>
                  <div className="flex space-x-4">
                      <a href="#" className="hover:text-primarygreen text-gray-800 font-semibold">Home</a>
                      <a href="#" className="hover:text-primarygreen text-gray-800 font-semibold">Articles</a>
                      <a href="#" className="hover:text-primarygreen text-gray-800 font-semibold">Sports</a>
                      <a href="#" className="hover:text-primarygreen text-gray-800 font-semibold">Teams</a>
                  </div>
                  {
                  localStorage.getItem(ISLOGGED) ? 
                  <div className='flex items-center'>
                   <Link to="/profile"> <i className='bx bx-user-circle me-5 text-3xl'></i> </Link>
                    <button onClick={logout} className='bg-red-500 text-white p-1 px-2 text-sm rounded-xl'> <i className='bx bx-log-out'></i>{" "}Log Out</button>
                  </div> 
                  : 
                  <div>
                      <Link to="/signup" className='ml-2 p-2 px-4 bg-black hover:bg-primarygreen hover:text-black text-white rounded-md'>Signup</Link>
                      <Link to="/signin" className='ml-2 p-2 px-4 bg-black hover:bg-primarygreen hover:text-black text-white rounded-md'>Signin</Link>
                  </div>
                  }
              </div>
          </div>

      </nav><div className="mt-24">{" "}</div></>
  );
};

export default Navbar;
