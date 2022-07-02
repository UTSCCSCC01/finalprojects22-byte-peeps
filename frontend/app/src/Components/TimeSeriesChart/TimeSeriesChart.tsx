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

import CustomizedTooltip from './InnerComponents/CustomizedTootip';
import CustomizedTick from './InnerComponents/CutomizedTick';
import Chart from './InnerComponents/Chart';

interface TimeSeriesProps {
  startDateTime: string;
  endDateTime: string;
  dataLoader: (
    startDataTime: string,
    endDataTime: string
  ) => Promise<{
    data: any;
  }>;
}
export default function TimeSeriesChart(props: TimeSeriesProps) {
  const { data, isLoading, isSuccess } = useQuery(
    [props.startDateTime, props.endDateTime],
    () =>
      props
        .dataLoader(props.startDateTime, props.endDateTime)
        .then((x) => x.data)
  );

  return isSuccess ? <Chart data={data.data} /> : <div>Failed to load</div>;
}
