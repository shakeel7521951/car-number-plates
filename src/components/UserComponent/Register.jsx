import { useState } from 'react';
import Car from '../../assets/HomepageImg.jpg';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../../Redux/userRoutes/userApi';
import { toast } from 'react-toastify'; // Import Toastify
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../../Redux/userRoutes/userSlice';

const Register = () => {
  const [signup, { isLoading }] = useSignupMutation(); // Destructure mutation state
  const {language} = useSelector((state)=>state.language)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
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
    } else if (password.length < 6) {
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const { confirmPassword, ...data } = formData;
        const result = await signup(data).unwrap();
        toast.success('Signup successful:', result?.message);
        console.log(result?.user);
        dispatch(setProfile(result?.user));

        navigate('/explore');
      } catch (err) {
        console.log('err', err);
        toast.error(
          `Signup failed: ${err?.data?.message || 'An error occurred'}`
        );
      }
    }
  };
  if (isLoading) {
    <h1>Loading...</h1>;
  }

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
            "Complete your detail to access exclusive plate number in Qatar"
          </h1>
          <h1 className='text-xl text-center font-semibold text-[#050C2B] mt-2 italic'>
            "Enter your detail for seamless experience on Lusail Numbers"
          </h1>
          <div className='w-full md:p-10 flex flex-col justify-center mt-6 md:mt-0'>
            <h2 className='text-2xl font-semibold mb-4 text-center text-[#050C2B]'>
              Sign Up
            </h2>
            <form className='space-y-4' onSubmit={handleSubmit}>
              <div>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                  placeholder='Enter your name'
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
                  placeholder='Enter your email'
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
              <div className='relative'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                  placeholder='Confirm your password'
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
                  <option value=''>Select your role</option>
                  <option value='seller'>Seller</option>
                  <option value='buyer'>Buyer</option>
                </select>
                {errors.role && (
                  <p className='text-red-500 text-sm'>{errors.role}</p>
                )}
              </div>

              <button
                disabled={isLoading}
                type='submit'
                className='w-full bg-[#050c2b] text-white p-2 rounded-md hover:bg-[#090d1d] transition-colors'
              >
                Sign Up
              </button>
            </form>

            {/* Divider and Login Link */}
            <div className='my-4 flex items-center'>
              <hr className='w-full border-t border-gray-300' />
              <span className='mx-4 text-sm text-gray-600'>or</span>
              <hr className='w-full border-t border-gray-300' />
            </div>
            <button className='text-sm w-full text-center' onClick={() => {}}>
              Already have an account?{' '}
              <Link to={'/login'} className='text-blue-600 hover:underline'>
                Login
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
