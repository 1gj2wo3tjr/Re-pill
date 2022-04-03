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
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function UserInfo() {
  const navigate = useNavigate();
  const handleAdress = () => {
    navigate("/mypage/address");
  };

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
    <div style={{ marginLeft: "10%", marginRight: "10%" }}>
      <h1 style={{ textAlign: "center", margin: "3%" }}>회원정보관리</h1>
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
                                    나이
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
                </div>
              </Paper>
            </div>
          </Grid>
        </Grid>
        <div style={{ margin: "5%" }}>
          <Grid item xs={10}>
            <h2>배송지 관리</h2>
            <p>
              배송지를 등록하거나 기존 배송지를 추가, 변경, 삭제할 수 있습니다.
            </p>
          </Grid>
          <Grid item xs={2} style={{ float: "right" }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#E8E8A6",
                color: "black",
                borderRadius: "20px",
              }}
              onClick={handleAdress}
            >
              <span>배송지 관리</span>
            </Button>
          </Grid>
        </div>
        <div style={{ margin: "5%" }}>
          <Grid item xs={10}>
            <h2>회원 탈퇴</h2>
            <p>Re:pill 서비스에서 탈퇴합니다.</p>
            <a href="#">찾으시는 제품을 찾지 못하셨나요?</a>
          </Grid>
          <Grid item xs={2} style={{ float: "right" }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#E8E8A6",
                color: "black",
                borderRadius: "20px",
              }}
              onClick={handleAdress}
            >
              <span>회 원 탈 퇴 </span>
            </Button>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
