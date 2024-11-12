import { useState } from 'react';

const Listing = ({ onClose }) => {
  const [plateNumber, setPlateNumber] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(price, plateNumber);
    setPlateNumber('');
    setPrice('');
    onClose(); // Close the modal after submission
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4'>
      <div className='bg-white w-full max-w-md p-6 rounded shadow-lg'>
        <h1 className='text-xl font-bold mb-4'>Add New Product</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <label className='flex flex-col'>
            Plate Number:
            <input
              type='text'
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
              className='border border-gray-300 p-2 rounded mt-1'
              required
            />
          </label>
          <label className='flex flex-col'>
            Price:
            <input
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='border border-gray-300 p-2 rounded mt-1'
              required
            />
          </label>
          <div className='flex justify-end gap-2 mt-4'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 bg-gray-300 rounded'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded'
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Listing;