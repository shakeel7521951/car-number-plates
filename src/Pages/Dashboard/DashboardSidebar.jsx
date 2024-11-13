import React, { useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import home from '../../assets/sidebar-icons/home.png';
import orders from '../../assets/sidebar-icons/orders.png';
import payments from '../../assets/sidebar-icons/payments.png';
import product from '../../assets/sidebar-icons/product.png';
import shipment from '../../assets/sidebar-icons/shipment.png';
import users from '../../assets/sidebar-icons/users.png';

function DashboardSidebar() {
  const navigate = useNavigate();

  const sidebarArray = [
    { id: 1, item_icon: home, item_content: 'Dashboard', route: '/dashboard' },
    {
      id: 2,
      item_icon: orders,
      item_content: 'Orders',
      route: '/dashboard/orders',
    },
    {
      id: 3,
      item_icon: product,
      item_content: 'Product',
      route: '/dashboard/product',
    },
    {
      id: 4,
      item_icon: users,
      item_content: 'Users',
      route: '/dashboard/user',
    },
    {
      id: 5,
      item_icon: payments,
      item_content: 'Payments',
      route: '/dashboard/payment',
    },
    {
      id: 6,
      item_icon: shipment,
      item_content: 'Shipment',
      route: '/dashboard/shipment',
    },
  ];

  const [selectedItem, setSelectedItem] = useState('Dashboard');

  const handleNavigation = (item) => {
    setSelectedItem(item.item_content);
    navigate(item.route);
  };

  return (
    <div className='bg-[#F2E6D2A8] h-[100vh] w-[18%] pt-6 pl-3'>
      <div className='w-[70%] flex flex-col gap-4'>
        <div className='flex items-center gap-3 mb-6'>
          <IoMenu size={30} />
          <p className='text-[20px] font-semibold'>Menu</p>
        </div>
        <div className='flex flex-col gap-4'>
          {sidebarArray.map((elem) => (
            <div
              key={elem.id}
              className={`flex items-center gap-6 px-2 py-3 cursor-pointer ${
                selectedItem === elem.item_content
                  ? 'bg-[#95D7D952] rounded-2xl'
                  : 'bg-transparent'
              }`}
              onClick={() => handleNavigation(elem)}
            >
              <img
                src={elem.item_icon}
                alt={elem.item_content}
                className='w-[22px] h-[22px]'
              />
              <p className='text-[13px] font-medium'>{elem.item_content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebar;
