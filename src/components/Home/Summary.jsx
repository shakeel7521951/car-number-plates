import React from 'react';
import image from '../../assets/summaryImg.png';

const Summary = () => {
  return (
    <main>
      <div className='w-full max-w-[1582px] h-auto  px-2 rounded-[25px] shadow-xl  sm:px-8 flex flex-col lg:flex-row items-center gap-6 mx-auto mt-12'>
        {/* Image Section */}

        {/* Text Section */}
        <div className='w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left gap-4'>
          {/* Main Heading */}
          <div className="text-white text-3xl sm:text-5xl lg:text-6xl font-normal font-['Katibeh']">
            QATAR plates services at your fingertips
          </div>

          {/* Description Text */}
          <div className='text-white  sm:text-lg lg:text-xl font-light font-inter'>
            Welcome to our innovative online platform, where buying and selling
            exclusive car numbers is made simple and convenient. Whether you're
            looking for a unique number plate to make a statement or need a
            specific combination for your vehicle, we offer a wide selection of
            personalized and rare car numbers to suit every preference. Our
            user-friendly website allows you to easily browse, search, and
            purchase the perfect car number from a vast collection. We provide
            secure payment options and fast delivery to ensure a smooth
            transaction experience. With a dedicated customer support team, we
            are always here to assist you with any queries or concerns.
          </div>
        </div>

        <div className='flex mt-12 flex-col items-center gap-4 lg:gap-0 lg:items-end relative'>
          <div className='w-max  bg-[#9aaea3]/50 rounded-[50px] sm:rounded-[70px] backdrop-blur-[15px] flex flex-col items-center justify-center p-4 sm:p-4 absolute -top-12'>
            <div className='text-white text-lg sm:text-xl font-bold font-inter'>
              Best Quality Number plates
            </div>
            <div className='text-white text-sm sm:text-base font-medium font-inter'>
              With 99% of happy Clients
            </div>
          </div>
          <div className='w-full  flex justify-center'>
            <img
              className='w-full max-w-[752px] h-full rounded-[25px]'
              src={image}
              alt='Qatar Plates Service'
            />
          </div>
        </div>
      </div>
      <div className='w-full flex items-center justify-center mt-4'>
        <div className='px-6 py-2 bg-[#1de678] rounded-[15px] flex items-center justify-center cursor-pointer  '>
          <button className='text-neutral-950 font-bold  font-inter'>
            Join Now
          </button>
        </div>
      </div>
    </main>
  );
};

export default Summary;
