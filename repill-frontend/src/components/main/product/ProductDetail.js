import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Container } from "semantic-ui-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./Product.module.css";
import ProductReview from "./ProductReview";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";
import Cart from "../cart/Cart";

function ProductDetail() {
  let params = useParams();
  const [detail, setDetail] = useState([]);
  const [review, setReview] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const getDetail = async () => {
    window.scrollTo({ top: 0 });
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/photos/${params.id}`
    );
    setDetail(response.data);
  };

  const getReview = async () => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/comments/?postId=${params.id}`
    );
    setReview(response.data);
  };

  const isMobile = useMediaQuery({
    query: "(max-width : 768px)",
  });

  const onChange = (e) => {
    // console.log(e.target.value);
    setQuantity(e.target.value);
  };

  const quantitySub = () => {
    let a = quantity;
    console.log(a);
    if (quantity > 1) {
      a--;
      setQuantity(a);
    }
  };

  const quantityAdd = () => {
    let a = quantity;
    console.log(a);
    if (quantity < 999) {
      a++;
      setQuantity(a);
    }
    // setQuantity(a++);
    // console.log(a);
  };

  useEffect(() => {
    getDetail();
    getReview();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {isMobile ? null : (
        <Container className={styles.container}>
          <div
            className={styles.detail_top}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className={styles.detail_img}>
              <img src={detail.url} alt="" />
            </div>
            <div className={styles.detail_view}>
              <p className={styles.detail_id}>회사이름: {detail.id}</p>
              <p className={styles.detail_title}>{detail.title}</p>
              <p className={styles.detail_short_info}>간단한 제품 소개</p>
              <div className={styles.product_qty}>
                <div>
                  <p
                    style={{
                      fontSize: "18px",
                      verticalAlign: "bottom",
                      lineHeight: "40px",
                    }}
                  >
                    구매 수량
                  </p>
                </div>
                <div style={{ margin: "3px 0 0 80px" }}>
                  <button
                    className={styles.qty_btn}
                    onClick={() => quantitySub()}
                  >
                    <RemoveIcon></RemoveIcon>
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    title="상품개수"
                    className={styles.qty_input}
                    onChange={onChange}
                    disabled
                  />
                  <button
                    className={styles.qty_btn}
                    onClick={() => quantityAdd()}
                  >
                    <AddIcon></AddIcon>
                  </button>
                </div>
              </div>
              <div className={styles.detail_price}>
                <p
                  style={{
                    fontSize: "18px",
                    verticalAlign: "bottom",
                    lineHeight: "40px",
                  }}
                >
                  총 상품 금액
                </p>
                <p>{(15000 * quantity).toLocaleString()}원</p>
              </div>
              <div style={{ float: "right", marginTop: "20px" }}>
                {/* 회원 토큰 */}
                <Link to={`/cart`}>
                  <button className={styles.button_cart}>
                    <div style={{ display: "flex", justifyContent: "start" }}>
                      <AddShoppingCartIcon
                        sx={{
                          color: "rgb(87, 87, 87)",
                          marginRight: "10px",
                        }}
                      ></AddShoppingCartIcon>{" "}
                      <p> 장바구니 담기</p>
                    </div>
                  </button>
                </Link>
                <button className={styles.button_buy}>
                  <div style={{ display: "flex", justifyContent: "start" }}>
                    <PaymentIcon
                      sx={{ color: "rgb(87, 87, 87)", marginRight: "10px" }}
                    ></PaymentIcon>{" "}
                    <p>바로 구매하기</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
          {/* 상품 성분 및 정보  */}
          <div className={styles.detail_main}>
            <p>뭘 넣어야할지 모르겠어요</p>
            {/* 다른 이미지 많이 필요할 것 같은 */}
            <img src={detail.url} alt="" style={{ width: "400px" }} />
            {/* ingrediants */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <table
                style={{
                  width: "40%",
                  margin: "50px 0",
                }}
              >
                <tr style={{ backgroundColor: "#C1DEAE" }}>
                  <td style={{ textAlign: "left" }}>영양 성분</td>
                  <td style={{ textAlign: "right" }}>1회 복용 함유량</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left" }}>비타민 C</td>
                  <td style={{ textAlign: "right" }}>2000mg</td>
                </tr>
              </table>
            </div>
          </div>
          <div style={{ margin: "50px 0" }}>
            <p style={{ fontSize: "16px", fontWeight: "bold" }}>상품 리뷰</p>
            <ProductReview list={review} />
          </div>
        </Container>
      )}
    </>
  );
}

export default ProductDetail;
