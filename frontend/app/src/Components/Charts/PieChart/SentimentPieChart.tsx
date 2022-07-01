import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CircularProgress } from '@mui/material';
import { Typography } from '@mui/material';

interface SentimentAnalysisData {
  name: String;
  value: Number;
}

export interface PieChartAnalysis {
  COLORS: string[];
  data: SentimentAnalysisData[];
  isLoading: Boolean;
  error: String | null;
  isDataPresent: Boolean | null;
}

const SentimentPieChart = ({
  COLORS,
  data,
  isLoading,
  error,
  isDataPresent,
}: PieChartAnalysis) => {
  return isLoading ? (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress
        style={{
          margin: 'auto',
        }}
      />
    </div>
  ) : isDataPresent ? (
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
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
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
  ) : isDataPresent !== null ? (
    <Typography variant="subtitle2" align="center" paragraph>
      No Data Present for Selected Date Range
    </Typography>
  ) : (
    <Typography variant="subtitle2" align="center" paragraph>
      {error}
    </Typography>
  );
};

export default SentimentPieChart;
