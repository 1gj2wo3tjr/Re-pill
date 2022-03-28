import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";

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

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div style={{ margin: "0 auto" }}>
              <Paper className={classes.paper}>
                <div class="container">
                  <div class="row">
                    <div class="profile">
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 200, height: 200 }}
                      />
                      <Grid container spacing={3}>
                        <Grid item xs={12} key={2}>
                          <Box
                            sx={{
                              width: "100%",
                              maxWidth: 360,
                              bgcolor: "background.paper",
                            }}
                          >
                            <Box sx={{ my: 3, mx: 2 }}>
                              <Grid container alignItems="center">
                                <Grid item xs>
                                  <Typography
                                    gutterBottom
                                    variant="h4"
                                    component="div"
                                  >
                                    사용자명
                                  </Typography>
                                </Grid>
                                <Grid item>
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
                              카카오톡 이메일 주소
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
            <Paper className={classes.paper}>내 영양분석</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>내 구독정보</Paper>
          </Grid>
          <Grid item xs={12}>
            <h3 style={{ textAlign: "center" }}>맞춤형 케어</h3>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>무릎 관절염</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>안구 건조증</Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default MypageCompo;
