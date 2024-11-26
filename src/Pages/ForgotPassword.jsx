import { useState } from 'react';
import image from '../assets/HomePage2.jpg';
import { useSelector } from 'react-redux';
import {
  useForgotPasswordOtpMutation,
  useVerifyOtpMutation,
} from '../Redux/userRoutes/userApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// Import your API hooks

const ForgotPassword = ({ setIsPopUpOpen }) => {
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const { language } = useSelector((state) => state.language);
  const navigate = useNavigate();
  const [forgotPasswordOtp, { isLoading: isSendingOtp }] =
    useForgotPasswordOtpMutation();
  const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();

  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    if (value.match(/^\d{0,1}$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;

      setOtp(newOtp);
    }
  };

  const handleSendOtp = async () => {
    try {
      if (!email) {
        return;
      }
      const response = await forgotPasswordOtp({ email }).unwrap();
      toast.success(response?.message);
      console.log(response); // Debugging purposes
      setShowOtpBox(true);
    } catch (error) {
      toast.error(error?.data?.message);
      console.error(error);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const otpString = otp.join('');
      const response = await verifyOtp({ email, otp: otpString }).unwrap();

      toast.success(response?.message);
      navigate('/reset-password', { state: { otpString, email } });
    } catch (error) {
      toast.error(error?.data?.message);
      console.error(error);
    }
  };

  return (
    <section className='w-[90vw] mx-auto mt-12'>
      <div className='w-full bg-white text-black rounded-lg shadow-lg p-4 md:p-8 flex flex-col md:flex-row items-center md:items-start'>
        <div className='hidden md:block w-1/2 p-4 h-[100vh]'>
          <img
            src={image}
            alt='Car Forgot Password'
            className='w-full h-full object-cover rounded-lg'
          />
        </div>

        {/* Form Section */}
        <div className='w-full md:w-1/2 p-4 lg:h-[600px] lg:flex lg:items-center lg:justify-center lg:flex-col'>
          <h2 className='text-2xl font-semibold mb-4 text-center'>
            {language === 'eng' ? 'Forgot Password' : 'هل نسيت كلمة السر'}
          </h2>
          <form className='space-y-4 w-[90%]' onSubmit={handleVerifyOtp}>
            <div>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
                placeholder={`${
                  language === 'eng'
                    ? 'Enter your email'
                    : 'أدخل بريدك الإلكتروني'
                }`}
                required
              />
            </div>
            <div className='w-full text-right text-blue-500'>
              <button
                type='button'
                onClick={handleSendOtp}
                disabled={isSendingOtp}
                className={`${
                  isSendingOtp ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {language === 'eng' ? 'Send OTP' : 'إرسال OTP'}
              </button>
            </div>
            <div className='flex space-x-2 items-center justify-center flex-wrap gap-4'>
              {/* OTP Input Fields */}
              {showOtpBox &&
                otp.map((digit, index) => (
                  <input
                    key={index}
                    type='text'
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    maxLength='1'
                    className='w-11 border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 text-center'
                    placeholder='0'
                  />
                ))}
            </div>
            {showOtpBox && (
              <button
                type='submit'
                className={`w-full bg-[#050c2b] text-white p-2 rounded-md hover:bg-[#090d1d] transition-colors mt-4 ${
                  isVerifyingOtp ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isVerifyingOtp}
              >
                {language === 'eng' ? 'Verify' : 'يؤكد'}
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
