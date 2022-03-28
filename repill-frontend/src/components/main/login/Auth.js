import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Auth = () => {
  const [checkLogin, setCheckLogin] = useState(false);
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(code);
    axios({
      url: "http://localhost:8000/api/v1/accounts/login",
      method: "get",
      params: {
        code: code,
      },
    })
      .then((res) => {
        console.log(res);
        const ACCESS_TOKEN = res.data.accessToken;
        localStorage.setItem("token", ACCESS_TOKEN);
        navigate("/");
        setCheckLogin(true);
        console.log(checkLogin);
      })
      .catch(({ err }) => {
        console.log(err);
        // console.log("소셜로그인 에러", err);
        // alert("로그인에 실패하였습니다.");
        // navigate("/KakaoLogin");
      });
  }, []);
  return (
    // <div>{code}</div>
    <>{checkLogin ? <h1>로그인 성공</h1> : <h1>로그인 실패</h1>}</>
  );
};
export default Auth;