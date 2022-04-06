import React, { useState, useEffect } from 'react'
import { Modal, Form, TextArea } from 'semantic-ui-react'
import styles from "../Mypage.module.css"
import Rating from '@mui/material/Rating';
import { useMediaQuery } from 'react-responsive';
import axios from "axios"

function ReviewDetailModal({ open, setOpen, reviewId, productId, title, imgUrl }) {
  let token = sessionStorage.getItem('token')
  const headers = {
    Authorization: `Bearer ${token}`
  }
  const [activate, setActivate] = useState(false)
  const [form, setForm] = useState("")
  const [review, setReview] = useState([])
  const [value, setValue] = useState(3);
  const isMobile = useMediaQuery({
    query: "(max-width : 768px)"
  });

  // 수정 버튼누르면 수정 가능하게 상태를 변경하는 함수
  const handleActivate = () => {
    setActivate((prev) => !prev)
    // setValue("")
  }

  const deleteReview = () => {
    axios.delete(`http://127.0.0.1:8000/api/v1/products/reviews/${reviewId}`, 
    {
      headers: headers
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    setTimeout(window.location.reload(true), 1000)
  }

  // 리뷰 내용 수정(onChange)
  const editContent = (event) => {
    setForm(event.target.value)
  }

  // 수정된 리뷰 put 요청
  const editReview = () => {
    if (form != review.content || value != review.rating) {
      axios.put(`http://127.0.0.1:8000/api/v1/products/reviews/${reviewId}`, {
        content: form,
        rating: value,
        product: productId
      },{
        headers: headers
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      setTimeout(window.location.reload(true), 1000)
    }
  }

  const getReview = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/products/reviews/${reviewId}`, {
        headers: headers
      })
      setValue(response.data.rating)
      // setReview(response.data)
      setForm(response.data)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getReview()
  }, [])

  return (
    <div>
      {isMobile ? (
        <>
          <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            centered={false}
          >
            <Modal.Content>
              <div style={{ border: "1px solid black", height: "40%", marginTop: "5%", display: "flex", alignItems: "center", borderRadius: "10px" }}>
                <div style={{ marginLeft: "2%" }}>
                  <div style={{ fontSize: "1rem" }}>
                    {title}
                  </div>
                </div>
              </div>
            </Modal.Content>
            {activate ? (
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }} style={{ marginLeft: "5%"}} />
              ) : (
                <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }} style={{ marginLeft: "5%"}} readOnly />
              )}
            <Modal.Content>
              <Form>
                {activate ? (
                    <TextArea rows={10} style={{ fontSize: "1rem" }} onChange={editContent} value={form.content}></TextArea>
                  ) : (
                    <TextArea rows={10} style={{ fontSize: "1rem" }} value={form.content} readOnly></TextArea>
                  )}
              </Form>
            </Modal.Content>
            <Modal.Content style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={handleActivate} className={styles.order_add_reviewModal_button_mob}>
                {activate ? (
                  <div onClick={editReview}>
                    완료
                  </div>
                ) : (
                  <div>
                    수정
                  </div>
                )}
              </button>
              <button onClick={deleteReview} className={styles.order_cancleModal_review_button_mob}>삭제</button>
            </Modal.Content>
          </Modal>
        </>) : (
        <>
          <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            centered={false}
          >
            <Modal.Content>
              <div style={{ border: "1px solid black", height: "40%", display: "flex", alignItems: "center", borderRadius: "10px" }}>
                <div style={{ width: "20%", marginLeft: "2%" }}>
                  <img src={imgUrl} alt=""  style={{ width: "90%", height: "100%" }} />
                </div>
                <div style={{ width: "70%", marginLeft: "2%" }}>
                  <div style={{ fontSize: "2rem"  }}>
                    {title}
                  </div>
                  {activate ? (
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                    }} size="large" style={{ marginTop: "3%" }} />) : (
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                    }} size="large" style={{ marginTop: "3%" }} readOnly />
                  )}
                </div>
              </div>
            </Modal.Content>
            <Modal.Content>
              <Form>
                {activate ? (
                  <TextArea rows={10} style={{ fontSize: "1.5rem" }} onChange={editContent} value={form.content}></TextArea>
                ) : (
                  <TextArea rows={10} style={{ fontSize: "1.5rem" }} value={form.content} readOnly></TextArea>
                )}
              </Form>
            </Modal.Content>
            <Modal.Content style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={handleActivate} className={styles.order_add_reviewModal_button}>{activate ? (
                <div onClick={editReview}>
                  완료
                </div>
              ) : (
                <div>
                  수정
                </div>
              )}</button>
              <button onClick={deleteReview} className={styles.order_cancleModal_review_button}>삭제</button>
            </Modal.Content>
          </Modal>
        </>)}
    </div>
  )
}

export default ReviewDetailModal