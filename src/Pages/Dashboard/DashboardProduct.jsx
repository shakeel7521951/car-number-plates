import React, { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';
import {
  useDeleteProductMutation,
  useUpdateProductMutation,
} from '../../Redux/ProductRoutes/productApi';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';
import UpdatePopup from '../../components/SellerDashboard/UpdatePopup';
import NoProductFound from '../../components/NoProductFound';

const DashboardProduct = () => {
  const { language } = useSelector((state) => state.language);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loadProduct, setLoadProduct] = useState(6); // Initial number of products to display
  const [selectedId, setSelectedId] = useState(null);

  const { product } = useSelector((state) => state.product); // Fetch products from Redux store
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const comingData = product?.slice(0, loadProduct); // Limit products based on loadProduct state

  const [formData, setFormData] = useState({
    plateNo: '',
    price: '',
    discountpercent: '',
    availability: 'Active',
  });

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
    setFormData({
      plateNo: product?.plateNo || '',
      price: product?.price || '',
      discountpercent: product?.discountpercent || '',
      availability: product?.availability || 'Active',
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateProduct({
        id: selectedProduct?._id,
        updatePlate: formData,
      }).unwrap();
      toast.success(result?.message);
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  // Function to handle "Load More" functionality
  const handleLoadMore = () => {
    if (loadProduct < product?.length) {
      setLoadProduct((prevLoad) => prevLoad + 6); // Load 6 more products
    }
  };

  return (
    <div className='w-[100%] md:w-[90%] mx-auto'>
      <h1 className='text-xl font-semibold mb-4 lg:text-left text-center'>
        {language === 'eng' ? 'Products' : 'منتجات'}
      </h1>
      <div className='overflow-x-auto'>
        <div className='min-w-[800px] bg-white rounded-3xl shadow-lg overflow-hidden p-2'>
          {/* Header */}
          <div className='grid grid-cols-5 bg-gray-100 rounded-xl border-[1px] border-black'>
            <div className='p-4 font-medium'>
              {language === 'eng' ? 'Item ID' : 'معرف العنصر'}
            </div>
            <div className='p-4 font-medium'>
              {language === 'eng' ? 'Owner Name' : 'اسم المالك'}
            </div>
            <div className='p-4 font-medium'>
              {language === 'eng' ? 'Plate No' : 'رقم اللوحة'}
            </div>
            <div className='p-4 font-medium'>
              {language === 'eng' ? 'Price' : 'سعر'}
            </div>
            <div className='p-4 font-medium'>
              {language === 'eng' ? 'Actions' : 'الإجراءات'}
            </div>
          </div>

          {product?.length > 0 ? (
            <div className='divide-y divide-gray-200'>
              {comingData?.map((product, index) => (
                <div
                  key={product?._id}
                  className='grid grid-cols-5 items-center bg-white hover:bg-gray-50'
                >
                  <div className='p-4 text-gray-700'>{index + 1}</div>
                  <div className='p-4 text-gray-700'>{product?.sellerName}</div>
                  <div className='p-4 text-gray-700 break-words'>
                    {product?.plateNo}
                  </div>
                  <div className='p-4 text-gray-700'>
                    {product?.discountedPrice.toFixed(2)}
                  </div>
                  <div className='flex gap-4'>
                    <button
                      className='text-gray-600 hover:text-gray-800'
                      onClick={() => openEditModal(product)}
                    >
                      <FaEdit className='w-7 h-7' />
                    </button>
                    <button
                      className='text-gray-600 hover:text-gray-800'
                      onClick={() => openDeleteModal(product?._id)}
                    >
                      <MdDeleteOutline className='w-7 h-7' />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <NoProductFound />
          )}
        </div>
      </div>

      {/* "Load More" Button */}
      {loadProduct < product?.length && (
        <div className='flex justify-center mt-4'>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'
            onClick={handleLoadMore}
          >
            {language === 'eng' ? 'Load More' : 'تحميل المزيد'}
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <UpdatePopup
          formData={formData}
          setFormData={setFormData}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditSubmit}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className='fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-xl shadow-lg'>
            <h2 className='text-lg font-semibold mb-4'>
              {language === 'eng'
                ? 'Are you sure you want to delete?'
                : 'هل أنت متأكد أنك تريد الحذف؟'}
            </h2>
            <div className='flex justify-end gap-4'>
              <button
                onClick={handleDeleteUser}
                className='bg-red-500 text-white px-4 py-2 rounded-lg'
              >
                {language === 'eng' ? 'Delete' : 'يمسح'}
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className='bg-gray-300 px-4 py-2 rounded-lg'
              >
                {language === 'eng' ? 'Cancel' : 'يلغي'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardProduct;
