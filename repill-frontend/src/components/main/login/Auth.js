import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Auth = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);

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
        console.log(res.data.profile_img);
        const ACCESS_TOKEN = res.data.access_token;
        localStorage.setItem("token", ACCESS_TOKEN);
        setProfile(res.data);
        console.log(profile);
        navigate("/");
      })
      .catch((err) => {
        // console.log("소셜로그인 에러", err);
        alert("로그인에 실패하였습니다.");
        navigate("/KakaoLogin");
      });
  }, []);
  return (
    // <div>{code}</div>
    <></>
  );
};
export default Auth;
