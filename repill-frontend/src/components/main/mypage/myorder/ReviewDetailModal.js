import React, { useState, useEffect } from 'react'
import { Modal, Form, TextArea } from 'semantic-ui-react'
import styles from "../Mypage.module.css"
import Rating from '@mui/material/Rating';
import { useMediaQuery } from 'react-responsive';
import axios from "axios"

function ReviewDetailModal({ open, setOpen }) {
  let token = sessionStorage.getItem('token')
  const headers = {
    Authorization: `Bearer ${token}`
  }
  const [activate, setActivate] = useState(false)
  const [form, setForm] = useState("")
  const [review, setReview] = useState([])
  const [value, setValue] = useState(2);
  const isMobile = useMediaQuery({
    query: "(max-width : 768px)"
  });
  const cancleReview = () => {
    setOpen((prev) => !prev)
  }

  const handleActivate = () => {
    setActivate((prev) => !prev)
    if (activate === false) {
      let id = 1
      axios.put(`http://127.0.0.1:8000/api/v1/products/reviews/${id}/`, {

      },
      {
        headers: headers
      })
    }
  }

  const deleteReview = () => {
    let id = 1
    axios.delete(`http://127.0.0.1:8000/api/v1/products/reviews/${id}/`, {
      headers: headers
    })
    window.location.reload(true)
  }

  const editReview = (event) => {
    setForm(event.target.value)
  }

  const getReview = async () => {
    let id = 1
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/products/reviews/${id}/`, {
        headers: headers
      })
      console.log(response.data)
      setReview(response.data)
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
            open={open}
            centered={false}
          >
            <Modal.Content>
              <div style={{ border: "1px solid black", height: "40%", marginTop: "5%", display: "flex", alignItems: "center", borderRadius: "10px" }}>
                <div style={{ width: "20%" }}>
                  <img src={"/assets/logo512.png"} alt=""  style={{ width: "70%", height: "100%" }} />
                </div>
                <div style={{ width: "60%" }}>
                  <div style={{ fontSize: "1rem" }}>
                    
                  </div>
                </div>
              </div>
            </Modal.Content>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }} style={{ marginLeft: "5%"}} />
            <Modal.Content>
              <Form>
                <TextArea rows={10} style={{ fontSize: "1rem" }}></TextArea>
              </Form>
            </Modal.Content>
            <Modal.Content style={{ display: "flex", justifyContent: "center" }}>
              <button className={styles.order_add_reviewModal_button_mob}>수정</button>
              <button onClick={cancleReview} className={styles.order_cancleModal_review_button_mob}>삭제</button>
            </Modal.Content>
          </Modal>
        </>) : (
        <>
          <Modal
            open={open}
            centered={false}
          >
            <Modal.Content>
              <div style={{ border: "1px solid black", height: "40%", display: "flex", alignItems: "center", borderRadius: "10px" }}>
                <div style={{ width: "20%" }}>
                  <img src={"/assets/logo512.png"} alt=""  style={{ width: "90%", height: "100%" }} />
                </div>
                <div style={{ width: "70%" }}>
                  <div style={{ fontSize: "2rem" }}>
                    제목
                  </div>
                  {activate ? (
                    <Rating
                      name="simple-controlled"
                      value={review.rating}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                    }} size="large" style={{ marginTop: "3%" }} />) : (
                    <Rating
                      name="simple-controlled"
                      value={review.rating}
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
                  <TextArea rows={10} style={{ fontSize: "1.5rem" }} onChange={editReview} value={review.content}></TextArea>
                ) : (
                  <TextArea rows={10} style={{ fontSize: "1.5rem" }} value={review.content} readOnly></TextArea>
                )}
              </Form>
            </Modal.Content>
            <Modal.Content style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={handleActivate} className={styles.order_add_reviewModal_button}>{activate ? (
                <div>
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