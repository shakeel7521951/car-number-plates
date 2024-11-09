import { useState } from 'react';
import image from '../assets/CarForgot.png';

const ForgotPassword = ({ setIsPopUpOpen }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    if (value.match(/^\d{0,1}$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;

      setOtp(newOtp);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Log email and OTP
    console.log('Email:', email);
    console.log('OTP:', otp.join(''));
  };

  return (
    <section className='w-[90vw] mx-auto mt-12 '>
      <div className='w-full bg-white text-black rounded-lg shadow-lg  p-4 md:p-8 flex flex-col md:flex-row items-center md:items-start'>
        <div
          className='hidden md:block w-1/2 p-4 
        '
        >
          <img
            src={image}
            alt='Car Forgot Password'
            className='w-full h-full object-cover rounded-lg'
          />
        </div>

        {/* Form Section */}
        <div className='w-full md:w-1/2 p-4 lg:h-[600px] lg:flex lg:items-center lg:justify-center lg:flex-col'>
          <h2 className='text-2xl font-semibold mb-4 text-center'>
            Forgot Password
          </h2>
          <form className='space-y-4 w-[90%]' onSubmit={handleSubmit}>
            <div>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                placeholder='Enter your email'
                required
              />
            </div>
            <div className='w-full text-right text-blue-500'>
              <button>Send Otp</button>
            </div>
            <div className='flex space-x-2 items-center justify-center flex-wrap gap-4'>
              {/* OTP Input Fields */}
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type='text'
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  maxLength='1'
                  className='w-11 border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 text-center '
                  placeholder='0'
                  required
                />
              ))}
            </div>
            <button
              type='submit'
              className='w-full bg-[#050c2b] text-white p-2 rounded-md hover:bg-[#090d1d] transition-colors mt-4'
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
