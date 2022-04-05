import React from "react";
import "./styles.css";

const KakaoLogin = () => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
  return (
    <>
      <div class="login-box">
        <h2 style={{ color: "#585858" }}>로그인</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src="/img/pill_1.png"
            style={{ width: "25px", height: "25px", marginRight: "10px" }}
            alt=""
          />
          <p style={{ fontWeight: "bold" }}>
            Re:pill은 카카오로그인을 지원합니다.{" "}
          </p>
        </div>
        <form style={{ display: "flex", justifyContent: "center" }}>
          <a href={KAKAO_AUTH_URL}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <img
              src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
              alt=""
              style={{ width: "250px" }}
            ></img>
          </a>
        </form>
      </div>
    </>
  );
};
export default KakaoLogin;
