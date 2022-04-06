import React, { useState } from "react";
import { Modal, Form, TextArea } from "semantic-ui-react";
import { useMediaQuery } from "react-responsive";
import styles from "../Mypage.module.css";
import axios from "axios";
import Rating from "@mui/material/Rating";

function ReviewRegisterModal({ open, setOpen, id, title, imgUrl }) {
  let token = sessionStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [form, setForm] = useState("");
  const [value, setValue] = useState(3);

  const isMobile = useMediaQuery({
    query: "(max-width : 768px)",
  });

  const cancleReview = () => {
    setForm("");
    setOpen((prev) => !prev);
  };

  const inputReview = (event) => {
    setForm(event.target.value);
  };

  // 리뷰 등록 함수
  const addReview = () => {
    if (!form.length) {
      alert("내용을 확인해주세요");
    } else {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/api/v1/products/reviews/`,
          {
            product: id,
            content: form,
            rating: value,
          },
          {
            headers: headers,
          }
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      setTimeout(window.location.reload(true), 1000);
    }
  };

  return (
    <div>
      {isMobile ? (
        <>
          <Modal open={open} centered={false}>
            <Modal.Content>
              <div
                style={{
                  border: "1px solid black",
                  height: "40%",
                  marginTop: "5%",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "10px",
                }}
              >
                <div style={{ width: "20%" }}>
                  <img
                    src={imgUrl}
                    alt=""
                    style={{ width: "70%", height: "100%" }}
                  />
                </div>
                <div style={{ width: "60%" }}>
                  <div style={{ fontSize: "1rem" }}>{title}</div>
                </div>
              </div>
            </Modal.Content>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              style={{ marginLeft: "5%" }}
            />
            <Modal.Content>
              <Form>
                <TextArea
                  rows={10}
                  style={{ fontSize: "1rem" }}
                  onChange={inputReview}
                  value={form}
                ></TextArea>
              </Form>
            </Modal.Content>
            <Modal.Content
              style={{ display: "flex", justifyContent: "center" }}
            >
              <button
                onClick={addReview}
                className={styles.order_add_reviewModal_button_mob}
              >
                등록
              </button>
              <button
                onClick={cancleReview}
                className={styles.order_cancleModal_review_button_mob}
              >
                취소
              </button>
            </Modal.Content>
          </Modal>
        </>
      ) : (
        <>
          <Modal open={open} centered={false}>
            <Modal.Content>
              <div
                style={{
                  border: "1px solid black",
                  height: "40%",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "10px",
                }}
              >
                <div style={{ width: "20%" }}>
                  <img
                    src={imgUrl}
                    alt=""
                    style={{ width: "90%", height: "100%" }}
                  />
                </div>
                <div style={{ width: "70%" }}>
                  <div style={{ fontSize: "2rem" }}>{title}</div>
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    size="large"
                    style={{ marginTop: "3%" }}
                  />
                </div>
              </div>
            </Modal.Content>
            <Modal.Content>
              <Form>
                <TextArea
                  rows={10}
                  style={{ fontSize: "1.5rem" }}
                  onChange={inputReview}
                  value={form}
                ></TextArea>
              </Form>
            </Modal.Content>
            <Modal.Content
              style={{ display: "flex", justifyContent: "center" }}
            >
              <button
                onClick={addReview}
                className={styles.order_add_reviewModal_button}
              >
                등록
              </button>
              <button
                onClick={cancleReview}
                className={styles.order_cancleModal_review_button}
              >
                취소
              </button>
            </Modal.Content>
          </Modal>
        </>
      )}
    </div>
  );
}

export default ReviewRegisterModal;
