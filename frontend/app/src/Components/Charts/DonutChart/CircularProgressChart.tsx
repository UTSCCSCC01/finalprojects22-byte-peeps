import React from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import './CircularProgressChart.css';
import 'react-circular-progressbar/dist/styles.css';

interface props {
  percentage: number;
  appName: string;
}

const CircularProgressChart = ({ percentage, appName }: props) => {
  // const percentage = percentage;

  return (
    <div className="wrapper">
      <div style={{ width: '28%' }}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textColor: 'black',
            pathColor: '#6dd5ed',
            trailColor: 'gray',
          })}
        />
      </div>
      <div style={{ padding: '0.6rem' }}>{`${appName}`}</div>
    </div>
  );
};

export default CircularProgressChart;
