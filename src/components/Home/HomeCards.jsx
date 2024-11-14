import React from 'react';
import ExploreCard from '../Explore/ExploreCard';
import { Link } from 'react-router-dom';
import { data } from '../../StaticData/data';

const HomeCards = () => {
  const subData = data.splice(0, 3);
  console.log(subData);

  return (
    <div className='mt-5 p-10'>
      <h1 className='text-white text-center text-[30px] md:text-[40px] font-bold'>
        New Today
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between gap-4 max-w-[1500px] mx-auto car_background p-6 mt-7'>
        {subData.map((data, index) => {
          return <ExploreCard {...data} key={index} />;
        })}
      </div>
      {/* Centering Explore More button */}
      <div className='flex justify-center items-center w-full mt-7'>
        <div className='w-full max-w-[200px]'>
          <Link
            to='/explore'
            className='text-lg font-semibold animated-button text-center block w-full p-3 rounded-lg bg-white text-black transition duration-300 hover:bg-gray-200'
          >
            <span className='button-content text-xl'>Explore More</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeCards;
