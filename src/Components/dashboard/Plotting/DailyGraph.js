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
import { GenerateDataCard } from "./GenerateDataCard";
export default function DailyGraph({
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

  let [detailedData, setDetailedData] = useState(null);
  let [selectedIndex, setSelectedIndex] = useState(-1);

  function displayDetailsToggle(index) {
    console.log(`INDEX: ${index}, selectedIndex: ${selectedIndex}`);
    if (index == null || index >= data_to_plot.length) return;
    if (data_to_plot[index]["daily_queries"].length == 0) {
      setSelectedIndex(-1);
      return;
    }

    if (selectedIndex === -1 || selectedIndex != index) {
      //nothing has been selected yet or selection different from current selection
      setDetailedData(data_to_plot[index]);
      setSelectedIndex(index);
    }
    if (selectedIndex === index) {
      setSelectedIndex(-1);
      setDetailedData(null);
    }
  }

  let restructured_data = data_to_plot.map((d) => {
    let error_messages = d["daily_queries"].reduce(
      (accumulator, currentMessage) => {
        return currentMessage["EntityIntent_tuple"]["intents"] ==
          "message.error"
          ? accumulator + 1
          : accumulator;
      },
      0
    );

    return {
      day: d.day,
      "error messages": error_messages,
      "valid messages": d["daily_queries"].length - error_messages,
    };
  });

  let bar_chart = (
    <BarChart
      data={restructured_data}
      onClick={(e) => {
        if (e == null) return;
        console.log(e);
        displayDetailsToggle(e.activeTooltipIndex);
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={"day"} interval={interval == 0 ? null : interval} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="valid messages" stackId="a" fill="#8884d8" />
      <Bar dataKey="error messages" stackId="a" fill="red" />
    </BarChart>
  );

  console.log(bar_chart);
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "60%", height: "60vh" }}>
        <Title>{title_text}</Title>
        <ResponsiveContainer>{bar_chart}</ResponsiveContainer>
      </div>
      {selectedIndex != -1 && (
        <div style={{ width: "40%", height: "60vh" }}>
          <Title>{`Detailed View for ${selectedIndex + 1}th`}</Title>
          <GenerateDataCard dataToDisplay={detailedData["daily_queries"]} />
        </div>
      )}
      {/* {selectedIndex != -1 && (
        <div
          style={{
            backgroundColor: selectedIndex % 2 == 0 ? "red" : "green",
            height: "50px",
            width: "50px",
          }}
        ></div>
      )} */}
    </div>
  );
}
