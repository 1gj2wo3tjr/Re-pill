import React from "react";

const KakaoLogin = () => {
  const REST_API_KEY = "1a665d494d85db46c1dabc3f4d876d17";
  const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  return (
    <div>
      <h1>
        <a href={KAKAO_AUTH_URL}>
          <img
            src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
            style={{ width: 200 }}
          ></img>
        </a>
      </h1>
    </div>
  );
};
export default KakaoLogin;
