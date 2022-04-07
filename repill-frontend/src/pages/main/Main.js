import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Main.module.css";
import { useMediaQuery } from "react-responsive";
import { Container } from "@mui/material";

function Main() {
  let navigate = useNavigate();

  const mobile_settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const settings = {
    dots: true, // 캐러셀이미지가 몇번째인지 알려주는 점을 보여줄지 정한다.
    infinite: true, // loop를 만들지(마지막 이미지-처음 이미지-중간 이미지들-마지막 이미지)
    speed: 500, // 애미메이션의 속도, 단위는 milliseconds
    slidesToShow: 1, // 한번에 몇개의 슬라이드를 보여줄 지
    slidesToScroll: 1, // 한번 스크롤시 몇장의 슬라이드를 넘길지
    autoplay: true,
  };

  const isMobile = useMediaQuery({
    query: "(max-width : 768px)",
  });

  const goSurvey = () => {
    navigate("/survey");
  };

  return (
    <>
      <style>
        {`
        .slick-prev {
          left: 10px !important;
          z-index: 1000;
          color: yellow;
        }
        .slick-prev:before {
          left: 10px !important;
          z-index: 1000;
          color: black;
          font-size: 30px;
        }
        .slick-next {
          right: 10px !important;
          z-index: 1000;
          color: yellow;
        }
        .slick-next:before {
          right: 10px !important;
          z-index: 1000;
          color: black;
          font-size: 30px;
        }
        .slick-dots {
          display: flex;
          width: 100px;
          margin: 0;
          padding: 0;
          left: 50%;
          transform: translate(-50%);
        }
      `}
      </style>
      {isMobile ? (
        <>
          <div style={{ height: "550px", background: "rgba(245,254,192,50%)" }}>
            <Slider {...mobile_settings}>
              <div>
                <div style={{ marginTop: "10px" }}>
                  <div style={{ marginLeft: "5%", height: "120px" }}>
                    <h2>내게 딱 맞는 영양제, 궁금하다면?</h2>
                    <h4>나만을 위한 맞춤영양제를 찾아보세요 </h4>
                    <h4>간단하게 체크하고 내 몸에 맞는 영양성분 찾기</h4>
                  </div>
                  <img
                    src="/assets/survey.png"
                    alt=""
                    style={{
                      width: "80%",
                      height: "300px",
                      marginLeft: "11%",
                      marginTop: "5%",
                      borderRadius: "5%",
                      boxShadow: "10px 10px 5px 5px rgba(0.2,0.2,0.2,0.1)",
                    }}
                  />
                  <button className={styles.survey_button_mob}>설문하기</button>
                </div>
              </div>
              <div>
                <div style={{ marginTop: "10px" }}>
                  <div style={{ marginLeft: "5%", height: "120px" }}>
                    맞춤형 분석
                  </div>
                  <img
                    src="/assets/report.png"
                    alt=""
                    style={{
                      width: "80%",
                      height: "300px",
                      marginLeft: "11%",
                      borderRadius: "5%",
                      boxShadow: "10px 10px 5px 5px rgba(0.2,0.2,0.2,0.1)",
                    }}
                  />
                </div>
              </div>
              <div>
                <div style={{ marginTop: "10px" }}>
                  <div style={{ marginLeft: "5%", height: "120px" }}>
                    구독시스템
                  </div>
                  <img
                    src="/assets/time.png"
                    alt=""
                    style={{
                      width: "80%",
                      height: "300px",
                      marginLeft: "11%",
                      borderRadius: "5%",
                      boxShadow: "10px 10px 5px 5px rgba(0.2,0.2,0.2,0.1)",
                    }}
                  />
                </div>
              </div>
            </Slider>
          </div>
          <Container style={{ marginTop: "2%" }}>
            <div style={{ height: "300px" }}>
              <h1>설문조사관련소개</h1>
            </div>
            <div style={{ height: "300px" }}>
              <h1>개인맞춤형분석소개</h1>
            </div>
            <div style={{ height: "300px" }}>
              <h1>구독시스템소개</h1>
            </div>
          </Container>
        </>
      ) : (
        <>
          <div style={{ height: "320px", background: "rgba(245,254,192,50%)" }}>
            <Slider {...settings}>
              <div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "10px",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ marginLeft: "2%" }}>
                    <p
                      style={{
                        fontSize: "28px",
                        fontWeight: "bold",
                        color: "#2d2d2d",
                        marginTop: "50px",
                      }}
                    >
                      나만의 영양제로 채우다
                    </p>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#2d2d2d",
                        marginBottom: "10px",
                      }}
                    >
                      개인 맞춤형 영양제를 추천해드려요
                    </p>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#2d2d2d",
                        marginTop: "10px",
                      }}
                    >
                      리필이 여러분의 영양제를 책임질게요
                    </p>
                    <button className={styles.survey_button} onClick={goSurvey}>
                      설문하기
                    </button>
                  </div>
                  <img
                    src="/img/009.png"
                    alt=""
                    style={{
                      width: "400px",
                      height: "250px",
                      marginTop: "30px",
                      marginLeft: "150px",
                    }}
                  />
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "10px",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ marginLeft: "2%" }}>
                    <p
                      style={{
                        fontSize: "28px",
                        fontWeight: "bold",
                        color: "#2d2d2d",
                        marginTop: "50px",
                      }}
                    >
                      내게 딱 맞는 영양제 궁금하다면 ?
                    </p>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#2d2d2d",
                        marginBottom: "10px",
                      }}
                    >
                      나만을 위한 맞춤 영양제를 찾아보세요
                    </p>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#2d2d2d",
                        marginTop: "10px",
                      }}
                    >
                      간단하게 설문하고 내 몸에 맞는 영양성분 찾기
                    </p>
                    <button className={styles.survey_button} onClick={goSurvey}>
                      바로 시작
                    </button>
                  </div>
                  <img
                    src="/img/006.png"
                    alt=""
                    style={{
                      width: "400px",
                      height: "250px",
                      marginTop: "30px",
                      marginLeft: "150px",
                    }}
                  />
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "10px",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ marginLeft: "2%" }}>
                    <p
                      style={{
                        fontSize: "28px",
                        fontWeight: "bold",
                        color: "#2d2d2d",
                        marginTop: "50px",
                      }}
                    >
                      어떤 영양제를 살지 고민이신가요 ?
                    </p>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#2d2d2d",
                        marginBottom: "10px",
                      }}
                    >
                      리필의 추천 알고리즘으로 추천해드릴게요
                    </p>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#2d2d2d",
                        marginTop: "10px",
                      }}
                    >
                      여러분의 건강 놓치지않을거에요 !
                    </p>
                    <button className={styles.survey_button} onClick={goSurvey}>
                      리필 꾸욱
                    </button>
                  </div>
                  <img
                    src="/img/007.png"
                    alt=""
                    style={{
                      width: "400px",
                      height: "250px",
                      marginTop: "30px",
                      marginLeft: "150px",
                    }}
                  />
                </div>
              </div>
            </Slider>
          </div>
          <Container style={{ marginTop: "2%" }}>
            <div style={{ height: "300px" }}>
              <h1>설문조사관련소개</h1>
            </div>
            <div style={{ height: "300px" }}>
              <h1>개인맞춤형분석소개</h1>
            </div>
            <div style={{ height: "300px" }}>
              <h1>구독시스템소개</h1>
            </div>
          </Container>
        </>
      )}
    </>
  );
}

export default Main;
