import React from 'react';
import hero1 from '../assets/jorge-simmons-valenzuela-6Cl4r7FAEMA-unsplash.jpg';
import hero2 from '../assets/matt-antonioli-T_ZdgxzPS5k-unsplash.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// import "swiper/css/autoplay";
import { EffectFade } from 'swiper/modules';

function Hero() {
  const hero_data = [
    {
      id: 1,
      hero_image: hero1,
    },
    {
      id: 2,
      hero_image: hero2,
    },
  ];
  return (
    <Swiper
      className='custom-swiper w-full mt-4'
      modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      effect='fade'
      // autoplay={{
      //   delay: 3000, // Slide will change every 3 seconds
      //   disableOnInteraction: false, // Keeps autoplay running even after user interaction
      // }}
      navigation={{ clickable: true }}
      // pagination={{ clickable: true }}
      // scrollbar={{ draggable: false }}
    >
      {hero_data.map((elem,index) => {
        return (
          <SwiperSlide key={index}>
            <div
              className=' hidden md:flex flex-col '
              style={{
                width: '100vw',
                height: '100vh',
                // objectFit: "contain",
                backgroundImage: `url(${elem.hero_image})`,
                backgroundSize: 'cover',
                // backgroundRepeat: "no-repeat",
                // backgroundPosition: "center" mobile:h-[500px]  sm:h-[630px],
              }}
            >
              <div className='relative ml-20 flex flex-col justify-center items-start gap-4 w-[50vw] h-[90%]'>
                <p className='text-[30px] lg:text-[50px] font-bold m-0 p-0 text-white '>
                  CAR NUMBER PLATE
                </p>
                <div className='flex flex-col items-center'>
                  <p className='text-[25px] font-medium text-white'>
                    Qatar 8873
                  </p>
                  <p className='text-[25px] font-medium text-white text-center'>
                    {' '}
                    $160
                  </p>
                </div>

                <div className='flex gap-6'>
                  <a className='text-[11px] mobile:text-[13px] font-semibold bg-[#fff] text-[#000] p-2 lg:p-3  text-center w-[130px] mobile:w-[150px]  rounded-lg cursor-pointer'>
                    CONTACT
                  </a>
                  <a className='text-[11px] mobile:text-[13px] font-semibold bg-[#fff] text-[#000] p-2 lg:p-3 p text-center w-[150px] mobile:w-[170px]  rounded-lg cursor-pointer'>
                    BOOK NOW
                  </a>
                </div>
              </div>
            </div>
            <div
              className=' flex flex-col items-center justify-end w-[100vw] h-[130vh]  md:hidden'
              style={{
                backgroundImage: `url(${elem.hero_image})`,
                backgroundSize: 'cover',
                // minHeight: 400,
                backgroundRepeat: 'no-repeat',
                // backgroundPosition: "center",
              }}
            >
              <div className='relative flex flex-col items-center z-10'>
                <p className='text-[20px] mobile:text-[25px]  font-bold m-0 p-0 text-[#fff] '>
                  CAR NUMBER PLATE
                </p>
                <p className='text-[16px] mobile:text-[20px] font-medium text-[#fff] '>
                  QATAR 8877
                </p>
                <p className='text-[16px] mobile:text-[20px] font-medium text-[#fff] '>
                  $ 160
                </p>
                <div className='flex gap-2 mb-6'>
                  <a
                    className='text-[11px] mobile:text-[13px] font-semibold bg-[#000] text-[#fff] hover:bg-[#fff] hover:text-[#000] p-2  text-center w-[130px] mobile:w-[150px] mt-1 rounded-lg cursor-pointer'
                    a
                  >
                    CONTACT
                  </a>
                  <a className='text-[11px] mobile:text-[13px] font-semibold bg-[#000] text-[#fff] hover:bg-[#fff] hover:text-[#000] p-2 px-4 text-center w-[150px] mobile:w-[170px] mt-1 rounded-lg cursor-pointer'>
                    BOOK NOW
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Hero;
