import React from 'react';
import ErrorImg from '../assets/404Error.jpg'; // Ensure the path is correct
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className='flex items-center justify-center  bg-gray-800'>
      <div className='text-center p-8 rounded-lg   '>
        <h1 className='text-7xl font-extrabold mb-4 text-yellow-400 font-katibeh'>
          Oops!
        </h1>
        <p className='text-xl mb-6 text-white'>
          Something went wrong, please try again later.
        </p>
        {/* Image Integration */}
        <div className='mb-6'>
          <img
            src={ErrorImg}
            alt='No page found'
            className='rounded-lg w-full max-w-xs mx-auto shadow-lg object-cover'
          />
        </div>
        <Link to={'/'} className='animated-button bg-white px-4 py-3'>
          <span className='button-content text-lg font-semibold text-yellow-500'>
            Return Home
          </span>
        </Link>{' '}
      </div>
    </div>
  );
};

export default ErrorPage;
