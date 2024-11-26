import { useEffect, useState } from 'react';
import image from '../assets/car_background.png';
import {
  useConfirmResetPasswordMutation,
  useResetPasswordMutation,
} from '../Redux/userRoutes/userApi';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [updatePassword] = useConfirmResetPasswordMutation();
  console.log(location);
  useEffect(() => {
    if (!location?.state) {
      navigate(-1);
    }
  }, [location, navigate]);

  const { language } = useSelector((state) => state.language);

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      toast.error(
        language === 'eng'
          ? 'Passwords do not match!'
          : 'كلمات المرور غير متطابقة!'
      );
      return;
    } else if (password.length < 8) {
      toast.error('Password should be at least 8 characters long');
      return;
    }

    try {
      // console.log(password, confirmPassword);
      const res = await updatePassword({
        newPassword: password,
        email: location?.state?.email,
      }).unwrap();
      toast.success(
        res?.message ||
          (language === 'eng'
            ? 'Password reset successfully!'
            : 'تم إعادة تعيين كلمة المرور بنجاح!')
      );
      navigate('/login');
    } catch (error) {
      console.error(error);
      toast.error(
        error?.data?.message ||
          (language === 'eng'
            ? 'Error resetting password!'
            : 'خطأ في إعادة تعيين كلمة المرور!')
      );
    }
  };

  return (
    <section className='w-[90vw] mx-auto mt-12 flex justify-center items-center min-h-screen'>
      <div className='w-full bg-white text-black rounded-lg shadow-lg p-4 md:p-8 flex flex-col md:flex-row items-center justify-center'>
        {/* Image Section */}
        <div className='hidden md:block w-1/2 p-4 h-[100vh]'>
          <img
            src={image}
            alt='Reset Password'
            className='w-full h-full object-cover rounded-lg'
          />
        </div>

        {/* Form Section */}
        <div className='w-full md:w-1/2 p-4 lg:h-[600px] flex items-center justify-center flex-col'>
          <div className='w-full max-w-md'>
            <h2 className='text-2xl font-semibold mb-4 text-center'>
              {language === 'eng'
                ? 'Reset Password'
                : 'إعادة تعيين كلمة المرور'}
            </h2>
            <form className='space-y-4' onSubmit={handleSubmit}>
              {/* New Password */}
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                  placeholder={`${
                    language === 'eng'
                      ? 'Enter your new password'
                      : 'أدخل كلمة المرور الجديدة الخاصة بك'
                  }`}
                  required
                />
                <button
                  type='button'
                  className='absolute right-2 top-2 text-gray-500'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Confirm New Password */}
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                  placeholder={`${
                    language === 'eng'
                      ? 'Confirm your new password'
                      : 'قم بتأكيد كلمة المرور الجديدة'
                  }`}
                  required
                />
                <button
                  type='button'
                  className='absolute right-2 top-2 text-gray-500'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button
                type='submit'
                className='w-full bg-[#050c2b] text-white p-2 rounded-md hover:bg-[#090d1d] transition-colors mt-4'
              >
                {language === 'eng'
                  ? 'Reset Password'
                  : 'إعادة تعيين كلمة المرور'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
