import React, { Fragment, useEffect, useState } from "react";
import { Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
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
import { GenerateDataCard } from "./GenerateDataCard";

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

async function fetch_template_data_get_breakdown(url, setter) {
  axios
    .get(url)
    .then((d) => d.data)
    .then((d_json_restruct) => {
      console.log(d_json_restruct);
      setter(d_json_restruct);
    })
    .catch((e) => console.log(e.message));
}

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

  useEffect(() => {
    fetch_template_data_get_breakdown(
      `https://movie-query-tsx.vercel.app/query/get_breakdown?key=actor&value=${keyToRender}`,
      setDetailsToRender
    );
  }, [keyToRender]);

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
    }
  }

  let data_grid = (
    <DataGrid
      sx={{
        height: "100%",
      }}
      rows={data_to_plot}
      columns={actor_columns}
      // pageSize={5}
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
            <Title>{keyToRender}</Title>
            <GenerateDataCard dataToDisplay={detailsToRender} />
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
  const [detailsToRender, setDetailsToRender] = useState(null);
  const [keyToRender, setKeyToRender] = useState(null);

  useEffect(() => {
    fetch_template_data_get_breakdown(
      `https://movie-query-tsx.vercel.app/query/get_breakdown?key=genre&value=${keyToRender}`,
      setDetailsToRender
    );
  }, [keyToRender]);

  function handleGenreRowClick(e) {
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
    }
  }
  let data_grid = (
    <DataGrid
      sx={{
        height: "100%",
      }}
      rows={data_to_plot}
      columns={genre_columns}
      // pageSize={5}
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
        {keyToRender && (
          <div
            style={{
              width: "40%",
              height: "auto",
            }}
          >
            <Title>{keyToRender}</Title>
            <GenerateDataCard dataToDisplay={detailsToRender} />
          </div>
        )}
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
  const [detailsToRender, setDetailsToRender] = useState(null);
  const [keyToRender, setKeyToRender] = useState(null);

  useEffect(() => {
    fetch_template_data_get_breakdown(
      `https://movie-query-tsx.vercel.app/query/get_breakdown?key=moviename&value=${keyToRender}`,
      setDetailsToRender
    );
  }, [keyToRender]);

  function handleMovieRowClick(e) {
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
    }
  }

  let data_grid = (
    <DataGrid
      sx={{
        height: "100%",
      }}
      rows={data_to_plot}
      columns={actor_columns}
      // pageSize={10}
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
        {keyToRender && (
          <div
            style={{
              width: "40%",
              height: "auto",
            }}
          >
            <Title>{keyToRender}</Title>
            <GenerateDataCard dataToDisplay={detailsToRender} />
          </div>
        )}
      </div>
    </Container>
  );
}

export function RenderMovieYearDataTable({
  data_to_plot,
  x_axis_param,
  y_axis_param,
  title_text,
  interval = 0,
  handleClickPassedFromParent,
}) {
  const [detailsToRender, setDetailsToRender] = useState(null);
  const [keyToRender, setKeyToRender] = useState(null);

  useEffect(() => {
    fetch_template_data_get_breakdown(
      `https://movie-query-tsx.vercel.app/query/get_breakdown?key=release_year&value=${keyToRender}`,
      setDetailsToRender
    );
  }, [keyToRender]);

  if (data_to_plot === null) return <></>;

  function handleMovieRowClick(e) {
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
    }
  }

  let data_grid = (
    <DataGrid
      sx={{
        height: "100%",
      }}
      rows={data_to_plot}
      columns={actor_columns}
      // pageSize={10}
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
        {keyToRender && (
          <div
            style={{
              width: "40%",
              height: "auto",
            }}
          >
            <Title>{keyToRender}</Title>
            <GenerateDataCard dataToDisplay={detailsToRender} />
          </div>
        )}
      </div>
    </Container>
  );
}

export function RenderPlotDataTable({
  title_text,
  interval = 0,
  handleClickPassedFromParent,
}) {
  const [detailsToRender, setDetailsToRender] = useState(null);
  const [keyToRender, setKeyToRender] = useState(true);

  useEffect(() => {
    fetch_template_data_get_breakdown(
      `https://movie-query-tsx.vercel.app/query/get_breakdown?key=plot&value=`,
      setDetailsToRender
    );
  }, []);

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
        {keyToRender && detailsToRender && (
          <div
            style={{
              width: "40%",
              height: "auto",
            }}
          >
            <Title>{keyToRender}</Title>
            <GenerateDataCard dataToDisplay={detailsToRender} />
          </div>
        )}
      </div>
    </Container>
  );
}

export function RenderGreetingDataTable({
  title_text,
  interval = 0,
  handleClickPassedFromParent,
}) {
  const [detailsToRender, setDetailsToRender] = useState(null);
  const [keyToRender, setKeyToRender] = useState(true);

  useEffect(() => {
    fetch_template_data_get_breakdown(
      `https://movie-query-tsx.vercel.app/query/get_breakdown?key=greetings&value=`,
      setDetailsToRender
    );
  }, []);

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
        {keyToRender && detailsToRender && (
          <div
            style={{
              width: "40%",
              height: "auto",
            }}
          >
            <Title>{keyToRender}</Title>
            <GenerateDataCard dataToDisplay={detailsToRender} />
          </div>
        )}
      </div>
    </Container>
  );
}

export function RenderErrorDataTable({
  title_text,
  interval = 0,
  handleClickPassedFromParent,
}) {
  const [detailsToRender, setDetailsToRender] = useState(null);
  const [keyToRender, setKeyToRender] = useState(true);

  useEffect(() => {
    fetch_template_data_get_breakdown(
      `https://movie-query-tsx.vercel.app/query/get_breakdown?key=error&value=`,
      setDetailsToRender
    );
  }, []);

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
        {keyToRender && detailsToRender && (
          <div
            style={{
              width: "40%",
              height: "auto",
            }}
          >
            <Title>{keyToRender}</Title>
            <GenerateDataCard dataToDisplay={detailsToRender} />
          </div>
        )}
      </div>
    </Container>
  );
}
