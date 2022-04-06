import React, { useState, useEffect } from 'react'
import { Container } from "semantic-ui-react";
import { useMediaQuery } from "react-responsive";
import Rating from '@mui/material/Rating';
import axios from "axios";

function ProductReviewLists() {
  const token = sessionStorage.getItem('token')
  const headers = {
    Authorization: `Bearer ${token}`
  }
  const [reviews, setReviews] = useState([])
  const id = useState(1)
  const isMobile = useMediaQuery({
    query: "(max-width : 768px)",
  });

  const getReviews = async() => {
    try{
      const response = await axios.get('http://127.0.0.1:8000/api/v1/products/reviews/', {
        product: id
      },{
        headers: headers
      })
      console.log(response)
      setReviews(response.data)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getReviews()
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [])
  return (
    <>
      {isMobile ? (
        <div>
          <Container style={{ marginTop: "3%" }}>
            {reviews.map((item) => 
              <div style={{ display: "flex", border: "1px solid #e0e0e0", borderRadius: "8px", padding: "16px", marginBottom: "16px", boxShadow: "0px 5px 10px rgb(207 206 206)", marginTop: "2%" }}>
                <div>
                  <div>
                    <Rating
                      name="simple-controlled"
                      value={item.rating}
                      readOnly
                    />
                  </div>
                  <div style={{ marginTop: "1%" }}>
                    딱 몸에 필요한 영양소만 섭취할 수 있다면 좋겠지만 조심한다 하면서도 음식을 먹다보면 의도치 않게 몸속에 들어가는 것들이 있기에 별도의 오메가 3 복용를 통한 최적의 지질 수준 유지를 위해 가족과 함께 섭취하려고 구입했어요. 알약 크기는 육안으로 보기에 큰편이었어요. 하지만 제가 삼키기에는 힘들지 않았고 냄새도 전혀 나지 않아 좋았어요. 현제 오메가 3의 항염효과를 기대하며 복용하고 있습니다.
                    {item.content}
                    <div>
                      ※면책사항: 의학적 또는 전문적인 조언이 아닙니다.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Container>
        </div>
      ) : (
        <div>
          <Container style={{ marginTop: "3%" }}>
            <h1>해당 상품에 대한 리뷰 모음</h1>
            {reviews.map((item) => 
              <div style={{ display: "flex", border: "1px solid #e0e0e0", borderRadius: "8px", padding: "16px", marginBottom: "16px", boxShadow: "0px 5px 10px rgb(207 206 206)", marginTop: "2%" }}>
                <div style={{ width: "20%" }}>
                  <div>
                    <img src={"/assets/person.jpg"} alt=""  style={{ width: "50%", height: "50%" }} />
                  </div>
                  <div>
                    등록일: {item.created_at.slice(0, 10)}
                  </div>
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
                    딱 몸에 필요한 영양소만 섭취할 수 있다면 좋겠지만 조심한다 하면서도 음식을 먹다보면 의도치 않게 몸속에 들어가는 것들이 있기에 별도의 오메가 3 복용를 통한 최적의 지질 수준 유지를 위해 가족과 함께 섭취하려고 구입했어요. 알약 크기는 육안으로 보기에 큰편이었어요. 하지만 제가 삼키기에는 힘들지 않았고 냄새도 전혀 나지 않아 좋았어요. 현제 오메가 3의 항염효과를 기대하며 복용하고 있습니다.
                    {item.content}
                  </div>
                  <div style={{ display: "flex", marginBottom: "2%" }}>
                    <div>
                      ※면책사항: 의학적 또는 전문적인 조언이 아닙니다.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Container>
        </div>
      )}
    </>
  )
}

export default ProductReviewLists