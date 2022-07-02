import React from 'react';
import './styles.css';
import { useState } from 'react';
import { useQuery } from 'react-query';
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
import { is } from 'immer/dist/internal';
import { elementAcceptingRef } from '@mui/utils';

interface TimeSeriesProps {
  startDateTime: string;
  endDateTime: string;
  dataLoader: (
    startDataTime: string,
    endDataTime: string
  ) => Promise<{
    data: {
      date: string;
      time: string;
      positive: number;
      negative: number;
      neutral: number;
    }[];
  }>;
}
export default function TimeSeriesChart(props: TimeSeriesProps) {
  const [startDateTime, setPage] = useState(props.startDateTime);
  const [endDateTime, setPageSize] = useState(props.endDateTime);
  const { data, isLoading, isSuccess } = useQuery(
    [startDateTime, endDateTime],
    () => props.dataLoader(startDateTime, endDateTime).then((x) => x.data)
  );
  console.log(data);
  // custom tooltip component
  function CustomizedTooltip(props: { [key: string]: any }) {
    const { payload, label } = props;

    if (payload.length !== 0) {
      return (
        <div className="tooltiptext">
          <span>Time: {payload[0].payload.time}</span>
          <br />
          {payload[0].payload.title !== undefined && (
            <span>Title: {payload[0].payload.title}</span>
          )}
        </div>
      );
    }
  }
  // custom tick component
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

  return isSuccess ? (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={
          data ?? [
            {
              date: '8/20/2019',
              time: '16:04:57',
              positive: 50,
              negative: 50,
              neutral: 0,
            },
            {
              date: '8/30/2019',
              time: '23:04:56',
              positive: 50,
              negative: 25,
              neutral: 25,
            },
          ]
        }
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
            dy: -150,
          }}
        />
        <Tooltip content={CustomizedTooltip} />
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
  ) : (
    <div>No data</div>
  );
}
