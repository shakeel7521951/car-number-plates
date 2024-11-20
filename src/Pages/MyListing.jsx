import React, { useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import plateName from '../assets/plateName.png';
import { FaEye } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import {
  useDeleteProductMutation,
  useGetSellerProductQuery,
  useUpdateProductMutation,
} from '../Redux/ProductRoutes/productApi';
import { toast } from 'react-toastify';

const MyListing = () => {
  const [deleteModal, setDeleteModal] = useState(null);
  const [updateModal, setUpdateModal] = useState(null);
  const [deleteProduct, { isLoading: deleteLoader }] =
    useDeleteProductMutation();
  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();
  const navigate = useNavigate();
  const {
    data: sellerProducts,
    isLoading,
    isError,
  } = useGetSellerProductQuery();
  const [formData, setFormData] = useState({
    plateNo: '',
    price: '',
    discount: '',
    availability: 'Active',
  });

  const handleDelete = async (id) => {
    console.log('Product deleted:', id);
    try {
      const resp = await deleteProduct(id).unwrap();
      console.log(resp);
      toast.success(resp?.message);
    } catch (error) {
      console.log(error);
    }
    setDeleteModal(null);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    console.log('update called', updateModal);
    try {
      const res = await updateProduct({
        id: updateModal,
        updatePlate: formData,
      }).unwrap();
      console.log('res', res);
      // navigate(-1); // Navigate back
      toast.success('Product updated successfully!');
    } catch (error) {
      console.error('Update failed', error);
      toast.error(error?.data?.message);
    }
    setUpdateModal(null);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error </h1>;
  }

  return (
    <main className='px-2 sm:px-16 mt-12 font-bold relative'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>My Listing</h1>
        <Link to={'/createPlate'}>
          <CiCirclePlus size='40px' className='text-black' />
        </Link>
      </div>
      <div className='flex flex-col gap-4 mt-12'>
        {sellerProducts?.map(
          ({ _id, views, plateNo, price, discount, availability }) => (
            <div
              className='border bottom-1 border-black p-4 flex flex-col sm:flex-row justify-between'
              key={_id}
            >
              <div className='flex gap-4'>
                <div className='w-32 sm:w-40'>
                  <img
                    src={plateName}
                    alt='Plate'
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='flex flex-col'>
                  <h1>Private Plate : {plateNo}</h1>
                  <h1>{price} Q.T</h1>
                  <h1 className='flex items-center gap-2'>
                    <FaEye />
                    <span>{views} views</span>
                  </h1>
                </div>
              </div>
              <div className='flex flex-col items-end justify-end'>
                <div className='flex gap-4 mt-2'>
                  <button
                    disabled={deleteLoader}
                    className='p-2 border border-1 border-black rounded'
                    onClick={() => setDeleteModal(_id)}
                  >
                    Delete
                  </button>
                  <button
                    className='p-2 bg-black text-white rounded'
                    onClick={() => {
                      setUpdateModal(_id);
                      setFormData({
                        plateNo,
                        price,
                        discount,
                        availability,
                      });
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {deleteModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-lg'>
            <h2 className='text-lg font-bold'>Confirm Delete</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className='flex justify-end gap-4 mt-4'>
              <button
                className='px-4 py-2 bg-gray-300 rounded-lg'
                onClick={() => setDeleteModal(null)}
              >
                Cancel
              </button>
              <button
                className='px-4 py-2 bg-red-500 text-white rounded-lg'
                onClick={() => handleDelete(deleteModal)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {updateModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-lg w-full max-w-md'>
            <h2 className='text-lg font-bold'>Update Product</h2>
            <form
              onSubmit={(e) => handleUpdateSubmit(e)}
              className='space-y-4 mt-4'
            >
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
                  Discount
                </label>
                <input
                  type='text'
                  name='discount'
                  value={formData.discount}
                  onChange={(e) =>
                    setFormData({ ...formData, discount: e.target.value })
                  }
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg'
                  placeholder='Enter discount (optional)'
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
                  onClick={() => setUpdateModal(null)}
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
      )}
    </main>
  );
};

export default MyListing;
