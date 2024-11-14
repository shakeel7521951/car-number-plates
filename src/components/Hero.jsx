import React from 'react';
import hero1 from '../assets/HomepageImg.jpg';
import hero2 from '../assets/HomePage2.jpg';
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
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation={{ clickable: true }}
      autoplay={{ delay: 3000 }}
    >
      {hero_data.map((elem, index) => (
        <SwiperSlide key={index}>
          {/* Desktop and Mobile View */}
          <div
            className='flex items-center justify-center w-screen h-screen bg-cover bg-center relative transition-opacity duration-500'
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${elem.hero_image})`,
              backgroundSize: 'cover',
            }}
          >
            {/* Overlay Content */}
            <div className='flex flex-col items-center text-center text-white absolute inset-0 p-2 md:p-8 mt-12'>
              <p className='text-3xl md:text-5xl font-bold mb-4 tracking-wide'>
                CAR NUMBER PLATE
              </p>
              <div className='flex flex-col items-center mb-6'>
                <p className='text-xl md:text-2xl font-medium'>Qatar 8873</p>
                <p className='text-xl md:text-2xl font-medium'>$160</p>
              </div>
              <div className='flex gap-4 flex-wrap'>
                <button className='animated-button  bg-white px-4 py-3'>
                  <span className='button-content text-lg font-semibold'>
                    BOOK NOW
                  </span>
                </button>
                <button className='animated-button px-4 bg-white'>
                  <span className='button-content text-lg font-semibold'>
                    CONTACT
                  </span>
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Hero;
