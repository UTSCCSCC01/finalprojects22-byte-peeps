import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import CustomizedTooltip from './CustomizedTootip';
import CustomizedTick from './CutomizedTick';
interface ChartData {
  data: {
    date: string;
    time: string;
    objective: number;
    subjective: number;
    title?: string;
  }[];
}
export default function Chart(data: ChartData) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data.data ?? []}
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
          // interval={0}
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
        <Line type="monotone" dataKey="objective" stroke="#639f1f" />
        <Line type="monotone" dataKey="subjective" stroke="#ff6d6d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
