import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../common/navbar.js";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const { Kakao } = window;

function Login() {
  const navigate = useNavigate();
  const REST_API_KEY = "1a665d494d85db46c1dabc3f4d876d17";

  const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const kakaoLogin = () => {
    Kakao.Auth.login({
      success: function (authObj) {
        fetch(`${}`, {
          method: "POST",
          body: JSON.stringify({
            access_token: authObj.access_token,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            localStorage.setItem("Kakao_token", res.access_token);
            if (res.access_token) {
              alert("로그인 성공!!");
              navigate("http://localhost:3000");
            }
          });
      },
      fail: function (err) {
        alert(JSON.stringify(err));
      },
    });
  };
  return (
    <>
      <Navbar />
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src="../../../../public/logo111.png" /> Social Login
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="그냥 카카오로 하세요"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="그냥 카카오로 하세요"
                type="password"
              />

              <Button fluid size="large" href={kakaoLogin}>
                <img
                  src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
                  width="222"
                  alt="카카오 로그인 버튼"
                />
              </Button>
            </Segment>
          </Form>
          <Message>
            <a id="custom-login-btn" href={KAKAO_AUTH_URL}>
              <img
                src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
                width="222"
                alt="카카오 로그인 버튼"
              />
            </a>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default Login;
