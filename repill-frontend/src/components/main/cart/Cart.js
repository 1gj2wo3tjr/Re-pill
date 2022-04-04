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
import CartList from "./CartList";

function Cart() {
  let token = sessionStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [checked, setChecked] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const isMobile = useMediaQuery({
    query: "(max-width : 768px)",
  });

  const getCart = () => {
    axios
      .get(`http://127.0.0.1:8000/api/v1/products/cart/`, {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data);
        setCart(res.data);
        // res.data.map((item, index) => getProduct(item.product));
      })
      .catch((err) => console.log(err));
  };

  const breadcrumbs = [
    <Typography key="1" color="#219F94" fontSize={"18px"} fontWeight={"bold"}>
      01. 장바구니
    </Typography>,
    <Typography key="2" color="#BCBCBC" fontSize={"18px"} fontWeight={"bold"}>
      02. 주문/결제
    </Typography>,
    <Typography key="3" color="#BCBCBC" fontSize={"18px"} fontWeight={"bold"}>
      03. 주문완료
    </Typography>,
  ];

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <style>
        {`
        .css-17m3tg-MuiTypography-root, .css-1xmvtmc-MuiTypography-root{
          font-family:"Noto Sans KR";
          font-size: 20px;
        }
        .css-i4bv87-MuiSvgIcon-root{
          width: 30px;
          height: 30px;
        }
        .css-1ex1afd-MuiTableCell-root, .css-1ygcj2i-MuiTableCell-root{
          font-family:"Noto Sans KR";
        }
      `}
      </style>
      {isMobile ? (
        <div>
          <Container className={styles.mob_container}>
            <div className={styles.mob_top}>
              <h3>장바구니</h3>
            </div>
            <div className={styles.mob_cart_main}>
              <CartList
                cart={cart}
                total={total}
                setTotal={setTotal}
                setChecked={setChecked}
              />
            </div>
            <div className={styles.cart_bottom}>
              <div
                style={{
                  width: "300px",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "end",
                  // marginTop: "10px",
                }}
              >
                <p style={{ margin: "0px", fontSize: "15px" }}>
                  총 {checked.length}개의 상품 금액
                </p>
                <p
                  style={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    color: "#f27370",
                  }}
                >
                  {total.toLocaleString()} 원
                </p>
              </div>
            </div>
            <div className={styles.mob_cart_btn}>
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
      ) : (
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
              <CartList
                cart={cart}
                total={total}
                setTotal={setTotal}
                setChecked={setChecked}
              />
            </div>
            <div className={styles.cart_bottom}>
              <div
                style={{
                  width: "300px",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "end",
                  marginTop: "20px",
                }}
              >
                <p style={{ margin: "0px", fontSize: "15px" }}>
                  총 {checked.length}개의 상품 금액
                </p>
                <p
                  style={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    color: "#f27370",
                  }}
                >
                  {total.toLocaleString()} 원
                </p>
              </div>
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
