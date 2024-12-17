import React from 'react';
import ExploreCard from '../Explore/ExploreCard';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NoProductFound from '../NoProductFound';

const HomeCards = () => {
  const { product } = useSelector((state) => state.product);
  const { language } = useSelector((state) => state.language);

  const subData = product?.slice(0, 3);
  return (
    <div className='mt-5 md:p-10'>
      <h1 className='text-white text-center text-[22px] md:text-[40px] font-bold mb-5'>
        {language === 'eng' ? 'New Today' : 'جديد اليوم'}
      </h1>
      {product?.length <= 0 && <NoProductFound />}

      {subData?.length > 0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between gap-4 max-w-[1100px] mx-auto car_background pt-6 pb-14 md:px-6 w-[90%] md:w-[100%]'>
          {subData?.map((data, index) => {
            return <ExploreCard {...data} key={index} />;
          })}
        </div>
      )}

      {product?.length > 0 && (
        <div className='flex justify-center items-center w-full mt-7'>
          <div className='w-full max-w-[200px]'>
            <Link
              to='/explore'
              className='text-lg font-semibold animated-button text-center block w-full p-3 mb-5 rounded-lg bg-white text-black transition duration-300 hover:bg-gray-200'
            >
              <span className='button-content text-md md:text-lg'>
                {' '}
                {language === 'eng' ? 'Explore More' : 'اكتشف المزيد'}
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeCards;
