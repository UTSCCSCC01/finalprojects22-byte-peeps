import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CircularProgress } from '@mui/material';
import { Typography } from '@mui/material';

interface SeriesData {
  name: String;
  value: Number;
}

export interface PieChartAnalysisProps {
  COLORS: string[];
  data: SeriesData[];
  isLoading: Boolean;
  error: String | null;
  isDataPresent: Boolean | null;
}

interface PieChartComponentProps {
  data: SeriesData[];
  COLORS: string[];
}

interface ErrorMessageProps {
  error: String | null;
}

const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <CircularProgress
      style={{
        margin: 'auto',
      }}
    />
  </div>
);

const PieChartComponent = ({ data, COLORS }: PieChartComponentProps) => (
  <ResponsiveContainer width="95%" height={260}>
    <PieChart>
      <Pie
        dataKey="value"
        data={data}
        label={({
          cx,
          cy,
          midAngle,
          innerRadius,
          outerRadius,
          value,
          index,
        }) => {
          const RADIAN = Math.PI / 180;
          const radius = 25 + innerRadius + (outerRadius - innerRadius);
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          const y = cy + radius * Math.sin(-midAngle * RADIAN);

          return value !== 0 ? (
            <text
              style={{ fontSize: '0.6rem' }}
              x={x}
              y={y}
              fill={COLORS[index]}
              textAnchor={x > cx ? 'start' : 'end'}
              dominantBaseline="central"
            >
              {`${data[index].name} (${value})`}
            </text>
          ) : null;
        }}
      >
        {data.map((entry, index) =>
          entry.value !== 0 ? (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ) : (
            <Cell
              display="none"
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          )
        )}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
);

const ErrorMessage = (message: ErrorMessageProps) => (
  <Typography variant="subtitle2" align="center" paragraph>
    {message.error}
  </Typography>
);

const PieChartAnalysis = ({
  COLORS,
  data,
  isLoading,
  error,
  isDataPresent,
}: PieChartAnalysisProps) => {
  return isLoading ? (
    <Loader />
  ) : isDataPresent ? (
    <PieChartComponent data={data} COLORS={COLORS} />
  ) : !isDataPresent && error === null ? (
    <ErrorMessage error="No Data Present for Selected Date Range" />
  ) : (
    <ErrorMessage error={error} />
  );
};

export default PieChartAnalysis;
