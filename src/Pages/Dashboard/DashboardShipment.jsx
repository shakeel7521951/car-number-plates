import React, { useState } from 'react';
import user_image_1 from '../../assets/plateName.png';
import user_image_2 from '../../assets/plateName.png';
import user_image_3 from '../../assets/plateName.png';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { PaymentData } from '../../StaticData/data';

import StoreIcon from '../../assets/icone/store.png';
import setting from '../../assets/icone/setting.png';
import van from '../../assets/icone/van.png';
import { useSelector } from 'react-redux';
const DashboardShipment = () => {
  const [paymentsData, setpaymentsData] = useState(PaymentData);
  const { language } = useSelector((state) => state.language);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [editedBuyerName, setEditedBuyerName] = useState('');
  const [editedSellerName, setEditedSellerName] = useState('');
  const [editedPlateNo, setEditedPlateNo] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedBankAcc, setEditedBankAcc] = useState('');
  // const [editedStatus, setEditedStatus] = useState("");
  // const [editedOrderImage, setEditedOrderImage] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Function to open the edit modal
  const openEditModal = (payment) => {
    setSelectedPayment(payment);
    setEditedBuyerName(payment.buyer_name);
    setEditedSellerName(payment.seller_name);
    setEditedPlateNo(payment.plate_no);
    setEditedPrice(payment.price);
    setEditedBankAcc(payment.bank_acc);
    // setEditedStatus(order.status);
    setIsEditModalOpen(true);
  };

  // Function to handle saving edited data
  const handleEditSave = () => {
    const updatedOrders = paymentsData.map((order) =>
      order.order_id === selectedPayment.order_id
        ? {
          ...order,
          buyer_name: editedBuyerName,
          plate_no: editedPlateNo,
          seller_name: editedSellerName,
          price: editedPrice,
          bank_acc: editedBankAcc, // Update status
        }
        : order
    );
    setpaymentsData(updatedOrders);
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

  const data = [
    {
      id: 1,
      count: 130,
      label: language === 'eng' ? 'New Orders' : 'طلبات جديدة',
      icon: StoreIcon,
    },
    {
      id: 2,
      count: 80,
      label: language === 'eng' ? 'In Process' : 'قيد المعالجة',
      icon: setting,
    },
    {
      id: 3,
      count: 200,
      label: language === 'eng' ? 'Delivery' : 'التوصيل',
      icon: van,
    },
    {
      id: 4,
      count: 50,
      label: language === 'eng' ? 'Total Delivery' : 'إجمالي التوصيل',
      icon: van,
    },
  ];


  const openDeleteModal = (order) => {
    setSelectedPayment(order);
    setIsDeleteModalOpen(true);
  };

  // Function to delete the user
  const handleDeletePayment = () => {
    const updatedPayments = paymentsData.filter(
      (order) => order.order_id !== selectedPayment.order_id
    );
    setpaymentsData(updatedPayments);
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

  console.log('Selected Order:', selectedPayment);
  console.log('Selected Order price:', editedPrice);
  // console.log("Edited Image:", editedOrderImage);
  const price = Number(editedPrice.split(',').join(''));
  console.log(price);
  return (
    <div className='w-[82%] mx-auto'>
      <h1 className='text-xl font-semibold mb-4 lg:text-left text-center'>{language === 'eng' ? 'Number Transfer' : 'نقل الرقم'}</h1>

      <div className='flex flex-wrap justify-around gap-4 p-2'>
        {data.map((item) => (
          <div
            key={item.id}
            className='h-[20vh] w-full sm:w-1/2 md:w-1/3 lg:w-[23%] lg:h-[20vh] rounded-xl bg-gradient-to-t from-white via-[#c3e88a]-500 to-[#c3e88a] flex justify-center items-center px-3 mb-4'
          >
            <div className='flex justify-center items-center gap-5'>
              <img
                src={item.icon}
                alt={item.label}
                className='h-8 sm:h-10 md:h-12'
              />
              <div>
                <p className='text-2xl md:text-3xl font-medium'>{item.count}</p>
                <p className='text-sm md:text-lg font-medium'>{item.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='overflow-x-auto'>
        <div className='min-w-[700px] bg-white rounded-3xl shadow-lg overflow-hidden p-2'>
          {/* Header */}
          <div className='grid grid-cols-8 bg-gray-100 rounded-xl border-[1px] border-black'>
            <div className="p-4 font-medium">{language === 'eng' ? 'Order ID' : 'معرف الطلب'}</div>
            <div className="p-4 font-medium">{language === 'eng' ? 'Picture' : 'الصورة'}</div>
            <div className="p-4 font-medium">{language === 'eng' ? 'Buyer Name' : 'اسم المشتري'}</div>
            <div className="p-4 font-medium">{language === 'eng' ? 'Plate No' : 'رقم اللوحة'}</div>
            <div className="p-4 font-medium">{language === 'eng' ? 'Seller Name' : 'اسم البائع'}</div>
            <div className="p-4 font-medium">{language === 'eng' ? 'Price' : 'السعر'}</div>
            <div className="p-4 font-medium">{language === 'eng' ? 'Delivery Status' : 'حالة التوصيل'}</div>
            <div className="p-4 font-medium">{language === 'eng' ? 'Edit Status' : 'تعديل الحالة'}</div>

          </div>

          {/* User Rows */}
          <div className='divide-y divide-gray-200'>
            {paymentsData.map((payment) => (
              <div
                key={payment.order_id}
                className='grid grid-cols-8 items-center bg-white hover:bg-gray-50'
              >
                <div className='p-4 text-gray-700'>{payment.order_id}</div>
                <div className='p-4'>
                  <img
                    src={payment.picture}
                    alt=''
                    className='w-14 h-14 rounded-lg object-cover'
                  />
                </div>
                <div className='p-4 text-gray-700'>{payment.buyer_name}</div>
                <div className='p-4 text-gray-700'>{payment.plate_no}</div>
                <div className='p-4 text-gray-700'>{payment.seller_name}</div>
                <div className='p-4 text-gray-700'>{payment.price}</div>
                {/* <div className="p-4 text-gray-700">{payment.bank_acc}</div> */}
                <div className={` ${getStatusStyles(payment.status)}`}>
                  {payment.status}
                </div>

                <div className='p-4 flex space-x-2'>
                  {/* Edit Button */}
                  <button
                    className='text-gray-600 hover:text-gray-800'
                    onClick={() => openEditModal(payment)}
                  >
                    <FaRegEdit className='w-6 h-7' />
                  </button>
                  {/* Delete Button */}

                  <button
                    className='text-gray-600 hover:text-gray-800'
                    onClick={() => openDeleteModal(payment)}
                  >
                    <MdDeleteOutline className='w-7 h-7' />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Edit User Modal */}
      {isEditModalOpen && (
        <div className='fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-xl shadow-lg w-[400px]'>
            <h2 className='text-lg font-semibold mb-4'>{language === 'eng' ? 'Edit Payment Details' : 'تحرير تفاصيل الدفع'}</h2>

            <div className='mb-4'>
              <label>{language === 'eng' ? 'Buyer Name:' : 'اسم المشتري:'}</label>
              <input
                type=''
                value={editedBuyerName}
                onChange={(e) => setEditedBuyerName(e.target.value)}
                className='w-full border rounded-lg p-2 mt-1'
              />
            </div>
            <div className='mb-4'>
              <label>{language === 'eng' ? 'Plate Number:' : 'رقم اللوحة:'}</label>
              <input
                type='number'
                value={editedPlateNo}
                onChange={(e) => setEditedPlateNo(e.target.value)}
                className='w-full border rounded-lg p-2 mt-1'
              />
            </div>
            <div className='mb-4'>
              <label>{language === 'eng' ? 'Seller Name:' : 'اسم البائع:'}</label>
              <input
                type='text'
                value={editedSellerName}
                onChange={(e) => setEditedSellerName(e.target.value)}
                className='w-full border rounded-lg p-2 mt-1'
              />
            </div>
            <div className='mb-4'>
              <label>{language === 'eng' ? 'Price:' : 'سعر:'}</label>
              <input
                type='number'
                value={price}
                onChange={(e) => setEditedPrice(e.target.value)}
                className='w-full border rounded-lg p-2 mt-1'
              />
            </div>

            <div className='mb-4'>
              <label>{language === 'eng' ? 'Bank Account:' : 'الحساب البنكي:'}</label>
              <input
                type='text'
                value={editedBankAcc}
                onChange={(e) => setEditedBankAcc(e.target.value)}
                className='w-full border rounded-lg p-2 mt-1'
              />
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
              {language === 'eng' ? 'Are you sure you want to delete?' : 'هل أنت متأكد أنك تريد الحذف؟'}
            </h2>
            <div className='flex justify-end gap-4'>
              <button
                onClick={handleDeletePayment}
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

export default DashboardShipment;
