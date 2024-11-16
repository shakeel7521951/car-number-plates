import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Profile = () => {
  const { profile } = useSelector((state) => state.user);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      alert('Delete profile functionality to be implemented');
    }
  };

  return (
    <div className='max-w-md mx-auto bg-white shadow-md rounded-md p-6'>
      <div className='flex items-center'>
        <div>
          <h2 className='text-xl font-bold text-gray-800'>
            Hello, {profile?.name}!
          </h2>
          <p className='text-gray-600'>{profile?.email}</p>
          <p className='text-gray-600'>Role : {profile?.role}</p>
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
