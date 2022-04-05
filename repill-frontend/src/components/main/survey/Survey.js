import React, { useRef } from "react";
import Slider from "react-slick";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";

function Survey() {
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));
  const classes = useStyles();
  const sliderRef = useRef();
  const next = () => {
    sliderRef.current.slickNext();
  };
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
  };

  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <div>
        <h2> Survey</h2>
        <Slider ref={sliderRef} {...settings}>
          <div>
            <React.Fragment>
              <CssBaseline />
              <Container fixed>
                <Typography
                  style={{
                    backgroundColor: "#cfe8fc",
                    height: "700px",
                    margin: "3%",
                    textAlign: "center",
                  }}
                >
                  <br></br>
                  <div style={{ fontSize: "50px" }}>리필!!!</div>
                  <div>내 건강을 알려줘!!</div>
                  <div className={classes.root}>
                    <Button variant="outlined" color="inherit" onClick={next}>
                      시작하기
                    </Button>
                  </div>
                </Typography>
              </Container>
            </React.Fragment>
          </div>
          <div>
            <React.Fragment>
              <CssBaseline />
              <Container fixed>
                <Typography
                  style={{
                    backgroundColor: "#cfe8fc",
                    height: "700px",
                    margin: "3%",
                    textAlign: "center",
                  }}
                >
                  <br></br>
                  <div style={{ fontSize: "50px" }}>일단 첫 번째 질문!</div>
                  <div style={{ fontSize: "30px", margin: "5%" }}>
                    당신은 남자인가 여자인가
                  </div>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      value={value}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <div className={classes.root}>
                        <Button
                          variant="outlined"
                          color="inherit"
                          onClick={next}
                        >
                          다음
                        </Button>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </Typography>
              </Container>
            </React.Fragment>
          </div>
          <div>
            <React.Fragment>
              <CssBaseline />
              <Container fixed>
                <Typography
                  style={{
                    backgroundColor: "#cfe8fc",
                    height: "700px",
                    margin: "3%",
                    textAlign: "center",
                  }}
                >
                  <br></br>
                  <div style={{ fontSize: "50px" }}>리필!!!</div>
                  <div>내가 널 뭐라고 부를까?</div>
                  <TextField
                    id="standard-full-width"
                    label="Label"
                    style={{ margin: "5%" }}
                    placeholder="이름"
                    helperText="이름 입력해라!"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <div className={classes.root}>
                    <Button variant="outlined" color="inherit" onClick={next}>
                      다음
                    </Button>
                  </div>
                </Typography>
              </Container>
            </React.Fragment>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    </>
  );
}

export default Survey;
