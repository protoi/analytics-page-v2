import React, { Fragment, useState } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Title from "../Title";

export default function MonthlyGraph({
  data_to_plot,
  x_axis_param,
  y_axis_param,
  title_text,
  interval = 0,
  handleClickPassedFromParent,
}) {
  console.log(data_to_plot);

  let area_chart = (
    <AreaChart
      data={data_to_plot}
      onClick={(e) => {
        if (e == null) return;
        console.log(e);
        handleClickPassedFromParent(e.activeTooltipIndex);
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey={x_axis_param}
        interval={interval == 0 ? null : interval}
      />
      <YAxis   />
      <Tooltip />
      <Area
        type="monotone"
        dataKey={y_axis_param}
        stroke="#8884d8"
        fill="#8884d8"
        activeDot={{ r: 10 }}
      />
    </AreaChart>
  );

  console.log(area_chart);
  return (
    <div style={{ width: "100%", height: "60vh" }}>
      <Title>{title_text}</Title>

      <ResponsiveContainer>{area_chart}</ResponsiveContainer>
    </div>
  );
}
