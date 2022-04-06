import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import styles from "../Mypage.module.css";
import ReviewRegisterModal from "./ReviewRegisterModal";
import ReviewDetailModal from "./ReviewDetailModal";
import axios from "axios";

function MyorderTab() {
  let token = sessionStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [list, setList] = useState([]);

  const [openRegister, setOpenRegister] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [productId, setProductId] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const isMobile = useMediaQuery({
    query: "(max-width : 768px)",
  });

  const handleRegisterModal = (item) => {
    setImgUrl(item.img_url);
    setTitle(item.title);
    setProductId(item.product);
    setOpenRegister((prev) => !prev);
  };

  // 리뷰 보기 --> has_review 의 review id 와 제품 id 를 가져야한다
  const handleDetailModal = (item) => {
    setImgUrl(item.img_url);
    setTitle(item.title);
    setProductId(item.product);
    setReviewId(item.has_review);
    setOpenDetail((prev) => !prev);
  };

  // 주문 내역 받아오는 함수
  const getOrder = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/accounts/order/`,
        {
          headers: headers,
        }
      );
      response.data.map((item) =>
        axios
          .get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/products/items/${item.product}`
          )
          .then((res) => {
            setList((list) => [
              {
                address: item.address,
                has_review: item.has_review,
                id: item.id,
                order_date: item.order_date,
                order_receive: item.order_receive,
                order_status: item.order_status,
                quantity: item.quantity,
                product: item.product,
                order_number: item.order_number,
                title: res.data.name,
                img_url: res.data.thumbnail_url,
                price: res.data.price,
              },
              ...list,
            ]);
          })
      );
    } catch (err) {
      console.log(err);
    }
  };

  // 구매 취소 order_status 값을 변경 1 --> 0 으로.
  const cancleOrder = (item) => {
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/api/v1/accounts/order/${item.order_number}/`,
        {
          product: item.product,
          quantity: item.quantity,
          order_status: 0,
          address: item.address,
          order_receive: item.order_receive,
        },
        {
          headers: headers,
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setTimeout(window.location.reload(true), 1000);
  };

  // 날짜순으로 정렬시키기
  const orderList = list.sort(
    (a, b) => new Date(b.order_date) - new Date(a.order_date)
  );

  useEffect(() => {
    getOrder();
    setList([]);
  }, []);

  return (
    <div>
      {isMobile ? (
        <>
          <Container>
            <h3 style={{ marginTop: "2%" }}>결제 내역</h3>
            {orderList.map((item) => (
              <div
                style={{
                  border: "1px solid black",
                  height: "10rem",
                  marginTop: "5%",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "10px",
                }}
                key={item.id}
              >
                <div style={{ width: "60%", marginLeft: "5%" }}>
                  <div style={{ fontSize: "1rem" }}>
                    <p>{item.title}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "5%",
                      fontSize: "0.5rem",
                    }}
                  >
                    <div>{item.quantity} 개</div>
                    <div style={{ marginLeft: "10%" }}>
                      {item.price * item.quantity} 원
                    </div>
                    <div style={{ marginLeft: "10%" }}>
                      {item.order_date.slice(0, 10)}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: "25%",
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "5%",
                  }}
                >
                  {item.has_review ? (
                    <button
                      className={styles.order_review_button_mob}
                      onClick={() => handleDetailModal(item)}
                    >
                      리뷰보기
                    </button>
                  ) : (
                    <button
                      className={styles.order_review_register_button_mob}
                      onClick={() => handleRegisterModal(item)}
                    >
                      리뷰쓰기
                    </button>
                  )}
                  {item.order_status === 1 ? (
                    <button
                      className={styles.order_cancle_order_button_mob}
                      onClick={() => cancleOrder(item)}
                    >
                      구매취소
                    </button>
                  ) : (
                    <button
                      className={styles.order_cancle_order_button_mob}
                      onClick={() => alert("취소대기중입니다.")}
                    >
                      취소완료
                    </button>
                  )}
                </div>
              </div>
            ))}
            <ReviewRegisterModal
              open={openRegister}
              setOpen={setOpenRegister}
              id={productId}
            />
            {openDetail && (
              <ReviewDetailModal
                open={openDetail}
                setOpen={setOpenDetail}
                reviewId={reviewId}
                productId={productId}
                title={title}
                imgUrl={imgUrl}
              />
            )}
          </Container>
        </>
      ) : (
        <>
          <Container>
            <h1 style={{ marginTop: "5%" }}>결제 내역</h1>
            {orderList.map((item) => (
              <div
                style={{
                  border: "1px solid black",
                  height: "15rem",
                  marginTop: "5%",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "10px",
                }}
                key={item.id}
              >
                <div style={{ width: "15%", marginLeft: "1%" }}>
                  <img
                    src={item.img_url}
                    alt=""
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>
                <div style={{ width: "60%", marginLeft: "5%" }}>
                  <div style={{ fontSize: "2rem" }}>
                    <p>{item.title}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "5%",
                      fontSize: "1.5rem",
                    }}
                  >
                    <div>{item.quantity} 개</div>
                    <div style={{ marginLeft: "10%" }}>
                      {item.price * item.quantity} 원
                    </div>
                    <div style={{ marginLeft: "10%" }}>
                      {item.order_date.slice(0, 10)}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: "20%",
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "10%",
                  }}
                >
                  {item.has_review ? (
                    <div>
                      <button
                        className={styles.order_review_detail_button}
                        onClick={() => handleDetailModal(item)}
                      >
                        리뷰보기
                      </button>
                    </div>
                  ) : (
                    <button
                      className={styles.order_review_register_button}
                      onClick={() => handleRegisterModal(item)}
                    >
                      리뷰쓰기
                    </button>
                  )}
                  {item.order_status === 1 ? (
                    <button
                      className={styles.order_cancle_order_button}
                      onClick={() => cancleOrder(item)}
                    >
                      구매취소
                    </button>
                  ) : (
                    <button
                      className={styles.order_cancle_order_button}
                      onClick={() => alert("취소대기중입니다.")}
                    >
                      취소완료
                    </button>
                  )}
                </div>
              </div>
            ))}
            <ReviewRegisterModal
              open={openRegister}
              setOpen={setOpenRegister}
              id={productId}
              title={title}
              imgUrl={imgUrl}
            />
            {openDetail && (
              <ReviewDetailModal
                open={openDetail}
                setOpen={setOpenDetail}
                reviewId={reviewId}
                productId={productId}
                title={title}
                imgUrl={imgUrl}
              />
            )}
          </Container>
        </>
      )}
    </div>
  );
}

export default MyorderTab;
