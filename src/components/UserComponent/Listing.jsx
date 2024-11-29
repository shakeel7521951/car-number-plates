import { useState } from 'react';
import { useSelector } from 'react-redux';

const Listing = ({ onClose }) => {
  const [plateNumber, setPlateNumber] = useState('');
  const [price, setPrice] = useState('');
  const { language } = useSelector((state) => state.language);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlateNumber('');
    setPrice('');
    onClose();
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4'>
      <div className='bg-white w-full max-w-md p-6 rounded shadow-lg'>
        <h1
          className={`text-xl font-bold mb-4 ${
            language === 'ar' ? 'text-right' : 'text-left'
          }`}
        >
          {language === 'eng' ? 'Add New Product' : 'إضافة منتج جديد'}
        </h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <label
            className={`flex flex-col ${
              language === 'ar' ? 'text-right' : 'text-left'
            }`}
          >
            {language === 'eng' ? 'Plate Number:' : 'رقم اللوحة:'}
            <input
              type='text'
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
              className='border border-gray-300 p-2 rounded mt-1'
              required
            />
          </label>
          <label
            className={`flex flex-col ${
              language === 'ar' ? 'text-right' : 'text-left'
            }`}
          >
            {language === 'eng' ? 'Price:' : 'السعر:'}
            <input
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='border border-gray-300 p-2 rounded mt-1'
              required
            />
          </label>
          <div
            className={`flex justify-end gap-2 mt-4 ${
              language === 'ar' ? 'text-right' : 'text-left'
            }`}
          >
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 bg-gray-300 rounded'
            >
              {language === 'eng' ? 'Cancel' : 'إلغاء'}
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded'
            >
              {language === 'eng' ? 'Add Product' : 'إضافة المنتج'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Listing;
