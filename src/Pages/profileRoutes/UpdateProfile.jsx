import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useUpdateUserMutation } from '../../Redux/userRoutes/userApi';
import { toast } from 'react-toastify';
import { setProfile } from '../../Redux/userRoutes/userSlice';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.language);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { profile } = useSelector((state) => state.user);
  const [name, setName] = useState(profile?.name);
  const [role, setRole] = useState(profile?.role);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const lowercaseRole = role.toLowerCase();
      const result = await updateUser({ name, role: lowercaseRole }).unwrap();
      toast.success('Update Profile Successfully');
      dispatch(setProfile(result?.user));
      navigate('/profile');
    } catch (error) {
      toast.error(error?.data?.message || 'Error While Updating Profile');
    }
  };
  return (
    <div className='max-w-3xl mx-auto bg-white shadow-md rounded-md p-6 mt-12'>
      <h2 className='text-2xl font-bold mb-4'>
        {language === 'eng' ? 'Update Profile' : 'تحديث الملف الشخصي'}
      </h2>
      <form onSubmit={handleUpdate}>
        <div className='mb-4'>
          <label
            className={`block text-gray-700 ${
              language === 'eng' ? 'text-left' : 'text-right'
            } `}
          >
            {language === 'eng' ? 'Name' : 'اسم'}
          </label>
          <input
            type='text'
            defaultValue={profile?.name}
            onChange={(e) => setName(e.target.value)}
            className='w-full px-4 py-2 rounded border border-black'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            className={`block text-gray-700 ${
              language === 'eng' ? 'text-left' : 'text-right'
            } `}
          >
            {language === 'eng' ? 'Role' : 'دور'}
          </label>
          <select
            defaultValue={profile?.role}
            onChange={(e) => setRole(e.target.value)}
            className='w-full px-4 py-2 border rounded border-black'
            required
          >
            <option value='' disabled>
              {language === 'eng' ? 'Select your role' : 'حدد دورك'}
            </option>
            <option value='buyer'>
              {language === 'eng' ? 'Buyer' : 'المشتري'}
            </option>
            <option value='seller'>
              {language === 'eng' ? 'Seller' : 'بائع'}
            </option>
          </select>
        </div>
        <div className='flex justify-between flex-wrap'>
          <button
            type='submit'
            className='px-4 py-2 animated-button'
            disabled={isLoading}
          >
            <span className='button-content'>
              {language === 'eng' ? 'Save Changes' : 'حفظ التغييرات'}
            </span>
          </button>

          <div className='animated-button px-4 py-2'>
            <Link to={'/update-password'} className='button-content'>
              {language === 'eng' ? 'Update Password' : 'تحديث كلمة المرور'}
            </Link>
          </div>

          <Link
            to={'/profile'}
            type='button'
            className='px-4 py-2 animated-button'
          >
            <span className='button-content'>
              {language === 'eng' ? 'Cancel' : 'يلغي'}
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
