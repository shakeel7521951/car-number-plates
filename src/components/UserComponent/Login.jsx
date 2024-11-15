import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import carImg from '../../assets/CarLogin.png';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useLoginMutation } from '../../Redux/userRoutes/userApi';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setProfile } from '../../Redux/userRoutes/userSlice';

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const result = await login({ email, password }).unwrap();
        toast.success(result?.message);
        dispatch(setProfile(result?.user));
        navigate('/');
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <div className='flex items-center justify-center bg-[#caba99] mx-auto lg:max-w-[95vw] my-2'>
      <div className='bg-[#caba99] text-black shadow-lg w-full flex flex-col md:flex-row rounded-lg overflow-hidden'>
        {/* Image Section */}
        <div className='hidden md:block w-1/2'>
          <img
            src={carImg}
            alt='Car Login'
            className='w-full h-full object-cover rounded-lg'
          />
        </div>

        {/* Form Section */}
        <div className='w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center gap-12'>
          <h1 className='text-xl text-center font-semibold text-[#050C2B] italic'>
            "Ready to buy or sell unique plate fill the form below to get
            started"
          </h1>

          <div className='w-full md:p-10 flex flex-col justify-center mt-6 md:mt-0'>
            <h2 className='text-2xl font-semibold mb-4 text-center text-[#050C2B]'>
              Log In
            </h2>
            <form className='space-y-4' onSubmit={handleSubmit}>
              <div>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500'
                  placeholder='Enter your email'
                />
                {errors.email && (
                  <p className='text-red-500 text-sm'>{errors.email}</p>
                )}
              </div>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500'
                  placeholder='Enter your password'
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

              <button
                onClick={() => navigate('/forgot-password')}
                type='button'
                className='text-sm text-blue-600 mt-2 hover:underline text-right w-full'
              >
                Forgot Password?
              </button>

              <button
                type='submit'
                disabled={isLoading}
                className='w-full bg-[#050c2b] text-white p-3 rounded-md hover:bg-[#090d1d] transition-colors'
              >
                Log In
              </button>
            </form>

            <div className='my-6 flex items-center'>
              <hr className='w-full border-t border-gray-300' />
              <span className='mx-4 text-sm text-gray-600'>or</span>
              <hr className='w-full border-t border-gray-300' />
            </div>
            <button
              onClick={() => {
                navigate('/register');
              }}
              className='text-sm w-full text-center'
            >
              Don't have an account?{' '}
              <span className='hover:underline text-blue-500'>Register</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
