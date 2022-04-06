import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Auth = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(code);
    axios({
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/accounts/login`,
      method: "get",
      params: {
        code: code,
      },
    })
      .then((res) => {
        console.log(res.data);
        const ACCESS_TOKEN = res.data.access_token;
        const userEmail = res.data.email;
        const userName = res.data.name;
        const userImg = res.data.profile_img;
        const is_admin = res.data.is_admin;
        const is_staff = res.data.is_staff;
        sessionStorage.setItem("token", ACCESS_TOKEN);
        sessionStorage.setItem("email", userEmail);
        sessionStorage.setItem("name", userName);
        sessionStorage.setItem("img", userImg);
        sessionStorage.setItem("admin", is_admin);
        sessionStorage.setItem("staff", is_staff);
        navigate("/");
      })
      .catch((err) => {
        // console.log("소셜로그인 에러", err);
        alert("로그인에 실패하였습니다.");
        navigate("/KakaoLogin");
      });
  }, []);
  return <></>;
};
export default Auth;
