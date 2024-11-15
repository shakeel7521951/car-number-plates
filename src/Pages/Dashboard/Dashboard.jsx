import React from 'react';

import Chart from '../../components/RechartsCharts/Chart';
import PieChartComponent from '../../components/RechartsCharts/PieChartComponent';
import { generatePieData } from '../SellerDashboard';


function Dashboard() {
  const orders = [
    { id: 1, title: 'Total Order', count: 1925, startColor: '#432ab1' },
    { id: 2, title: 'Total Sales', count: 450, startColor: '#e70000' },
    { id: 3, title: 'Revenue', count: 1480, startColor: '#d3b144' },
    { id: 4, title: 'Total Visitor', count: 72, startColor: '#053d26' },
  ];
  const totalRevenue = 10000;
  const revenueFilled = 10000;
  const totalSales = 5000;
  const salesFilled = 3000;
  const totalListings = 2000;
  const listingsFilled = 1000;
  const totalPendingPayments = 500;
  const paidPayments = 300;

  return (
    <>
      <p className='text-lg font-medium ms-8 mt-4 sm:mt-6'>Dashboard</p>



      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-center px-8'>
        {/* Revenue Chart */}
        <div className='bg-gradient-to-b from-[#c3e78a] to-white rounded-2xl shadow-md pt-4'>
          <PieChartComponent
            data={generatePieData(
              totalRevenue,
              revenueFilled,
              '#1D3B9C',
              '#ccc'
            )}
            title='Total Orders'
          />
        </div>

        {/* Sales Chart */}
        <div className='bg-gradient-to-b from-[#c3e78a] to-white rounded-2xl shadow-md pt-4'>
          <PieChartComponent
            data={generatePieData(totalSales, salesFilled, '#8CFF00', '#ccc')}
            title='Total Sales'
          />
        </div>

        <div className='bg-gradient-to-b from-[#c3e78a] to-white rounded-2xl shadow-md pt-4'>
          <PieChartComponent
            data={generatePieData(
              totalListings,
              listingsFilled,
              '#A71414',
              '#ccc'
            )}
            title='Revenu'
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
            title='Total Visitor'
          />
        </div>
      </div>


     
      <div className='h-[60vh] w-full lg:w-[84%] xl:w-[70%] 2xl:w-[65%] bg-white rounded-xl shadow-2xl z-50 my-5 m-auto'>
        <Chart />
      </div>
    </>
  );
}

export default Dashboard;
