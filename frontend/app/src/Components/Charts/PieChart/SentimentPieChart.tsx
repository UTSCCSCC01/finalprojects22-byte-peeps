import React, { useEffect } from 'react'
import { ResponsiveContainer, PieChart, Pie, Legend, Cell } from "recharts";
import { getCommentsSentimentAnalysis, selectSentimentAnalysis, selectError } from "../../../Redux/Slices/facebook/facebookSlice";
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';

// const data = [
//   { name: "Positive", value: 400 },
//   { name: "Negative", value: 300 },
// ];

const COLORS = ["#71a6de", "#09213b", "#0088FE"];


const SentimentPieChart = () => {
  const dispatch = useAppDispatch();
  const data = [
    { name: 'Positve', value: 0 },
    { name: 'Negative', value: 0 },
    { name: 'Neutral', value: 0 }
  ]
  const error = useAppSelector(selectError);
  const dataRetured = useAppSelector(selectSentimentAnalysis);
  console.log("Assigning datareturned", dataRetured)
  console.log("Assigning", dataRetured.positive)
  data[1].value = dataRetured.negative;
  data[0].value = dataRetured.positive;
  data[2].value = dataRetured.neutral;

  useEffect(() => {
    dispatch(getCommentsSentimentAnalysis());
    console.log("dispatch get")
  }, [dispatch])


  return (
    error ? 
    <h2>{error}</h2> :
     data[0].value === 0 && data[1].value === 0 && data[2].value === 0 ?
      <h1>No Data</h1> :
      <ResponsiveContainer width="95%" height={260}>
        <PieChart>
          {console.log(data)}
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
                    x={x}
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