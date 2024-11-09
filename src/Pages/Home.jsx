import React from 'react';
import Hero from '../components/Hero';
import Summary from '../components/Home/Summary';
import Reviews from '../components/Home/Reviews';
import HomeCards from '../components/Home/HomeCards';

const Home = () => {
  return (
    <div>
      <Hero />
      <HomeCards />
      <Summary />
      <Reviews />
    </div>
  );
};

export default Home;
