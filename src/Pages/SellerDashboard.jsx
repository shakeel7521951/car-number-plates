import React from 'react';
import PieChartComponent from '../components/RechartsCharts/PieChartComponent';
import SellerBarChart from '../components/RechartsCharts/SellerBarChart';
import SellerDataCards from '../components/SellerDashboard/SellerDataCards';
import { useSelector } from 'react-redux';
export const generatePieData = (total, filled, colorFilled, colorRemaining) => {
  return [
    { name: 'Filled', value: filled, fill: colorFilled },
    { name: 'Remaining', value: total - filled, fill: colorRemaining },
  ];
};

const SellerDashboard = () => {
  const { language } = useSelector((state) => state.language);
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
      <h1 className='text-2xl font-bold mb-8 ml-12'>
        {language === 'eng' ? 'Seller Dashboard' : 'لوحة تحكم البائع'}
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-center px-8'>
        {/* Revenue Chart */}
        <div className='bg-white rounded-2xl shadow-md pt-4'>
          <PieChartComponent
            data={generatePieData(
              totalRevenue,
              revenueFilled,
              '#1D3B9C',
              '#ccc'
            )}
            title={`${language === 'eng' ? 'Revenue' : 'ربح'}`}
          />
        </div>

        {/* Sales Chart */}
        <div className='bg-white rounded-2xl shadow-md pt-4'>
          <PieChartComponent
            data={generatePieData(totalSales, salesFilled, '#8CFF00', '#ccc')}
            title={language === 'eng' ? 'Sales' : 'مبيعات'}
          />
        </div>

        <div className='bg-white rounded-2xl shadow-md pt-4'>
          <PieChartComponent
            data={generatePieData(
              totalListings,
              listingsFilled,
              '#A71414',
              '#ccc'
            )}
            title={language === 'eng' ? 'Listings' : 'القوائم'}
          />
        </div>

        <div className='bg-white rounded-2xl shadow-md pt-4'>
          <PieChartComponent
            data={generatePieData(
              totalPendingPayments,
              paidPayments,
              '#98B5DE',
              '#ccc'
            )}
            title={
              language === 'eng' ? 'Pending Payments' : 'المدفوعات المعلقة'
            }
          />
        </div>
      </div>
      <div className='max-w-[95vw]  mx-auto mt-12 bg-white p-2 rounded-2xl '>
        <h1 className='text-center text-xl font-semibold my-6'>
          {language === 'eng' ? 'Revenue & Sales' : 'الإيرادات والمبيعات'}
        </h1>
        <SellerBarChart />
      </div>
      <main>
        <SellerDataCards />
      </main>
    </>
  );
};

export default SellerDashboard;
