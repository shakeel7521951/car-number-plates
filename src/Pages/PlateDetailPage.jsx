import plate_her0_image from '../assets/27465ddd5a3dab417a4b9db3167262fc.jpg';
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
const PlateDetailPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetSingleProductQuery(id);
  const currentplateData = data?.product;

  const { product } = useSelector((state) => state.product);
  const [showItems, setShowItems] = useState(6);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  const mappingData = product?.slice(0, showItems);
  const time = calculateTimeDifference(currentplateData?.created_at);
  return (
    <div>
      <div
        className='.bg-num-plate flex justify-center items-center '
        style={{
          backgroundImage: `url(${plate_her0_image})`,
          width: '100%',
          height: '100vh',
          backgroundSize: '100% 100%',
          // backgroundPosition:'centre'
        }}
      >
        {currentplateData && (
          <div className='w-[100%] sm:w-[80%] h-[80%] flex justify-between items-center sm:items-end'>
            <img
              src={currentplateData.image}
              alt=''
              className='w-[55%] h-[100%] hidden sm:block'
            />

            <div className='w-[70%] mx-auto sm:w-[40%] flex flex-col gap-[6px] '>
              <div className='flex flex-col items-start justify-center'>
                <p className='text-white ms:text-[21px] lg:text-[25px] font-bold'>
                  Private Plate {currentplateData.plateNo}
                </p>
                <div className='bg-[#D9D9D9] rounded-2xl py-1 px-3  flex gap-[3px] justify-center items-center'>
                  <img src={person} alt='' className='w-[40px] rounded-full' />
                  <p className='text-black'>Personal</p>
                </div>
              </div>
              <div
                className='w-[100%] border-[#fff] border-[1px] p-[10px] text-white flex flex-col items-center justify-center gap-[6px]'
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                }}
              >
                <div className='flex flex-col items-center gap-[6px]'>
                  <p className='text-[20px] font-sem'>Posted: {time}</p>
                  <p className='text-[25px] font-bold'>
                    {currentplateData?.price} Q.R
                  </p>
                  <div className='py-2 px-4 flex justify-center gap-2 items-center rounded-full bg-[#D9D9D9] text-[#000]'>
                    <IoCartOutline />
                    <p>For Sale</p>
                  </div>
                  <div className='flex flex-col gap-[4px]'>
                    <p className='bg-[#B4F92B] text-black p-2 rounded-xl font-semibold '>
                      Chat with Seller
                    </p>
                    <p className='bg-[#000] text-white py-2 px-6 rounded-xl font-semibold'>
                      Book Now
                    </p>
                  </div>
                </div>
                <div className='w-[100%] flex flex-col gap-[2px] items-start self-start'>
                  <p className='font-bold'>Share This Page:</p>
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
      {/* plate detaail likes section */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between gap-4 p-14'>
        {mappingData?.map((data_elem, data_index) => {
          return <ExploreCard {...data_elem} key={data_index} />;
        })}
        <button
          className={`${
            showItems >= product?.length
              ? ' cursor-not-allowed'
              : 'animated-button'
          } bg-white  p-2 rounded-xl font-semibold mx-auto text-center   `}
          disabled={showItems >= product?.length}
          onClick={() => {
            setShowItems((prev) => prev + 6);
          }}
        >
          <span className='button-content '>Load More</span>
        </button>
      </div>
    </div>
  );
};
export default PlateDetailPage;
