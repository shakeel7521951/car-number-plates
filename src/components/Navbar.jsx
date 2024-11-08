import React, { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { FaAngleDown } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className='p-2'>
      <div className='flex items-center justify-between'>
        <div className='text-white text-xl font-bold'>
          <a href='#'><img src={logo} alt='Company logo' className='w-20 h-20' /></a>
        </div>

        <div className='hidden md:flex space-x-12 text-white font-semibold text-lg pt-3'>
          <a
            href='#'
            className='border-b-2 border-transparent hover:border-blue-500 transition-all'
          >
            Normal
          </a>
          <a
            href='#'
            className='border-b-2 border-transparent hover:border-blue-500 transition-all'
          >
            Silver
          </a>
          <a
            href='#'
            className='border-b-2 border-transparent hover:border-blue-500 transition-all'
          >
            Gold
          </a>
          <a
            href='#'
            className='border-b-2 border-transparent hover:border-blue-500 transition-all'
          >
            VIP
          </a>


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
              <div className='absolute text-white bg-[#E0E0E0] font-bold z-10 border border-gray-700 rounded-lg mt-2 w-40'>
                <a
                  href='#'
                  className='block px-4 py-2 text-sm hover:bg-gray-700 hover:text-white'
                >
                  Category 1
                </a>
                <a
                  href='#'
                  className='block px-4 py-2 text-sm hover:bg-gray-700 hover:text-white'
                >
                  Category 2
                </a>
                <a href='#' className='block px-4 py-2 text-sm hover:bg-gray-700 hover:text-white'
                >
                  Category 3
                </a>
              </div>
            )}
          </div>
        </div>

        <div className='hidden md:flex w-36'>{/* Additional Buttons */}</div>
      </div>

      <div className='flex ms-6'>
        <div className='flex justify-center m-0 w-[80%] mx-5'>
          <div className='w-full md:w-2/4 flex items-center relative ms-24 border border-black rounded-xl'>
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
            <FaPlus className='absolute left-2 m font-bold ' text-white />
            Post
          </button>
        </div>

        <div className='hidden md:flex ml-4'>
          <button className='bg-[#D4FF00] hover:bg-[#dfff3d]  text-black px-4 py-1 rounded-lg'>
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
