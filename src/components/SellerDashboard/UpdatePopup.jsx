import React from 'react';

const UpdatePopup = ({
  formData = {},
  setFormData = {},
  onSubmit = () => {},
  onClose = () => {},
}) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-lg w-full max-w-md'>
        <h2 className='text-lg font-bold'>Update Product</h2>
        <form onSubmit={onSubmit} className='space-y-4 mt-4'>
          <div>
            <label className='block text-gray-700 font-medium mb-1'>
              Plate Number
            </label>
            <input
              type='text'
              name='plateNo'
              value={formData?.plateNo}
              onChange={(e) =>
                setFormData({ ...formData, plateNo: e.target.value })
              }
              className='w-full px-4 py-2 border border-gray-300 rounded-lg'
              placeholder='Enter plate number'
            />
          </div>
          <div>
            <label className='block text-gray-700 font-medium mb-1'>
              Price
            </label>
            <input
              type='text'
              name='price'
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className='w-full px-4 py-2 border border-gray-300 rounded-lg'
              placeholder='Enter price'
            />
          </div>
          <div>
            <label className='block text-gray-700 font-medium mb-1'>
              Discount Percent
            </label>
            <input
              type='text'
              name='discountpercent'
              value={formData.discountpercent}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  discountpercent: e.target.value,
                })
              }
              className='w-full px-4 py-2 border border-gray-300 rounded-lg'
              placeholder='Enter discount percent (optional)'
            />
          </div>
          <div>
            <label className='block text-gray-700 font-medium mb-1'>
              Availability
            </label>
            <select
              name='availability'
              value={formData.availability}
              onChange={(e) =>
                setFormData({ ...formData, availability: e.target.value })
              }
              className='w-full px-4 py-2 border border-gray-300 rounded-lg'
            >
              <option value='active'>Active</option>
              <option value='markAsSold'>Mark as Sold</option>
            </select>
          </div>
          <div className='flex justify-end gap-4'>
            <button
              type='button'
              className='px-4 py-2 bg-gray-300 rounded-lg'
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded-lg'
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePopup;
