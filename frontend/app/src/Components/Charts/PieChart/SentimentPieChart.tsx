import React, { useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import {
  getCommentsSentimentAnalysis,
  selectSentimentAnalysis,
  selectError,
  selectIsSentimentAnalysisLoading,
} from '../../../Redux/Slices/facebook/facebookSlice';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import { CircularProgress } from '@mui/material';
import { Typography } from '@mui/material';

const COLORS = ['#71a6de', '#09213b', '#0088FE'];

const SentimentPieChart = () => {
  const dispatch = useAppDispatch();
  const data = [
    { name: 'Positve', value: 0 },
    { name: 'Negative', value: 0 },
    { name: 'Neutral', value: 0 },
  ];
  const error = useAppSelector(selectError);
  const isSentimentAnalysisLoading = useAppSelector(
    selectIsSentimentAnalysisLoading
  );
  const dataRetured = useAppSelector(selectSentimentAnalysis);
  data[1].value = dataRetured.negative;
  data[0].value = dataRetured.positive;
  data[2].value = dataRetured.neutral;

  useEffect(() => {
    dispatch(getCommentsSentimentAnalysis());
  }, [dispatch]);

  return isSentimentAnalysisLoading ? (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress
        style={{
          margin: 'auto',
        }}
      />
    </div>
  ) : data[0].value > 0 || data[1].value > 0 || data[2].value > 0 ? (
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

            return value != 0 ? (
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
            entry.value != 0 ? (
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
  ) : data[0].value === 0 || data[1].value === 0 || data[2].value === 0 ? (
    <Typography variant="subtitle2" align="center" paragraph>
      No Data for Sentiment Analysis
    </Typography>
  ) : (
    <Typography variant="subtitle2" align="center" paragraph>
      {error}
    </Typography>
  );
};

export default SentimentPieChart;
