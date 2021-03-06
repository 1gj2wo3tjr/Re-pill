import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { useMediaQuery } from "react-responsive";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import styles from "./Review.module.css";

function ProductReviewLists() {
  const token = sessionStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [reviews, setReviews] = useState([]);
  const isMobile = useMediaQuery({
    query: "(max-width : 768px)",
  });

  let navigate = useNavigate();
  let location = useLocation();

  const getReviews = async () => {
    console.log(location.state);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/products/reviews/?product=${location.state.id}`,
        {
          headers: headers,
        }
      );
      console.log(response);
      setReviews(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const orderList = reviews.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {isMobile ? (
        <div>
          <Container style={{ marginTop: "3%" }}>
            {orderList.map((item) => (
              <div
                style={{
                  display: "flex",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "16px",
                  boxShadow: "0px 5px 10px rgb(207 206 206)",
                  marginTop: "2%",
                }}
              >
                <div>
                  <div>
                    <Rating
                      name="simple-controlled"
                      value={item.rating}
                      readOnly
                    />
                  </div>
                  <div style={{ marginTop: "1%" }}>
                    {item.content}
                    <div>???????????????: ????????? ?????? ???????????? ????????? ????????????.</div>
                  </div>
                </div>
              </div>
            ))}
            <button className={styles.goBack_btn_mob} onClick={goBack}>
              ????????????
            </button>
          </Container>
        </div>
      ) : (
        <div>
          <Container style={{ marginTop: "100px" }}>
            <h2>?????? ????????? ?????? ?????? ??????</h2>
            {orderList.map((item) => (
              <div
                style={{
                  display: "flex",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "16px",
                  boxShadow: "0px 5px 10px rgb(207 206 206)",
                  marginTop: "2%",
                  height: "150px",
                }}
              >
                <div style={{ width: "20%" }}>
                  <div>
                    <PersonIcon style={{ width: "50%", height: "50%" }} />
                  </div>
                  <div>?????????: {item.created_at.slice(0, 10)}</div>
                </div>
                <div style={{ width: "80%" }}>
                  <div>
                    <Rating
                      name="simple-controlled"
                      value={item.rating}
                      readOnly
                    />
                  </div>
                  <div style={{ marginTop: "1%", height: "65%" }}>
                    {item.content}
                  </div>
                  <div style={{ display: "flex", marginBottom: "2%" }}>
                    <div>???????????????: ????????? ?????? ???????????? ????????? ????????????.</div>
                  </div>
                </div>
              </div>
            ))}
            <button className={styles.goBack_btn} onClick={goBack}>
              ????????????
            </button>
          </Container>
        </div>
      )}
    </>
  );
}

export default ProductReviewLists;
