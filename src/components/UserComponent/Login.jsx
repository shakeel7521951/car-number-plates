import { useNavigate } from 'react-router-dom';
import carImg from '../../assets/CarLogin.png';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useState, useCallback } from 'react';

const Login = ({ setIsPopUpOpen, setIsRegisterOpen }) => {
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const navigate = useNavigate();

  // Use useCallback to memoize the function
  const handleForgotPassword = useCallback(() => {
    navigate('/forgot-password');
    setIsPopUpOpen(false);
  }, [navigate]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log('Email:', email);
      console.log('Password:', password);
    },
    [email, password]
  );

  return (
    <section className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4'>
      <div className='relative bg-white text-black rounded-lg shadow-lg w-full max-w-3xl p-4 md:p-8 flex flex-col md:flex-row items-center md:items-start'>
        {/* Image Section: Visible on large screens */}
        <div className='hidden md:block w-1/2 p-4'>
          <img
            src={carImg}
            alt='Car Login'
            className='w-full h-full object-cover rounded-lg'
          />
        </div>

        {/* Form Section */}
        <div className='w-full md:w-1/2 p-4 md:mt-16'>
          <button
            className='absolute top-4 right-4 text-[#050c2b]'
            onClick={() => setIsPopUpOpen(false)}
          >
            <IoMdCloseCircleOutline size='30px' />
          </button>
          <h2 className='text-2xl font-semibold mb-4 text-center'>Sign In</h2>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                placeholder='Enter your email'
              />
            </div>
            <div>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Fixed issue with setting password
                className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                placeholder='Enter your password'
              />
            </div>
            <button
              onClick={handleForgotPassword}
              type='button'
              className='text-sm text-blue-600 mt-2 hover:underline text-right w-full'
            >
              Forgot Password?
            </button>
            <button
              type='submit'
              className='w-full bg-[#050c2b] text-white p-2 rounded-md hover:bg-[#090d1d] transition-colors'
            >
              Log In
            </button>
          </form>

          {/* Divider and Register Link */}
          <div className='my-4 flex items-center'>
            <hr className='w-full border-t border-gray-300' />
            <span className='mx-4 text-sm text-gray-600'>or</span>
            <hr className='w-full border-t border-gray-300' />
          </div>
          <button
            onClick={() => {
              setIsPopUpOpen(false);
              setIsRegisterOpen(true);
            }}
            className='text-sm  w-full text-center'
          >
            Don't have an account?{' '}
            <span className='hover:underline w-full text-center text-blue-500'>
              Register
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
