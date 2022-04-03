import React, { useEffect, useState } from 'react'
import { Container } from "@mui/material";
import { useMediaQuery } from 'react-responsive';
import styles from "../Mypage.module.css"
import ReviewRegisterModal from './ReviewRegisterModal';
import ReviewDetailModal from './ReviewDetailModal';
import ReviewEditModal from './ReviewEditModal';
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
  const [openEdit, setOpenEdit] = useState(false)
  const [productId, setProductId] = useState("")
  const [reviewId, setReviewId] = useState("")

  const isMobile = useMediaQuery({
    query: "(max-width : 768px)"
  });

  const handleRegisterModal = (item) => {
    setProductId(item.id)
    setOpenRegister((prev) => !prev)
  }

  const handleDetailModal = (item) => {
    setReviewId(item.id)
    setOpenDetail((prev) => !prev)
  }

  const handleEditModal = (item) => {
    setOpenEdit((prev) => !prev)
  }

  // 주문 내역 받아오는 함수
  const getOrder = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/accounts/order/", {
        headers: headers
      })
      console.log(response.data)
      setList(response.data)
    } catch(err) {
      console.log(err)
    }
  }

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

  const cancleOrder = () => {
    alert("삭제")
  }

  useEffect(() => {
    getOrder()
    getReview()
  }, [])

  return (
    <div>
      {isMobile ? (
      <>
        <Container>
          <h3 style={{ marginTop: "2%" }}>결제 내역</h3>
          {list.map((item) => 
            <div style={{ border: "1px solid black", height: "10rem", marginTop: "5%", display: "flex", alignItems: "center", borderRadius: "10px" }} key={item.id}>
              <div style={{ width: "25%" }}>
                <img src={"/assets/logo512.png"} alt=""  style={{ width: "70px", height: "70px" }} />
              </div>
              <div style={{ width: "50%" }}>
                <div style={{ fontSize: "1rem" }}>
                  {item.title}
                </div>
                <div style={{ display: "flex", marginTop: "5%", fontSize: "0.5rem" }}>
                  <div>
                    {item.price}원
                  </div>
                  <div style={{ marginLeft: "10%" }}>
                    {item.date}
                  </div>
                </div>
              </div>
              <div style={{ width: "25%", display: "flex", flexDirection: "column" }}>
                {list.has_review===1 ? (
                  <button className={styles.order_review_button_mob} onClick={() => handleDetailModal(item)}>리뷰보기</button>
                ) : (
                  <button className={styles.order_review_register_button_mob} onClick={() => handleRegisterModal(item)}>리뷰쓰기</button>
                )}
                <button className={styles.order_cancle_order_button_mob} onClick={cancleOrder}>구매취소</button>
              </div>
            </div>)}
            <ReviewRegisterModal open={openRegister} setOpen={setOpenRegister} id={setProductId} />
            <ReviewDetailModal open={openDetail} setOpen={setOpenDetail} />
            <ReviewEditModal open={openEdit} setOpen={setOpenEdit} />
        </Container>
      </>) : (
      <>
        <Container>
          <h1 style={{ marginTop: "5%" }}>결제 내역</h1>
          {list.map((item) => 
            <div style={{ border: "1px solid black", height: "15rem", marginTop: "5%", display: "flex", alignItems: "center", borderRadius: "10px" }} key={item.id}>
              <div style={{ width: "15%" }}>
                <img src={"/assets/logo512.png"} alt=""  style={{ width: "150px", height: "150px" }} />
              </div>
              <div style={{ width: "55%" }}>
                <div style={{ fontSize: "2rem" }}>
                  {item.title}
                </div>
                <div style={{ display: "flex", marginTop: "5%", fontSize: "1.5rem" }}>
                  <div>
                    {item.price}원
                  </div>
                  <div style={{ marginLeft: "10%" }}>
                    {item.date}
                  </div>
                </div>
              </div>
              <div style={{ width: "20%", display: "flex", flexDirection: "column" }}>
                {list.has_review===1 ? (
                  <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <button className={styles.order_review_detail_button} onClick={() => handleDetailModal(item)}>리뷰보기</button>
                    <button className={styles.order_review_edit_button} onClick={() => handleEditModal(item)}>리뷰수정</button>
                  </div>
                ) : (
                  <button className={styles.order_review_register_button} onClick={() => handleRegisterModal(item)}>리뷰쓰기</button>
                )}
                <button className={styles.order_cancle_order_button} onClick={cancleOrder}>구매취소</button>
              </div>
            </div>)}
            <ReviewRegisterModal open={openRegister} setOpen={setOpenRegister} id={setProductId} />
            <ReviewDetailModal open={openDetail} setOpen={setOpenDetail} id={reviewId} />
            <ReviewEditModal open={openEdit} setOpen={setOpenEdit} />
        </Container>
      </> 
      )}
    </div>
  )
}

export default MyorderTab