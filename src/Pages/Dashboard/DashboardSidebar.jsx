import React, { useState } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5';
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
    { id: 2, item_icon: orders, item_content: 'Orders', route: '/dashboard/orders' },
    { id: 3, item_icon: product, item_content: 'Product', route: '/dashboard/product' },
    { id: 4, item_icon: users, item_content: 'Users', route: '/dashboard/user' },
    { id: 5, item_icon: payments, item_content: 'Payments', route: '/dashboard/payment' },
    { id: 6, item_icon: shipment, item_content: 'Number Transfer', route: '/dashboard/shipment' },
  ];

  const [selectedItem, setSelectedItem] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNavigation = (item) => {
    setSelectedItem(item.item_content);
    navigate(item.route);
    setIsSidebarOpen(false); // Close sidebar on navigation (for mobile)
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Sidebar Toggle Button for Mobile */}
      <div className='lg:hidden fixed top-4 left-4 z-50'>
        <button onClick={toggleSidebar}>
          {isSidebarOpen ? <IoClose size={30} /> : <IoMenu size={30}/>}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-black opacity-50 z-40 lg:hidden'
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:fixed bg-[#F2E6D2A8] h-full w-[70%]  lg:w-[18%] lg:h-screen pt-6 pl-3 z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className='w-[80%] flex flex-col gap-4'>
          <div className='flex items-center gap-3 mb-6'>
            <IoMenu size={30} className='lg:hidden cursor-pointer' onClick={toggleSidebar} />
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
    </>
  );
}

export default DashboardSidebar;
