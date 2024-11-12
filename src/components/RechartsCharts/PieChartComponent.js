import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Label } from 'recharts';

const PieChartComponent = ({
  data,
  title,
  chartWidth = 400,
  chartHeight = 400,
  innerRadius = 60,
  outerRadius = 80,
}) => {
  // Calculate the total value
  const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);

  // Get the filled value (the first data item in this case)
  const filledValue = data[0]?.value || 0; // Assuming the first value is the filled value

  return (
    <div
      className='chart-container'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h2 className='text-xl font-semibold '>{title}</h2>
      <ResponsiveContainer width='100%' height={250}>
        <PieChart width={chartWidth} height={chartHeight}>
          <Pie
            data={data}
            cx='50%' // Center the chart horizontally
            cy='50%' // Center the chart vertically
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            dataKey='value'
            fill={(entry) => entry.fill} // Apply fill based on the color
            startAngle={90} // Start the pie from the top
            endAngle={450} // End the pie at the top again
          >
            {/* Display the total value and the actual filled value in the center */}
            <Label
              position='center'
              content={
                <text
                  x='50%' // Ensure the text is centered horizontally
                  y='50%' // Ensure the text is centered vertically
                  style={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    fill: '#000',
                    textAnchor: 'middle', // Center text horizontally
                    dominantBaseline: 'middle', // Center text vertically
                  }}
                >
                  {filledValue}/{totalValue} {/* Showing actual/total */}
                </text>
              }
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
