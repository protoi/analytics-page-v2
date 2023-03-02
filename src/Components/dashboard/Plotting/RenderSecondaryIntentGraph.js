import React, { Fragment, useState } from "react";
import { Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
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

const actor_columns = [
  { field: "name", headerName: "Name", flex: 1.5 },
  {
    field: "count",
    headerName: "Searches",
    flex: 0.5,
    type: "number",
  },
];
const genre_columns = [
  { field: "name", headerName: "Genre", flex: 1.5 },
  {
    field: "count",
    headerName: "Searches",
    flex: 0.5,
    type: "number",
  },
];
const movie_columns = [
  { field: "name", headerName: "Movie", flex: 1.5 },
  {
    field: "count",
    headerName: "Searches",
    flex: 0.5,
    type: "number",
  },
];

export function RenderActorDataTable({
  data_to_plot,
  x_axis_param,
  y_axis_param,
  title_text,
  interval = 0,
  handleClickPassedFromParent,
}) {
  const [detailsToRender, setDetailsToRender] = useState(null);
  const [keyToRender, setKeyToRender] = useState(null);

  function fetch_detailed_data(key) {
    return "hello world";
  }

  function handleActorRowClick(e) {
    console.log(e?.row?.name);
    if (e === null || e.row === null) {
      setKeyToRender(null);
      setDetailsToRender(null);
      return;
    }
    let lookup_key = e.row.name;
    if (lookup_key === keyToRender) {
      setKeyToRender(null);
      setDetailsToRender(null);
    } else {
      setKeyToRender(lookup_key);
      setDetailsToRender(fetch_detailed_data(lookup_key));
    }
  }

  let data_grid = (
    <DataGrid
      sx={{
        height: "100%",
      }}
      rows={data_to_plot}
      columns={actor_columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      disableSelectionOnClick
      onRowClick={(e) => handleActorRowClick(e)}
    />
  );

  return (
    <Container>
      <div
        style={{
          display: "flex",
          margin: "auto",
          justifyContent: "center",
          alignItems: "stretch",
          height: "70vh",
        }}
      >
        <div
          style={{
            width: "60%",
            // minHeight: "60vh",
            height: "auto",
          }}
        >
          <Title>{title_text}</Title>
          {data_grid}
        </div>
        {keyToRender && (
          <div
            style={{
              width: "40%",
              height: "auto",
            }}
          >
            <Title>{detailsToRender}</Title>
          </div>
        )}
      </div>
    </Container>
  );
}

export function RenderGenreDataTable({
  data_to_plot,
  x_axis_param,
  y_axis_param,
  title_text,
  interval = 0,
  handleClickPassedFromParent,
}) {
  function handleGenreRowClick(e) {
    console.log(e?.row?.name);
  }

  let data_grid = (
    <DataGrid
      sx={{
        height: "100%",
      }}
      rows={data_to_plot}
      columns={genre_columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      disableSelectionOnClick
      onRowClick={(e) => handleGenreRowClick(e)}
    />
  );

  return (
    <Container>
      <div
        style={{
          display: "flex",
          margin: "auto",
          justifyContent: "center",
          alignItems: "stretch",
          height: "70vh",
        }}
      >
        <div
          style={{
            width: "60%",
            // minHeight: "60vh",
            height: "auto",
          }}
        >
          <Title>{title_text}</Title>
          {data_grid}
        </div>
      </div>
    </Container>
  );
}

export function RenderMovieDataTable({
  data_to_plot,
  x_axis_param,
  y_axis_param,
  title_text,
  interval = 0,
  handleClickPassedFromParent,
}) {
  function handleMovieRowClick(e) {
    console.log(e?.row?.name);
  }

  let data_grid = (
    <DataGrid
      sx={{
        height: "100%",
      }}
      rows={data_to_plot}
      columns={actor_columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      disableSelectionOnClick
      onRowClick={(e) => handleMovieRowClick(e)}
    />
  );

  return (
    <Container>
      <div
        style={{
          display: "flex",
          margin: "auto",
          justifyContent: "center",
          alignItems: "stretch",
          height: "70vh",
        }}
      >
        <div
          style={{
            width: "60%",
            // minHeight: "60vh",
            height: "auto",
          }}
        >
          <Title>{title_text}</Title>
          {data_grid}
        </div>
      </div>
    </Container>
  );
}
