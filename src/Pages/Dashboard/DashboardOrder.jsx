import React, { useState } from 'react';
import user_image_1 from '../../assets/plateName.png';
import user_image_2 from '../../assets/plateName.png';
import user_image_3 from '../../assets/plateName.png';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import PieChartComponent from '../../components/RechartsCharts/PieChartComponent';
import { generatePieData } from '../SellerDashboard';

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

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editedBuyerName, setEditedBuyerName] = useState('');
  const [editedSellerName, setEditedSellerName] = useState('');
  const [editedPlateNo, setEditedPlateNo] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedStatus, setEditedStatus] = useState('');
  const [editedOrderImage, setEditedOrderImage] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Function to open the edit modal
  const openEditModal = (order) => {
    setSelectedOrder(order);
    setEditedBuyerName(order.buyer_name);
    setEditedSellerName(order.seller_name);
    setEditedPlateNo(order.plate_no);
    setEditedPrice(order.price);
    setEditedStatus(order.status);
    setIsEditModalOpen(true);
  };

  // Function to handle saving edited data
  const handleEditSave = () => {
    const updatedOrders = ordersData.map((order) =>
      order.order_id === selectedOrder.order_id
        ? {
            ...order,
            buyer_name: editedBuyerName,
            plate_no: editedPlateNo,
            seller_name: editedSellerName,
            price: editedPrice,
            status: editedStatus, // Update status
          }
        : order
    );
    setOrdersData(updatedOrders);
    setIsEditModalOpen(false);
  };

  // Function to handle file change for profile picture
  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setEditedOrderImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // Function to open delete confirmation modal
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
  const orders = [
    { id: 1, title: 'Accepted', count: 1925, startColor: '#432ab1' },
    { id: 2, title: 'Rejected', count: 450, startColor: '#e70000' },
    { id: 3, title: 'Pending', count: 1480, startColor: '#d3b144' },
  ];

  console.log('Selected Order:', selectedOrder);
  console.log('Selected Order price:', editedPrice);
  console.log('Edited Image:', editedOrderImage);
  const price = Number(editedPrice.split(',').join(''));
  console.log(price);
  return (
    <div className='w-[82%] mx-auto'>
      <h1 className='text-xl font-semibold mb-4'>Orders</h1>

      <div className='flex flex-wrap gap-4 my-4'>
        {orders.map((order) => (
          <div
            key={order.id}
            className='h-[50vh] sm:w-[45%] md:w-[30%] lg:w-[20%] bg-gradient-to-t from-[white] via-[#c3e88a]-500 to-[#c3e88a] border border-[#bbfd16] rounded-xl'
          >
            <PieChartComponent
              data={generatePieData(500, 150, order.startColor, '#ccc')}
              title={order.title}
            />
          </div>
        ))}
      </div>

      <div className='bg-white rounded-3xl shadow-lg overflow-hidden p-2'>
        {/* Header */}
        <div className='grid grid-cols-8 bg-gray-100 rounded-xl border-[1px] border-black'>
          <div className='p-4 font-medium'>Order ID</div>
          <div className='p-4 font-medium'>Picture</div>
          <div className='p-4 font-medium'>Buyer Name</div>
          <div className='p-4 font-medium'>Plate No</div>
          <div className='p-4 font-medium'>Seller Name</div>
          <div className='p-4 font-medium'>Price</div>
          <div className='p-4 font-medium'>Status</div>
          <div className='p-4 font-medium'>Edit Status</div>
        </div>

        {/* User Rows */}
        <div className='divide-y divide-gray-200'>
          {ordersData.map((order) => (
            <div
              key={order.order_id}
              className='grid grid-cols-8 items-center bg-white hover:bg-gray-50'
            >
              <div className='p-4 text-gray-700'>{order.order_id}</div>
              <div className='p-4'>
                <img
                  src={order.picture}
                  alt=''
                  className='w-14 h-14 rounded-lg object-cover'
                />
              </div>
              <div className='p-4 text-gray-700'>{order.buyer_name}</div>
              <div className='p-4 text-gray-700'>{order.plate_no}</div>
              <div className='p-4 text-gray-700'>{order.seller_name}</div>
              <div className='p-4 text-gray-700'>{order.price}</div>
              <div className={` ${getStatusStyles(order.status)}`}>
                {order.status}
              </div>

              <div className='p-4 flex space-x-1'>
                {/* Edit Button */}
                <button
                  className='text-gray-600 hover:text-gray-800'
                  onClick={() => openEditModal(order)}
                >
                  <FaRegEdit className='w-6 h-7' />
                </button>
                {/* Delete Button */}
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

      {/* Edit User Modal */}
      {isEditModalOpen && (
        <div className='fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-xl shadow-lg w-[400px]'>
            <h2 className='text-lg font-semibold mb-4'>Edit Order</h2>

            <div className='mb-4'>
              <label>Buyer Name:</label>
              <input
                type='email'
                value={editedBuyerName}
                onChange={(e) => setEditedBuyerName(e.target.value)}
                className='w-full border rounded-lg p-2 mt-1'
              />
            </div>
            <div className='mb-4'>
              <label>Plate Number:</label>
              <input
                type='number'
                value={editedPlateNo}
                onChange={(e) => setEditedPlateNo(e.target.value)}
                className='w-full border rounded-lg p-2 mt-1'
              />
            </div>
            <div className='mb-4'>
              <label>Seller Name:</label>
              <input
                type='text'
                value={editedSellerName}
                onChange={(e) => setEditedSellerName(e.target.value)}
                className='w-full border rounded-lg p-2 mt-1'
              />
            </div>
            <div className='mb-4'>
              <label>Price:</label>
              <input
                type='number'
                value={price}
                onChange={(e) => setEditedPrice(e.target.value)}
                className='w-full border rounded-lg p-2 mt-1'
              />
            </div>
            {/* Dropdown for Status */}
            <div className='mb-4'>
              <label>Status:</label>
              <select
                value={editedStatus}
                onChange={(e) => setEditedStatus(e.target.value)}
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
