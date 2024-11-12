import React from 'react';

import Chart from '../../components/RechartsCharts/Chart';
import PieChartComponent from '../../components/RechartsCharts/PieChartComponent';
import { generatePieData } from '../SellerDashboard';

function Dashboard() {
  // Array of order data
  const orders = [
    { id: 1, title: 'Total Order', count: 1925 },
    { id: 2, title: 'Total Sales', count: 450 },
    { id: 3, title: 'Revenue', count: 1480 },
    { id: 4, title: 'Total Visitor', count: 72 },
  ];

  return (
    <>
      <p className='text-lg font-medium'>Dashboard</p>

      {/* Container for the shani divs with map loop */}
      <div className='flex flex-wrap gap-4 my-4'>
        {orders.map((order) => (
          <div
            key={order.id}
            className='h-[50vh] sm:w-[45%] md:w-[30%] lg:w-[20%] bg-gradient-to-t from-[white] via-[#c3e88a]-500 to-[#c3e88a] border border-[#bbfd16] rounded-xl'
          >
            <PieChartComponent
              data={generatePieData(500, 150, '#534543', '#ccc')}
              title={order.title}
            />
          </div>
        ))}
      </div>

      {/* Chart component */}
      <div className='h-[60vh] w-full lg:w-[84%] bg-white rounded-xl shadow-2xl z-50 my-5'>
        <Chart />
      </div>
    </>
  );
}

export default Dashboard;
