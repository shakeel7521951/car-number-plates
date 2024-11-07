import React from 'react';
import { HiOutlinePlusSm } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";

const Navbar = () => {
  return (
    <nav className="bg-[#E0E0E0] p-2">
      <div className="flex items-center justify-between">
        <div className="text-white text-xl font-bold">
          <a href="#">Logo</a>
        </div>

        <div className="hidden md:flex space-x-10 text-black text-lg">
          <a href="#" className="hover:text-yellow-400">New</a>
          <a href="#" className="hover:text-yellow-400">Normal</a>
          <a href="#" className="hover:text-yellow-400">Silver</a>
          <a href="#" className="hover:text-yellow-400">Golden</a>
        </div>

        <div className="hidden md:flex w-36">
          {/* <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-lg">
            Become a Seller
          </button> */}
        </div>
      </div>
      <div className="flex mt-2">
        <div className="flex justify-center m-0 w-[80%]">
          <div className="w-full md:w-2/4 flex items-center relative ms-24">
            <input type="text" placeholder="Search..." className="w-full p-2 rounded-lg white text-black placeholder-gray-400 focus:outline-none" />
            <IoIosSearch className='absolute right-0 text-2xl' />
          </div>
        </div>
        <div className="hidden md:flex ml-4">
          <button className="bg-[#9FA2A0] hover:bg-[#8c8e8d] text-white px-4 py-1 rounded-lg">
            Sign In
          </button>
        </div>
        <div className="hidden md:flex ml-4 justify-center items-center border-2 border-black rounded-md">
          <button className="bg-transparent w-20 text-white px-4 py-1 rounded flex items-center justify-center relative">
            <HiOutlinePlusSm className="absolute left-2 text-white" />
            Post
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
