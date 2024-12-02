import { FaCartPlus, FaClock, FaEye, FaHeart } from 'react-icons/fa';
import plateImg from '../../assets/plateName.png';
import { Link } from 'react-router-dom';
import {
  useDislikeProductMutation,
  useLikeProductMutation,
  useUpdateViewMutation,
} from '../../Redux/ProductRoutes/productApi';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import PlateNumber from '../../PlateNumber';
import { toast } from 'react-toastify';
import { useCreateOrderMutation } from '../../Redux/OrderRoute/orderApi';

export const calculateTimeDifference = (createdAt, language) => {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  const timeDifferenceInMs = currentDate - createdDate;

  const hours = Math.floor(timeDifferenceInMs / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (days > 0) {
    if (language === 'eng') {
      return `${days} Day${days > 1 ? 's' : ''} Ago`;
    } else if (language === 'arabic') {
      return `${days} يوم${days > 1 ? 's' : ''} مضت`;
    }
  } else {
    if (language === 'eng') {
      return `${hours} Hour${hours > 1 ? 's' : ''} Ago`;
    } else if (language === 'arabic') {
      return `${hours} ساعة${hours > 1 ? 's' : ''} مضت`;
    }
  }
};

const ExploreCard = ({
  _id,
  views = 324,
  likes = [],
  plateNo = 124234,
  created_at,
  price = 33322,
  image = plateImg,
  category = 'normal',
  discountedPrice,
  availability,
  discountpercent,
}) => {
  const [updateView] = useUpdateViewMutation();
  const [likeProduct] = useLikeProductMutation();
  const [dislikeProduct] = useDislikeProductMutation();
  const [placeOrder] = useCreateOrderMutation();

  const { profile } = useSelector((state) => state.user);
  const { language } = useSelector((state) => state.language);
  const [changeCategory, setChangeCategory] = useState('');
  const availabilityStatus =
    availability === 'active'
      ? language === 'eng'
        ? 'Active'
        : 'نشط'
      : availability !== 'active'
      ? language === 'eng'
        ? 'Sold'
        : 'مباع'
      : '';
  const [isLiked, setIsLiked] = useState(likes?.length);
  const [totalLikes, setTotalLikes] = useState(likes?.length);
  useEffect(() => {
    if (profile && likes) {
      setIsLiked(likes.includes(profile._id));
    }
  }, [profile, likes]);

  useEffect(() => {
    if (category === 'normal') {
      setChangeCategory(language === 'eng' ? 'Normal' : 'طبيعي');
    }
    if (category === 'silver') {
      setChangeCategory(language === 'eng' ? 'Silver' : 'فضي');
    }
    if (category === 'gold') {
      setChangeCategory(language === 'eng' ? 'Gold' : 'ذهبي');
    }
    if (category === 'vip') {
      setChangeCategory(language === 'eng' ? 'VIP' : 'مميز');
    }
  }, [category, language]);

  const timeAgo = calculateTimeDifference(created_at, language);

  const handleImageClick = () => {
    updateView(_id);
  };

  const handleLikeButtonClick = async () => {
    if (profile) {
      if (isLiked) {
        const res = await dislikeProduct(_id).unwrap();
        setIsLiked(false);
        setTotalLikes(res.product.likes.length);
      } else {
        const res = await likeProduct(_id).unwrap();

        setIsLiked(true);
        setTotalLikes(res.product.likes.length);
      }
    } else {
      toast.warn('Please Login to Like or Dislike the Plate Number');
    }
  };
  const handlePlaceOrder = async () => {
    try {
      const data = await placeOrder({ id: _id }).unwrap();
      toast.success(data?.message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <main className='bg-[#FFD200] shadow-2xl border-[#EFF312] border-2 px-4 rounded-md text-black transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-[0_8px_16px_rgba(0,0,0,0.3)]'>
      <div className='flex items-center justify-between mt-4'>
        <h1 className='text-lg font-semibold'>
          {language === 'eng' ? 'Plate Number' : 'رقم اللوحة'}
        </h1>
        <aside className='flex justify-center items-center gap-4 font-bold'>
          <div className='flex flex-col items-center'>
            <span>{views}</span>
            <FaEye />
          </div>
          <div className='flex flex-col items-center'>
            <span>{totalLikes}</span>
            <FaHeart
              onClick={handleLikeButtonClick}
              style={{
                cursor: 'pointer',
                color: isLiked ? 'red' : 'black',
              }}
            />
          </div>
        </aside>
      </div>

      <div className='my-6'>
        <Link to={`/single-card/${_id}`} onClick={handleImageClick}>
          <PlateNumber plateNo={plateNo} />
        </Link>
      </div>
      <main className='flex justify-between items-center'>
        <div>
          <h1 className='text-lg font-semibold'>
            {language === 'eng'
              ? `Private Plate ${plateNo}`
              : `اللوحة الخاصة ${plateNo}`}
          </h1>
          <div className='border border-white justify-between gap-4 items-center rounded-full flex w-max p-2 my-4 cursor-pointer'>
            <div className='w-8 h-8 rounded-full'>
              <img src={image} alt='' className='w-full h-full rounded-full' />
            </div>
            <h1 className='text-lg pr-4 font-semibold'>
              {language === 'eng' ? 'Personal' : 'شخصي'}
            </h1>
          </div>
        </div>
        <div className='flex flex-col items-start justify-start'>
          <h1 className='capitalize pb-8'>
            {language === 'eng' ? 'Category :' : 'الفئة :'}{' '}
            <span className='text-gray-700'>{changeCategory || category}</span>
          </h1>
          <div className='text-end flex items-center flex-col'>
            <h1 className='text-[#92905F]'>{availabilityStatus}</h1>
            <p className='text-[10px]'>
              {language === 'eng' ? 'Transfer By Metrash' : 'نقل عبر مترش'}
            </p>
          </div>
        </div>
      </main>

      <div className='flex gap-12'>
        <button
          className='flex border-white border items-center justify-center text-sm gap-2 px-2 rounded-2xl'
          onClick={handlePlaceOrder}
        >
          <FaCartPlus className='text-base' />{' '}
          {language === 'eng' ? 'For Sale' : 'للتسوق'}
        </button>
        <button className='flex border-white border items-center justify-center text-sm gap-2 p-2 rounded-2xl'>
          <FaClock /> {timeAgo}
        </button>
      </div>

      <div className='flex items-end justify-end gap-4 my-4'>
        {discountpercent !== 0 && (
          <h1 className='line-through text-gray-600'>{price} Q.T</h1>
        )}
        <h1 className='text-xl font-bold'>{discountedPrice} Q.T</h1>
      </div>
    </main>
  );
};

export default ExploreCard;
