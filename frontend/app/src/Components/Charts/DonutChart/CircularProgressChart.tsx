import React from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import './CircularProgressChart.css';
import 'react-circular-progressbar/dist/styles.css';

interface ProgressChartProps {
  percentage: number;
  appName: string;
}

const CircularProgressChart = ({ percentage, appName }: ProgressChartProps) => {
  return (
    <div className="wrapper">
      <div style={{ width: '38%' }}>
        <CircularProgressbar
          value={percentage}
          text={percentage === 0 ? 'N/A' : `${percentage}%`}
          background
          backgroundPadding={6}
          styles={buildStyles({
            backgroundColor: '#3e98c7',
            textColor: '#fff',
            pathColor: '#fff',
            trailColor: 'transparent',
          })}
        />
      </div>
      <div style={{ padding: '0.6rem' }}>{`${appName}`}</div>
    </div>
  );
};

export default CircularProgressChart;
