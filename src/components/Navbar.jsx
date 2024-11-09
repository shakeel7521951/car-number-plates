import React, { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { FaAngleDown, FaBars, FaTimes, FaPlus } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import Login from './UserComponent/Login';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className='p-2 relative'>
      <div className='flex items-center justify-between'>
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

        <div className='hidden md:flex space-x-12 text-white font-semibold text-lg pt-3'>
          <Link
            to='/normal'
            className='border-b-2 border-transparent hover:border-blue-500 transition-all'
          >
            Normal
          </Link>
          <Link
            to='/silver'
            className='border-b-2 border-transparent hover:border-blue-500 transition-all'
          >
            Silver
          </Link>
          <Link
            to='/gold'
            className='border-b-2 border-transparent hover:border-blue-500 transition-all'
          >
            Gold
          </Link>
          <Link
            to='/vip'
            className='border-b-2 border-transparent hover:border-blue-500 transition-all'
          >
            VIP
          </Link>

          {/* Categories Dropdown */}
          <div className='relative'>
            <button
              className='flex items-center space-x-2 border-b-2 border-transparent hover:border-blue-500 transition-all focus:outline-none'
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>Categories</span>
              <FaAngleDown />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className='absolute text-white bg-[#050C2B] font-bold z-10 border border-gray-700 rounded-lg mt-2 w-40'>
                <Link
                  to='#'
                  className='block px-4 py-2 text-sm hover:bg-gray-700 hover:text-white'
                >
                  Category 1
                </Link>
                <Link
                  to='#'
                  className='block px-4 py-2 text-sm hover:bg-gray-700 hover:text-white'
                >
                  Category 2
                </Link>
                <Link
                  to='#'
                  className='block px-4 py-2 text-sm hover:bg-gray-700 hover:text-white'
                >
                  Category 3
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className='hidden md:flex w-36'>{/* Additional Buttons */}</div>
      </div>

      <div className='flex ms-6'>
        <div className='flex justify-center m-0 w-[100%] md:w-[80%] mx-5'>
          <div className='w-full md:w-2/4 flex items-center relative md:ms-24 border border-black rounded-xl'>
            <input
              type='text'
              placeholder='Search...'
              className='w-full p-2 rounded-xl bg-[#EAEAEA] text-white placeholder-gray-400 focus:outline-none'
            />
            <IoIosSearch className='absolute right-2 text-2xl' />
          </div>
        </div>

        <div className='hidden md:flex ml-3 justify-center items-center border-2 border-[#9FA2A0] rounded-md'>
          <button className='bg-transparent w-20 text-white font-bold px-4 py-1 rounded flex items-center justify-center relative'>
            <FaPlus className='absolute left-2 font-bold' text-white />
            Post
          </button>
        </div>

        <div className='hidden md:flex ml-4'>
          <button className='bg-[#D4FF00] hover:bg-[#dfff3d] text-black px-4 py-1 rounded-lg'>
            Sign In
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-20'
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className='fixed right-0 top-0 h-full bg-[#050C2B] w-2/5 max-w-xs z-30 p-5 flex flex-col text-lg'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className='self-end text-white text-2xl'
            >
              <FaTimes />
            </button>
            <Link
              to='/normal'
              className='mt-5 text-white font-semibold border-b border-gray-200 pb-2'
            >
              Normal
            </Link>
            <Link
              to='/silver'
              className='mt-5 text-white font-semibold border-b border-gray-200 pb-2'
            >
              Silver
            </Link>
            <Link
              to='gold'
              className='mt-5 text-white font-semibold border-b border-gray-200 pb-2'
            >
              Gold
            </Link>
            <Link
              to='/vip'
              className='mt-5 text-white font-semibold border-b border-gray-200 pb-2'
            >
              VIP
            </Link>
          </div>
        </div>
      )}
      {/* <Login /> */}
    </nav>
  );
};

export default Navbar;
