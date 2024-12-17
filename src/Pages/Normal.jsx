import { useEffect, useState } from 'react';
import ExploreCard from '../components/Explore/ExploreCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import normal from '../assets/HomepageImg.jpg';
import { useGetFilterProductMutation } from '../Redux/ProductRoutes/productApi';
import { useSelector } from 'react-redux';
import Loader from '../components/Explore/Loader';
import NoProductFound from '../components/NoProductFound';
import { Link } from 'react-router-dom';

const Normal = () => {
  const { language } = useSelector((state) => state.language); // Get language from Redux
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [getNormalProduct, { data: filteredData, isLoading, error }] =
    useGetFilterProductMutation();

  // Handle pagination
  const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Pagination logic for current data
  const currentData = filteredData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    window.scroll(0, 0);
  }, [currentPage]);

  useEffect(() => {
    getNormalProduct('normal');
  }, [getNormalProduct]);

  if (isLoading) return <Loader />;
  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <main className='px-2 sm:px-6 mt-12'>
      <div className='relative aspect-video md:aspect-auto rounded overflow-hidden'>
        <img
          src={normal}
          alt='Normal Plate'
          className='rounded h-full md:h-screen w-full object-cover'
        />
        <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-between p-4 md:px-12 md:py-8'>
          <div>
            <h1
              className={`text-white font-bold text-md sm:text-4xl ${
                language === 'arabic' ? 'text-right' : 'text-left'
              }`}
            >
              {language === 'eng'
                ? 'Normal Number Plates'
                : 'لوحات الأرقام العادية'}
            </h1>
            <p
              className={`text-white my-3 text-sm sm:text-3xl font-semibold ${
                language === 'arabic' ? 'text-right' : 'text-left'
              }`}
            >
              {language === 'eng'
                ? 'Qatar 8873 Best Price'
                : 'قطر 8873 أفضل سعر'}
            </p>
            <div className='flex items-center gap-4 font-semibold'>
              <button className='px-4 py-1 sm:py-3 animated-button rounded-xl bg-white sm:mt-3'>
                <Link to="/explore" className='button-content text-md md:text-lg'>
                  {language === 'eng' ? 'Number Plates' : 'لوحات أرقام'}
                </Link>
              </button>
              <button className='px-4 py-1 sm:py-3 animated-button rounded-xl bg-white sm:mt-3'>
                <span className='button-content text-md md:text-lg'>
                  {language === 'eng' ? 'Book Now' : 'احجز الآن'}
                </span>
              </button>
            </div>
          </div>
          <div className='text-white text-md md:text-2xl text-center font-bold italic hidden lg:block mt-4'>
            {language === 'eng'
              ? '"Browse and Discover Exclusive plate Numbers"'
              : '"تصفح واكتشف أرقام اللوحات الحصرية"'}
          </div>
        </div>
      </div>

      <h1
        className={`font-bold text-black my-4 text-2xl md:text-4xl ${
          language === 'arabic' ? 'text-right' : 'text-left'
        }`}
      >
        {language === 'eng' ? 'Normal Plates' : 'لوحات عادية'}
      </h1>
      <p
        className={`text-black my-4 ${
          language === 'arabic' ? 'text-right' : 'text-left'
        }`}
      >
        {language === 'eng'
          ? `Number Of plates: ${filteredData?.length}`
          : `عدد اللوحات: ${filteredData?.length}`}
      </p>
      {filteredData?.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between gap-4 max-w-[1500px] mx-auto'>
          {currentData?.map((plate) => (
            <ExploreCard key={plate._id} {...plate} />
          ))}
        </div>
      ) : (
        <NoProductFound />
      )}

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

export default Normal;
