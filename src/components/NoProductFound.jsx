const NoProductFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-64 bg-white border border-gray-200 rounded-lg shadow-md my-6'>
      <div className='p-4 bg-gray-100 rounded-full'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-12 h-12 text-gray-400'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9.75 9.75h4.5m-4.5 3h4.5m-7.5-7.5h10.5m-10.5 13.5h10.5m-13.5-3V6a3 3 0 013-3h10.5a3 3 0 013 3v11.25a3 3 0 01-3 3H6.75a3 3 0 01-3-3z'
          />
        </svg>
      </div>
      <h1 className='text-2xl font-semibold text-gray-800 mt-4'>
        No Products Found
      </h1>
      <p className='text-gray-500 mt-2 text-center'>
        Sorry, we couldn’t find any products. Try adjusting your search or check
        back later.
      </p>
    </div>
  );
};
export default NoProductFound;
