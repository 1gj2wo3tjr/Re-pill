import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";

function PayReady() {
  // navigate()로 보낸 값 받기
  const location = useLocation();
  console.log("state", location.state);
  const { name } = location.state.name;
  console.log(location.state.name);
  const { total } = location.state.total;

  const [data, setData] = useState({
    // 응답에서 가져올 값들
    next_redirect_pc_url: "",
    tid: "",
    // 요청에 넘겨줄 매개변수들
    params: {
      cid: "TC0ONETIME",
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      item_name: location.state.name,
      quantity: 1,
      total_amount: location.state.total,
      vat_amount: 200,
      tax_free_amount: 0,
      approval_url: "http://localhost:3000/",
      fail_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/",
    },
  });

  const { params } = data;
  const { next_redirect_pc_url } = data;

  useEffect(() => {
    axios({
      url: "/v1/payment/ready",
      method: "POST",
      headers: {
        Authorization: "KakaoAK de0e3076b485b703b1f1a4a2419440e6",
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },

      params,
    })
      .then((response) => {
        // 응답에서 필요한 data만 뽑는다.
        const {
          data: { next_redirect_pc_url, tid },
        } = response;

        console.log(next_redirect_pc_url);
        console.log(tid);
        // 응답 data로 state 갱신
        setData({ next_redirect_pc_url, tid });
      })
      .catch((error) => console.log("error!", error));
  }, []);

  return (
    <div>
      <h1>pay</h1>
      <a href={next_redirect_pc_url}>link : {next_redirect_pc_url}</a>
    </div>
  );
}

export default PayReady;
