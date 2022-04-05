import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Container } from "@mui/material";
import styles from "./OrderCompleted.module.css";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import Linked from "@mui/material/Link";
import axios from "axios";
import { setDate } from "date-fns";

function PayResult(props) {
  const isMobile = useMediaQuery({
    query: "(max-width : 768px)",
  });

  const handleClick = (e) => {
    e.preventDefault();
  };

  const breadcrumbs = [
    // react-router-dom 의 Link와 겹치지 않도록
    <Typography
      underline="hover"
      key="1"
      color="#BCBCBC"
      href="/"
      onClick={handleClick}
      fontSize={"20px"}
      fontWeight={"bold"}
    >
      01. 장바구니
    </Typography>,
    <Typography
      underline="hover"
      key="1"
      color="#BCBCBC"
      href="/"
      onClick={handleClick}
      fontSize={"20px"}
      fontWeight={"bold"}
    >
      02. 주문/결제
    </Typography>,
    <Typography key="3" color="#219F94" fontSize={"20px"} fontWeight={"bold"}>
      03. 주문완료
    </Typography>,
  ];

  const [data, setData] = useState({
    params: {
      cid: "TC0ONETIME",
      tid: window.localStorage.getItem("tid"),
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      pg_token: new URL(window.location.href).searchParams.get("pg_token"),
    },
  });
  const { params } = data;

  const [result, setResult] = useState([]);
  const [total, setTotal] = useState("");

  useEffect(() => {
    console.log(params);
    axios({
      url: "/v1/payment/approve",
      method: "POST",
      headers: {
        Authorization: "KakaoAK de0e3076b485b703b1f1a4a2419440e6",
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params,
    }).then((response) => {
      // 결제 승인에 대한 응답 출력
      console.log(response);
      setResult(response.data);
      setTotal(response.data.amount);
    });
  }, []);

  return (
    <>
      {isMobile ? (
        <div>
          <Container className={styles.mob_container}>
            <div className={styles.order_top} style={{ marginBottom: "10px" }}>
              <h2>주문 완료</h2>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  textAlign: "center",
                  backgroundColor: "rgb(233 233 233)",
                  width: "800px",
                  height: "300px",
                  margin: "20px",
                  borderRadius: "30px",
                  alignContent: "center",
                  padding: "80px 10px",
                }}
              >
                <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                  {result.item_name}
                </p>
                <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                  {total.total} 원
                </p>
                <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                  의 결제가 완료되었습니다.
                </p>
              </div>
            </div>
            <div className={styles.mob_order_bottom}>
              <Link to={`/product`}>
                <button className={styles.mob_button_product}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <CreditScoreIcon
                      style={{ marginRight: "10px" }}
                    ></CreditScoreIcon>
                  </div>
                  <p>계속 쇼핑하기</p>
                </button>
              </Link>
              <Link to={`/mypage/myorder`}>
                <button className={styles.mob_button_pay}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <CreditScoreIcon
                      style={{ marginRight: "10px" }}
                    ></CreditScoreIcon>
                  </div>
                  <p>결제 내역 보기</p>
                </button>
              </Link>
            </div>
          </Container>
        </div>
      ) : (
        <div>
          <Container className={styles.container}>
            <div className={styles.order_top}>
              <h2>주문 완료</h2>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="20px" />}
                aria-label="breadcrumb"
                sx={{ fontSize: "20px" }}
              >
                {breadcrumbs}
              </Breadcrumbs>
            </div>
            <div className={styles.order_main}>
              <h1>주문 완료</h1>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  textAlign: "center",
                  backgroundColor: "rgb(233 233 233)",
                  width: "800px",
                  height: "300px",
                  margin: "20px",
                  borderRadius: "30px",
                  alignContent: "center",
                  padding: "80px 0",
                }}
              >
                <p style={{ fontSize: "18px" }}>{result.item_name}</p>
                <p style={{ fontSize: "18px" }}>{total.total} 원</p>
                <p style={{ fontSize: "16px" }}>의 결제가 완료되었습니다.</p>
              </div>
            </div>
            <div className={styles.order_bottom}>
              <Link to={`/product`}>
                <button className={styles.button_product}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <CreditScoreIcon
                      style={{ marginRight: "10px" }}
                    ></CreditScoreIcon>
                    <p>계속 쇼핑하기</p>
                  </div>
                </button>
              </Link>
              <Link to={`/mypage/myorder`}>
                <button className={styles.button_pay}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <CreditScoreIcon
                      style={{ marginRight: "10px" }}
                    ></CreditScoreIcon>
                    <p>결제 내역 보기</p>
                  </div>
                </button>
              </Link>
            </div>
          </Container>
        </div>
      )}
    </>
  );
}

export default PayResult;
