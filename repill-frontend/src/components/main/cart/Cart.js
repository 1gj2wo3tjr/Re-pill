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

  const [checked, setChecked] = useState([true, false]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const isMobile = useMediaQuery({
    query: "(max-width : 768px)",
  });

  const handleChange1 = (e) => {
    setChecked([e.target.checked, e.target.checked]);
  };

  const getCart = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/products/cart/`,
        {
          headers: headers,
        }
      );
      console.log(response.data);
      setCart(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // https://mui.com/components/breadcrumbs/
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

  // console.log(product);
  return (
    <>
      <style>
        {`
        .css-17m3tg-MuiTypography-root, .css-1xmvtmc-MuiTypography-root{
          font-family:"Noto Sans KR";
          font-size: 20px;
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
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#F2F5C8" }}>
                    <TableCell
                      style={{
                        fontSize: "1rem",
                        width: "50%",
                        textAlign: "left",
                        padding: "0px 15px",
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
                        width: "50%",
                        textAlign: "right",
                        padding: "0px 15px",
                      }}
                    >
                      <button className={styles.button_delete}>
                        선택 삭제
                      </button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell colSpan={2}>
                    <div className={styles.mob_cart_list}>
                      <img
                        alt=""
                        src="https://shopping-phinf.pstatic.net/main_2877420/28774205554.20210909130858.jpg?type=f300"
                      />
                      <div className={styles.mob_cart_view}>
                        <p>회사명</p>
                        <p>상품명</p>
                      </div>
                    </div>
                  </TableCell>
                </TableBody>
              </Table>
            </div>
            <div className={styles.cart_bottom}>
              <p>총 {cart.length}개의 상품 금액</p>
              <AddIcon className={styles.mob_add_icon}></AddIcon>
              <p>배송비</p>
              <DragHandleIcon className={styles.mob_add_icon}></DragHandleIcon>
              <p>합계</p>
            </div>
            <div className={styles.mob_cart_btn}>
              <button className={styles.button_check}>
                <p>선택 상품 주문</p>
              </button>
              <button className={styles.button_all}>
                <p>전체 상품 주문</p>
              </button>
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
                  <>
                    {cart.map((item, index) => (
                      <CartList
                        index={index}
                        cart={item}
                        productId={item.product}
                        total={total}
                        setTotal={setTotal}
                      />
                    ))}
                  </>
                </TableBody>
              </Table>
            </div>
            <div className={styles.cart_bottom}>
              <p>총 {cart.length}개의 상품 금액</p>
              <p>total:{total}</p>
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
