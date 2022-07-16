import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Loader from '../../Loader/Loader';
import NoData from '../../NoData/NoData';
import './PieChartAnalysis.css';

interface SeriesData {
  name: String;
  value: number;
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

const PieChartComponent = ({ data, COLORS }: PieChartComponentProps) => {
  const total = data.reduce((accum, obj) => {
    return accum + obj.value;
  }, 0);

  return (
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
                {`${data[index].name} ${(value / total * 100).toFixed(1)}%`}
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
  );
};

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
    <NoData className="noData center" />
  ) : (
    <ErrorMessage error={error} />
  );
};

export default PieChartAnalysis;
