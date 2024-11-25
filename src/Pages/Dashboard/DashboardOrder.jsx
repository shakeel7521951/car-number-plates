import React, { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import PieChartComponent from '../../components/RechartsCharts/PieChartComponent';
import { generatePieData } from '../SellerDashboard';
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from '../../Redux/OrderRoute/orderApi';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const DashboardOrder = () => {
  const { language } = useSelector((state) => state.language);
  const { data: orders, isLoading } = useGetAllOrdersQuery();
  const [updatedOrders] = useUpdateOrderStatusMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [detailOfOrder, setDetailOfOrder] = useState({});

  const openEditModal = (order) => {
    setDetailOfOrder(order);
    setIsEditModalOpen(true);
  };

  const handleEditSave = async () => {
    try {
      const resp = await updatedOrders({
        id: detailOfOrder?._id,
        orderStatus: detailOfOrder?.orderStatus,
      }).unwrap();
      toast.success(resp?.message);
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error(error?.data?.message);
      console.log(error);
    }
  };

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
  const totalRevenue = 10000;
  const revenueFilled = 10000;
  const totalListings = 2000;
  const listingsFilled = 1000;
  const totalPendingPayments = 500;
  const paidPayments = 300;
  const getStatusStyles = (status) => {
    switch (status) {
      case 'Accepted':
        return 'text-[#260BF1] border-[#260BF1] border-[1px] px-[0px] py-[8px] text-center rounded-lg';
      case 'Rejected':
        return 'text-[#F20000] border-[#F20000] border-[1px] px-[0px] py-[8px] text-center rounded-lg';
      case 'Pending':
        return 'text-[#023047] border-[#023047] border-[1px] px-[0px] py-[8px] text-center rounded-lg';
      default:
        return 'text-gray-700 border-gray-200';
    }
  };

  if (isLoading) return <h1>Loading.....</h1>;

  return (
    <div className='w-[90%]   mx-auto'>
      <h1 className='text-xl font-semibold mb-4 lg:text-left text-center'>
        {language === 'eng' ? 'Orders' : 'طلبات'}
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-center px-8 mb-3'>
        {/* Revenue Chart */}
        <div className='bg-gradient-to-b from-[#c3e78a] to-white rounded-2xl shadow-md pt-4'>
          <PieChartComponent
            data={generatePieData(
              totalRevenue,
              revenueFilled,
              '#1D3B9C',
              '#ccc'
            )}
            title={`${language === 'eng' ? 'Accepted' : 'مقبول'}`}
          />
        </div>

        {/* Sales Chart */}

        <div className='bg-gradient-to-b from-[#c3e78a] to-white rounded-2xl shadow-md pt-4'>
          <PieChartComponent
            data={generatePieData(
              totalListings,
              listingsFilled,
              '#A71414',
              '#ccc'
            )}
            title={`${language === 'eng' ? 'Rejected' : 'مرفوض'}`}
          />
        </div>

        <div className='bg-gradient-to-b from-[#c3e78a] to-white rounded-2xl shadow-md pt-4'>
          <PieChartComponent
            data={generatePieData(
              totalPendingPayments,
              paidPayments,
              '#98B5DE',
              '#ccc'
            )}
            title={`${language === 'eng' ? 'Pending' : 'قيد الانتظار'}`}
          />
        </div>
      </div>

      <div className=' '>
        {/* Table Container with Horizontal Scroll */}
        <div className='overflow-x-auto'>
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
              {orders?.findOrders?.map((order, index) => (
                <div
                  key={order._id}
                  className='grid grid-cols-7 items-center bg-white hover:bg-gray-50'
                >
                  <div className='p-4 text-gray-700'>{index + 1}</div>

                  <div className='p-4 text-gray-700'>{order?.buyerName}</div>
                  <div className='p-4 text-gray-700'>
                    {order?.plateNoDetails}
                  </div>
                  <div className='p-4 text-gray-700'>{order?.sellerName}</div>
                  <div className='p-4 text-gray-700'>
                    {order?.discountedPrice || order?.price}
                  </div>
                  <div className={` ${getStatusStyles(order?.orderStatus)}`}>
                    {order?.orderStatus}
                  </div>
                  <div className='p-4 flex space-x-1'>
                    <button
                      className='text-gray-600 hover:text-gray-800'
                      onClick={() => openEditModal(order)}
                    >
                      <FaRegEdit className='w-6 h-7' />
                    </button>
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
        </div>
      </div>

      {/* Edit User Modal */}
      {isEditModalOpen && (
        <div className='fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-xl shadow-lg w-[400px]'>
            <h2 className='text-lg font-semibold mb-4'>
              {language === 'eng' ? 'Edit Order' : 'تحرير الطلب'}
            </h2>

            <div className='mb-4'>
              <label>
                {language === 'eng' ? 'Buyer Name:' : 'اسم المشتري:'}
              </label>
              <input
                type='text'
                value={detailOfOrder.buyerName}
                readOnly
                className='w-full border rounded-lg p-2 mt-1'
              />
            </div>
            <div className='mb-4'>
              <label>
                {language === 'eng' ? 'Plate Number:' : 'رقم اللوحة:'}
              </label>
              <input
                type='number'
                value={detailOfOrder?.plateNoDetails}
                readOnly
                className='w-full border rounded-lg p-2 mt-1'
              />
            </div>
            <div className='mb-4'>
              <label>
                {language === 'eng' ? 'Seller Name:' : 'اسم البائع:'}
              </label>
              <input
                type='text'
                value={detailOfOrder?.sellerName}
                readOnly
                className='w-full border rounded-lg p-2 mt-1'
              />
            </div>
            <div className='mb-4'>
              <label>{language === 'eng' ? 'Price:' : 'سعر:'}</label>
              <input
                type='number'
                value={detailOfOrder?.discountedPrice || detailOfOrder?.price}
                readOnly
                className='w-full border rounded-lg p-2 mt-1'
              />
            </div>
            {/* Dropdown for Status */}
            <div className='mb-4'>
              <label>{language === 'eng' ? 'Status:' : 'حالة:'}</label>
              <select
                value={detailOfOrder?.orderStatus || ''}
                onChange={(e) =>
                  setDetailOfOrder({
                    ...detailOfOrder,
                    orderStatus: e.target.value,
                  })
                }
                className='w-full border rounded-lg p-2 mt-1'
              >
                <option value='Accepted'>
                  {language === 'eng' ? 'Accepted' : 'مقبول'}
                </option>
                <option value='Rejected'>
                  {language === 'eng' ? 'Rejected' : 'مرفوض'}
                </option>
                <option value='Pending'>
                  {language === 'eng' ? 'Pending' : 'قيد الانتظار'}
                </option>
              </select>
            </div>

            <div className='flex justify-end gap-4'>
              <button
                onClick={handleEditSave}
                className='bg-green-500 text-white px-4 py-2 rounded-lg'
              >
                {language === 'eng' ? 'Save' : 'يحفظ'}
              </button>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className='bg-gray-300 px-4 py-2 rounded-lg'
              >
                {language === 'eng' ? 'Cancel' : 'يلغي'}
              </button>
            </div>
          </div>
        </div>
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

export default DashboardOrder;
