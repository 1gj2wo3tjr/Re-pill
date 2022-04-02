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

  const [checkList, setCheckList] = useState([]);
  const [idList, setIdList] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [product, setProduct] = useState([]);
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

  const getProduct = (productId) => {
    console.log(productId);
    axios
      .get(`http://127.0.0.1:8000/api/v1/products/items/${productId}`)
      .then((res) => {
        console.log(res.data);
        setProduct((product) => [res.data, ...product]);
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

  // 불러온 cart.에서 상품번호 넣기
  const getList = () => {
    let ids = [];

    cart.map((item, idx) => {
      ids[idx] = item.product;
    });

    setIdList(ids);
  };

  // checkbox 전체 선택 => checkList에 product id값 다 넣기, 해제하면 빈 배열
  const onCheckedAll = (e) => {
    // console.log("전체 선택 클릭 : ", e.target.checked);
    console.log(e.target.checked);
    // setCheckList(e.target.checked ? idList : []);
    if (e.target.checked) {
      setCheckList(idList);
    } else {
      setCheckList([]);
      // setTotal(0);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    getList();
  }, [cart]);
  // console.log(product);
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
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        onChange={onCheckedAll}
                        checked={checkList.length === idList.length}
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
              <CartList cart={cart} total={total} setTotal={setTotal} />
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
                  총 {checkList.length}개의 상품 금액
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
              {/* <AddIcon className={styles.add_icon}></AddIcon>
              <p>배송비</p>
              <DragHandleIcon className={styles.add_icon}></DragHandleIcon>
              <p>합계</p> */}
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
