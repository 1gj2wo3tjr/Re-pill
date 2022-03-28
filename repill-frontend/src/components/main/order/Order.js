import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Container,
} from "@mui/material";
import styles from "./Order.module.css";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import Linked from "@mui/material/Link";
import Checkbox from "@mui/material/Checkbox";

function Order() {
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
    <Typography key="2" color="#219F94" fontSize={"20px"} fontWeight={"bold"}>
      02. 주문/결제
    </Typography>,
    <Typography key="3" color="#BCBCBC" fontSize={"20px"} fontWeight={"bold"}>
      03. 주문완료
    </Typography>,
  ];

  return (
    <>
      {isMobile ? (
        <div>
          <Container className={styles.mob_container}>
            <div className={styles.mob_top}>
              <h3>주문/결제</h3>
            </div>
            <div className={styles.mob_order_main}>
              <Table>
                <TableHead style={{ padding: "0px" }}>
                  <TableCell></TableCell>
                </TableHead>
                <TableBody>
                  <TableCell>
                    <div className={styles.mob_order_list}>
                      <img
                        alt=""
                        src="https://shopping-phinf.pstatic.net/main_2877420/28774205554.20210909130858.jpg?type=f300"
                      />
                      <div className={styles.mob_order_view}>
                        <p>회사명</p>
                        <p>상품명</p>
                      </div>
                    </div>
                  </TableCell>
                </TableBody>
              </Table>
            </div>
            <div></div>
            <div className={styles.mob_order_bottom}>
              <div className={styles.mob_final_pay}>
                <p>최종 결제 금액</p>
                <p
                  style={{
                    color: "#219f94",
                    fontSize: "25px",
                    lineHeight: "25px",
                    marginLeft: "10px",
                  }}
                >
                  50,000원
                </p>
              </div>
              <div className={styles.mob_agreement}>
                <Checkbox
                  aria-label="a"
                  sx={{
                    color: "#cfcfcf",
                    "&.Mui-checked": {
                      color: "#219F94",
                    },
                  }}
                />
                <div style={{ fontSize: "12px", margin: "10px" }}>
                  <p style={{ margin: "0px" }}>
                    <span style={{ fontWeight: "bold" }}>(필수)</span> 구매하실
                    상품의 결제정보를 확인하였으며,
                  </p>
                  <p>구매진행에 동의합니다.</p>
                </div>
              </div>
              <Link to={`/orderCompleted`}>
                <button className={styles.mob_button_buy}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <CreditScoreIcon
                      style={{ marginRight: "10px" }}
                    ></CreditScoreIcon>
                    <p>결제하기</p>
                  </div>
                </button>
              </Link>
            </div>
          </Container>
        </div>
      ) : (
        <div>
          <Container className={styles.container}>
            <div className={styles.order_top}>
              <h2>주문/결제</h2>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="20px" />}
                aria-label="breadcrumb"
                sx={{ fontSize: "20px" }}
              >
                {breadcrumbs}
              </Breadcrumbs>
            </div>
            <div className={styles.order_main}>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#F2F5C8" }}>
                    <TableCell
                      style={{
                        fontSize: "1rem",
                        width: "40%",
                        textAlign: "center",
                      }}
                    >
                      상품 정보
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "1rem",
                        width: "15%",
                        textAlign: "center",
                      }}
                    >
                      수량
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "1rem",
                        width: "10%",
                        textAlign: "center",
                      }}
                    >
                      상품 금액
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "1rem",
                        width: "10%",
                        textAlign: "center",
                      }}
                    >
                      배송비
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell style={{ textAlign: "center" }}>a</TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <input
                        type="text"
                        // value={quantity}
                        title="상품개수"
                        className={styles.qty_input}
                        // onChange={onChange}
                        disabled
                      />
                    </div>
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>a</TableCell>
                  <TableCell style={{ textAlign: "center" }}>a</TableCell>
                </TableBody>
              </Table>
            </div>
            <div></div>
            <div className={styles.order_bottom}>
              <div className={styles.final_pay}>
                <p>최종 결제 금액</p>
                <p
                  style={{
                    color: "#219f94",
                    fontSize: "25px",
                    lineHeight: "25px",
                    marginLeft: "10px",
                  }}
                >
                  50,000원
                </p>
              </div>
              <div className={styles.agreement}>
                <Checkbox
                  aria-label="a"
                  sx={{
                    color: "#cfcfcf",
                    "&.Mui-checked": {
                      color: "#219F94",
                    },
                  }}
                />
                <p style={{ fontSize: "15px", lineHeight: "37px" }}>
                  <span style={{ fontWeight: "bold" }}>(필수)</span> 구매하실
                  상품의 결제정보를 확인하였으며, 구매진행에 동의합니다.
                </p>
              </div>
              <Link to={`/orderCompleted`}>
                <button className={styles.button_buy}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <CreditScoreIcon
                      style={{ marginRight: "10px" }}
                    ></CreditScoreIcon>
                    <p>결제하기</p>
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

export default Order;
