import React from 'react';
import { Link } from 'react-router-dom';
import person from '../../assets/person1.jpeg';

const ProfileMenu = ({ onClose }) => {
  return (
    <div>
      <div className='flex items-center mb-4'>
        <img src={person} alt='User' className='w-12 h-12 rounded-full' />
        <div className='ml-3'>
          <h3 className='font-semibold text-lg'>John Doe</h3>
          <Link
            to='/profile'
            onClick={onClose}
            className='text-blue-500 hover:underline text-sm'
          >
            View Profile
          </Link>
        </div>
      </div>
      <hr className='border-t-2 border-[#D4FF00] my-4' />

      <ul>
        <li className='my-2'>
          <Link
            to='/dashboard'
            onClick={onClose}
            className='text-gray-700 hover:text-blue-500'
          >
            Dashboard
          </Link>
        </li>
        <li className='my-2'>
          <Link
            to='/add-listing'
            onClick={onClose}
            className='text-gray-700 hover:text-blue-500'
          >
            Add Listing
          </Link>
        </li>
        <li className='my-2'>
          <Link
            to='/my-listings'
            onClick={onClose}
            className='text-gray-700 hover:text-blue-500'
          >
            My Listings
          </Link>
        </li>
        <li className='my-2'>
          <button
            onClick={() => {
              /* Add your logout function here */
              onClose();
            }}
            className='text-gray-700 hover:text-blue-500'
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileMenu;
