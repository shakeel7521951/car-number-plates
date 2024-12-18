import plate_her0_image from '../assets/HomepageImg.jpg';
import whatsapp from '../assets/social-icons/whtsapp.png';
import facebook from '../assets/social-icons/fb.png';
import twitter from '../assets/social-icons/twitter.png';
import pin from '../assets/social-icons/pin.png';
import ExploreCard, {
  calculateTimeDifference,
} from '../components/Explore/ExploreCard';
import person from '../assets/person1.jpeg';
import { useParams } from 'react-router-dom';

import { IoCartOutline } from 'react-icons/io5';
import { useGetSingleProductQuery } from '../Redux/ProductRoutes/productApi';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import PlateNumber from '../PlateNumber';
import Loader from '../components/Explore/Loader';
import { useCreateOrderMutation } from '../Redux/OrderRoute/orderApi';
import NoProductFound from '../components/NoProductFound';
import { toast } from 'react-toastify';

const PlateDetailPage = () => {
  const { id } = useParams();
  const { language } = useSelector((state) => state.language);
  const [placeOrder] = useCreateOrderMutation();
  const { data, isLoading } = useGetSingleProductQuery(id);
  const currentplateData = data?.product;
  const { product } = useSelector((state) => state.product);
  const [showItems, setShowItems] = useState(6);

  if (isLoading) return <Loader />;

  const mappingData = product?.slice(0, showItems);
  const time = calculateTimeDifference(currentplateData?.created_at, language);

  const handleOrder = async (id) => {
    try {
      const data = await placeOrder({ id }).unwrap();
      toast.success(data?.message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <div>
      <div className='relative w-full h-screen'>
        <img
          src={plate_her0_image}
          alt='Background'
          className='absolute top-0 left-0 w-full h-full object-cover'
        />
        {currentplateData && (
          <div className='relative z-10 w-[90%] sm:w-[80%] h-[80%] flex items-center justify-center mx-auto pt-10'>
            <div className='w-[55%] h-[100%] hidden sm:block'>
              <PlateNumber plateNo={currentplateData?.plateNo} />
            </div>

            <div className='w-[70%] mx-auto sm:w-[40%] flex flex-col gap-[6px]'>
              <div className='flex flex-col items-start justify-center'>
                <p className='text-white ms:text-[21px] lg:text-[25px] font-bold'>
                  {language === 'eng' ? 'Private Plate' : 'لوحة خاصة'}{' '}
                  {currentplateData?.plateNo}
                </p>
                <div className='bg-[#D9D9D9] rounded-2xl py-1 px-3 flex gap-[3px] justify-center items-center'>
                  <img src={person} alt='' className='w-[40px] rounded-full' />
                  <p className='text-black'>
                    {language === 'eng' ? 'Personal' : 'شخصي'}
                  </p>
                </div>
              </div>
              <div
                className='w-[100%] border-[#fff] border-[1px] p-[10px] text-white flex flex-col items-center justify-center gap-[6px]'
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                }}
              >
                <div className='flex flex-col items-center gap-[6px]'>
                  <p className='text-[20px] font-sem'>
                    {language === 'eng' ? 'Posted:' : 'أرسلت:'} {time}
                  </p>
                  <p className='text-[25px] font-bold'>
                    {currentplateData?.discountedPrice} Q.R
                  </p>
                  <button className='py-2 px-4 flex justify-center gap-2 items-center rounded-full bg-[#D9D9D9] text-[#000]'>
                    <IoCartOutline />
                    <span>{language === 'eng' ? 'For Sale' : 'للبيع'}</span>
                  </button>
                  <button
                    className='flex flex-col gap-[4px]'
                    onClick={() => handleOrder(currentplateData?._id)}
                  >
                    <span className='bg-[#000] text-white py-2 px-6 rounded-xl font-semibold'>
                      {language === 'eng' ? ' Book Now' : 'احجز الآن'}
                    </span>
                  </button>
                </div>
                <div className='w-[100%] flex flex-col gap-[2px] items-start self-start'>
                  <p className='font-bold'>
                    {language === 'eng'
                      ? 'Share This Page:'
                      : 'مشاركة هذه الصفحة:'}
                  </p>
                  <div className='flex justify-between w-[100%]'>
                    <img
                      src={whatsapp}
                      alt=''
                      className='w-[40px] h-[40px] bg-[#AEAAAACC] rounded-full p-2'
                    />
                    <img
                      src={facebook}
                      alt=''
                      className='w-[40px] h-[40px] bg-[#AEAAAACC] rounded-full p-2'
                    />
                    <img
                      src={twitter}
                      alt=''
                      className='w-[40px] h-[40px] bg-[#AEAAAACC] rounded-full p-2'
                    />
                    <img
                      src={pin}
                      alt=''
                      className='w-[40px] h-[40px] bg-[#AEAAAACC] rounded-full p-2'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* plate detail likes section */}
      {product?.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between gap-4 p-8 md:p-14'>
          {mappingData?.map((data_elem, data_index) => {
            return <ExploreCard {...data_elem} key={data_index} />;
          })}
        </div>
      ) : (
        <NoProductFound />
      )}
      <div className=' flex items-center justify-center'>
        {showItems < product?.length &&
        <button
          className={`${
            showItems >= product?.length
              ? ' cursor-not-allowed'
              : 'animated-button'
          } bg-white p-2 rounded-xl font-semibold   text-center`}
          disabled={showItems >= product?.length}
          onClick={() => {
            setShowItems((prev) => prev + 6);
          }}
        >
          <span className='button-content'>
            {language === 'eng' ? 'Load More' : 'تحميل المزيد'}
          </span>
        </button>
        }
      </div>
    </div>
  );
};

export default PlateDetailPage;
