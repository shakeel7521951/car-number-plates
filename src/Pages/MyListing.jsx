import { useState } from 'react';
import { LinkingData } from '../StaticData/data';
import { CiCirclePlus } from 'react-icons/ci';
import plateName from '../assets/plateName.png';
import { FaEye } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import Listing from '../components/UserComponent/Listing';

const MyListing = () => {
  const [showDeleteOptions, setShowDeleteOptions] = useState(null);
  const [AddProduct, setAddProduct] = useState(false);
  const handleThreeDotsClick = (id) => {
    setShowDeleteOptions(showDeleteOptions === id ? null : id);
  };
  const handleToggle = () => {
    setAddProduct(!AddProduct);
  };
  return (
    <main className='px-2 sm:px-16 mt-12 font-bold relative'>
      {AddProduct && <Listing onClose={handleToggle} />}
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>My Listing </h1>
        <button onClick={handleToggle}>
          <CiCirclePlus size='40px' className='text-black' />
        </button>
      </div>
      <div className='flex flex-col gap-4 mt-12'>
        {LinkingData.map(({ id, views, like, plateNumber, price, image }) => {
          return (
            <main
              className='border bottom-1 border-black p-4 flex flex-col sm:flex-row justify-between'
              key={id}
            >
              <div className='flex gap-4'>
                <div className='w-32 sm:w-40'>
                  <img
                    src={plateName}
                    alt='some'
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='flex flex-col'>
                  <h1>Private Plate {plateNumber}</h1>
                  <h1>{price} Q.T</h1>
                  <h1 className='flex items-center gap-2'>
                    <FaEye />
                    <span>{views} views</span>
                  </h1>
                </div>
              </div>
              <div className='flex flex-col items-end justify-between relative'>
                <button onClick={() => handleThreeDotsClick(id)}>
                  <BsThreeDots />
                </button>
                {showDeleteOptions === id && (
                  <div className='absolute top-2 right-4 bg-white border border-gray-300 shadow-md p-2 rounded'>
                    <button
                      className='text-red-500'
                      onClick={() => console.log(`Delete item with id: ${id}`)}
                    >
                      Delete
                    </button>
                  </div>
                )}
                <div className='flex gap-4 mt-2'>
                  <button className='p-2 border border-1 border-black rounded'>
                    Mark as Sold
                  </button>
                  <button className='p-2 bg-black text-white rounded'>
                    Republish
                  </button>
                </div>
              </div>
            </main>
          );
        })}
      </div>
    </main>
  );
};

export default MyListing;
