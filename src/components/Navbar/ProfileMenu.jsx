import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import person from '../../assets/person1.jpeg';
import { useProfileQuery } from '../../Redux/userRoutes/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../../Redux/userRoutes/userSlice';
// import { useProfileMutation } from '../../Redux/userRoutes/userApi';

const ProfileMenu = ({ onClose }) => {
  const sellerProfile = [
    { path: '/dashboard', text: 'Dashboard' },
    { path: '/listing', text: 'My Listing' },
  ];
  const { profile } = useSelector((state) => state.user);
  console.log(profile);
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
            to='/listing'
            onClick={onClose}
            className='text-gray-700 hover:text-blue-500'
          >
            My Listings
          </Link>
        </li>
        <li className='my-2'>
          <button
            onClick={() => {
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
