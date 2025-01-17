import { useState } from 'react';
import image from '../assets/gold.jpg';
import { useUpdatePasswordMutation } from '../Redux/userRoutes/userApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UpdatePassword = () => {
  const [UpdatePassword] = useUpdatePasswordMutation();
  const navigate = useNavigate();
  const { language } = useSelector((state) => state.language);
  const [formData, setFormData] = useState({
    oldPassword: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      toast.error('Password is not Match ');
      return;
    }
    try {
      const res = await UpdatePassword({
        oldPassword,
        password,
        confirmPassword,
      }).unwrap();
      toast.success(res?.message);
      navigate('/profile');
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || 'Error while updating password');
    }
  };

  return (
    <section className='w-[90vw] mx-auto mt-12 flex justify-center items-center min-h-screen'>
      <div className='w-full bg-white text-black rounded-lg shadow-lg p-4 md:p-8 flex flex-col md:flex-row items-center justify-center'>
        {/* Image Section */}
        <div className='hidden md:block w-1/2 p-4 h-[100vh]'>
          <img
            src={image}
            alt='Car Update Password'
            className='w-full h-full object-cover rounded-lg'
          />
        </div>

        {/* Form Section */}
        <div className='w-full md:w-1/2 p-4 lg:h-[600px] flex items-center justify-center flex-col'>
          <div className='w-full max-w-md'>
            <h2 className='text-2xl font-semibold mb-4 text-center'>
              {language === 'eng' ? 'Update Password' : 'تحديث كلمة المرور'}
            </h2>
            <form className='space-y-4' onSubmit={handleSubmit}>
              {/* Current Password */}
              <div className='relative'>
                <input
                  type={showPassword.oldPassword ? 'text' : 'password'}
                  name='oldPassword'
                  value={formData.oldPassword}
                  onChange={handleChange}
                  className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                  placeholder={`${
                    language === 'eng'
                      ? 'Enter your current password'
                      : 'أدخل كلمة المرور الحالية الخاصة بك'
                  }`}
                  required
                />
                <button
                  type='button'
                  onClick={() => togglePasswordVisibility('oldPassword')}
                  className='absolute right-2 top-2 text-gray-600 focus:outline-none'
                >
                  {showPassword.oldPassword ? '👁️' : '🙈'}
                </button>
              </div>

              {/* New Password */}
              <div className='relative'>
                <input
                  type={showPassword.password ? 'text' : 'password'}
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                  placeholder={`${
                    language === 'eng'
                      ? 'Enter a new password'
                      : 'أدخل كلمة مرور جديدة'
                  }`}
                  required
                />
                <button
                  type='button'
                  onClick={() => togglePasswordVisibility('password')}
                  className='absolute right-2 top-2 text-gray-600 focus:outline-none'
                >
                  {showPassword.password ? '👁️' : '🙈'}
                </button>
              </div>

              {/* Confirm New Password */}
              <div className='relative'>
                <input
                  type={showPassword.confirmPassword ? 'text' : 'password'}
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
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  className='absolute right-2 top-2 text-gray-600 focus:outline-none'
                >
                  {showPassword.confirmPassword ? '👁️' : '🙈'}
                </button>
              </div>

              <button
                type='submit'
                className='w-full bg-[#050c2b] text-white p-2 rounded-md hover:bg-[#090d1d] transition-colors mt-4'
              >
                {language === 'eng' ? 'Update Password' : 'تحديث كلمة المرور'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdatePassword;
