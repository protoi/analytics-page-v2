import React, { Fragment, useState } from "react";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Title from "../Title";

export default function DetailedGraph({
  data_to_plot,
  key_to_isolate,
  actual_data,
  x_axis_param_actual,
  x_axis_param_error,
  y_axis_param,
  title_text,
  interval = 0,
  handleClickPassedFromParent,
}) {
  console.log(data_to_plot);

  let bar_chart = <></>;

  console.log(bar_chart);
  return (
    <div style={{ width: "100%", height: "60vh" }}>
      <Title>{title_text}</Title>

      <ResponsiveContainer>{bar_chart}</ResponsiveContainer>
    </div>
  );
}
