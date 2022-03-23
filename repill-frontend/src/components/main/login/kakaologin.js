import React from "react";

const KakaoLogin = () => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
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
