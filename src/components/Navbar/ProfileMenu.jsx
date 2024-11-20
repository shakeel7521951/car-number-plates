import React from 'react';
import { Link } from 'react-router-dom';
import person from '../../assets/person1.jpeg';
import { useLogoutMutation } from '../../Redux/userRoutes/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../../Redux/userRoutes/userSlice';
import { toast } from 'react-toastify';

const ProfileMenu = ({ onClose }) => {
  const { language } = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const sellerProfile = [
    { path: '/seller-dashboard', text: 'Seller-Dashboard' },
    { path: '/listing', text: 'My Listing' },
  ];
  const adminRoute = [
    { path: '/dashboard', text: 'Dashboard' },
    { path: '/seller-dashboard', text: 'Seller-Dashboard' },
    { path: '/listing', text: 'My Listing' },
  ];
  const { profile } = useSelector((state) => state.user);
  console.log(profile.role);
  const userProfile = [{ path: '/history', text: 'Purchasing History' }];
  const [logout, { isLoading }] = useLogoutMutation();
  const userArray =
    profile?.role?.toLowerCase() === 'seller'
      ? [...sellerProfile]
      : profile?.role?.toLowerCase() === 'admin'
      ? [...adminRoute]
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
        <img src={person} alt='User' className='w-12 h-12 rounded-full' />
        <div className='ml-3'>
          <h3 className='font-semibold text-lg'>{profile?.name || 'John'} </h3>
          <Link
            to='/profile'
            onClick={onClose}
            className='text-blue-500 hover:underline text-sm'
          >
             {language === 'eng'?'View Profile':'عرض الملف الشخصي'}
          </Link>
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
        {/* <li className='my-2'>
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
        </li> */}
      </ul>
      <div className='my-2'>
        <button
          disabled={isLoading}
          onClick={handleLogout}
          className='text-gray-700 hover:text-blue-500'
        >
          {language === 'eng'?'Logout':'تسجيل الخروج'}
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;
