import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useCreatePlateMutation } from '../Redux/ProductRoutes/productApi';
import { useNavigate } from 'react-router-dom';

const CreateNumberPlate = () => {
  const navigate = useNavigate();
  const [createProduct, { isLoading }] = useCreatePlateMutation();
  const [formData, setFormData] = useState({
    category: '',
    plateNo: '',
    price: '',
    discount: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.plateNo) {
      newErrors.plateNo = 'Plate number is required';
    } else if (formData.plateNo.length < 2 || formData.plateNo.length > 6) {
      newErrors.plateNo = 'Plate number must be between 2 and 6 characters';
    }
    if (!formData.price || isNaN(formData.price)) {
      newErrors.price = 'Valid actual price is required';
    }
    if (
      formData.discount &&
      (isNaN(formData.discount) ||
        parseFloat(formData.discount) >= parseFloat(formData.price))
    ) {
      newErrors.discount = 'Discount must be less than actual price';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fill out all required fields correctly.');
      return;
    }
    try {
      const result = await createProduct(formData).unwrap();
      toast.success(result?.message);
      navigate(-1);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className='max-w-lg mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg'>
      <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>
        Create New Number Plate
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Category */}
        <div>
          <label className='block text-gray-700 font-medium mb-1'>
            Category
          </label>
          <select
            name='category'
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value='' disabled>
              Select category
            </option>
            <option value='normal'>Normal</option>
            <option value='silver'>Silver</option>
            <option value='gold'>Gold</option>
            <option value='vip'>VIP</option>
          </select>
          {errors.category && (
            <p className='text-red-500 text-sm mt-1'>{errors.category}</p>
          )}
        </div>

        {/* Plate Number */}
        <div>
          <label className='block text-gray-700 font-medium mb-1'>
            Plate Number
          </label>
          <input
            type='text'
            name='plateNo'
            value={formData.plateNo}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.plateNo ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder='Enter plate number'
          />
          {errors.plateNo && (
            <p className='text-red-500 text-sm mt-1'>{errors.plateNo}</p>
          )}
        </div>

        {/* Actual Price */}
        <div>
          <label className='block text-gray-700 font-medium mb-1'>
            Actual Price
          </label>
          <input
            type='text'
            name='price'
            value={formData.price}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.price ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder='Enter actual price'
          />
          {errors.price && (
            <p className='text-red-500 text-sm mt-1'>{errors.price}</p>
          )}
        </div>

        {/* Discount */}
        <div>
          <label className='block text-gray-700 font-medium mb-1'>
            Discount Price (optional)
          </label>
          <input
            type='text'
            name='discount'
            value={formData.discount}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.discount ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder='Enter discount amount in QAR'
          />
          {errors.discount && (
            <p className='text-red-500 text-sm mt-1'>{errors.discount}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          disabled={isLoading}
          type='submit'
          className='w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200'
        >
          Create Number Plate
        </button>
      </form>
    </div>
  );
};

export default CreateNumberPlate;
