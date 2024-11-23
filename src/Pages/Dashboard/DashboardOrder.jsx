import React, { useState } from 'react';
import user_image_1 from '../../assets/plateName.png';
import user_image_2 from '../../assets/plateName.png';
import user_image_3 from '../../assets/plateName.png';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import PieChartComponent from '../../components/RechartsCharts/PieChartComponent';
import { generatePieData } from '../SellerDashboard';
import { useGetAllOrdersQuery } from '../../Redux/OrderRoute/orderApi';

const DashboardOrder = () => {
  const [ordersData, setOrdersData] = useState([
    {
      order_id: '0111',
      buyer_name: 'Malik',
      plate_no: '197500',
      seller_name: 'Haroon',
      price: '50,000',
      status: 'Accepted',
      picture: user_image_1,
    },
    {
      order_id: '0112',
      buyer_name: 'Malik',
      plate_no: '197500',
      seller_name: 'Haroon',
      price: '50,000',
      status: 'Rejected',
      picture: user_image_2,
    },
    {
      order_id: '0113',
      buyer_name: 'Malik',
      plate_no: '197500',
      seller_name: 'Haroon',
      price: '50,000',
      status: 'Pending',
      picture: user_image_3,
    },
    {
      order_id: '0114',
      buyer_name: 'Malik',
      plate_no: '197500',
      seller_name: 'Haroon',
      price: '50,000',
      status: 'Rejected',
      picture: user_image_2,
    },
    {
      order_id: '0115',
      buyer_name: 'Malik',
      plate_no: '197,500',
      seller_name: 'Haroon',
      price: '50,000',
      status: 'Pending',
      picture: user_image_3,
    },
  ]);

  // My logic start here
  const { data: orders, error, isLoading } = useGetAllOrdersQuery();
  console.log('get all orders', orders);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editedBuyerName, setEditedBuyerName] = useState('');
  const [editedSellerName, setEditedSellerName] = useState('');
  const [editedPlateNo, setEditedPlateNo] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedStatus, setEditedStatus] = useState('');
  // const [editedOrderImage, setEditedOrderImage] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [editValues, setEditValues] = useState({
    buyerName: '',
    plateNoDetails: '',
    sellerName: '',
    price: '',
    orderStatus: '',
  });

  const openEditModal = (order) => {
    console.log(order);
    setEditValues(order);
    setIsEditModalOpen(true);
  };

  // Function to handle saving edited data
  const handleEditSave = () => {
    console.log('edit values ', editValues);

    // const updatedOrders = ordersData.map((order) =>
    //   order.order_id === selectedOrder.order_id
    //     ? {
    //         ...order,
    //         buyer_name: editedBuyerName,
    //         plate_no: editedPlateNo,
    //         seller_name: editedSellerName,
    //         price: editedPrice,
    //         status: editedStatus, // Update status
    //       }
    //     : order
    // );
    // setOrdersData(updatedOrders);
    // setIsEditModalOpen(false);
  };

  const openDeleteModal = (order) => {
    setSelectedOrder(order);
    setIsDeleteModalOpen(true);
  };

  // Function to delete the user
  const handleDeleteOrder = () => {
    const updatedOrders = ordersData.filter(
      (order) => order.order_id !== selectedOrder.order_id
    );
    setOrdersData(updatedOrders);
    setIsDeleteModalOpen(false);
  };
  const totalRevenue = 10000;
  const revenueFilled = 10000;
  // const totalSales = 5000;
  // const salesFilled = 3000;
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
        return 'text-[#A2C3F4] border-[#A2C3F4] border-[1px] px-[0px] py-[8px] text-center rounded-lg';
      default:
        return 'text-gray-700 border-gray-200';
    }
  };

  // console.log('Selected Order:', selectedOrder);
  // console.log('Selected Order price:', editedPrice);
  // console.log('Edited Image:', editedOrderImage);
  // const price = Number(editedPrice.split(',').join(''));
  // console.log(price);

  if (isLoading) return <h1>Loading.....</h1>;

  return (
    <div className='w-[90%]   mx-auto'>
      <h1 className='text-xl font-semibold mb-4 lg:text-left text-center'>
        Orders
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
            title='Accepted'
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
            title='Rejected'
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
            title='Pending'
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
              <div className='p-4 font-medium'>Order ID</div>
              {/* <div className='p-4 font-medium'>Picture</div> */}
              <div className='p-4 font-medium'>Buyer Name</div>
              <div className='p-4 font-medium'>Plate No</div>
              <div className='p-4 font-medium'>Seller Name</div>
              <div className='p-4 font-medium'>Price</div>
              <div className='p-4 font-medium'>Status</div>
              <div className='p-4 font-medium'>Edit Status</div>
            </div>

            {/* User Rows */}
            <div className='divide-y divide-gray-200'>
              {orders?.findOrders?.map((order, index) => (
                <div
                  key={order._id}
                  className='grid grid-cols-7 items-center bg-white hover:bg-gray-50'
                >
                  <div className='p-4 text-gray-700'>{index + 1}</div>
                  {/* <div className='p-4'>
                    <img
                      src={order.picture}
                      alt=''
                      className='w-14 h-14 rounded-lg object-cover'
                    />
                  </div> */}
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
                      onClick={() => openDeleteModal(order)}
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
            <h2 className='text-lg font-semibold mb-4'>Edit Order</h2>

            <div className='mb-4'>
              <label>Buyer Name:</label>
              <input
                type='text'
                value={editValues?.buyerName}
                onChange={(e) =>
                  setEditValues({
                    ...editValues,
                    buyerName: e.target.value,
                  })
                }
                className='w-full border rounded-lg p-2 mt-1'
              />
            </div>
            <div className='mb-4'>
              <label>Plate Number:</label>
              <input
                type='number'
                value={editValues?.plateNoDetails}
                onChange={(e) =>
                  setEditValues({
                    ...editValues,
                    plateNoDetails: e.target.value,
                  })
                }
                className='w-full border rounded-lg p-2 mt-1'
              />
            </div>
            <div className='mb-4'>
              <label>Seller Name:</label>
              <input
                type='text'
                value={editValues?.sellerName}
                onChange={(e) =>
                  setEditValues({
                    ...editValues,
                    sellerName: e.target.value,
                  })
                }
                className='w-full border rounded-lg p-2 mt-1'
              />
            </div>
            <div className='mb-4'>
              <label>Price:</label>
              <input
                type='number'
                value={editValues?.discountedPrice || editValues?.price}
                onChange={(e) => {
                  const value = e.target.value;
                  setEditValues({
                    ...editValues,
                    discountedPrice:
                      editValues?.discountedPrice !== undefined
                        ? value
                        : undefined,
                    price:
                      editValues?.discountedPrice === undefined
                        ? value
                        : editValues?.price,
                  });
                }}
                className='w-full border rounded-lg p-2 mt-1'
              />
            </div>
            {/* Dropdown for Status */}
            <div className='mb-4'>
              <label>Status:</label>
              <select
                value={editValues?.orderStatus}
                onChange={(e) =>
                  setEditValues({
                    ...editValues,
                    orderStatus: e.target.value,
                  })
                }
                className='w-full border rounded-lg p-2 mt-1'
              >
                <option value='Accepted'>Accepted</option>
                <option value='Rejected'>Rejected</option>
                <option value='Pending'>Pending</option>
              </select>
            </div>

            <div className='flex justify-end gap-4'>
              <button
                onClick={handleEditSave}
                className='bg-green-500 text-white px-4 py-2 rounded-lg'
              >
                Save
              </button>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className='bg-gray-300 px-4 py-2 rounded-lg'
              >
                Cancel
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
              Are you sure you want to delete?
            </h2>
            <div className='flex justify-end gap-4'>
              <button
                onClick={handleDeleteOrder}
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

export default DashboardOrder;
