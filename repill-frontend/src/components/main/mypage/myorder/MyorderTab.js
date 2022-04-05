import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
<<<<<<< HEAD
import { useMediaQuery } from 'react-responsive';
import styles from "../Mypage.module.css"
import ReviewRegisterModal from './ReviewRegisterModal';
import ReviewDetailModal from './ReviewDetailModal';
import axios from 'axios';

function MyorderTab() {
  let token = sessionStorage.getItem('token')
  const headers = {
    Authorization: `Bearer ${token}`
  }
  const [review, setReview] = useState([])

  const [list, setList] = useState([])

  // const today = new Date()
  const [openRegister, setOpenRegister] = useState(false)
  const [openDetail, setOpenDetail] = useState(false)
  const [productId, setProductId] = useState("")
  const [reviewId, setReviewId] = useState("")
  const [orderStatus, setOrderStatus] = useState("")
=======
import { useMediaQuery } from "react-responsive";
import styles from "../Mypage.module.css";
import ReviewModal from "./ReviewModal";
// import axios from 'axios';

function MyorderTab() {
  const [list, setList] = useState([
    {
      id: 1,
      title: "지엔엠라이프 GNM자연의품격 루테인11 30캡슐",
      price: "34,500",
      date: "2022.01.16",
    },
    {
      id: 2,
      title: "지엔엠라이프 GNM자연의품격 루테인11 30캡슐",
      price: "34,500",
      date: "2022.01.10",
    },
    {
      id: 3,
      title: "지엔엠라이프 GNM자연의품격 루테인11 30캡슐",
      price: "34,500",
      date: "2022.01.10",
    },
  ]);
  // const today = new Date()
  const [open, setOpen] = useState(false);
>>>>>>> develop

  const isMobile = useMediaQuery({
    query: "(max-width : 768px)",
  });

<<<<<<< HEAD
  const handleRegisterModal = (item) => {
    setProductId(item.product)
    setOpenRegister((prev) => !prev)
  }
=======
  const handleReviewModal = () => {
    setOpen((prev) => !prev);
  };
>>>>>>> develop

  const handleDetailModal = (item) => {
    setReviewId(item.id)
    setOpenDetail((prev) => !prev)
  }

<<<<<<< HEAD
  // 주문 내역 받아오는 함수
  const getOrder = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/accounts/order/", {
        headers: headers
      })
      // const status = response.data.order_status
      // if (status === 1) {
      //   setOrderStatus("구매취소")
      // } else if (status === 2) {
      //   setOrderStatus("배송준비중")
      // } else if (status === 3) {
      //   setOrderStatus("배송중")
      // } else if (status === 4) {
      //   setOrderStatus("배송완료")
      // }
      response.data.map((item) => 
        axios
          .get(`http://127.0.0.1:8000/api/v1/products/items/${item.product}`)
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
                price: res.data.price
              },
              ...list
            ])
          })
      )
    } catch(err) {
      console.log(err)
    }
  }
=======
  const cancleOrder = () => {
    alert("삭제");
  };
>>>>>>> develop

  // 리뷰 데이터 받아오는 함수
  const getReview = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/products/reviews/", {
        headers: headers
      })
      setReview(response.data)
    } catch(err) {
      console.log(err)
    }
  }

  // 구매 취소 order_status 값을 변경
  const cancleOrder = (item) => {
    axios.put(`http://127.0.0.1:8000/api/v1/accounts/order/${item.order_number}/`,
    {
      product: item.product,
      quantity: item.quantity,
      order_status: 1,
      address: item.address,
      order_receive: item.order_receive
    }, {
      headers: headers
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    setTimeout(window.location.reload(true), 1000)
  }

  useEffect(() => {
    getOrder()
    getReview()
    setList([])
  }, [])

  return (
    <div>
      {isMobile ? (
<<<<<<< HEAD
      <>
        <Container>
          <h3 style={{ marginTop: "2%" }}>결제 내역</h3>
          {list.map((item) => 
            <div style={{ border: "1px solid black", height: "10rem", marginTop: "5%", display: "flex", alignItems: "center", borderRadius: "10px" }} key={item.id}>
              <div style={{ width: "60%", marginLeft: "5%" }}>
                <div style={{ fontSize: "1rem" }}>
                  <p>
                    {item.title}
                  </p>
                </div>
                <div style={{ display: "flex", marginTop: "5%", fontSize: "0.5rem" }}>
                  <div>
                    {item.quantity} 개
                  </div>
                  <div style={{ marginLeft: "10%" }}>
                    {item.price * item.quantity} 원
                  </div>
                  <div style={{ marginLeft: "10%" }}>
                    {item.order_date.slice(0,10)}
=======
        <>
          <Container>
            {list.map((item) => (
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
                <div style={{ width: "25%" }}>
                  <img
                    src={"/assets/logo512.png"}
                    alt=""
                    style={{ width: "70px", height: "70px" }}
                  />
                </div>
                <div style={{ width: "50%" }}>
                  <div style={{ fontSize: "1rem" }}>{item.title}</div>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "5%",
                      fontSize: "0.5rem",
                    }}
                  >
                    <div>{item.price}원</div>
                    <div style={{ marginLeft: "10%" }}>{item.date}</div>
>>>>>>> develop
                  </div>
                </div>
                <div
                  style={{
                    width: "25%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <button
                    className={styles.order_review_button_mob}
                    onClick={handleReviewModal}
                  >
                    리뷰쓰기
                  </button>
                  <button
                    className={styles.order_cancle_order_button_mob}
                    onClick={cancleOrder}
                  >
                    구매취소
                  </button>
                </div>
              </div>
<<<<<<< HEAD
              <div style={{ width: "25%", display: "flex", flexDirection: "column", marginLeft: "5%" }}>
                {item.has_review ? (
                  <button className={styles.order_review_button_mob} onClick={() => handleDetailModal(item)}>리뷰보기</button>
                ) : (
                  <button className={styles.order_review_register_button_mob} onClick={() => handleRegisterModal(item)}>리뷰쓰기</button>
                )}
                <button className={styles.order_cancle_order_button_mob} onClick={() => cancleOrder(item)}>구매취소</button>
              </div>
            </div>)}
            <ReviewRegisterModal open={openRegister} setOpen={setOpenRegister} id={productId} />
            <ReviewDetailModal open={openDetail} setOpen={setOpenDetail} id={reviewId} />
        </Container>
      </>) : (
      <>
        <Container>
          <h1 style={{ marginTop: "5%" }}>결제 내역</h1>
          {list.map((item) => 
            <div style={{ border: "1px solid black", height: "15rem", marginTop: "5%", display: "flex", alignItems: "center", borderRadius: "10px" }} key={item.id}>
              <div style={{ width: "15%", marginLeft: "1%" }}>
                <img src={item.img_url} alt=""  style={{ width: "150px", height: "150px" }} />
              </div>
              <div style={{ width: "60%", marginLeft: "5%" }}>
                <div style={{ fontSize: "2rem" }}>
                  <p>
                    {item.title}
                  </p>
                </div>
                <div style={{ display: "flex", marginTop: "5%", fontSize: "1.5rem" }}>
                  <div>
                    {item.quantity} 개
                  </div>
                  <div style={{ marginLeft: "10%" }}>
                    {item.price * item.quantity} 원
                  </div>
                  <div style={{ marginLeft: "10%" }}>
                    {item.order_date.slice(0,10)}
=======
            ))}
            <ReviewModal open={open} setOpen={setOpen} />
          </Container>
        </>
      ) : (
        <>
          <Container>
            {list.map((item) => (
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
                <div style={{ width: "15%" }}>
                  <img
                    src={"/assets/logo512.png"}
                    alt=""
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>
                <div style={{ width: "55%" }}>
                  <div style={{ fontSize: "2rem" }}>{item.title}</div>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "5%",
                      fontSize: "1.5rem",
                    }}
                  >
                    <div>{item.price}원</div>
                    <div style={{ marginLeft: "10%" }}>{item.date}</div>
>>>>>>> develop
                  </div>
                </div>
                <div
                  style={{
                    width: "20%",
                    marginLeft: "auto",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <button
                    className={styles.order_review_button}
                    onClick={handleReviewModal}
                  >
                    리뷰쓰기
                  </button>
                  <button
                    className={styles.order_cancle_order_button}
                    onClick={cancleOrder}
                  >
                    구매취소
                  </button>
                </div>
              </div>
<<<<<<< HEAD
              <div style={{ width: "20%", display: "flex", flexDirection: "column", marginLeft: "10%" }}>
                {item.has_review ? (
                  <div>
                    <button className={styles.order_review_detail_button} onClick={() => handleDetailModal(item)}>리뷰보기</button>
                  </div>
                ) : (
                  <button className={styles.order_review_register_button} onClick={() => handleRegisterModal(item)}>리뷰쓰기</button>
                )}
                <button className={styles.order_cancle_order_button} onClick={() => cancleOrder(item)}>구매취소</button>
              </div>
            </div>)}
            <ReviewRegisterModal open={openRegister} setOpen={setOpenRegister} id={productId} />
            <ReviewDetailModal open={openDetail} setOpen={setOpenDetail} id={reviewId} />
        </Container>
      </> 
=======
            ))}
            <ReviewModal open={open} setOpen={setOpen} />
          </Container>
        </>
>>>>>>> develop
      )}
    </div>
  );
}

export default MyorderTab;
