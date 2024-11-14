import React, { useEffect, useRef, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { FaBars, FaTimes, FaPlus } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

import { CiBellOn, CiHeart } from 'react-icons/ci';
import person from '../../assets/person1.jpeg';
import MessageBox from './MessageBox';
import ProfileMenu from './ProfileMenu';
import { menuLinks } from '../../StaticData/data';

const Navbar = () => {
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  // const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const profileMenuRef = useRef(null);
  const profileButtonRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);

  const handleClickOutside = (e) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(e.target) &&
      !mobileMenuButtonRef.current.contains(e.target)
    ) {
      setIsMobileMenuOpen(false);
    }

    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(e.target) &&
      !profileButtonRef.current.contains(e.target)
    ) {
      setIsProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className='p-2 relative'>
      <div className='flex items-center justify-between md:justify-between'>
        <div className=' w-32 h-24'>
          <Link to='/'>
            <img src={logo} alt='Company logo' className='w-full h-full ' />
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className='md:hidden flex gap-4'>
          <main>
            <div
              className='w-10 h-10 rounded-full cursor-pointer'
              onClick={toggleProfileMenu}
              ref={profileButtonRef} // Add ref to the profile button
            >
              <img
                src={person}
                alt='Person'
                className='object-cover w-full h-full rounded-full'
              />
            </div>
            {isProfileMenuOpen && (
              <main
                className='absolute top-16 right-10 bg-white rounded-lg shadow-lg w-56 p-4 z-30'
                ref={profileMenuRef}
              >
                <ProfileMenu onClose={() => setIsProfileMenuOpen(false)} />
              </main>
            )}
          </main>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className='text-white text-2xl'
            ref={mobileMenuButtonRef}
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
        </div>

        {/* Sign In and Post Buttons */}
        <main className='hidden md:flex'>
          <div className='hidden md:flex ml-3 justify-center items-center border-2 border-[#9FA2A0] rounded-md'>
            {/*  if seller then the button should show */}
            <button className='bg-transparent  text-white font-bold w-max px-4 py-1 rounded flex items-center justify-between '>
              <FaPlus className=' font-bold text-white' />
              Post
            </button>
          </div>
          <div className='animated-button ml-4 cursor-pointer bg-white px-4 py-3'>
            <Link
              to={'/login'}
              className=' button-content  px-4 py-1 rounded-lg'
            >
              Sign In
            </Link>
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
              className='w-full p-2 rounded-xl bg-[#EAEAEA]  placeholder-gray-400 focus:outline-none'
            />
            <IoIosSearch className='absolute right-2 text-2xl' />
          </div>
        </div>
        <div className='flex gap-4'>
          <CiHeart size='40px' />
          <CiBellOn size='40px' />
          <MessageBox />
          <main>
            <div
              className='w-10 h-10 rounded-full cursor-pointer'
              onClick={toggleProfileMenu}
              ref={profileButtonRef} // Profile button ref
            >
              <img
                src={person}
                alt='Person'
                className='object-cover w-full h-full rounded-full'
              />
            </div>
            {isProfileMenuOpen && (
              <main
                className='absolute top-32 right-10 bg-white rounded-lg shadow-lg w-56 p-4 z-30'
                ref={profileMenuRef}
              >
                <ProfileMenu onClose={() => setIsProfileMenuOpen(false)} />
              </main>
            )}
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
          ref={mobileMenuRef} // Mobile menu ref
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
    </nav>
  );
};

export default Navbar;
