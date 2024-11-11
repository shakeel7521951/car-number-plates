import { FaCartPlus, FaClock, FaEye, FaHeart } from 'react-icons/fa';
import plateImg from '../../assets/plateName.png';
import { Link } from 'react-router-dom';

const ExploreCard = ({
  id = 1,
  views = 324,
  like = 44,
  plateNumber = 124234,
  time = 2,
  actualPrice = 44453,
  discountPrice = 33322,
  image = plateImg,
}) => {
  return (
    <main className='bg-[#020617] shadow-2xl border-[#EFF312]  border-2 px-4 rounded-md text-white'>
      {/* Starting div */}
      <div className='flex items-center justify-between mt-4'>
        <h1 className='text-lg font-semibold'>Plate Number</h1>
        <aside className='flex justify-center items-center gap-4 font-bold'>
          <div className='flex flex-col items-center'>
            <span>{views}</span>
            <FaEye />
          </div>
          <div className='flex flex-col items-center'>
            <span>{like}</span>
            <FaHeart />
          </div>
        </aside>
      </div>
      {/* Image for the number plate */}
      <div className='my-6'>
        <Link to={`/single-card/${id}`}>
          <img src={image} alt='NumberPlate' className='w-full' />
        </Link>
      </div>
      <h1 className='text-lg font-semibold'>Private Plate {plateNumber}</h1>
      {/* Profile Div */}
      <div className='border border-white justify-between gap-4 items-center rounded-full flex w-max p-2 my-4 cursor-pointer'>
        <div className='w-8 h-8 rounded-full'>
          <img src={image} alt='' className='w-full h-full rounded-full' />
        </div>
        <h1 className='text-lg pr-4 font-semibold'>Personal</h1>
      </div>

      {/* Button div */}
      <div className='flex gap-12'>
        <button className='flex border-white border items-center justify-center text-sm gap-2 px-2 rounded-2xl'>
          <FaCartPlus className='text-base' /> For Sale
        </button>
        <button className='flex border-white border items-center justify-center text-sm gap-2 p-2 rounded-2xl'>
          <FaClock /> {time} Hour Ago
        </button>
      </div>

      {/* Pricing last */}
      <div className='flex items-end justify-end gap-4 my-4'>
        <h1 className='line-through text-gray-600'>{actualPrice} Q.T</h1>
        <h1 className='text-xl font-bold'>{discountPrice} Q.T</h1>
      </div>
    </main>
  );
};

export default ExploreCard;
