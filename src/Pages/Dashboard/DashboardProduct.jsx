import React, { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useDeleteProductMutation } from '../../Redux/ProductRoutes/productApi';
import { toast } from 'react-toastify';

const DashboardProduct = () => {
  // const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loadProduct, setLoadProduct] = useState(6);
  const [selectedId, setSelectedId] = useState(null);

  const { product } = useSelector((state) => state.product);
  const [deleteProduct] = useDeleteProductMutation();
  const comingData = product?.slice(0, loadProduct);
  console.log('prodct', comingData);

  // Function to open delete confirmation modal
  const openDeleteModal = (id) => {
    setSelectedId(id);
    setIsDeleteModalOpen(true);
  };

  // Function to delete the user
  const handleDeleteUser = async () => {
    console.log('delete', selectedId);
    try {
      const resp = await deleteProduct(selectedId).unwrap();
      console.log(resp);
      toast.success(resp?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <div className='w-[90%] mx-auto'>
      <h1 className='text-xl font-semibold mb-4  lg:text-left text-center'>
        Products
      </h1>
      <div className='overflow-x-auto'>
        <div className='min-w-[800px] bg-white rounded-3xl shadow-lg overflow-hidden p-2'>
          {/* Header */}
          <div className='grid grid-cols-5 bg-gray-100 rounded-xl border-[1px] border-black'>
            <div className='p-4 font-medium'>Item ID</div>
            {/* <div className='p-4 font-medium'>Picture</div> */}
            <div className='p-4 font-medium'>Owner Name</div>
            <div className='p-4 font-medium'>Plate No</div>
            <div className='p-4 font-medium'>Price</div>
            <div className='p-4 font-medium'>Delete</div>
          </div>

          {/* User Rows */}
          <div className='divide-y divide-gray-200'>
            {comingData?.map((product, index) => (
              <div
                key={product?._id}
                className='grid grid-cols-5 items-center bg-white hover:bg-gray-50'
              >
                <div className='p-4 text-gray-700'>{index + 1}</div>
                {/* <div className='p-4'>
                  <img
                    src={product_image_1}
                    alt={product?.category}
                    className='w-14 h-14 rounded-lg object-cover'
                  />
                </div> */}
                <div className='p-4 text-gray-700'>{'seller' || 'User'}</div>
                <div className='p-4 text-gray-700  break-words'>
                  {product?.plateNo}
                </div>
                <div className='p-4 text-gray-700'>
                  {product?.price - product?.discount}
                </div>
                <button
                  className='text-gray-600 hover:text-gray-800 '
                  onClick={() => openDeleteModal(product?._id)}
                >
                  <MdDeleteOutline className='w-7 h-7' />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className='fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-xl shadow-lg'>
            <h2 className='text-lg font-semibold mb-4'>
              Are you sure you want to delete?
            </h2>
            <div className='flex justify-end gap-4'>
              <button
                onClick={handleDeleteUser}
                className='bg-red-500 text-white px-4 py-2 rounded-lg'
              >
                Delete
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className='bg-gray-300 px-4 py-2 rounded-lg'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        className='animated-button px-4'
        onClick={() => setLoadProduct((prev) => prev + 6)}
        disabled={product?.length <= loadProduct}
      >
        <span className='button-content '> LoadMore</span>
      </button>
    </div>
  );
};

export default DashboardProduct;
