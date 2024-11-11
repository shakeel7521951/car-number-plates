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
      <div className='flex justify-center mx-auto'>
        <Link
          to='/explore'
          className='text-center bg-[#FFEA01B2] text-xl text-black rounded-xl mt-5 px-4 py-2 hover:bg-[#FFEA01B2] transition-all'
        >
          Explore More
        </Link>
      </div>
    </div>
  );
};

export default HomeCards;
