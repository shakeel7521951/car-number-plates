import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDeleteProfileMutation } from '../../Redux/userRoutes/userApi';
import { toast } from 'react-toastify';
import { setProfile } from '../../Redux/userRoutes/userSlice';
const Profile = () => {
  const { profile } = useSelector((state) => state.user);
  const { language } = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const [deleteProfile] = useDeleteProfileMutation();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();

  const handleDeleteProfile = async () => {
    try {
      const resp = await deleteProfile().unwrap();
      dispatch(setProfile(null));
      toast.success(resp?.message);
      navigate('/');
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
              {language === 'eng' ? ' Hello,' : 'مرحبًا،'} {profile?.name}!
            </h2>
            <p className='text-gray-600'>{profile?.email}</p>
            <p className='text-gray-600 capitalize'>
              {language === 'eng' ? 'Role :' : 'دور :'} {profile?.role}
            </p>
          </div>
        </div>

        <div className='mt-6 flex justify-between'>
          <Link
            to={'/update-profile'}
            className='px-4 py-2 animated-button bg-[#FFEA01B2] '
          >
            <span className='button-content '>
              {language === 'eng' ? 'Edit Profile' : 'تحرير الملف الشخصي'}
            </span>
          </Link>
          <button
            onClick={() => setConfirmDelete(!confirmDelete)}
            className='px-4 py-2 animated-button bg-red-800  '
          >
            <span className='button-content text-white'>
              {language === 'eng' ? 'Delete' : 'يمسح'}
            </span>
          </button>
        </div>
      </div>
      {confirmDelete && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md'>
            <h2 className='text-lg font-bold text-gray-800 mb-4'>
              {language === 'eng' ? 'Confirm Delete' : 'تأكيد الحذف'}
            </h2>
            <p className='text-gray-600'>
              {language === 'eng'
                ? 'Are you sure you want to delete your profile? This action cannot be undone.'
                : 'هل أنت متأكد أنك تريد حذف ملف التعريف الخاص بك؟ لا يمكن التراجع عن هذا الإجراء.'}
            </p>
            <div className='mt-6 flex justify-end gap-4'>
              <button
                onClick={() => setConfirmDelete(false)}
                className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400'
              >
                {language === 'eng' ? 'Cancel' : 'يلغي'}
              </button>
              <button
                onClick={handleDeleteProfile}
                className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
              >
                {language === 'eng' ? 'Confirm Delete' : 'تأكيد الحذف'}
              </button>
            </div>
          </div>
        </div>
      )}{' '}
    </>
  );
};

export default Profile;
