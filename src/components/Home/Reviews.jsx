import React from 'react';
import { FaStar } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { useSelector } from 'react-redux';
import person1 from '../../assets/person1.jpeg';
import person2 from '../../assets/person2.jpg';
import person3 from '../../assets/person3.jpeg';
import google from '../../assets/googleImg.png';

const Reviews = () => {
  const { language } = useSelector((state) => state.language);

  const reviewsData = [
    {
      id: 1,
      name: { eng: 'John Doe', arabic: 'جون دو' },
      handle: '@johndoe',
      daysAgo: { eng: '3 Days Ago', arabic: 'منذ 3 أيام' },
      profileImage: person1,
      quote: {
        eng: '"An impressive demo that highlights key features with clarity and ease of use. Definitely sparked interest in the full product."',
        arabic:
          '"عرض توضيحي مثير للإعجاب يبرز الميزات الرئيسية بوضوح وسهولة الاستخدام. أثار بالتأكيد الاهتمام بالمنتج الكامل."',
      },
    },
    {
      id: 2,
      name: { eng: 'Jane Smith', arabic: 'جين سميث' },
      handle: '@janesmith',
      daysAgo: { eng: '2 Days Ago', arabic: 'منذ يومين' },
      profileImage: person2,
      quote: {
        eng: '"This product has really helped streamline my workflow. Highly recommend it to anyone looking for efficiency!"',
        arabic:
          '"ساعدني هذا المنتج حقًا في تبسيط سير العمل الخاص بي. أوصي به بشدة لأي شخص يبحث عن الكفاءة!"',
      },
    },
    {
      id: 3,
      name: { eng: 'Michael Johnson', arabic: 'مايكل جونسون' },
      handle: '@michaeljohnson',
      daysAgo: { eng: '1 Day Ago', arabic: 'منذ يوم واحد' },
      profileImage: person3,
      quote: {
        eng: '"Great user interface and intuitive features. Can’t wait to see more updates!"',
        arabic:
          '"واجهة مستخدم رائعة وميزات بديهية. لا أطيق الانتظار لرؤية المزيد من التحديثات!"',
      },
    },
  ];

  return (
    <div className='flex flex-col items-center gap-8 px-2 sm:px-8 font-inter mt-12'>
      {/* Section Title */}
      <h2 className='text-white text-4xl font-semibold font-inter text-center'>
        {language === 'eng'
          ? 'What our customers think about us'
          : 'ما يعتقده عملاؤنا عنا'}
      </h2>

      {/* Reviews Grid */}
      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-[1582px] my-4'>
        {reviewsData.map((testimonial) => (
          <div
            key={testimonial.id}
            className='text-white border-2 border-[#FFEA01B2] shadow-2xl rounded-[20px] p-6 flex flex-col items-center text-center transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-[0_8px_16px_rgba(0,0,0,0.3)] '
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
              alt={`${testimonial.name[language]}'s profile`}
            />

            {/* Customer Name */}
            <div className='text-xl font-semibold'>
              {testimonial.name[language]}
            </div>

            {/* Handle and Days Ago */}
            <div className='text-sm font-normal font-inter flex items-center justify-between gap-2'>
              {testimonial.handle}{' '}
              <span>
                <GoDotFill size='8px' />
              </span>{' '}
              <span>{testimonial.daysAgo[language]}</span>
            </div>

            {/* Google Logo */}
            <div className='my-6'>
              <img src={google} alt='Google' />
            </div>

            {/* Customer Quote */}
            <div className='sm:text-lg lg:text-xl font-light font-inter max-w-[420px]'>
              {testimonial.quote[language]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
