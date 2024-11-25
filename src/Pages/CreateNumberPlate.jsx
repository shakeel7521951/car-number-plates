import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useCreatePlateMutation } from '../Redux/ProductRoutes/productApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CreateNumberPlate = () => {
  const navigate = useNavigate();
  const { language } = useSelector((state) => state.language);
  const [createProduct, { isLoading }] = useCreatePlateMutation();
  const [formData, setFormData] = useState({
    category: '',
    plateNo: '',
    price: '',
    discountpercent: '', // Can be empty or have a percentage value
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

    // Validate discountpercent percentage (must be between 0 and 100, if provided)
    if (formData.discountpercent) {
      const discountpercentValue = parseFloat(formData.discountpercent);
      if (
        isNaN(discountpercentValue) ||
        discountpercentValue < 0 ||
        discountpercentValue > 100
      ) {
        newErrors.discountpercent =
          'Discount must be a valid percentage between 0 and 100';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Default discountpercent to 0 if left empty
    if (formData.discountpercent === '') {
      formData.discountpercent = '0';
    }
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
        {language === 'eng' ? 'Create New Number Plate' : 'إنشاء لوحة أرقام جديدة'}
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Category */}
        <div>
          <label className='block text-gray-700 font-medium mb-1'>
            {language === 'eng' ? 'Category' : 'فئة'}
          </label>
          <select
            name='category'
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value='' disabled>
              {language === 'eng' ? 'Select category' : 'اختر الفئة'}
            </option>
            <option value="normal">{language === 'eng' ? 'Normal' : 'عادي'}</option>
            <option value="silver">{language === 'eng' ? 'Silver' : 'فضي'}</option>
            <option value="gold">{language === 'eng' ? 'Gold' : 'ذهبي'}</option>
            <option value="vip">{language === 'eng' ? 'VIP' : 'كبار الشخصيات'}</option>

          </select>
          {errors.category && (
            <p className='text-red-500 text-sm mt-1'>{errors.category}</p>
          )}
        </div>

        {/* Plate Number */}
        <div>
          <label className='block text-gray-700 font-medium mb-1'>
            {language==='eng'?'Plate Number':'رقم اللوحة'}
          </label>
          <input
            type='text'
            name='plateNo'
            value={formData.plateNo}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${errors.plateNo ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder={`${language==='eng'?'Enter plate number':'أدخل رقم اللوحة'}`}
          />
          {errors.plateNo && (
            <p className='text-red-500 text-sm mt-1'>{errors.plateNo}</p>
          )}
        </div>

        {/* Actual Price */}
        <div>
          <label className='block text-gray-700 font-medium mb-1'>
            {language==='eng'?'Actual Price':'السعر الفعلي'}
          </label>
          <input
            type='text'
            name='price'
            value={formData.price}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder={`${language==='eng'?'Enter actual price':'أدخل السعر الفعلي'}`}
          />
          {errors.price && (
            <p className='text-red-500 text-sm mt-1'>{errors.price}</p>
          )}
        </div>

        {/* discountpercent */}
        <div>
          <label className='block text-gray-700 font-medium mb-1'>
            {language==='eng'?'Discount Percentage (optional)':'نسبة الخصم (اختياري)'}
          </label>
          <input
            type='text'
            name='discountpercent'
            value={formData.discountpercent}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${errors.discountpercent ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder={`${language==='eng'?'Enter discountpercent percentage (0-100)':'أدخل نسبة الخصم (0-100)'}`}
          />
          {errors.discountpercent && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.discountpercent}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          disabled={isLoading}
          type='submit'
          className='w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200'
        >
          {language==='eng'?'Create Number Plate':'إنشاء لوحة أرقام'}
        </button>
      </form>
    </div>
  );
};

export default CreateNumberPlate;
