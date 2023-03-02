import React, { useState, useEffect } from "react";
import { TagCloud } from "react-tagcloud";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Button } from "@mui/material";
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
import RenderMainIntentGraph from "./RenderMainIntentGraph";
function color_maker(hexval, offset) {
  return `#${((hexval + offset * 8 + offset * 4) % 16777216).toString(16)}`;
}
async function fetch_template_data(url, setter) {
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((d) => d.json())
    .then((d_json) => {
      console.log("_______________________");
      console.log(d_json);
      console.log("_______________________");

      return Object.keys(d_json).map((key) => {
        console.log(`${key} => ${d_json[key]}`);
        return {
          name: key,
          count: d_json[key],
        };
      });
    })
    .then((d_json_restruct) => {
      console.log(d_json_restruct);
      setter(d_json_restruct);
    })
    .catch((e) => console.log(e.message));
}

const intent_back_references = {
  INTENT: "INTENT",
  GENRE: "INTENT",
  ACTOR: "INTENT",
  MOVIE: "INTENT",
};

export function IntentContainerGrid_v2() {
  //States
  let [data, setData] = useState(null); //array
  let [stateOfGraph, setStateOfGraph] = useState("INTENT");
  let []

  let [movieData, setMovieData] = useState(null);
  let [actorData, setActorData] = useState(null);
  let [genreData, setGenreData] = useState(null);
  let [movieYearData, setMovieYearData] = useState(null);

  //Effects
  useEffect(() => {
    fetch_template_data("./datagen/actordata.json", setActorData);
    fetch_template_data("./datagen/genredata.json", setGenreData);
    fetch_template_data("./datagen/moviedata.json", setMovieData);
    fetch_template_data("./datagen/intentdata.json", setData);
  }, []);

  //click handlers
  function handleBackButtonClick() {
    setStateOfGraph(intent_back_references[stateOfGraph]);
  }

  return (
    <Container>
      <Box>
        {stateOfGraph !== "INTENT" && (
          <Button variant="contained" onClick={handleBackButtonClick}>
            Back
          </Button>
        )}
      </Box>

      <Box>
        {data && (
          <RenderMainIntentGraph
            data_to_plot={data}
            title_text={"Intent Distributions"}
            x_axis_param={"name"}
            y_axis_param={"count"}
          />
        )}
      </Box>
    </Container>
  );
}
