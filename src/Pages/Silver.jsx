import { useEffect, useState } from 'react';
import ExploreCard from '../components/Explore/ExploreCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import normal from '../assets/silver.jpg';
import { useGetFilterProductMutation } from '../Redux/ProductRoutes/productApi';
import { useSelector } from 'react-redux';
import Loader from '../components/Explore/Loader';

const Silver = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const { language } = useSelector((state) => state.language); // Get language from Redux
  const [getNormalProduct, { data: filteredData, isLoading, error }] =
    useGetFilterProductMutation();

  // const [reCall, setRecall] = useState(false);
  useEffect(() => {
    getNormalProduct('silver');
  }, [getNormalProduct]);

  // Ensure filteredData and products are available before calculating totalPages
  const totalPages = filteredData
    ? Math.ceil(filteredData?.length / itemsPerPage)
    : 0;

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Ensure currentData is an array and the slice operation is safe
  const currentData = filteredData
    ? filteredData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  // useEffect(() => {
  //   window.scroll(0, 0);
  // }, [currentPage]);

  if (isLoading) return <Loader />;
  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <main className='px-2 sm:px-6 mt-12'>
      <div className='relative aspect-video md:aspect-auto rounded overflow-hidden'>
        <img
          src={normal}
          alt='Rectangle'
          className='rounded h-full w-full object-cover'
        />
        <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-between p-4 md:px-12 md:py-8'>
          <div>
            <h1 className='text-white font-bold text-xl sm:text-4xl'>
              {language === 'eng' ? 'Silver Number Plates' : 'لوحات أرقام فضية'}
            </h1>
            <p className='text-white mt-3 sm:text-3xl font-semibold'>
              {language === 'eng' ? 'Qatar 8873' : 'قطر 8873'} <br />
              {language === 'eng' ? 'Best Price' : 'أفضل الأسعار'}
            </p>
            <div className=' flex items-center gap-4 font-semibold mt-6'>
              <button className='px-4 py-1 sm:py-3 animated-button rounded-xl bg-white sm:mt-3'>
                <span className='button-content sm:text-lg'>
                  {language === 'eng' ? 'Contact Us' : 'اتصل بنا'}
                </span>
              </button>
              <button className='px-4 py-1 sm:py-3 animated-button rounded-xl bg-white sm:mt-3'>
                <span className='button-content sm:text-lg'>
                  {language === 'eng' ? 'Book Now' : 'احجز الآن'}
                </span>
              </button>
            </div>
          </div>
          <div className='text-white  md:text-2xl text-center font-bold italic hidden lg:block mt-4'>
            {language === 'eng'
              ? '"Your journey to a unique number plate starts with your details"'
              : '"رحلتك إلى لوحة أرقام مميزة تبدأ بتفاصيلك"'}
          </div>
        </div>
      </div>

      <h1
        className={`font-bold text-black my-4 text-4xl ${
          language === 'eng' ? 'text-left' : 'text-right'
        }`}
      >
        {language === 'eng' ? 'Silver Plates' : 'لوحات فضية'}
      </h1>
      <p
        className={`text-black my-4 ${
          language === 'eng' ? 'text-left' : 'text-right'
        }`}
      >
        {language === 'eng' ? 'Number Of plates' : 'عدد اللوحات:'} :
        {filteredData?.length || 0}
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between gap-4 max-w-[1500px] mx-auto'>
        {currentData?.map((plate) => (
          <ExploreCard
            // reCall={reCall}
            // setRecall={setRecall}
            key={plate._id}
            {...plate}
          />
        ))}
      </div>
      {filteredData?.length > itemsPerPage && (
        <div className='flex justify-center items-center mt-10 space-x-2'>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-2 py-1 ${currentPage === 1 ? 'opacity-50' : ''}`}
          >
            <FaChevronLeft className='text-2xl bg-[#e8fe26] rounded text-black cursor-pointer' />
          </button>

          {[...Array(totalPages)].map((_, index) => {
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

export default Silver;
