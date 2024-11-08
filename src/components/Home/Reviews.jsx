import { FaStar } from 'react-icons/fa';
import React from 'react';
import person1 from '../../assets/person1.jpeg';
import person2 from '../../assets/person2.jpg';
import person3 from '../../assets/person3.jpeg';
import google from '../../assets/googleImg.png';
import { GoDotFill } from 'react-icons/go';

const Reviews = () => {
  const reviewsData = [
    {
      id: 1,
      name: 'John Doe',
      handle: '@johndoe',
      daysAgo: '3 Days Ago',
      profileImage: person1, // You can replace this with the actual image source
      quote:
        '"An impressive demo that highlights key features with clarity and ease of use. Definitely sparked interest in the full product."',
    },
    {
      id: 2,
      name: 'Jane Smith',
      handle: '@janesmith',
      daysAgo: '2 Days Ago',
      profileImage: person2,
      quote:
        '"This product has really helped streamline my workflow. Highly recommend it to anyone looking for efficiency!"',
    },
    {
      id: 3,
      name: 'Michael Johnson',
      handle: '@michaeljohnson',
      daysAgo: '1 Day Ago',
      profileImage: person3,
      quote:
        '"Great user interface and intuitive features. Can’t wait to see more updates!"',
    },
  ];

  return (
    <div className='flex flex-col items-center gap-8 px-2 sm:px-8  font-inter mt-12'>
      <h2 className='text-white text-4xl font-semibold font-inter text-center'>
        What our customers think about us
      </h2>
      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-[1582px] my-4'>
        {reviewsData.map((testimonial) => (
          <div
            key={testimonial.id}
            className='text-white border border-white shadow-2xl rounded-[20px]  p-6 flex flex-col items-center text-center'
          >
            {/* Five Stars */}
            <div className='my-4 text-yellow-500 flex text-3xl gap-2'>
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} />
              ))}
            </div>

            {/* Profile Picture */}
            <img
              className='w-[92px] h-[92px] rounded-full mb-4 object-cover'
              src={testimonial.profileImage}
              alt={`${testimonial.name}'s profile`}
            />

            {/* Customer Name */}
            <div className=' text-xl font-semibold '>{testimonial.name}</div>

            <div className=' text-sm font-normal font-inter flex items-center justify-between gap-2'>
              {testimonial.handle}{' '}
              <span>
                <GoDotFill size='8px' />
              </span>{' '}
              <span> {testimonial.daysAgo}</span>
            </div>

            <div className='my-6'>
              <img src={google} alt='Google' />
            </div>
            {/* Customer Quote */}
            <div className='  sm:text-lg lg:text-xl font-light font-inter max-w-[420px]'>
              {testimonial.quote}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
