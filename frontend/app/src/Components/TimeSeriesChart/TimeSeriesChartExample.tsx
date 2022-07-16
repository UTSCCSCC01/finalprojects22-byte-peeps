import React from 'react';
import './TimeSeriesChart.css';
import Chart from './InnerComponents/Chart';

const TimeSeriesChart = () => {
  return <Chart data={data} />;
};

export default TimeSeriesChart;
const data = [
  {
    date: '06/01',
    time: '13:00',
    title: 'youtube1',
    positive: 45,
    negative: 5,
    neutral: 50,
  },
  {
    date: '06/02',
    time: '14:00',
    title: 'youtube2',
    positive: 30,
    negative: 10,
    neutral: 60,
  },
  {
    date: '06/03',
    time: '15:00',
    title: 'youtube3',
    positive: 40,
    negative: 10,
    neutral: 50,
  },
  {
    date: '06/04',
    time: '16:00',
    title: 'youtube4',
    positive: 60,
    negative: 10,
    neutral: 30,
  },
  {
    date: '06/05',
    time: '17:00',
    title: 'youtube5',
    positive: 70,
    negative: 20,
    neutral: 10,
  },
  {
    date: '06/06',
    time: '18:00',
    title: 'youtube6',
    positive: 60,
    negative: 20,
    neutral: 20,
  },
  {
    date: '06/09',
    time: '19:00',

    positive: 90,
    negative: 5,
    neutral: 5,
  },
];
