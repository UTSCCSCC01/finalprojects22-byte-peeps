import React from 'react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: '6/1',
    positive: 4000,
    negative: 2400,
  },
  {
    name: '6/2',
    positive: 3000,
    negative: 1398,
  },
  {
    name: '6/3',
    positive: 2000,
    negative: 9800,
  },
  {
    name: '6/4',
    positive: 2780,
    negative: 3908,
  },
  {
    name: '6/5',
    positive: 1890,
    negative: 4800,
  },
  {
    name: '6/6',
    positive: 2390,
    negative: 3800,
  },
  {
    name: '6/7',
    positive: 3490,
    negative: 4300,
  },
];

const TimeSeriesChart = () => {
  return (
    <ResponsiveContainer width="115%" height={260}>
      <LineChart
        width={800}
        height={350}
        data={data}
        margin={{
          top: 50,
          right: 50,
          left: 20,
          bottom: 20,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis
          dataKey="name"
          label={{ value: 'Date and time', position: 'outsideRight', dy: 20 }}
        />
        <YAxis
          label={{
            value: 'percentage',
            position: 'insideLeft',
            dy: -120,
          }}
        />
        <Tooltip />
        <Legend layout="vertical" verticalAlign="top" align="right" />
        <Line type="monotone" dataKey="positive" stroke="#006400" />
        <Line type="monotone" dataKey="negative" stroke="#8b0000" />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default TimeSeriesChart;
