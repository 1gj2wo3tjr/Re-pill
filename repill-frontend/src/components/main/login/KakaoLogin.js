import React from "react";
import "./styles.css";

const KakaoLogin = () => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
  return (
    <>
      <div class="login-box">
        <h2>Login</h2>
        <form>
          <a href={KAKAO_AUTH_URL}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <img
              src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
              style={{ width: 280 }}
            ></img>
          </a>
        </form>
      </div>
    </>
  );
};
export default KakaoLogin;
