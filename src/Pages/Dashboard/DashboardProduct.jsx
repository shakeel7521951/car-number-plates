import React, { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';
import {
  useDeleteProductMutation,
  useUpdateProductMutation,
} from '../../Redux/ProductRoutes/productApi';
import { toast } from 'react-toastify';

const DashboardProduct = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loadProduct, setLoadProduct] = useState(6);
  const [selectedId, setSelectedId] = useState(null);

  const { product } = useSelector((state) => state.product);
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const comingData = product?.slice(0, loadProduct);

  // Function to open delete confirmation modal
  const openDeleteModal = (id) => {
    setSelectedId(id);
    setIsDeleteModalOpen(true);
  };

  // Function to delete the product
  const handleDeleteUser = async () => {
    try {
      const resp = await deleteProduct(selectedId).unwrap();
      toast.success(resp?.message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
    setIsDeleteModalOpen(false);
  };

  // Function to open the edit modal
  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  // Function to handle update form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateProduct(selectedProduct).unwrap();
      toast.success(result?.message);
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className='w-[90%] mx-auto'>
      <h1 className='text-xl font-semibold mb-4 lg:text-left text-center'>
        Products
      </h1>
      <div className='overflow-x-auto'>
        <div className='min-w-[800px] bg-white rounded-3xl shadow-lg overflow-hidden p-2'>
          {/* Header */}
          <div className='grid grid-cols-6 bg-gray-100 rounded-xl border-[1px] border-black'>
            <div className='p-4 font-medium'>Item ID</div>
            <div className='p-4 font-medium'>Owner Name</div>
            <div className='p-4 font-medium'>Plate No</div>
            <div className='p-4 font-medium'>Price</div>
            <div className='p-4 font-medium'>Edit</div>
            <div className='p-4 font-medium'>Delete</div>
          </div>

          {/* Product Rows */}
          <div className='divide-y divide-gray-200'>
            {comingData?.map((product, index) => (
              <div
                key={product?._id}
                className='grid grid-cols-6 items-center bg-white hover:bg-gray-50'
              >
                <div className='p-4 text-gray-700'>{index + 1}</div>
                <div className='p-4 text-gray-700'>{product?.sellerName}</div>
                <div className='p-4 text-gray-700 break-words'>
                  {product?.plateNo}
                </div>
                <div className='p-4 text-gray-700'>
                  {product?.price - product?.discount}
                </div>
                <button
                  className='text-gray-600 hover:text-gray-800'
                  onClick={() => openEditModal(product)}
                >
                  Edit
                </button>
                <button
                  className='text-gray-600 hover:text-gray-800'
                  onClick={() => openDeleteModal(product?._id)}
                >
                  <MdDeleteOutline className='w-7 h-7' />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className='fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-xl shadow-lg'>
            <h2 className='text-lg font-semibold mb-4'>Edit Product</h2>
            <form onSubmit={handleEditSubmit} className='space-y-4'>
              <div>
                <label className='block text-gray-700 font-medium mb-1'>
                  Category
                </label>
                <input
                  type='text'
                  name='category'
                  value={selectedProduct?.category || ''}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      category: e.target.value,
                    })
                  }
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none'
                />
              </div>
              <div>
                <label className='block text-gray-700 font-medium mb-1'>
                  Plate No
                </label>
                <input
                  type='text'
                  name='plateNo'
                  value={selectedProduct?.plateNo || ''}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      plateNo: e.target.value,
                    })
                  }
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none'
                />
              </div>
              <div>
                <label className='block text-gray-700 font-medium mb-1'>
                  Price
                </label>
                <input
                  type='text'
                  name='price'
                  value={selectedProduct?.price || ''}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      price: e.target.value,
                    })
                  }
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none'
                />
              </div>
              <div>
                <label className='block text-gray-700 font-medium mb-1'>
                  Discount
                </label>
                <input
                  type='text'
                  name='discount'
                  value={selectedProduct?.discount || ''}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      discount: e.target.value,
                    })
                  }
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none'
                />
              </div>
              <div className='flex justify-end gap-4'>
                <button
                  type='submit'
                  className='bg-blue-500 text-white px-4 py-2 rounded-lg'
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Updating...' : 'Update'}
                </button>
                <button
                  type='button'
                  className='bg-gray-300 px-4 py-2 rounded-lg'
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
    </div>
  );
};

export default DashboardProduct;
