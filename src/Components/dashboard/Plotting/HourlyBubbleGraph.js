import React, { useState, useEffect } from "react";
import { GenerateDataCard } from "./GenerateDataCard";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Legend,
} from "recharts";
import { Container } from "@mui/material";
import { Paper, Grid } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/system";
import Title from "../Title";

//finds out the max number of queries in a minute inside all the three arrays
const parseDomain = (a, b, c) => [
  0,
  Math.max(
    Math.max.apply(
      null,
      a.map((entry) => entry.queries)
    ),
    Math.max.apply(
      null,
      b.map((entry) => entry.queries)
    ),
    Math.max.apply(
      null,
      c.map((entry) => entry.queries)
    )
  ),
];

const renderBubbleTooltip = (props) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const data = payload[0] && payload[0].payload;

    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #999",
          margin: 0,
          padding: 10,
        }}
      >
        <p>minute #{data.minute}</p>
        <p>
          <span>No of Queries: </span>
          {data.queries}
        </p>
      </div>
    );
  }

  return null;
};

let domain = null;
let range = [0, 512];

const ScatterGenerator = (data, text_label, clickHandler) => {
  return (
    <ResponsiveContainer>
      {/*  width="90%" height="30%"  */}
      <ScatterChart
        // width={600}
        // height={120}
        margin={{
          top: 70,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      >
        <XAxis
          type="category"
          dataKey="minute"
          interval={0}
          tickLine={{ transform: "translate(0, -6)" }}
        />
        <YAxis
          type="number"
          dataKey="index"
          name={text_label}
          height={50}
          width={100}
          tick={false}
          tickLine={false}
          axisLine={false}
          label={{ value: text_label, position: "insideRight" }}
        />
        <ZAxis type="number" dataKey="queries" domain={domain} range={range} />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          wrapperStyle={{ zIndex: 100 }}
          content={renderBubbleTooltip}
        />
        <Scatter
          data={data}
          fill="#8884d8"
          onClick={(e) => {
            // console.dir(e, { depth: null });
            if (e == null || e.minute == null) return;
            console.log(parseInt(e.minute));
            clickHandler(parseInt(e.minute));
            // handleClickPassedFromParent(e.minute);
          }}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default function HourlyBubbleGraph({
  data_to_plot,
  x_axis_param,
  y_axis_param,
  title_text,
}) {
  //Hooks

  let [minuteToDisplay, setMinuteToDisplay] = useState(-1);
  let [dataToDisplay, setDataToDisplay] = useState([]);

  //effects
  // useEffect(() => {
  //   console.log(minuteToDisplay);
  //   if (minuteToDisplay >= 0)
  //     setDataToDisplay(data_to_plot[minuteToDisplay]["data"]);
  //   else setDataToDisplay([]);
  // });

  //handlers
  function getMinuteToDisplay(minute) {
    if (minute == null) return;
    if (minute == minuteToDisplay) {
      setMinuteToDisplay(-1);
      return;
    }
    setMinuteToDisplay(minute);

    if (minute >= 0) setDataToDisplay(data_to_plot[minute]["hourly_queries"]);
    else setDataToDisplay([]);
  }

  let [first_part, second_part, third_part] = [
    data_to_plot.slice(0, 20),
    data_to_plot.slice(20, 40),
    data_to_plot.slice(40, 60),
  ];
  // console.log(first_part);

  domain = parseDomain(first_part, second_part, third_part);

  //   let bubble_chart_1 = ScatterGenerator(first_part, "00:00-07:59");
  //   let bubble_chart_2 = ScatterGenerator(second_part, "08:00-15:99");
  //   let bubble_chart_3 = ScatterGenerator(third_part, "16:00-23:99");

  return (
    <>
      <div style={{}}>
        <Title>{title_text}</Title>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                width: "100%",
                height: 120,
              }}
            >
              {ScatterGenerator(first_part, "00:00-19:59", getMinuteToDisplay)}
            </Box>
            <Box sx={{ width: "100%", height: 120 }}>
              {ScatterGenerator(second_part, "20:00-39:59", getMinuteToDisplay)}
            </Box>
            <Box sx={{ width: "100%", height: 120 }}>
              {ScatterGenerator(third_part, "40:00-59:59", getMinuteToDisplay)}
            </Box>
          </Grid>
          <Grid item xs={4} xl={4} lg={4}>
            {minuteToDisplay != -1 && (
              <GenerateDataCard
                dataToDisplay={dataToDisplay}
              ></GenerateDataCard>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
}

/*
<ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText primary={element} />
                    </ListItemButton>
                  </ListItem> */
