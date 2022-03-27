import React from "react";
import { useMediaQuery } from "react-responsive";
import { Container } from "@mui/material";
import styles from "./OrderCompleted.module.css";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import Linked from "@mui/material/Link";

function OrderCompleted() {
  const isMobile = useMediaQuery({
    query: "(max-width : 768px)",
  });

  const handleClick = (e) => {
    e.preventDefault();
  };

  const breadcrumbs = [
    // react-router-dom 의 Link와 겹치지 않도록
    <Linked
      underline="hover"
      key="1"
      color="#BCBCBC"
      href="/"
      onClick={handleClick}
      fontSize={"20px"}
      fontWeight={"bold"}
    >
      01. 장바구니
    </Linked>,
    <Linked
      underline="hover"
      key="1"
      color="#BCBCBC"
      href="/"
      onClick={handleClick}
      fontSize={"20px"}
      fontWeight={"bold"}
    >
      02. 주문/결제
    </Linked>,
    <Typography key="3" color="#219F94" fontSize={"20px"} fontWeight={"bold"}>
      03. 주문완료
    </Typography>,
  ];

  return (
    <>
      {isMobile ? null : (
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
            <div></div>
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
              <Link to={`/`}>
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

export default OrderCompleted;
