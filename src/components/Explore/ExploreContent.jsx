import { useEffect, useState } from 'react';
import ExploreCard from './ExploreCard';
import Rectangle_50 from '../../assets/exploreCar.jpg';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import NoProductFound from '../NoProductFound';

const ExploreContent = () => {
  const { profile } = useSelector((state) => state.user);
  const { product: receivedData } = useSelector((state) => state.product);
  const { language } = useSelector((state) => state.language);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalProducts = receivedData?.length || 0;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const currentReceivedData = receivedData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, [currentPage]);

  return (
    <main>
      <div className='relative aspect-video md:aspect-auto rounded overflow-hidden'>
        <img
          src={Rectangle_50}
          alt='Rectangle'
          className='rounded h-full w-full object-cover'
        />
        <div
          className={`absolute inset-0 bg-black bg-opacity-40 flex justify-between p-4 md:px-12 md:py-8 ${
            language === 'arabic' ? 'text-right' : 'text-left'
          }`}
        >
          <div className='text-white space-y-3 mt-14'>
            <h1
              className={`text-3xl md:text-5xl font-bold ${
                language === 'arabic' ? 'text-right' : 'text-left'
              }`}
            >
              {language === 'eng'
                ? `Welcome, ${profile?.name || ''}`
                : `مرحبًا، ${profile?.name || ''}`}
            </h1>
            <p
              className={`text-lg md:text-2xl ${
                language === 'arabic' ? 'text-right' : 'text-left'
              }`}
            >
              {language === 'eng'
                ? 'Buy & Sell Your Number Plates'
                : 'اشترِ وبيع لوحات السيارات الخاصة بك'}
            </p>
            <button className='border border-white py-2 px-4 rounded-lg bg-transparent mt-3 hover:bg-white hover:text-black transition'>
              {language === 'eng' ? 'Get Started' : 'ابدأ الآن'}
            </button>
          </div>
          <div
            className={`text-white md:text-2xl text-center font-bold italic hidden lg:block mt-16 ${
              language === 'arabic' ? 'text-right' : 'text-left'
            }`}
          >
            {language === 'eng'
              ? '"Lusail Numbers - Your gateway to unique car plate number in Qatar"'
              : '"أرقام لوسيل - بوابتك لرقم لوحة سيارة فريدة في قطر"'}
          </div>
        </div>
      </div>
      <h1
        className={`font-bold text-black my-4 text-4xl ${
          language === 'arabic' ? 'text-right' : 'text-left'
        }`}
      >
        {language === 'eng' ? 'Explore More Now' : 'استكشف المزيد الآن'}
      </h1>
      <p
        className={`text-black my-4 ${
          language === 'arabic' ? 'text-right' : 'text-left'
        }`}
      >
        {language === 'eng'
          ? `Plates Numbers: ${totalProducts}`
          : `عدد الأرقام: ${totalProducts}`}
      </p>

      {receivedData?.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between gap-4 max-w-[1500px] mx-auto'>
          {currentReceivedData?.map((plate) => (
            <ExploreCard key={plate._id} {...plate} />
          ))}
        </div>
      ) : (
        <NoProductFound />
      )}

      {totalProducts > itemsPerPage && (
        <div className='flex justify-center items-center mt-10 space-x-2'>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-2 py-1 ${currentPage === 1 ? 'opacity-50' : ''}`}
          >
            <FaChevronLeft className='text-2xl bg-[#e8fe26] rounded text-black cursor-pointer' />
          </button>

          {[...Array(totalPages)]?.map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageClick(pageNumber)}
                className={`px-2 rounded ${
                  currentPage === pageNumber
                    ? 'bg-[#e8fe26] text-black'
                    : 'text-white'
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-2 py-1 ${
              currentPage === totalPages ? 'opacity-50' : ''
            }`}
          >
            <FaChevronRight className='text-2xl bg-[#e8fe26] rounded text-black cursor-pointer' />
          </button>
        </div>
      )}
    </main>
  );
};

export default ExploreContent;
