import ExploreCard from './ExploreCard';
import { data } from '../../StaticData/data';

const ExploreContent = () => {
  
  return (
    <main>
      <h1 className='text-2xl font-bold text-white my-4'>Explore More Now </h1>
      <p className='text-white my-2'>Plates Numbers: {data?.length}</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between gap-4 max-w-[1500px] mx-auto'>
        {data?.map((plate,index) => (
          <ExploreCard {...plate} key={index} />
        ))}
      </div>
    </main>
  );
};

export default ExploreContent;
