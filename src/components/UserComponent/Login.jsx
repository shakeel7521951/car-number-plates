import { useNavigate } from 'react-router-dom';
import carImg from '../../assets/CarLogin.png';
import { useState, useCallback } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log('Email:', email);
      console.log('Password:', password);
    },
    [email, password]
  );

  return (
    <div className=' flex items-center justify-center bg-[#caba99] mx-auto  lg:max-w-[95vw] my-2'>
      <div className='bg-[#caba99] text-black shadow-lg w-full flex flex-col md:flex-row rounded-lg overflow-hidden'>
        <div className='hidden md:block w-1/2 '>
          <img
            src={carImg}
            alt='Car Login'
            className='w-full h-full object-cover'
          />
        </div>

        {/* Form Section */}
        <div className='w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center'>
          <h2 className='text-3xl font-semibold mb-6 text-center'>Sign In</h2>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500'
                placeholder='Enter your email'
              />
            </div>
            <div>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-blue-500'
                placeholder='Enter your password'
              />
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
  );
};

export default Login;
