import React from 'react';
import Hero from '../components/Hero';
import Today from '../components/Today';
import Summary from '../components/Home/Summary';
import Reviews from '../components/Home/Reviews';

const Home = () => {
  return (
    <div>
      Home
      <Hero />
      <Today />
      <Summary />
      <Reviews />
    </div>
  );
};

export default Home;
