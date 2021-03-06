import * as React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Calender from "./Calender";
import Chart from "./Chart";

function MypageCompo() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }));
  const classes = useStyles();
  const userName = sessionStorage.getItem("name");
  const userEmail = sessionStorage.getItem("email");
  const userProfile = sessionStorage.getItem("img");

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div
              style={{
                margin: "0 auto",
              }}
            >
              <Paper
                className={classes.paper}
                style={{ backgroundColor: "rgba(245,254,192,50%)" }}
              >
                <div class="container">
                  <div class="row">
                    <div class="profile">
                      <Grid container spacing={3}>
                        <Grid item xs={5} key={2}>
                          <Avatar
                            src={userProfile}
                            sx={{ width: 200, height: 200, marginLeft: 10 }}
                          />
                        </Grid>
                        <Grid item xs={7} key={2}>
                          <Box
                            sx={{
                              width: "100%",
                              maxWidth: 360,
                              marginTop: 7,
                            }}
                            style={{ backgroundColor: "rgba(245,254,192,50%)" }}
                          >
                            <Box
                              sx={{ my: 3, mx: 2 }}
                              style={{
                                backgroundColor: "rgba(245,254,192,50%)",
                              }}
                            >
                              <Grid container alignItems="center">
                                <Grid
                                  item
                                  xs
                                  style={{
                                    backgroundColor: "rgba(245,254,192,50%)",
                                  }}
                                >
                                  <Typography
                                    gutterBottom
                                    variant="h4"
                                    component="div"
                                  >
                                    {userName}
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  style={{
                                    backgroundColor: "rgba(245,254,192,50%)",
                                  }}
                                >
                                  <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="div"
                                  >
                                    ??????
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Box>
                            <Divider variant="middle" />
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              E-mail : {userEmail}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col"></div>
                    <div class="col"></div>
                  </div>
                  <div class="row">
                    <div class="col"></div>
                    <div class="col"></div>
                  </div>
                </div>
              </Paper>
            </div>
          </Grid>
          <Grid item xs={6}>
            <Paper
              className={classes.paper}
              style={{ backgroundColor: "rgba(245,254,192,50%)" }}
            >
              ??? ????????????
              <hr></hr>
              <Chart />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper
              className={classes.paper}
              style={{ backgroundColor: "rgba(245,254,192,50%)" }}
            >
              ??? ????????????
              <hr></hr>
              <div>
                <Calender />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default MypageCompo;
