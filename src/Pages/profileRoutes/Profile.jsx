import React from 'react';
import profileImg from '../../assets/person1.jpeg';
import { Link } from 'react-router-dom';
const Profile = () => {
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    profileImage: profileImg,
    role: 'Buyer',
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      alert('Delete profile functionality to be implemented');
    }
  };

  return (
    <div className='max-w-md mx-auto bg-white shadow-md rounded-md p-6'>
      <div className='flex items-center'>
        <img
          src={user.profileImage}
          alt={`${user.name}'s profile`}
          className='w-20 h-20 rounded-full mr-4'
        />
        <div>
          <h2 className='text-xl font-bold text-gray-800'>
            Hello, {user.name}!
          </h2>
          <p className='text-gray-600'>{user.email}</p>
          <p className='text-gray-600'>Role : {user.role}</p>
        </div>
      </div>

      <div className='mt-6 flex justify-between'>
        <Link
          to={'/update-profile'}
          className='px-4 py-2 animated-button bg-[#FFEA01B2] '
        >
          <span className='button-content '>Edit Profile</span>
        </Link>
        <button
          onClick={handleDelete}
          className='px-4 py-2 animated-button bg-red-800  '
        >
          <span className='button-content text-white'>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
