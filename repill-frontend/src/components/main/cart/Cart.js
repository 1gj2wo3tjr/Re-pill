import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Container } from "@mui/material";
import axios from "axios";
import styles from "./Cart.module.css";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CartList from "./CartList";

function Cart() {
  let token = sessionStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

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
              <CartList cart={cart} total={total} setTotal={setTotal} />
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
              <CartList cart={cart} total={total} setTotal={setTotal} />
            </div>
          </Container>
        </div>
      )}
    </>
  );
}

export default Cart;
