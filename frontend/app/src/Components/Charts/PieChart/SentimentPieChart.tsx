import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Legend, Cell } from "recharts";

const data = [
  { name: "Positive", value: 400 },
  { name: "Negative", value: 300 },
];

const COLORS = ["#71a6de", "#09213b"];


const SentimentPieChart = () => {
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
              index
            }) => {
              const RADIAN = Math.PI / 180;
              const radius = 25 + innerRadius + (outerRadius - innerRadius);
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                  <text
                    style={{fontSize: '0.6rem'}}
                    x={data[index].name === "Positive" ? x + 35 : x - 37}
                    y={y}
                    fill={COLORS[index]}
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                  >
                    {data[index].name} ({value})
                  </text>
              );
            }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
  )
}

export default SentimentPieChart