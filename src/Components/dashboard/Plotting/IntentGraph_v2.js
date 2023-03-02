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
import {
  RenderActorDataTable,
  RenderGenreDataTable,
  RenderMovieDataTable,
} from "./RenderSecondaryIntentGraph";
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

      return Object.keys(d_json).map((key, index) => {
        // console.log(`${key} => ${d_json[key]}`);
        return {
          id: index,
          name: key,
          count: d_json[key],
        };
      });
    })
    .then((d_json_restruct) => {
      setter(d_json_restruct);
    })
    .catch((e) => console.log(e.message));
}

const intent_back_references = {
  ERROR: "INTENT",
  ACTOR: "INTENT",
  GENRE: "INTENT",
  GREETINGS: "INTENT",
  MOVIE_YEAR: "INTENT",
  MOVIE: "INTENT",
  PLOT: "INTENT",
};
const intent_mappings = {
  error: "ERROR",
  get_actor: "ACTOR",
  get_genre: "GENRE",
  greetings: "GREETINGS",
  get_movie_year: "MOVIE_YEAR",
  get_movie: "MOVIE",
  get_plot: "PLOT",
};
export function IntentContainerGrid_v2() {
  //States
  let [data, setData] = useState(null); //array
  let [stateOfGraph, setStateOfGraph] = useState("INTENT");

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
  function handleIntentSelectionClick(e) {
    e = e.activeLabel.substring(8);
    setStateOfGraph(intent_mappings[e]);
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
        {data && stateOfGraph === "INTENT" && (
          <RenderMainIntentGraph
            data_to_plot={data}
            title_text={"Intent Distributions"}
            x_axis_param={"name"}
            y_axis_param={"count"}
            handleClickPassedFromParent={handleIntentSelectionClick}
          />
        )}

        {actorData && stateOfGraph === "ACTOR" && (
          <RenderActorDataTable
            data_to_plot={actorData}
            title_text={"Actor Searches"}
            x_axis_param={"name"}
            y_axis_param={"count"}
            handleClickPassedFromParent={handleIntentSelectionClick}
          />
        )}
        {movieData && stateOfGraph === "MOVIE" && (
          <RenderMovieDataTable
            data_to_plot={movieData}
            title_text={"Movie Searches"}
            x_axis_param={"name"}
            y_axis_param={"count"}
            handleClickPassedFromParent={handleIntentSelectionClick}
          />
        )}
        {genreData && stateOfGraph === "GENRE" && (
          <RenderGenreDataTable
            data_to_plot={genreData}
            title_text={"Genre Searches"}
            x_axis_param={"name"}
            y_axis_param={"count"}
            handleClickPassedFromParent={handleIntentSelectionClick}
          />
        )}
      </Box>
    </Container>
  );
}
