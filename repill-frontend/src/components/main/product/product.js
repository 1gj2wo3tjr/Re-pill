import React, { useState, useEffect } from 'react'
import { Container } from 'semantic-ui-react'
import styles from "./Product.module.css"
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import ProductList from './ProductList'
import Category from './Category'
import Paging from './Pagination'
import './Pagination.module.css';

function Product() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentpage] = useState(1);
  const [postPerPage] = useState(40);

  const getProducts = async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/photos");
    setProducts(response.data);
  }

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
      <div style={{ display: "inline" }}>
        <Category />
      </div>
      <Container className={styles.container}>
        <div className={styles.search_div}>
          <>
            <input type="text" placeholder='찾으시는 제품을 검색해주세요.' className={styles.search_input}></input>
            <button className={styles.search_btn}>
              <SearchIcon></SearchIcon>
            </button>
          </>
        </div>

        <div className={styles.product_lists} >
          <ProductList list={currentProducts} />
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