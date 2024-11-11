import React from 'react'
import { IoMenu } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
function DashboardSidebar() {
  return (
    <div className='bg-[#F2E6D2A8] h-[100vh] w-[12%]'>
         <div className='flex justify-center items-center'>
         <IoMenu />
         <p>Menu</p>
         </div>
         <div className='flex flex-col '>
          <div className='flex justify-between items-center '>
          <IoHomeOutline />
          <p>Dashboard</p>
          </div>
          <div className='flex justify-between items-center '>
          <IoHomeOutline />
          <p>Orders</p>
          </div>
          <div className='flex justify-between items-center '>
          <IoHomeOutline />
          <p>Product</p>
          </div>
          <div className='flex justify-between items-center '>
          <IoHomeOutline />
          <p className='text-left'>Users</p>
          </div>
          <div className='flex justify-between items-center '>
          <IoHomeOutline />
          <p>Payments</p>
          </div>
          <div className='flex justify-between items-center '>
          <IoHomeOutline />
          <p>Shipment</p>
          </div>
         </div>
    </div>
  )
}

export default DashboardSidebar
