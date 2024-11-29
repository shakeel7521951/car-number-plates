import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'January', price: 1200, uv: 1500 },
  { name: 'February', price: 2000, uv: 2100 },
  { name: 'March', price: 1700, uv: 2400 },
  { name: 'April', price: 2500, uv: 2700 },
  { name: 'May', price: 2200, uv: 1900 },
  { name: 'June', price: 3000, uv: 3500 },
  { name: 'July', price: 2700, uv: 2800 },
  { name: 'August', price: 3500, uv: 3000 },
  { name: 'September', price: 4000, uv: 3200 },
  { name: 'October', price: 4500, uv: 4000 },
  { name: 'November', price: 3800, uv: 3100 },
  { name: 'December', price: 4300, uv: 3700 },
];

const SellerBarChart = () => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='name'
          label={{ value: 'Months', position: 'insideBottom', offset: -5 }}
        />
        <YAxis
          label={{
            value: 'Price Range ($)',
            angle: -90,
            position: 'insideLeft',
          }}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey='price' fill='#1D3B9C' />
        <Bar dataKey='uv' fill='#8CFF00' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SellerBarChart;
