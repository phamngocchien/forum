import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

interface ILineChartUI {
  data: [];
}
export default function LineChartUI({ data }: ILineChartUI) {
  return (
    <LineChart
      width={1100}
      height={480}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="share"
        stroke="#116466"
        activeDot={{ r: 6 }}
      />
      <Line
        type="monotone"
        dataKey="question"
        stroke="#D9B08C"
        activeDot={{ r: 6 }}
      />
      <Line
        type="monotone"
        dataKey="job"
        stroke="#FFCB9A"
        activeDot={{ r: 6 }}
      />
      <Line
        type="monotone"
        dataKey="notification"
        stroke="#D1E8E2"
        activeDot={{ r: 6 }}
      />
    </LineChart>
  );
}
