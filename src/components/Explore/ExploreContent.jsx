import ExploreCard from './ExploreCard';

const ExploreContent = () => {
  return (
    <main>
      <h1 className='text-2xl font-bold text-white my-8'>Explore More Now </h1>
      <p className='text-white'>Plates Numbers: 2250</p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between gap-4 max-w-[1500px] mx-auto'>
        {' '}
        <ExploreCard />
        <ExploreCard />
        <ExploreCard />
      </div>
    </main>
  );
};
export default ExploreContent;
