<<<<<<< HEAD
import React from 'react'
import Hero from '../components/Hero'
import Today from '../components/Today'
const Home = () => {
  return (
    <div>
      Home
      <Hero/>
      <Today/>
    </div>

  )
}
=======
import React from 'react';
import Summary from '../components/Home/Summary';
import Reviews from '../components/Home/Reviews';

const Home = () => {
  return (
    <div>
      <Summary />
      <Reviews />
    </div>
  );
};
>>>>>>> f24cd2d08629e130cfdb79e5c5b3061192f68bc0

export default Home;
