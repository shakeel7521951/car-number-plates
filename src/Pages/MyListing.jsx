import { LinkingData } from '../StaticData/data';
import { CiCirclePlus } from 'react-icons/ci';
import plateName from '../assets/plateName.png';
import { FaEye } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
const MyListing = () => {
  return (
    <main className='px-2  sm:px-16 mt-12 font-bold relative'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>My Listing </h1>
        <button>
          <CiCirclePlus size='40px' className='text-black' />
        </button>
      </div>
      <main className='border bottom-1 border-black p-4 flex  justify-between '>
        <div className='flex gap-4'>
          <div className='w-32 sm:w-40 '>
            <img
              src={plateName}
              alt='some'
              className='w-full h-full object-cover'
            />
          </div>
          <div className='flex flex-col'>
            <h1>Private Plate</h1>
            <h1>50000 Q.T</h1>
            <h1 className='flex items-center  gap-2'>
              <FaEye />
              <span>108 views</span>
            </h1>
          </div>
        </div>
        <div className='flex flex-col items-end justify-between'>
          <button>
            <BsThreeDots />
          </button>
          <div>
            <button className='p-2 border border-1 border-black'>
              Mark as Sold
            </button>
            <button>Hwllo</button>
          </div>
        </div>
      </main>
    </main>
  );
};
export default MyListing;
