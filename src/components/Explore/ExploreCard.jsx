import { FaCartPlus, FaClock, FaEye, FaHeart } from 'react-icons/fa';
import plate from '../../assets/plateName.png';
import person from '../../assets/person1.jpeg';

const ExploreCard = () => {
  return (
    <main className='bg-[#050C2B] shadow-2xl border-white border px-4 rounded-md text-white'>
      {/* Statting div */}
      <div className='flex items-center justify-between mt-4 '>
        <h1 className='text-lg font-semibold'>Plate Number</h1>
        <aside className='flex justify-center items-center gap-4 font-bold'>
          {' '}
          <div className='flex flex-col items-center'>
            <span>445</span>
            <FaEye />
          </div>
          <div className='flex flex-col items-center'>
            <span>44</span>
            <FaHeart />
          </div>
        </aside>
      </div>
      {/* imgae for the number plate */}
      <div className='  my-6'>
        <img src={plate} alt='NumberPlate' className='w-full ' />
      </div>
      <h1 className='text-lg font-semibold '>Private Plate 197500</h1>
      {/* Profile Div */}
      <div className='border border-white justify-between gap-4 items-center rounded-full flex w-max p-2 my-4 cursor-pointer '>
        <div className='w-8 h-8 rounded-full'>
          <img src={person} alt='' className='w-full h-full rounded-full' />
        </div>
        <h1 className='text-lg pr-4 font-semibold'>Personal</h1>
      </div>

      {/* Button div */}
      <div className='flex gap-12'>
        <button className='flex border-white border items-center justify-center text-sm  gap-2  px-2 rounded-2xl'>
          <FaCartPlus className='text-base' /> For Sale
        </button>
        <button className='flex border-white border items-center justify-center text-sm  gap-2  p-2 rounded-2xl '>
          <FaClock /> 2 Hour Ago
        </button>
      </div>

      {/* Pricing last */}
      <div className='flex items-end justify-end gap-4 my-4'>
        <h1 className='line-through text-gray-600'>70,000 Q.T</h1>
        <h1 className='text-xl font-bold'>50,000 Q.T</h1>
      </div>
    </main>
  );
};
export default ExploreCard;
