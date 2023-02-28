import { Container, Grid, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { ButtonGroup } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TimeGraph from "./TimeGraph";
import MonthlyGraph from "./MonthlyGraph";
import DailyGraph from "./DailyGraph";
import DetailedGraph from "./DetailedGraph";
import HourlyBubbleGraph from "./HourlyBubbleGraph";

import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";

const jump_mapping = { MONTHLY: null, DAILY: "MONTHLY", DETAILED: "DAILY" };

function extract_minute_from_date(time_data) {
  return parseInt(time_data.substring(14, 16));
}

function group_data_by_hour(hourly_data) {
  let minutes = [];
  for (let i = 0; i < 60; ++i)
    minutes.push({ minute: i, queries: 0, hourly_queries: [], index: 1 });

  hourly_data.forEach((element) => {
    let minute = extract_minute_from_date(element["timestamp"]);
    minutes[minute].queries += 1;
    minutes[minute].hourly_queries.push({
      timestamp: element.timestamp,
      genre: element.data.entity.genre,
      actor: element.data.entity.actor,
      daterange: element.data.entity.daterange,
      moviename: element.data.entity.moviename,
      intent: element.data.intent,
      actual_message: element.data.Actual_Message,
      response_message: element.data.Response_Message,
    });
  });

  console.log("minutes: ");
  console.log(minutes);

  return minutes;
}

function DatePicker({ dateSelected, setDateSelected, handleChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label="Date desktop"
        inputFormat="YYYY/MM/DD"
        value={dateSelected}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

export function GraphContainer() {
  let [data, setData] = useState(null);
  let [dateSelected, setDateSelected] = useState(new Date());
  let [weeklyGraphClickedIndex, setWeeklyGraphClickedIndex] = useState(null);
  let [dailyGraphClickedIndex, setDailyGraphClickedIndex] = useState(null);
  let [stateOfGraph, setStateOfGraph] = useState("MONTHLY");

  let [MONTHLYGraphClickedIndex, setMONTHLYGraphClickedIndex] = useState(null);
  let [DAILYGraphClickedIndex, setDAILYGraphClickedIndex] = useState(null);
  let [DETAILEDGraphClickedIndex, setDETAILEDGraphClickedIndex] =
    useState(null);

  // Effects
  useEffect(() => {
    let yyyy_mm_dd_Date_string = dayjs(dateSelected).format("YYYY/MM/DD");
    async function fetch_JSON_data() {
      fetch("./datagen/sample_data.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((response_json) => {
          console.log(response_json);
          setData(response_json);
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
    /* axios
      .get(
        `https://movie-bot-backend-mkh6s9erg-ghutoon.vercel.app/query/group_queries_by_date_week?date=${yyyy_mm_dd_Date_string}`
      )
      .then((res) => {
        console.dir(res, { depth: null });
        setData(res.data);
        return res;
      })
      .catch((err) => {
        console.log(err.message);
      }); */
    fetch_JSON_data();
  }, [dateSelected]);

  function handleWeeklyGraphClickedIndex(index) {
    console.log(`clicked index on the weekly graph was: ${index}`);
    setWeeklyGraphClickedIndex(index);
    if (
      data[index]["daily_queries"] != null &&
      data[index]["daily_queries"].length > 0
    ) {
      setStateOfGraph("daily");
    }
  }
  function handleDailyGraphClickedIndex(index) {
    console.log(`clicked index on the daily graph was: ${index}`);
    setDailyGraphClickedIndex(index);
    if (
      data[weeklyGraphClickedIndex]["daily_queries"][index]["hourly_queries"] !=
        null &&
      data[weeklyGraphClickedIndex]["daily_queries"][index]["hourly_queries"]
        .length > 0
    ) {
      setStateOfGraph("hourly");
    }
  }
  function handleBackButtonClick() {
    let previousStateOfGraph = jump_mapping[stateOfGraph];
    if (previousStateOfGraph == null) return;
    setStateOfGraph(previousStateOfGraph);
  }
  const handleDatePicked = (newDateSelected) => {
    console.log(newDateSelected);
    setDateSelected(newDateSelected);
  };

  function handleMONTHLYGraphClickedIndex(index) {
    console.log(`clicked index on the MONTHLY graph was: ${index}`);
    // setDailyGraphClickedIndex(index);
    setMONTHLYGraphClickedIndex(index);
    if (
      data[index]["monthly_queries"] != null &&
      data[index]["monthly_queries"].length > 0
    ) {
      setStateOfGraph("DAILY");
    }
  }

  function handleDAILYGraphClickedIndex(index) {
    console.log(`clicked index on the DAILY graph was: ${index}`);
    // setDailyGraphClickedIndex(index);
    setDAILYGraphClickedIndex(index);
    if (
      data[MONTHLYGraphClickedIndex]["monthly_queries"][index][
        "daily_queries"
      ] != null &&
      data[MONTHLYGraphClickedIndex]["monthly_queries"][index]["daily_queries"]
        .length > 0
    ) {
      setStateOfGraph("DETAILED");
    }
  }

  return (
    <Container>
      <Box>
        {stateOfGraph !== "weekly" && (
          <Button variant="contained" onClick={handleBackButtonClick}>
            Back
          </Button>
        )}
        {stateOfGraph === "weekly" && (
          <DatePicker
            dateSelected={dateSelected}
            setDateSelected={setDateSelected}
            handleChange={handleDatePicked}
          ></DatePicker>
        )}
      </Box>

      <Box>
        {stateOfGraph === "MONTHLY" && (
          <MonthlyGraph
            data_to_plot={data}
            x_axis_param={"month"}
            y_axis_param={"monthly_query_count"}
            title_text={"Monthly Queries"}
            handleClickPassedFromParent={handleMONTHLYGraphClickedIndex}
          />
        )}

        {stateOfGraph === "DAILY" && (
          <DailyGraph
            data_to_plot={data[MONTHLYGraphClickedIndex]["monthly_queries"]}
            key_to_isolate={"message.error"}
            actual_data={"daily_queries"}
            x_axis_param_actual={"non-error"}
            x_axis_param_error={"error"}
            y_axis_param={"daily_query_count"}
            title_text={"Daily Queries"}
            handleClickPassedFromParent={handleDAILYGraphClickedIndex}
          />
        )}

        {stateOfGraph === "DETAILED" && (
          <DetailedGraph
            data_to_plot={
              data[MONTHLYGraphClickedIndex]["monthly_queries"][
                DAILYGraphClickedIndex
              ]["daily_queries"]
            }
            title_text={"Detailed Queries"}
            handleClickPassedFromParent={null}
          />
        )}
      </Box>
    </Container>
  );
  /* return (
    <>
      <Container maxWidth="lg" style={{ backgroundColor: "salmon" }}>
        <p>Hello world</p>
        <p>Test 123</p>
      </Container>
    </>
  ); */
}

export function GraphContainerGrid() {
  return (
    <>
      {/* <Grid item xs={12} md={12} lg={12}> */}
      {/* <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            outline: "1px solid red",
          }}
        > */}
      <GraphContainer />
      {/* </Paper> */}
      {/* </Grid> */}
    </>
  );
}
