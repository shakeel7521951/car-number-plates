import { useState } from 'react';
import Car from '../../assets/HomepageImg.jpg';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../../Redux/userRoutes/userApi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../../Redux/userRoutes/userSlice';

const Register = () => {
  const [signup, { isLoading }] = useSignupMutation();
  const { language } = useSelector((state) => state.language);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const { name, email, password, confirmPassword, role } = formData;

    if (!name) newErrors.name = 'Name is required';

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!role) newErrors.role = 'Please select a role (Seller or Buyer)';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      setFormData({
        ...formData,
        image: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const { confirmPassword, ...data } = formData;

        const formDataToSend = new FormData();
        for (const key in data) {
          if (data[key]) formDataToSend.append(key, data[key]);
        }

        const formDataObject = {};
        formDataToSend.forEach((value, key) => {
          formDataObject[key] = value instanceof File ? value.name : value;
        });

        const result = await signup(formDataToSend).unwrap();
        toast.success('Enter your otp from provided Email');
        dispatch(setProfile(result?.user));

        navigate('/verfiy-opt', { state: { user: result?.user } });
      } catch (err) {
        console.log('Error:', err);
        toast.error(
          `Signup failed: ${err?.data?.message || 'An error occurred'}`
        );
      }
    }
  };

  return (
    <div className='flex items-center justify-center bg-[#caba99] mx-auto lg:max-w-[95vw] my-2'>
      <div className='bg-[#caba99] text-black shadow-lg w-full flex flex-col md:flex-row rounded-lg overflow-hidden'>
        {/* Image Section: Visible on large screens */}
        <div className='hidden md:block w-1/2 p-4'>
          <img
            src={Car}
            alt='Car Register'
            className='w-full h-full object-cover rounded-lg'
          />
        </div>

        <div className='w-full md:w-1/2 p-8 md:p-10 flex flex-col'>
          <h1 className='text-xl text-center font-semibold text-[#050C2B] italic'>
            {language === 'eng'
              ? '"Complete your detail to access exclusive plate number in Qatar"'
              : '"أكمل التفاصيل الخاصة بك للوصول إلى رقم اللوحة الحصري في قطر"'}
          </h1>
          <h1 className='text-xl text-center font-semibold text-[#050C2B] mt-2 italic'>
            {language === 'eng'
              ? '"Enter your detail for seamless experience on Lusail Numbers"'
              : '"أدخل التفاصيل الخاصة بك لتجربة سلسة مع أرقام لوسيل"'}
          </h1>
          <div className='w-full md:p-10 flex flex-col justify-center mt-6 md:mt-0'>
            <h2 className='text-2xl font-semibold mb-4 text-center text-[#050C2B]'>
              {language === 'eng' ? 'Sign Up' : 'اشتراك'}
            </h2>
            <form className='space-y-4' onSubmit={handleSubmit}>
              <div>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                  placeholder={
                    language === 'eng' ? 'Enter your name' : 'أدخل اسمك'
                  }
                />
                {errors.name && (
                  <p className='text-red-500 text-sm'>{errors.name}</p>
                )}
              </div>
              <div>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                  placeholder={
                    language === 'eng'
                      ? 'Enter your email'
                      : 'أدخل بريدك الإلكتروني'
                  }
                />
                {errors.email && (
                  <p className='text-red-500 text-sm'>{errors.email}</p>
                )}
              </div>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                  placeholder={`${
                    language === 'eng'
                      ? 'Enter your password'
                      : 'أدخل كلمة المرور الخاصة بك'
                  }`}
                />
                <div
                  className='absolute right-3 top-3 cursor-pointer'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                </div>
                {errors.password && (
                  <p className='text-red-500 text-sm'>{errors.password}</p>
                )}
              </div>
              <div className='relative'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                  placeholder={
                    language === 'eng'
                      ? 'Confirm your password'
                      : 'قم بتأكيد كلمة المرور الخاصة بك'
                  }
                />
                <div
                  className='absolute right-3 top-3 cursor-pointer'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <IoMdEye /> : <IoMdEyeOff />}
                </div>
                {errors.confirmPassword && (
                  <p className='text-red-500 text-sm'>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Select Role Field */}
              <div>
                <select
                  name='role'
                  value={formData.role}
                  onChange={handleChange}
                  className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                >
                  <option value=''>
                    {language === 'eng' ? 'Select your role' : 'حدد دورك'}
                  </option>
                  <option value='seller'>
                    {language === 'eng' ? 'Seller' : 'بائع'}
                  </option>
                  <option value='buyer'>
                    {language === 'eng' ? 'Buyer' : 'المشتري'}
                  </option>
                </select>
                {errors.role && (
                  <p className='text-red-500 text-sm'>{errors.role}</p>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  {language === 'eng'
                    ? 'Upload Profile Image'
                    : 'تحميل صورة الملف الشخصي'}
                </label>
                <input
                  type='file'
                  name='image'
                  accept='image/*'
                  onChange={handleChange}
                  className='mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:border-blue-500'
                />
              </div>

              <button
                disabled={isLoading}
                type='submit'
                className='w-full bg-[#050c2b] text-white p-2 rounded-md hover:bg-[#090d1d] transition-colors'
              >
                {isLoading
                  ? language === 'eng'
                    ? 'Signing up...'
                    : 'جارٍ الاشتراك...'
                  : language === 'eng'
                  ? 'Sign Up'
                  : 'اشتراك'}
              </button>
            </form>

            {/* Divider and Login Link */}
            <div className='my-4 flex items-center'>
              <hr className='w-full border-t border-gray-300' />
              <span className='mx-4 text-sm text-gray-600'>or</span>
              <hr className='w-full border-t border-gray-300' />
            </div>
            <button className='text-sm w-full text-center' onClick={() => {}}>
              {language === 'eng'
                ? 'Already have an account?'
                : 'هل لديك حساب بالفعل؟'}{' '}
              <Link to={'/login'} className='text-blue-600 hover:underline'>
                {language === 'eng' ? 'Login' : 'تسجيل الدخول'}
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
