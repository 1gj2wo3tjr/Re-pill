import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Container } from "semantic-ui-react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "./Product.module.css";
import ProductReview from "./ProductReview";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CartModal from "./CartModal";

function ProductDetail() {
  let params = useParams();
  let token = sessionStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const navigate = useNavigate();

  const [detail, setDetail] = useState([]);
  const [review, setReview] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);

  const getDetail = async () => {
    window.scrollTo({ top: 0 });
    const response = await axios.get(
      `http://127.0.0.1:8000/api/v1/products/items/${params.id}`
    );

    setDetail(response.data);
  };

  const getReview = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/v1/products/reviews/${params.id}`
    );
    setReview(response.data);
  };

  const isMobile = useMediaQuery({
    query: "(max-width : 768px)",
  });

  const onChange = (e) => {
    console.log(e.target.value);
    setQuantity(e.target.value);
  };

  const quantitySub = () => {
    let a = quantity;
    if (quantity > 1) {
      a--;
      setQuantity(a);
    }
  };

  const quantityAdd = () => {
    let a = quantity;
    if (quantity < 999) {
      a++;
      setQuantity(a);
    }
  };

  const goCart = () => {
    axios
      .post(
        `http://127.0.0.1:8000/api/v1/products/cart/`,
        {
          quantity: quantity,
          product: detail.id,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res);
        setOpen((prev) => !prev);
      })
      .catch((err) => console.log(err));
  };

  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    getDetail();
    getReview();
  }, [params.id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <style>
        {`
        
      `}
      </style>
      {isMobile ? (
        <Container className={styles.mob_container}>
          <div className={styles.mob_top}>
            <div className={styles.mob_name}>
              <p className={styles.mob_id}>{detail.company}</p>
              <p className={styles.mob_title}>{detail.name}</p>
            </div>
            <div className={styles.mob_img}>
              <img src={detail.thumbnail_url} alt="" />
            </div>
            <div className={styles.mob_view}>
              <p className={styles.mob_short_info}>{detail.content}</p>
              <div className={styles.mob_qty}>
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
                <div style={{ alignItem: "center" }}>
                  <button
                    className={styles.mob_qty_btn}
                    style={{ marginRight: "10px" }}
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
                    className={styles.mob_qty_btn}
                    onClick={() => quantityAdd()}
                  >
                    <AddIcon></AddIcon>
                  </button>
                </div>
              </div>
              <div className={styles.mob_price}>
                <p
                  style={{
                    fontSize: "18px",
                    verticalAlign: "bottom",
                    lineHeight: "40px",
                  }}
                >
                  총 상품 금액
                </p>
                <p>{(detail.price * quantity).toLocaleString()} 원</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "20px",
                }}
              >
                <button className={styles.mob_cart} onClick={() => goCart()}>
                  <div style={{ display: "block" }}>
                    <AddShoppingCartIcon
                      sx={{ color: "rgb(87, 87, 87)" }}
                    ></AddShoppingCartIcon>{" "}
                    <p> 장바구니 담기</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
          {/* 상품 성분 및 정보  */}
          <hr></hr>
          <div className={styles.mob_main}>
            {/* 다른 이미지 많이 필요할 것 같은 */}
            <div className={styles.mob_img}>
              <img src={detail.thumbnail_url} alt="" />
            </div>
            {/* ingrediants */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <table
                style={{
                  width: "100%",
                  margin: "20px 0",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#C1DEAE" }}>
                    <td style={{ textAlign: "left" }}>영양 성분</td>
                    <td style={{ textAlign: "right" }}>1회 복용 함유량</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: "left" }}>비타민 C</td>
                    <td style={{ textAlign: "right" }}>2000mg</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ margin: "30px 0" }}>
            <p style={{ fontSize: "16px", fontWeight: "bold" }}>상품 리뷰</p>
            <ProductReview list={review} />
          </div>
        </Container>
      ) : (
        <Container className={styles.container}>
          <div
            className={styles.detail_top}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className={styles.detail_img}>
              <img src={detail.thumbnail_url} alt="" />
            </div>
            <div className={styles.detail_view}>
              <p className={styles.detail_id}>{detail.company}</p>
              <p className={styles.detail_title}>{detail.name}</p>
              <p className={styles.detail_short_info}>{detail.content}</p>
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
                <div
                  style={{
                    margin: "3px 0 0 80px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
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
                <p>{(detail.price * quantity).toLocaleString()} 원</p>
              </div>
              <div style={{ float: "right", marginTop: "20px" }}>
                <button className={styles.button_cart} onClick={() => goCart()}>
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
              </div>
            </div>
          </div>
          {/* 상품 성분 및 정보  */}
          <div className={styles.detail_main}>
            {/* 다른 이미지 많이 필요할 것 같은 */}
            <img src={detail.thumbnail_url} alt="" style={{ width: "400px" }} />
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
      {open ? <CartModal open={open} setOpen={setOpen} /> : null}
    </>
  );
}

export default ProductDetail;
