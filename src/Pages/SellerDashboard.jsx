import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Seller Dashboard Component
const SellerDashboard = () => {
  // Data for the four metrics
  const data = [
    { name: 'Revenue', value: 5000 },
    { name: 'Total Sales', value: 3000 },
    { name: 'Listing Items', value: 200 },
    { name: 'Pending Payments', value: 1000 },
  ];

  // Define custom colors for each segment
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className='dashboard'>
      <h1 className='text-2xl font-bold mb-8'>Seller Dashboard</h1>

      {/* Four separate charts */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8'>
        {/* Pie Chart for Revenue */}
        <div className='chart-container'>
          <h2 className='text-xl font-semibold mb-4'>Revenue</h2>
          <ResponsiveContainer width='100%' height={250}>
            <PieChart>
              <Pie
                data={data}
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                outerRadius={80}
                fill='#8884d8'
                paddingAngle={5}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart for Total Sales */}
        <div className='chart-container'>
          <h2 className='text-xl font-semibold mb-4'>Total Sales</h2>
          <ResponsiveContainer width='100%' height={250}>
            <PieChart>
              <Pie
                data={data}
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                outerRadius={80}
                fill='#82ca9d'
                paddingAngle={5}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart for Listing Items */}
        <div className='chart-container'>
          <h2 className='text-xl font-semibold mb-4'>Listing Items</h2>
          <ResponsiveContainer width='100%' height={250}>
            <PieChart>
              <Pie
                data={data}
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                outerRadius={80}
                fill='#ffc658'
                paddingAngle={5}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart for Pending Payments */}
        <div className='chart-container'>
          <h2 className='text-xl font-semibold mb-4'>Pending Payments</h2>
          <ResponsiveContainer width='100%' height={250}>
            <PieChart>
              <Pie
                data={data}
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                outerRadius={80}
                fill='#ff8042'
                paddingAngle={5}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
