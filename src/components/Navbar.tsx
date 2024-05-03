import React, { useState } from 'react';
import logo from "../../public/pwa-maskable-512x512.png"
import { Link, useNavigate } from 'react-router-dom';
import { AUTH_TOKEN, ISLOGGED, PREFERRED_SPORTS, PREFERRED_TEAM, USER } from '../config/constants';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Add a state for the hamburger menu

  const logout = () => {
    localStorage.removeItem(ISLOGGED)
    localStorage.removeItem(AUTH_TOKEN)
    localStorage.removeItem(USER)
    localStorage.removeItem(PREFERRED_SPORTS)
    localStorage.removeItem(PREFERRED_TEAM)
    navigate("/")
    window.location.reload();
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the state when the hamburger menu is clicked
  }

  return (
    <>
      <nav className="bg-white text-black-800 w-full shadow fixed top-0 z-50">
        <div className="w-5/6 container mx-auto py-4 md:flex md:justify-between md:items-center">
          <div className="flex justify-between items-center">
            <Link to="/" className='flex items-center'>
              <img width={55} src={logo}></img>
              <div className="ml-2 text-2xl font-bold">Sportify</div>
            </Link>
            {/* Hamburger menu for small screens */}
            <div className="md:hidden">
              <button type="button" className="hamburger-menu" onClick={toggleMenu}>
              <i className='bx bx-menu text-3xl font-semibold'></i>
              </button>
            </div>
          </div>
          {/* Navigation links for larger screens */}
          <div className="hidden md:flex items-center md:space-x-4">
            <Link to="/home" className="hover:text-primarygreen text-gray-800 font-semibold">Home</Link>
            <Link to="/articles" className="hover:text-primarygreen text-gray-800 font-semibold">Articles</Link>
            <Link to="/matches" className="hover:text-primarygreen text-gray-800 font-semibold">Matches </Link>
            {localStorage.getItem(ISLOGGED) ? (
              <div className='flex items-center'>
                <Link to="/profile">
                  <i className='bx bx-user-circle me-5 text-3xl'></i>
                </Link>
                <button onClick={logout} className='bg-red-500 text-white p-1 px-2 text-sm rounded-xl'>
                  <i className='bx bx-log-out'></i>{" "}Log Out
                </button>
              </div>
            ) : (
              <div>
                <Link to="/signup" className='ml-2 p-2 px-4 bg-black hover:bg-primarygreen hover:text-black text-white rounded-md'>Signup</Link>
                <Link to="/signin" className='ml-2 p-2 px-4 bg-black hover:bg-primarygreen hover:text-black text-white rounded-md'>Signin</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* Responsive navigation menu for small screens */}
      <div className={`responsive-nav ${isOpen ? 'block' : 'hidden'} border rounded-xl shadow-xl`}>
        <Link to="/home" className="mt-24 block px-4 py-2 text-gray-800 hover:bg-gray-200">Home</Link>
        <Link to="/articles" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Articles</Link>
        <Link to="/matches" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Matches</Link>
        {localStorage.getItem(ISLOGGED) ? (
          <div className='px-4 py-2 flex items-center'>
            <Link to="/profile">
              <i className='bx bx-user-circle me-5 text-3xl'></i>
            </Link>
            <button onClick={logout} className='bg-red-500 text-white p-1 px-2 text-sm rounded-xl'>
              <i className='bx bx-log-out'></i>{" "}Log Out
            </button>
          </div>
        ) : (
          <div className='px-4 py-2'>
            <Link to="/signup" className='block p-2 px-4 bg-black hover:bg-primarygreen hover:text-black text-white rounded-md'>Signup</Link>
            <Link to="/signin" className='block mt-2 p-2 px-4 bg-black hover:bg-primarygreen hover:text-black text-white rounded-md'>Signin</Link>
          </div>
        )}
      </div>
      <div className="mt-24">{" "}</div>
    </>
  );
};

export default Navbar;