import React from 'react';
import { Link } from 'react-router-dom';
import { useLogoutMutation } from '../../Redux/userRoutes/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../../Redux/userRoutes/userSlice';
import { toast } from 'react-toastify';
import profileImg from '../../assets/HomePage2.jpg';
const ProfileMenu = ({ onClose }) => {
  const { language } = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const sellerProfile = [
    {
      path: '/seller-dashboard',
      text: `${language === 'eng' ? 'Seller-Dashboard' : 'لوحة تحكم البائع'}`,
    },
    {
      path: '/listing',
      text: `${language === 'eng' ? 'My Listing' : 'قائمتي'}`,
    },
  ];
  const adminRoute = [
    {
      path: '/dashboard',
      text: `${language === 'eng' ? 'Dashboard' : 'لوحة القيادة'}`,
    },
    {
      path: '/seller-dashboard',
      text: `${language === 'eng' ? 'Seller-Dashboard' : 'لوحة تحكم البائع'}`,
    },
    {
      path: '/listing',
      text: `${language === 'eng' ? 'My Listing' : 'قائمتي'}`,
    },
  ];
  const { profile } = useSelector((state) => state.user);
  const userProfile = [{ path: '/orders', text: 'My Orders' }];
  const [logout, { isLoading }] = useLogoutMutation();
  const userArray =
    profile?.role?.toLowerCase() === 'seller'
      ? [...sellerProfile, ...userProfile]
      : profile?.role?.toLowerCase() === 'admin'
      ? [...adminRoute, ...userProfile]
      : [...userProfile];

  const handleLogout = async () => {
    try {
      const response = await logout().unwrap();
      toast.success(response?.message);
      dispatch(setProfile(null));
    } catch (error) {
      toast.error(error?.data?.message || 'User Is Currently logout');
    }
  };
  return (
    <div>
      <div className='flex items-center mb-4'>
        <div className='overflow-hidden'>
          <div className='flex gap-2 items-center'>
            <div className='w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300'>
              <img
                src={profile?.imageUrl || profileImg}
                alt='Profile'
                className='w-full h-full object-cover'
              />
            </div>
            <div>
              <h3 className='font-semibold text-lg '>
                {profile?.name || 'John'}{' '}
              </h3>
              <Link
                to='/profile'
                onClick={onClose}
                className='text-blue-500 hover:underline text-sm'
              >
                {language === 'eng' ? 'View Profile' : 'عرض الملف الشخصي'}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <hr className='border-t-2 border-[#D4FF00] my-4' />

      <ul>
        {userArray.map((item) => {
          return (
            <li key={item?.path} className='my-2'>
              <Link
                to={item.path}
                onClick={onClose}
                className='text-gray-700 hover:text-blue-500'
              >
                {item.text}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className='my-2'>
        <button
          disabled={isLoading}
          onClick={handleLogout}
          className='logout-button text-gray-700 hover:text-blue-500'
        >
          {language === 'eng' ? 'Logout' : 'تسجيل الخروج'}
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;
