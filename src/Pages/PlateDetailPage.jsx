import plate_her0_image from '../assets/27465ddd5a3dab417a4b9db3167262fc.jpg';
import plateNameImage from '../assets/plateName.png';
import whatsapp from '../assets/social-icons/whtsapp.png';
import facebook from '../assets/social-icons/fb.png';
import twitter from '../assets/social-icons/twitter.png';
import pin from '../assets/social-icons/pin.png';
import ExploreCard from '../components/Explore/ExploreCard';
import { data } from '../StaticData/data';
import person from '../assets/person1.jpeg';
import { useParams } from 'react-router-dom';

import { IoCartOutline } from 'react-icons/io5';
const PlateDetailPage = () => {
  const { id } = useParams();
  const subdata = data.slice(0, 6);
  const currentplateData = subdata.find((elem) => elem.id === id);

  // if (!currentplateData) return <div>Plate not found</div>;
  return (
    <div>
      {/* plate detaail hero section */}
      <div
        className='.bg-num-plate flex justify-center items-end pb-10'
        style={{
          backgroundImage: `url(${plate_her0_image})`,
          width: '100%',
          height: '100vh',
          backgroundSize: '100% 100%',
          // backgroundPosition:'centre'
        }}
      >
        {currentplateData && (
          <div className='w-[80%] h-[80%] flex justify-between items-end'>
            <img
              src={currentplateData.image}
              alt=''
              className='w-[60%] h-[90%]'
            />

            <div className='w-[30%] flex flex-col gap-5 '>
              <div className='flex flex-col items-start justify-center'>
                <p className='text-white text-[32px] font-bold'>
                  Private Plate {currentplateData.plateNumber}
                </p>
                <div className='bg-[#D9D9D9] rounded-2xl py-1 px-3 p flex justify-center items-center'>
                  <img src={person} alt='' className='w-[40px] rounded-full' />
                  <p className='text-black'>Personal</p>
                </div>
              </div>
              <div
                className=' border-[#fff] border-[1px] p-6 text-white flex flex-col items-center justify-center gap-6'
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                }}
              >
                <div className='flex flex-col items-center gap-10'>
                  <p className='text-[24px] font-medium'>
                    Posted: {currentplateData.time} Hours Ago
                  </p>
                  <p className='text-[32px] font-bold'>
                    {currentplateData.discountPrice} Q.R
                  </p>
                  <div className='py-2 px-4 flex justify-center gap-2 items-center rounded-full bg-[#D9D9D9] text-[#000]'>
                    <IoCartOutline />
                    <p>For Sale</p>
                  </div>
                  <div className='flex flex-col gap-4'>
                    <p className='bg-[#B4F92B] text-black p-2 rounded-xl font-semibold '>
                      Chat with Seller
                    </p>
                    <p className='bg-[#000] text-white py-2 px-6 rounded-xl font-semibold'>
                      Book Now
                    </p>
                  </div>
                </div>
                <div className='flex flex-col items-start self-start gap-4'>
                  <p className='font-bold'>Share This Page:</p>
                  <div className='flex gap-10'>
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
        {subdata.map((data_elem, data_index) => {
          return <ExploreCard {...data_elem} key={data_index} />;
        })}
        <p className='bg-[#0D072C] text-white p-2 rounded-xl font-semibold mx-auto text-center'>
          Load More
        </p>
      </div>
    </div>
  );
};
export default PlateDetailPage;
