import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";

function PayReady({ open, setOpen }) {
  const [data, setData] = useState({
    next_redirect_pc_url: "",
    tid: "",
    params: {
      cid: "TC0ONETIME",
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      item_name: "동대문엽기떡볶이",
      quantity: 1,
      total_amount: 22000,
      vat_amount: 0,
      tax_free_amount: 0,
      // router에 지정한 PayResult의 경로로 수정
      approval_url: "http://localhost:3000/orderCompleted",
      fail_url: "http://localhost:3000/payresult",
      cancel_url: "http://localhost:3000/payresult",
    },
  });
  const { params } = data;
  const { next_redirect_pc_url } = data;

  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios({
      url: "/v1/payment/ready",
      method: "POST",
      headers: {
        Authorization: "KakaoAK de0e3076b485b703b1f1a4a2419440e6",
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params,
    }).then((response) => {
      const {
        data: { next_redirect_pc_url, tid },
      } = response;

      console.log(next_redirect_pc_url);
      console.log(tid);
      // localstorage에 tid 저장
      window.localStorage.setItem("tid", tid);
      setData({ next_redirect_pc_url, tid });
    });
  }, []);

  return (
    <div>
      {/* <Modal
        closeIcon
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          width: "500px",
          height: "600px",
        }}
      >
        
      </Modal> */}
      {/* <a href={next_redirect_pc_url}>{next_redirect_pc_url}</a> */}
      <Link to={next_redirect_pc_url}></Link>
    </div>
  );
}

export default PayReady;
