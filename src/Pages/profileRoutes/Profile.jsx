import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDeleteProfileMutation } from '../../Redux/userRoutes/userApi';
import { toast } from 'react-toastify';
const Profile = () => {
  const { profile } = useSelector((state) => state.user);
  // console.log('profie ', profile);
  const [deleteProfile, { isLoading }] = useDeleteProfileMutation();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();

  const handleDeleteProfile = async () => {
    try {
      const resp = await deleteProfile().unwrap();
      toast.success(resp?.message);
      navigate('/');
      console.log(resp);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };
  return (
    <>
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
            onClick={() => setConfirmDelete(!confirmDelete)}
            className='px-4 py-2 animated-button bg-red-800  '
          >
            <span className='button-content text-white'>Delete</span>
          </button>
        </div>
      </div>
      {confirmDelete && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md'>
            <h2 className='text-lg font-bold text-gray-800 mb-4'>
              Confirm Delete
            </h2>
            <p className='text-gray-600'>
              Are you sure you want to delete your profile? This action cannot
              be undone.
            </p>
            <div className='mt-6 flex justify-end gap-4'>
              <button
                onClick={() => setConfirmDelete(false)}
                className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400'
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProfile}
                className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}{' '}
    </>
  );
};

export default Profile;
