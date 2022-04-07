import React, { useState, useEffect } from 'react'
import { Container } from "semantic-ui-react";
import axios from "axios"
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Recommend() {
  let token = sessionStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [reviewRecomm, setReviewRecomm] = useState([])
  const [surveyRecomm, setSurveyRecomm] = useState([])

  const settings = {
    dots: false, // 캐러셀이미지가 몇번째인지 알려주는 점을 보여줄지 정한다.
    infinite: true, // loop를 만들지(마지막 이미지-처음 이미지-중간 이미지들-마지막 이미지)
    speed: 500, // 애미메이션의 속도, 단위는 milliseconds
    slidesToShow: 4, // 한번에 몇개의 슬라이드를 보여줄 지
    slidesToScroll: 1, // 한번 스크롤시 몇장의 슬라이드를 넘길지
    // autoplay: true,
  };

  // review 기반 요청
  const getReviewRecomm = async() => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/survey/report/recomm/`, {
        headers: headers
      })
      console.log(response.data)
      setReviewRecomm(response.data)
    } catch(err) {
      console.log(err)
    }
  }

  // 설문조사기반 추천
  const getSurveyRecomm = async() => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/survey/report/surveyrecomm/`, {
        headers: headers
      })
      console.log(response.data)
      setSurveyRecomm(response.data)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getReviewRecomm()
    getSurveyRecomm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <style>
        {`
        .slick-prev {
          z-index: 1000;
          color: yellow;
        }
        .slick-prev:before {
          z-index: 1000;
          color: black;
          font-size: 30px;
        }
        .slick-next {
          z-index: 1000;
          color: yellow;
        }
        .slick-next:before {          
          z-index: 1000;
          color: black;
          font-size: 30px;
        }
        `}
      </style>
      <Container style={{ marginTop: "5%" }}>
        <div>
          <p style={{ fontSize: "3rem" }}>
            리뷰기반 영양제 추천
          </p>
        </div>
          <Slider {...settings} style={{ marginTop: "5%" }}>
            {reviewRecomm.map((item) =>
              <div key={item.id}>
                <Card
                  sx={{
                    maxWidth: "90%",
                    minWidth: "23%",
                    marginLeft: "6%",
                    marginBottom: "2%",
                  }}
                >
                  <Link to={`/product/${item.product.id}`}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        image={item.product.thumbnail_url}
                        alt="thumbnail_url"
                        sx={{ objectFit: "contain", padding: "10px" }}
                      />
                      <CardContent style={{ height: "130px" }}>
                        <div style={{ marginBottom: "10px" }}>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{
                              color: "rgba(0, 0, 0, 0.6)",
                              fontWeight: "bold",
                              fontSize: "20px",
                            }}
                          >
                            {item.product.company}
                          </Typography>
                        </div>
                        <div>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: "13px", height: "70px" }}
                          >
                            {item.product.name}
                          </Typography>
                        </div>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                </Card>
              </div>
            )}
          </Slider>
        <div>
          <p style={{ fontSize: "3rem" }}>
            설문조사 기반 영양제 추천
          </p>
        </div>
          <Slider {...settings} style={{ marginTop: "5%" }}>
            {surveyRecomm.map((item) =>
              <div key={item.id}>
                <Card
                  sx={{
                    maxWidth: "90%",
                    minWidth: "23%",
                    marginLeft: "6%",
                    marginBottom: "2%",
                  }}
                >
                  <Link to={`/product/${item.id}`}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        image={item.thumbnail_url}
                        alt="thumbnail_url"
                        sx={{ objectFit: "contain", padding: "10px" }}
                      />
                      <CardContent style={{ height: "130px" }}>
                        <div style={{ marginBottom: "10px" }}>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{
                              color: "rgba(0, 0, 0, 0.6)",
                              fontWeight: "bold",
                              fontSize: "20px",
                            }}
                          >
                            {item.company}
                          </Typography>
                        </div>
                        <div>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: "13px", height: "70px" }}
                          >
                            {item.name}
                          </Typography>
                        </div>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                </Card>
              </div>
            )}
          </Slider>
      </Container>
    </>
  )
}

export default Recommend