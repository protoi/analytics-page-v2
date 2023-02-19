import React, { useState, useEffect } from "react";
import { TagCloud } from "react-tagcloud";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

import { Tooltip as ReactTooltip } from "react-tooltip";

import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
  // Legend,
} from "recharts";
import { Grid, Container, Paper } from "@mui/material";
import Title from "../Title";
function color_maker(hexval, offset) {
  return `#${((hexval + offset * 8 + offset * 4) % 16777216).toString(16)}`;
}


export function IntentContainerGrid() {
  //States
  let [data, setData] = useState(null); //array
  let [intentComponentToRender, setIntentComponentToRender] = useState(null);
  let [secondaryComponent, setSecondaryComponent] = useState(null);

  let [movieData, setMovieData] = useState(null);
  let [actorData, setActorData] = useState(null);
  let [genreData, setGenreData] = useState(null);
  let [movieYearData, setMovieYearData] = useState(null);

  //Effects
  useEffect(() => {
    axios
      .get(
        `https://movie-bot-backend-mkh6s9erg-ghutoon.vercel.app/query/group_documents_by_intents`
      )
      .then((res) => {
        let restructured_data = res.data.map((d) => {
          if (d._id === null) return;
          if (d._id === "message.greetings")
            return { intent: "greetings", count: d.count };
          let extracted_list = d._id.split("get_");
          if (extracted_list.length < 2) return;
          return { intent: extracted_list[1], count: d.count };
        });
        restructured_data.sort((a, b) => (a.count < b.count ? 1 : -1));
        setData(restructured_data);
        console.log(restructured_data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    axios
      .get(
        "https://movie-bot-backend-mkh6s9erg-ghutoon.vercel.app/query/get_movie_frequencies"
      )
      .then((res) => {
        setMovieData(
          Object.keys(res.data).map((m, index) => {
            return { name: m, count: res.data[m], id: index };
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
    /*
    axios
      .get()
      .then((res) => setMovieYearData(res.data))
      .catch((err) => {
        console.log(err.message);
      });
*/
    axios
      .get(
        "https://movie-bot-backend-mkh6s9erg-ghutoon.vercel.app/query/get_actor_frequencies"
      )
      .then((res) =>
        setActorData(
          Object.keys(res.data).map((m, index) => {
            return { name: m, count: res.data[m], id: index };
          })
        )
      )
      .catch((err) => {
        console.log(err.message);
      });

    axios
      .get(
        "https://movie-bot-backend-mkh6s9erg-ghutoon.vercel.app/query/get_genre_frequencies"
      )
      .then((res) =>
        setGenreData(
          Object.keys(res.data).map((m) => {
            return { name: m, count: res.data[m] };
          })
        )
      )
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  //Intent setters

  function handleIntentSelection(intentClicked) {
    console.log(intentClicked);
    let tempIntent = null;
    //this one is a number
    if (intentClicked >= data.length && intentClicked < 0) return;

    if (intentComponentToRender === null) {
      setIntentComponentToRender(data[intentClicked].intent);
    }
    tempIntent =
      intentComponentToRender === data[intentClicked].intent
        ? null
        : data[intentClicked].intent;
    setIntentComponentToRender(tempIntent); //deactivate if same intent clicked else set it to newly clicked intent graph
  }

  return (
    <>
      <Grid item xs={12} md={12} lg={6} xl={6}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            aspectRatio: "1",
          }}
        >
          <MainIntentBarChart
            data={data}
            handleIntentSelection={handleIntentSelection}
            graph_title={"Intent Distribution"}
            x_param={"intent"}
            y_param={"count"}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={12} lg={6} xl={6}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            aspectRatio: "1",
          }}
        >
          <SecondaryCharts
            data={
              {
                movie: movieData,
                actor: actorData,
                movie_year: movieYearData,
                greetings: null,
                genre: genreData,
              }[intentComponentToRender]
            }
            intentComponentToRender={intentComponentToRender}
          />
        </Paper>
      </Grid>
    </>
  );
}

function MainIntentBarChart({
  data,
  handleIntentSelection,
  graph_title,
  x_param,
  y_param,
}) {
  return GenerateBarChart(
    handleIntentSelection,
    data,
    graph_title,
    x_param,
    y_param
  );
}

function GenerateBarChart(
  someEvent,
  graphData,
  title_text,
  x_axis_key,
  y_axis_key
) {
  if (graphData === null) return <></>;
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Title>{title_text}</Title>
      <ResponsiveContainer>
        <BarChart
          data={graphData}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 100,
          }}
          onClick={(e) => {
            if (e == null || someEvent == null) return;
            someEvent(e.activeTooltipIndex);
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={x_axis_key} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={y_axis_key} fill="salmon">
            {graphData.map((entry, index) => {
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={color_maker(0xffaaff, (index + 1) * 4)}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function GeneratePieChart({ graphData, title_text, dataKey }) {
  console.log(graphData);
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Title>{title_text}</Title>
      <ResponsiveContainer>
        <PieChart width={500} height={500}>
          <Pie
            dataKey={dataKey}
            isAnimationActive={false}
            data={graphData}
            cx={250}
            cy={250}
            outerRadius={200}
            fill="salmon"
            label
          >
            {graphData.map((entry, index) => {
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={color_maker(0x888888, (index + 1) * 4)}
                />
              );
            })}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function GenerateDataGrid({ graphData, title_text, name_param, count_param }) {
  const column = [
    { field: name_param, width: 200, headerName: "Name" },
    { field: count_param, width: 200, headerName: "Searches", type: "number" },
  ];

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Title>{title_text}</Title>
      <DataGrid rows={graphData} columns={column} />
    </div>
  );
}

function SecondaryCharts({ data, intentComponentToRender }) {
  switch (intentComponentToRender) {
    case "genre":
      return (
        <GeneratePieChart
          graphData={data}
          title_text={"Genre Distribution"}
          dataKey={"count"}
        />
      );

    case "actor":
      return (
        <GenerateDataGrid
          graphData={data}
          title_text={"Actor Distribution"}
          name_param={"name"}
          count_param={"count"}
        />
      );

    case "movie":
      return (
        <GenerateDataGrid
          graphData={data}
          title_text={"Movie Distribution"}
          name_param={"name"}
          count_param={"count"}
        />
      );

    case "movie_year":
      return GenerateBarChart(
        null,
        data,
        "Yearly Distributio",
        "name",
        "count"
      );

    default:
      return <></>;
  }
}

/*
const express = require("express");
const query_router = express.Router();
const query_controllers = require("../Controllers/query.controllers");

query_router.get(
  "/query/get_documents_by_intents",
  query_controllers.get_document_on_the_basis_of_intents
);
query_router.get(
  "/query/group_documents_by_intents",
  query_controllers.group_documents_by_intent
);
//query_router.get("/query",query_controllers.get_documents_within_given_time_frame)
query_router.get(
  "/query/group_queries_by_date_week",
  query_controllers.group_queries_by_date_week
);
query_router.get(
  "/query/get_genre_frequencies",
  query_controllers.get_genre_frequencies
);
query_router.get(
  "/query/get_actor_frequencies",
  query_controllers.get_actor_frequencies
);

query_router.get(
  "/query/get_movie_frequencies",
  query_controllers.get_movie_frequencies
);

module.exports = { query_router };
 */
