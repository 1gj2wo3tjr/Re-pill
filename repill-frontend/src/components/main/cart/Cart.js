import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Container,
} from "@mui/material";
import axios from "axios";
import styles from "./Cart.module.css";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DragHandleIcon from "@mui/icons-material/DragHandle";

function Cart() {
  const [checked, setChecked] = useState([true, false]);

  const handleChange1 = (e) => {
    setChecked([e.target.checked, e.target.checked]);
  };

  const isMobile = useMediaQuery({
    query: "(max-width : 768px)",
  });

  // https://mui.com/components/breadcrumbs/
  const breadcrumbs = [
    <Typography key="1" color="#219F94" fontSize={"20px"} fontWeight={"bold"}>
      01. 장바구니
    </Typography>,
    <Typography key="2" color="#BCBCBC" fontSize={"20px"} fontWeight={"bold"}>
      02. 주문/결제
    </Typography>,
    <Typography key="3" color="#BCBCBC" fontSize={"20px"} fontWeight={"bold"}>
      03. 주문완료
    </Typography>,
  ];

  return (
    <>
      {isMobile ? null : (
        <div>
          <Container className={styles.container}>
            <div className={styles.cart_top}>
              <h2>장바구니</h2>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="20px" />}
                aria-label="breadcrumb"
                sx={{ fontSize: "20px" }}
              >
                {breadcrumbs}
              </Breadcrumbs>
            </div>
            <div className={styles.cart_main}>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#F2F5C8" }}>
                    <TableCell
                      style={{
                        fontSize: "1rem",
                        width: "5%",
                        textAlign: "center",
                      }}
                    >
                      <FormControlLabel
                        label=""
                        control={
                          <Checkbox
                            checked={checked[0] && checked[1]}
                            indeterminate={checked[0] !== checked[1]}
                            onChange={handleChange1}
                          />
                        }
                      />
                    </TableCell>
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
                  <TableCell style={{ textAlign: "center" }}>
                    {/* 체크박스 */}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>a</TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <RemoveIcon className={styles.qty_icon}></RemoveIcon>
                      <input
                        type="text"
                        // value={quantity}
                        title="상품개수"
                        className={styles.qty_input}
                        // onChange={onChange}
                        disabled
                      />
                      <AddIcon className={styles.qty_icon}></AddIcon>
                    </div>
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>a</TableCell>
                  <TableCell style={{ textAlign: "center" }}>a</TableCell>
                </TableBody>
              </Table>
            </div>
            <div className={styles.cart_bottom}>
              <p>총 2개의 상품 금액</p>
              <AddIcon className={styles.add_icon}></AddIcon>
              <p>배송비</p>
              <DragHandleIcon className={styles.add_icon}></DragHandleIcon>
              <p>합계</p>
            </div>
            <div className={styles.cart_btn}>
              <Link to={`/order`}>
                <button className={styles.button_check}>
                  <p>선택 상품 주문</p>
                </button>
              </Link>
              <Link to={`/order`}>
                <button className={styles.button_all}>
                  <p>전체 상품 주문</p>
                </button>
              </Link>
            </div>
          </Container>
        </div>
      )}
    </>
  );
}

export default Cart;
