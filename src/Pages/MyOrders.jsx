import { useState } from 'react';
import {
  useDeleteOrderMutation,
  useGetSellerUserQuery,
} from '../Redux/OrderRoute/orderApi';
import { MdDeleteOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const MyOrders = () => {
  const { data: orders } = useGetSellerUserQuery();
  const { language } = useSelector((state) => state.language);
  const [deleteOrder] = useDeleteOrderMutation();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const openDeleteModal = (id) => {
    setSelectedId(id);
    setIsDeleteModalOpen(true);
  };
  // Function to delete the user
  const handleDeleteOrder = async () => {
    try {
      const res = await deleteOrder(selectedId).unwrap();
      toast.success(res?.message);
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  // console.log(data);

  return (
    <div className='overflow-x-auto mt-12 mx-12'>
      {/* Fixed Width Table */}
      <div className='min-w-[700px] bg-white rounded-3xl shadow-lg shani p-2  '>
        {/* Header */}
        <div className='grid grid-cols-7 gap-1 bg-gray-100 rounded-xl border-[1px] border-black'>
          <div className='p-4 font-medium'>
            {language === 'eng' ? 'Order ID' : 'معرف الطلب'}
          </div>
          {/* <div className='p-4 font-medium'>Picture</div> */}
          <div className='p-4 font-medium'>
            {language === 'eng' ? 'Buyer Name' : 'اسم المشتري'}
          </div>
          <div className='p-4 font-medium'>
            {language === 'eng' ? 'Plate No' : 'رقم اللوحة'}
          </div>
          <div className='p-4 font-medium'>
            {language === 'eng' ? 'Seller Name' : 'اسم البائع'}
          </div>
          <div className='p-4 font-medium'>
            {language === 'eng' ? 'Price' : 'سعر'}
          </div>
          <div className='p-4 font-medium'>
            {language === 'eng' ? 'Status' : 'حالة'}
          </div>
          <div className='p-4 font-medium'>
            {language === 'eng' ? 'Edit Status' : 'تحرير الحالة'}
          </div>
        </div>

        {/* User Rows */}
        <div className='divide-y divide-gray-200'>
          {orders?.products?.map((order, index) => (
            <div
              key={order._id}
              className='grid grid-cols-7 items-center bg-white hover:bg-gray-50'
            >
              <div className='p-4 text-gray-700'>{index + 1}</div>

              <div className='p-4 text-gray-700'>{order?.buyerName}</div>
              <div className='p-4 text-gray-700'>{order?.plateNoDetails}</div>
              <div className='p-4 text-gray-700'>{order?.sellerName}</div>
              <div className='p-4 text-gray-700'>
                {order?.discountedPrice || order?.price}
              </div>
              <div
              // className={` ${getStatusStyles(order?.orderStatus)}`}
              >
                {order?.orderStatus}
              </div>
              <div className='p-4 flex space-x-1'>
                <button
                  className='text-gray-600 hover:text-gray-800'
                  onClick={() => openDeleteModal(order?._id)}
                >
                  <MdDeleteOutline className='w-7 h-7' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
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
                onClick={handleDeleteOrder}
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
export default MyOrders;
