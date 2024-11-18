import { useEffect, useState } from 'react';
import ExploreCard from './ExploreCard';
import Rectangle_50 from '../../assets/Rectangle 50.png';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllProductsQuery } from '../../Redux/ProductRoutes/productApi';
import { setProduct } from '../../Redux/ProductRoutes/productSlice';

const ExploreContent = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  // const { data: recievedData, isError, isLoading } = useGetAllProductsQuery();

  // useEffect(() => {
  //   dispatch(setProduct(recievedData?.products));
  // }, [recievedData, dispatch]);
  // console.log(recievedData);
  const { product: recievedData } = useSelector((state) => state.product);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  // Get the total number of products for pagination
  const totalProducts = recievedData?.length || 0;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const currentrecievedData = recievedData?.slice(
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
        <div className='absolute inset-0 bg-black bg-opacity-40 flex  justify-between p-4 md:px-12 md:py-8'>
          <div className='text-white space-y-3'>
            <h1 className='text-3xl md:text-5xl font-bold'>
              Welcome, {profile?.name}
            </h1>
            <p className='text-lg md:text-2xl'>Buy & Sell Your Number Plates</p>
            <button className='border border-white py-2 px-4 rounded-lg bg-transparent mt-3 hover:bg-white hover:text-black transition'>
              Get Started
            </button>
          </div>
          <div className='text-white  md:text-2xl text-center font-bold italic hidden lg:block mt-4'>
            "Lusail Numbers - Your gateway to unique car plate number in Qatar"
          </div>
        </div>
      </div>
      <h1 className='font-bold text-black my-4 text-4xl'>Explore More Now</h1>
      <p className='text-black my-4'>Plates Numbers: {totalProducts}</p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between gap-4 max-w-[1500px] mx-auto'>
        {currentrecievedData?.map((plate) => (
          <ExploreCard key={plate._id} {...plate} />
        ))}
      </div>

      {totalProducts > itemsPerPage && ( // Render pagination only if total products exceed items per page
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
