import React from 'react';
import './styles.css';
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

const TimeSeriesChart = () => {
  function renderTooltip(props: { [key: string]: any }) {
    const { payload, label } = props;

    if (payload.length != 0) {
      return (
        <div className="tooltiptext">
          <span>Time: {payload[0].payload.time}</span>
          <br />
          {payload[0].payload.title != undefined && (
            <span>Title: {payload[0].payload.title}</span>
          )}
        </div>
      );
    }
  }
  function CustomizedTick(props: { [key: string]: any }) {
    const { x, y, stroke, payload } = props;
    const tspans: string[] = payload.value.split(' ');
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} fill="#666">
          {tspans.map((element, i) => {
            return (
              <tspan textAnchor="middle" x="0" dy="15" key={i}>
                {element}
              </tspan>
            );
          })}
        </text>
      </g>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart
        data={data}
        margin={{
          top: 70,
          right: 50,
          left: 5,
          bottom: 0,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis
          dataKey="date"
          angle={-65}
          dy={20}
          interval={0}
          tick={<CustomizedTick />}
          label={{
            value: 'Date and time',
            position: 'outsideRight',
            dx: 70,
            dy: 50,
          }}
        />
        <YAxis
          label={{
            value: 'percentage%',
            position: 'insideLeft',
            dy: -100,
          }}
        />
        <Tooltip content={renderTooltip} />
        <Legend
          layout="vertical"
          // verticalAlign="top"
          // align="right"
          wrapperStyle={{ top: 0, right: 0 }}
        />
        <Line type="monotone" dataKey="positive" stroke="#639f1f" />
        <Line type="monotone" dataKey="neutral" stroke="#1876d2" />
        <Line type="monotone" dataKey="negative" stroke="#ff6d6d" />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default TimeSeriesChart;
