import { useEffect, useState } from 'react';
import ExploreCard from './ExploreCard';
import { data } from '../../StaticData/data';
import Rectangle_50 from '../../assets/Rectangle 50.png';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ExploreContent = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    window.scroll(0, 0);
  }, [currentPage]);

  return (
    <main>
      <div className='relative'>
        <img src={Rectangle_50} alt='Rectangle' className='rounded' />
        <div className='absolute top-[30%] left-12'>
          <h1 className='text-white font-bold text-4xl'>Welcome, Shakeel</h1>
          <p className='text-white mt-3 text-xl'>
            Buy & Sell Your Number <br /> Plates
          </p>
          <button className='border p-2 rounded-xl bg-transparent mt-3 text-white'>
            Get Started
          </button>
        </div>
      </div>
      <h1 className=' font-bold text-black my-4 text-4xl '>
        Explore More Now{' '}
      </h1>
      <p className='text-black my-4'>Plates Numbers: {data.length}</p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between gap-4 max-w-[1500px] mx-auto'>
        {currentData.map((plate) => (
          <ExploreCard key={plate.id} {...plate} />
        ))}
      </div>

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
    </main>
  );
};

export default ExploreContent;
