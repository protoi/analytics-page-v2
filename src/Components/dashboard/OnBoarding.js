import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Paper } from "@mui/material";
import { Skeleton } from "@mui/material";

export function OnBoarding() {
  const [posts, setPosts] = useState("");
  let data_to_render = (
    <img src={posts} alt="new" style={{ width: "100%", maxWidth: "400px" }} />
  );
  if (posts === "")
    data_to_render = (
      <Skeleton
        variant="rectangular"
        width={"100%"}
        maxWidth="400px"
        height={"400px"}
      />
    );

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(
          "https://movie-bot-backend-26orzciwg-ghutoon.vercel.app/onboarding/get_onboarding_qrcode"
        )
        .then((res) => {
          // console.log(res);
          return res.data;
        })
        .then((data) => {
          console.log(data);
          setPosts(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, 5000);
  }, []);

  return <>{data_to_render}</>;
}

export function OnBoardingGrid() {
  return (
    <>
      <Grid item xs={4} md={4} lg={4}></Grid>
      <Grid item xs={4} md={4} lg={4}>
        {/* QR CODE/> */}
        <OnBoarding />
      </Grid>
      <Grid item xs={4} md={4} lg={4}></Grid>
    </>
  );
}
