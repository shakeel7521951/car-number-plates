import React, { useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import home from '../../assets/sidebar-icons/home.png';
import orders from '../../assets/sidebar-icons/orders.png';
import payments from '../../assets/sidebar-icons/payments.png';
import product from '../../assets/sidebar-icons/product.png';
import shipment from '../../assets/sidebar-icons/shipment.png';
import users from '../../assets/sidebar-icons/users.png';
function DashboardSidebar() {
  const sidebar_array = [
    {
      id: 1,
      item_icon: home,
      item_content: 'Dashboard',
    },
    {
      id: 2,
      item_icon: orders,
      item_content: 'Orders',
    },
    {
      id: 1,
      item_icon: product,
      item_content: 'Product',
    },
    {
      id: 1,
      item_icon: users,
      item_content: 'Users',
    },
    {
      id: 1,
      item_icon: payments,
      item_content: 'Payments',
    },
    {
      id: 1,
      item_icon: shipment,
      item_content: 'Shipment',
    },
  ];
  const [selectedItem, setSelectedItem] = useState('Dashboard');

  return (
    <div className='bg-[#F2E6D2A8] h-[100vh] w-[18%] pt-6 pl-3'>
      <div className='w-[70%] flex flex-col gap-4'>
        <div className='flex items-center gap-3'>
          <IoMenu size={30} />
          <p className='text-[20px] font-semibold'>Menu</p>
        </div>
        <div className='flex flex-col gap-4 '>
          {sidebar_array.map((elem) => {
            return (
              <div
                className={`flex items-center gap-6  px-2 py-3 ${
                  selectedItem == elem.item_content
                    ? 'bg-[#95D7D952] rounded-2xl'
                    : 'bg-transparent'
                }}
          
            onClick={()=>setSelectedItem(elem.item_content)}`}
              >
                <img
                  src={elem.item_icon}
                  alt=''
                  className='w-[22px] h-[22px]'
                />
                <p className='text-[13px] font-medium'>{elem.item_content}</p>
              </div>
            );
          })}

          {/* <div className="flex justify-between items-center ">
        <img src={orders} alt="" className="w-[18px] h-[18px]" />
          <p>Orders</p>
        </div>
        <div className="flex justify-between items-center ">
        <img src={product} alt="" className="w-[18px] h-[18px]" />
          <p>Product</p>
        </div>
        <div className="flex justify-between items-center ">
        <img src={users} alt="" className="w-[18px] h-[18px]" />
          <p className="text-left">Users</p>
        </div>
        <div className="flex justify-between items-center ">
        <img src={payments} alt="" className="w-[18px] h-[18px]" />
          <p>Payments</p>
        </div>
        <div className="flex justify-between items-center ">
        <img src={shipment} alt="" className="w-[18px] h-[18px]" />
          <p>Shipment</p>
        </div> */}
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebar;
