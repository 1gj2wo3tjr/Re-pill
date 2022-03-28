import React, { useEffect, useState } from 'react'
import { Container } from "@mui/material";
import { useMediaQuery } from 'react-responsive';
import styles from "../Mypage.module.css"
import ReviewModal from './ReviewModal';
// import axios from 'axios';

function MyorderTab() {
  const [list, setList] = useState([
    {
      id: 1,
      title: "지엔엠라이프 GNM자연의품격 루테인11 30캡슐",
      price: "34,500",
      date: "2022.01.16"
    },
    {
      id: 2,
      title: "지엔엠라이프 GNM자연의품격 루테인11 30캡슐",
      price: "34,500",
      date: "2022.01.10"
    },
    {
      id: 3,
      title: "지엔엠라이프 GNM자연의품격 루테인11 30캡슐",
      price: "34,500",
      date: "2022.01.10"
    }
  ])
  // const today = new Date()
  const [open, setOpen] = useState(false)


  const isMobile = useMediaQuery({
    query: "(max-width : 768px)"
  });

  const handleReviewModal = () => {
    setOpen((prev) => !prev)
  }

  // 결제내역 데이터 받아오는 함수
  // const getOrder = async () => {
  //   const response = await axios.get(`주소`)
  //   setList(response.data)
  // }

  const cancleOrder = () => {
    alert("삭제")
  }

  // useEffect(() => {
  //   getOrder()
  // }, [])

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
                <button className={styles.order_review_button_mob} onClick={handleReviewModal}>리뷰쓰기</button>
                <button className={styles.order_cancle_order_button_mob} onClick={cancleOrder}>구매취소</button>
              </div>
            </div>)}
            <ReviewModal open={open} setOpen={setOpen} />
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
              <div style={{ width: "20%", marginLeft: "auto", display: "flex", flexDirection: "column" }}>
                <button className={styles.order_review_button} onClick={handleReviewModal}>리뷰쓰기</button>
                <button className={styles.order_cancle_order_button} onClick={cancleOrder}>구매취소</button>
              </div>
            </div>)}
            <ReviewModal open={open} setOpen={setOpen} />
        </Container>
      </> 
      )}
    </div>
  )
}

export default MyorderTab