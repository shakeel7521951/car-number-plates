import React, { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { FaAngleDown, FaBars, FaTimes, FaPlus } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import Login from './UserComponent/Login';
import Register from './UserComponent/Register';
import { CiBellOn, CiHeart } from 'react-icons/ci';
import person from '../assets/person1.jpeg';
import MessageBox from './MessageBox'; // Import the MessageBox component

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [IsRegisterOpen, setIsRegisterOpen] = useState(false);

  const menuLinks = [
    { path: '/normal', label: 'Normal' },
    { path: '/silver', label: 'Silver' },
    { path: '/gold', label: 'Gold' },
    { path: '/vip', label: 'VIP' },
  ];

  const categoryLinks = [
    { path: '#', label: 'Category 1' },
    { path: '#', label: 'Category 2' },
    { path: '#', label: 'Category 3' },
  ];

  return (
    <nav className='p-2 relative'>
      <div className='flex items-center justify-between md:justify-between'>
        <div className='text-white text-xl font-bold'>
          <Link to='/'>
            <img
              src={logo}
              alt='Company logo'
              className='w-16 h-16 md:w-20 md:h-20'
            />
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className='md:hidden'>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className='text-white text-2xl'
          >
            <FaBars />
          </button>
        </div>

        {/* Desktop Menu Links */}
        <div className='hidden md:flex space-x-12 text-white font-semibold text-lg pt-3'>
          {menuLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className='border-b-2 border-transparent hover:border-blue-500 transition-all'
            >
              {link.label}
            </Link>
          ))}

          <div className='relative'>
            <button
              className='flex items-center space-x-2 border-b-2 border-transparent hover:border-blue-500 transition-all focus:outline-none'
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>Categories</span>
              <FaAngleDown />
            </button>
            {isDropdownOpen && (
              <div className='absolute text-white bg-[#050C2B] font-bold z-10 border border-gray-700 rounded-lg mt-2 w-40'>
                {categoryLinks.map((category, index) => (
                  <Link
                    key={index}
                    to={category.path}
                    className='block px-4 py-2 text-sm hover:bg-gray-700 hover:text-white'
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sign In and Post Buttons */}
        <main className='hidden md:flex'>
          <div className='hidden md:flex ml-3 justify-center items-center border-2 border-[#9FA2A0] rounded-md'>
            <button className='bg-transparent w-20 text-white font-bold px-4 py-1 rounded flex items-center justify-center relative'>
              <FaPlus className='absolute left-2 font-bold text-white' />
              Post
            </button>
          </div>
          <div className='hidden md:flex ml-4'>
            <button
              className='bg-[#D4FF00] hover:bg-[#dfff3d] text-black px-4 py-1 rounded-lg'
              onClick={() => setIsPopUpOpen(true)}
            >
              Sign In
            </button>
          </div>
        </main>
      </div>

      {/* Search and Icons */}
      <div className='hidden md:flex ms-6 mr-4'>
        <div className='flex justify-end m-0 w-[100%] md:w-[80%] mx-5'>
          <div className='w-full md:w-2/4 flex items-center relative md:ms-24 border border-black rounded-xl'>
            <input
              type='text'
              placeholder='Search...'
              className='w-full p-2 rounded-xl bg-[#EAEAEA] text-white placeholder-gray-400 focus:outline-none'
            />
            <IoIosSearch className='absolute right-2 text-2xl' />
          </div>
        </div>
        <div className='flex gap-4'>
          <CiHeart size='40px' />
          <CiBellOn size='40px' />
          <MessageBox /> {/* Replace with MessageBox component */}
          <main>
            <div className='w-10 h-10 rounded-full'>
              <img
                src={person}
                alt='Person'
                className='object-cover w-full h-full rounded-full'
              />
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className='md:hidden'>
        {isMobileMenuOpen && (
          <div
            className='fixed inset-0 bg-black bg-opacity-50 z-20'
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}
        <div
          className={`fixed top-0 right-0 h-full bg-[#050C2B] w-2/5 max-w-xs z-30 p-5 transform transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className='self-end text-white text-2xl mb-6'
          >
            <FaTimes />
          </button>
          {menuLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className='block mt-5 text-white font-semibold border-b border-gray-200 pb-2'
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Sign In and Register Popups */}
      {isPopUpOpen && (
        <Login
          setIsPopUpOpen={setIsPopUpOpen}
          setIsRegisterOpen={setIsRegisterOpen}
        />
      )}
      {IsRegisterOpen && (
        <Register
          setIsRegisterOpen={setIsRegisterOpen}
          setIsPopUpOpen={setIsPopUpOpen}
        />
      )}
    </nav>
  );
};

export default Navbar;
