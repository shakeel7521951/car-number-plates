import React from 'react';
import Hero from '../components/Hero';
import Summary from '../components/Home/Summary';
import Reviews from '../components/Home/Reviews';
import ExploreCard from '../components/Explore/ExploreCard';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      Home
      <Hero />
      <div className='mt-5 p-10'>
        <h1 className='text-white text-center text-4xl font-bold'>New Today</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between gap-4 max-w-[1500px] mx-auto car_background p-6 mt-7'>
          <ExploreCard />
          <ExploreCard />
          <ExploreCard />
        </div>
        <div className='flex justify-center mx-auto'>
          <Link to="/explore" className='text-center bg-[#1DE678] font-bold text-black rounded-xl mt-4 px-4 py-2 hover:bg-[#1da65a] transition-all'>
            Explore More
          </Link>
        </div>

      </div>
      <Summary />
      <Reviews />
    </div>
  );
};

export default Home;
