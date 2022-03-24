import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive';
import { Container } from 'semantic-ui-react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import styles from './Product.module.css';

function ProductList() {
  let params = useParams();
  const [detail, setDetail] = useState([]);

  const getDetail = async () => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/photos/${params.id}`);
    setDetail(response.data);
  }

  const isMobile = useMediaQuery({
    query: "(max-width : 768px)"
  });

  useEffect(() => {
    getDetail()
  }, [])

  return (
    <>
      {isMobile ? (
        null
      ) : (
        <Container>
          <div className={styles.detail_top}>
            <div className={styles.detail_img}>
              <img src={detail.url} alt="" />
            </div>
            <div className={styles.detail_view}>
              <p className={styles.detail_id}>{detail.id}</p>
              <p className={styles.detail_title}>{detail.title}</p>
              <p className={styles.detail_short_info}>간단한 제품 소개</p>
            </div>
          </div>
        </Container>
      )
      }
    </>
  );
}

export default ProductList

