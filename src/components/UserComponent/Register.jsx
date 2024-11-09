import { useState } from 'react';
import Car from '../../assets/CarRegister.png';
import { IoMdCloseCircleOutline } from 'react-icons/io';

const Register = ({ setIsRegisterOpen, setIsPopUpOpen }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const { name, email, password, confirmPassword, phone } = formData;

    // Validate name
    if (!name) newErrors.name = 'Name is required';

    // Validate email
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }

    // Validate password
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Validate phone number
    if (!phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+[1-9]{1}[0-9]{3,14}$/.test(phone)) {
      newErrors.phone = 'Start with country code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // return true if no errors
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
    }
  };

  return (
    <section
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 pt-32 overflow-y-scroll'
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div className='relative bg-white text-black rounded-lg shadow-lg w-full max-w-3xl p-4 md:p-8 flex flex-col md:flex-row items-center md:items-start '>
        {/* Image Section: Visible on large screens */}
        <div className='hidden md:block w-1/2 p-4'>
          <img
            src={Car}
            alt='Car Register'
            className='w-full h-full object-cover rounded-lg'
          />
        </div>

        {/* Form Section */}
        <div className='w-full md:w-1/2 p-4'>
          <button
            className='absolute top-4 right-4 text-[#050c2b]'
            onClick={() => setIsRegisterOpen(false)}
          >
            <IoMdCloseCircleOutline size='30px' />
          </button>
          <h2 className='text-2xl font-semibold mb-4 text-center'>Sign Up</h2>
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
            <div>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                placeholder='Enter your password'
              />
              {errors.password && (
                <p className='text-red-500 text-sm'>{errors.password}</p>
              )}
            </div>
            <div>
              <input
                type='password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                placeholder='Confirm your password'
              />
              {errors.confirmPassword && (
                <p className='text-red-500 text-sm'>{errors.confirmPassword}</p>
              )}
            </div>
            <div>
              <input
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                placeholder='+974XXXXXXXXXX'
              />
              {errors.phone && (
                <p className='text-red-500 text-sm'>{errors.phone}</p>
              )}
            </div>
            <button
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
          <button
            className='text-sm w-full text-center'
            onClick={() => {
              setIsRegisterOpen(false);
              setIsPopUpOpen(true);
            }}
          >
            Already have an account?{' '}
            <span className='text-blue-600 hover:underline'>Login</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Register;