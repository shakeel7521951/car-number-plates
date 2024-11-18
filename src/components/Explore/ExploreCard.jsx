import { FaCartPlus, FaClock, FaEye, FaHeart } from 'react-icons/fa';
import plateImg from '../../assets/plateName.png';
import { Link } from 'react-router-dom';

export const calculateTimeDifference = (createdAt) => {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  const timeDifferenceInMs = currentDate - createdDate; // Difference in milliseconds

  const hours = Math.floor(timeDifferenceInMs / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} Day${days > 1 ? 's' : ''} Ago`;
  } else {
    return `${hours} Hour${hours > 1 ? 's' : ''} Ago`;
  }
};
const ExploreCard = ({
  _id,
  views = 324,
  likes = 44,
  plateNo = 124234,
  created_at,
  discount = 44453,
  price = 33322,
  image = plateImg,
}) => {
  const like = likes?.length;
  const timeAgo = calculateTimeDifference(created_at);
  return (
    <main className='bg-[#FFD200] shadow-2xl border-[#EFF312]  border-2 px-4 rounded-md text-black  '>
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
        <Link to={`/single-card/${_id}`}>
          <img src={image} alt='NumberPlate' className='w-full' />
        </Link>
      </div>
      <main className='flex justify-between items-center '>
        <div>
          {' '}
          <h1 className='text-lg font-semibold'>Private Plate {plateNo}</h1>
          {/* Profile Div */}
          <div className='border border-white justify-between gap-4 items-center rounded-full flex w-max p-2 my-4 cursor-pointer'>
            <div className='w-8 h-8 rounded-full'>
              <img src={image} alt='' className='w-full h-full rounded-full' />
            </div>
            <h1 className='text-lg pr-4 font-semibold'>Personal</h1>
          </div>
        </div>
        <div className='text-end flex items-center flex-col'>
          <h1 className='text-[#92905F]'>Active</h1>
          <p className='text-[10px]'>Transfer By Metrash</p>
        </div>
      </main>

      {/* Button div */}
      <div className='flex gap-12'>
        <button className='flex border-white border items-center justify-center text-sm gap-2 px-2 rounded-2xl'>
          <FaCartPlus className='text-base' /> For Sale
        </button>
        <button className='flex border-white border items-center justify-center text-sm gap-2 p-2 rounded-2xl'>
          <FaClock /> {timeAgo}
        </button>
      </div>

      {/* Pricing last */}
      <div className='flex items-end justify-end gap-4 my-4'>
        {discount > 0 && (
          <h1 className='line-through text-gray-600'>{discount} Q.T</h1>
        )}
        <h1 className='text-xl font-bold'>{price} Q.T</h1>
      </div>
    </main>
  );
};

export default ExploreCard;
