import React from 'react';
import image from '../../assets/silver.jpg';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Summary = () => {
  const { language } = useSelector((state) => state.language);
  const { profile } = useSelector((state) => state.user);
  return (
    <main className='py-4 md:py-10 rounded-2xl shadow-2xl bg-white text-black mx-4'>
      <div
        className={`w-full py-2 max-w-[1582px] h-auto px-2 rounded-[25px] sm:px-8 flex flex-col lg:flex-row items-center gap-6 mx-auto ${
          language === 'eng' ? 'lg:text-left' : 'lg:text-right'
        }`}
      >
        {/* Text Section */}
        <div
          className={`w-full lg:w-1/2 flex flex-col items-center ${
            language === 'eng'
              ? 'text-center lg:items-start lg:text-left'
              : 'text-center lg:items-end lg:text-right'
          } gap-4`}
        >
          {/* Main Heading */}
          <div className="text-2xl sm:text-3xl lg:text-5xl font-normal font-['Katibeh']">
            {language === 'eng'
              ? 'QATAR plates services at your fingertips'
              : 'خدمات لوحات قطر بين يديك'}
          </div>

          {/* Description Text */}
          <div className={`text-[12px] lg:text-[16px] font-light font-inter text-justify px-3 md:px-0 ${language === 'eng'? "md:text-left":"md:text-right"}`}>
            {language === 'eng'
              ? `Welcome to our innovative online platform, where buying and selling
                exclusive car numbers is made simple and convenient. Whether you're
                looking for a unique number plate to make a statement or need a
                specific combination for your vehicle, we offer a wide selection of
                personalized and rare car numbers to suit every preference. Our
                user-friendly website allows you to easily browse, search, and
                purchase the perfect car number from a vast collection. We provide
                secure payment options and fast delivery to ensure a smooth
                transaction experience. With a dedicated customer support team, we
                are always here to assist you with any queries or concerns.`
              : `مرحبًا بكم في منصتنا الإلكترونية المبتكرة، حيث البيع والشراء
                أصبحت أرقام السيارات الحصرية بسيطة ومريحة. سواء كنت
                تبحث عن لوحة أرقام فريدة للإدلاء ببيان أو تحتاج إلى
                مجموعة محددة لسيارتك، ونحن نقدم مجموعة واسعة من
                أرقام سيارات شخصية ونادرة لتناسب كل الأذواق. ملكنا
                يتيح لك موقع الويب سهل الاستخدام التصفح والبحث والبحث بسهولة
                قم بشراء رقم السيارة المثالي من مجموعة واسعة. نحن نقدم
                خيارات الدفع الآمنة والتسليم السريع لضمان سلاسة
                تجربة المعاملات. مع فريق دعم العملاء المخصص، نحن
                متواجدون دائمًا لمساعدتك في أي استفسارات أو مخاوف.`}
          </div>
        </div>

        {/* Image Section */}
        <div className='flex mt-8 md:mt-12 flex-col items-center gap-4 lg:gap-0 lg:items-end relative'>
          <div className='w-max bg-[#9aaea3]/50 rounded-[50px] sm:rounded-[70px] backdrop-blur-[15px] flex flex-col items-center justify-center p-4 sm:p-4 absolute -top-12'>
            <div className='text-white text-[12px] sm:text-lg  font-bold font-inter'>
              {language === 'eng'
                ? 'Best Quality Number plates'
                : 'أفضل جودة للوحات الأرقام'}
            </div>
            <div className='text-white text-[12px] sm:text-base font-medium font-inter'>
              {language === 'eng'
                ? 'With 99% of happy Clients'
                : 'مع 99% من العملاء السعداء'}
            </div>
          </div>
          <div className='w-full flex justify-center'>
            <img
              className='w-full max-w-[752px] h-full rounded-[25px]'
              src={image}
              alt='Qatar Plates Service'
            />
          </div>
        </div>
      </div>
      <div
        className={`w-full flex items-center ${
          language === 'eng'
            ? 'justify-center pr-8 sm:justify-end'
            : 'justify-center pl-8 sm:justify-start'
        } mt-4`}
      >
        {!profile && (
          <div className='bg-[#FFEA01B2] rounded-[15px] flex items-center justify-center cursor-pointer animated-button px-8 py-3'>
            <Link to={'/login'} className='button-content text-[14px] md:text-xl'>
              {language === 'eng' ? 'Join Now' : 'انضم الآن'}
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default Summary;
