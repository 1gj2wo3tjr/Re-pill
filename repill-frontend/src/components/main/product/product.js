import React, { useState, useEffect } from 'react'
import { Container } from 'semantic-ui-react'
import Navbar from "../../common/navbar"
import styles from "./Product.module.css"
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import ProductList from './ProductList'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Paging from './Pagination'
import './Pagination.module.css';

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentpage] = useState(1);
  const [postPerPage] = useState(50);

  const getProducts = async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/photos");

    setProducts(response.data);
  }

  // const productList = (products) => {
  //   let result = [];
  //   if (products.length > 0) {
  //     products.map((item, index) => {
  //       result = result.concat(
  //         <div key={index}>{item.url}</div>
  //       )
  //     })
  //   } else {
  //     result = result.concat(
  //       <div>
  //         해당 상품이 존재하지 않습니다.
  //       </div>
  //     )
  //   }
  //   return result;
  // }

  useEffect(() => {
    getProducts()
  }, [])


  // 현재 페이지 가져오기
  const indexOfLast = currentPage * postPerPage;  // 1*10 = 10번 포스트
  const indexOfFirst = indexOfLast - postPerPage; // 10-10 = 0번 포스트
  const currentProducts = products.slice(indexOfFirst, indexOfLast);  // 0~10번까지

  const paginate = pageNum => setCurrentpage(pageNum);

  return (
    <div>
      <Navbar />
      <Container>
        <h1>제품 보기</h1>
        <div className={styles.search_div}>
          <>
            <input type="text" placeholder='찾으시는 제품을 검색해주세요.' className={styles.search_input}></input>
            <button className={styles.search_btn}>
              <SearchIcon></SearchIcon>
            </button>
          </>
        </div>
        <div>
          {/* {product.map(p => (
            <div key={p.id}>
              <div>{p.title}</div>
            </div>
          ))} */}


          {/* {productList(products)} */}
          {/* <ProductList list={productList(products)} /> */}

          <ProductList list={products} />
          {/* {console.log(products)} */}

        </div >

        {/* pagination */}
        <Paging
          postPerPage={postPerPage}
          totalPosts={products.length}
          paginate={paginate}
        />
      </Container>
    </div>
  )

}

export default Product