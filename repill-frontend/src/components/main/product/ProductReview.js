import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Review.module.css";
import { useMediaQuery } from "react-responsive";

function ProductReview({ list }) {
  const mobile_settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const settings = {
    dots: true, // 캐러셀이미지가 몇번째인지 알려주는 점을 보여줄지 정한다.
    infinite: false, // loop를 만들지(마지막 이미지-처음 이미지-중간 이미지들-마지막 이미지)
    speed: 500, // 애미메이션의 속도, 단위는 milliseconds
    slidesToShow: 3, // 한번에 몇개의 슬라이드를 보여줄 지
    slidesToScroll: 1, // 한번 스크롤시 몇장의 슬라이드를 넘길지
  };

  const isMobile = useMediaQuery({
    query: "(max-width : 768px)",
  });

  return (
    <>
      <style>
        {`
        .slick-prev:before,
        .slick-next:before
        {
            font-family: 'slick';
            font-size: 30px;
            line-height: 1;
        
            opacity: .75;
            color: rgb(193 222 174);
        
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
      `}
      </style>
      {list.length > 0 ? (
        <>
          {isMobile ? (
            <Slider {...mobile_settings} className={styles.slider}>
              {list.map((item, index) => (
                <div key={index}>
                  <div className={styles.review_div}>
                    {item.postId}, {item.id}
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <Slider {...settings} className={styles.slider}>
              {list.map((item, index) => (
                <div key={index}>
                  <div className={styles.review_div}>
                    {item.postId}, {item.id}
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100px",
            backgroundColor: "rgb(241 241 241)",
            borderRadius: "10px",
            textAlign: "center",
            display: "table",
          }}
        >
          <p
            style={{
              fontSize: "15px",
              display: "table-cell",
              verticalAlign: "middle",
            }}
          >
            등록된 리뷰가 없습니다. 😥
          </p>
        </div>
      )}
    </>
  );
}

export default ProductReview;
