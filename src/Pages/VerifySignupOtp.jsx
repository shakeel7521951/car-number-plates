import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import img from '../assets/HomePage2.jpg';
import { useVerifyUserOtpMutation } from '../Redux/userRoutes/userApi';
const VerifySignupOtp = () => {
  const location = useLocation()?.state?.user;
  console.log(location);
  const { language } = useSelector((state) => state.language);
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [getVerifyOtp, { isLoading }] = useVerifyUserOtpMutation();
  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    if (value.match(/^\d{0,1}$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;

      setOtp(newOtp);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const userOtp = otp.join('');
    try {
      const result = await getVerifyOtp({
        otp: userOtp,
        email: location?.email,
      }).unwrap();
      toast.success(result?.message);
      navigate('/explore');
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
            src={img} // Use the appropriate image here
            alt='Signup OTP'
            className='w-full h-full object-cover rounded-lg'
          />
        </div>

        <div className='w-full md:w-1/2 p-4 lg:h-[600px] lg:flex lg:items-center lg:justify-center lg:flex-col'>
          <h2 className='text-2xl font-semibold mb-4 text-center'>
            {language === 'eng' ? 'Verify Signup OTP' : 'تحقق من OTP للتسجيل'}
          </h2>
          <form className='space-y-4 w-[90%]' onSubmit={handleVerifyOtp}>
            <div className='flex space-x-2 items-center justify-center flex-wrap gap-4'>
              {/* OTP Input Fields */}
              {otp.map((digit, index) => (
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
            <button
              type='submit'
              className={`w-full bg-[#050c2b] text-white p-2 rounded-md hover:bg-[#090d1d] transition-colors mt-4 `}
              disabled={isLoading}
            >
              {language === 'eng' ? 'Verify OTP' : 'تحقق من OTP'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VerifySignupOtp;
