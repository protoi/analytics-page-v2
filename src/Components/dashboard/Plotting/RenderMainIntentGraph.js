import React, { Fragment, useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Title from "../Title";

export default function RenderMainIntentGraph({
  data_to_plot,
  x_axis_param,
  y_axis_param,
  title_text,
  interval = 0,
  handleClickPassedFromParent,
}) {
  console.log(data_to_plot);
  let bar_chart = (
    <BarChart
      data={data_to_plot}
      onClick={(e) => handleClickPassedFromParent(e)}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" interval={interval == 0 ? null : interval} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill={"#8884d8"} />
    </BarChart>
  );

  console.log(bar_chart);
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "60%",
          height: "60vh",
        }}
      >
        <Title>{title_text}</Title>
        <ResponsiveContainer>{bar_chart}</ResponsiveContainer>
      </div>
    </div>
  );
}
