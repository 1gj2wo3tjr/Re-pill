import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import styles from "./Product.module.css";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import ProductList from "./ProductList";
import Category from "./Category";
import Pagination from "react-js-pagination";
import { useMediaQuery } from "react-responsive";

function Product() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentpage] = useState(1);
  const [postPerPage] = useState(24);
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState([]);

  const isMobile = useMediaQuery({
    query: "(max-width : 768px)",
  });

  const getProducts = async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/v1/products/items/"
    );
    setProducts(response.data);
    setResult(response.data);
  };

  // 현재 페이지 가져오기
  const indexOfLast = currentPage * postPerPage; // 1*10 = 10번 포스트
  const indexOfFirst = indexOfLast - postPerPage; // 10-10 = 0번 포스트
  const currentProducts = result.slice(indexOfFirst, indexOfLast); // 0~10번까지

  const onChange = (e) => {
    setKeyword(e.target.value);
  };

  const onClick = (e) => {
    setCurrentpage(1);
    setKeyword("");
    filter(keyword);
  };

  const filter = (keyword) => {
    if (keyword !== "") {
      setResult(products.filter((item) => item.title.includes(keyword)));
    }
  };

  const handlePageChange = (currentPage) => {
    setCurrentpage(currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <style>
        {`
          .pagination {
            display: flex;
            justify-content: center;
            margin: 80px 0;
          }
          ul {
            list-style: none;
            padding: 0;
          }
          ul.pagination li {
            display: inline-block;
            width: 40px;
            height: 40px;
            border: 1px solid #e2e2e2;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1rem;
            border-radius: 50%;
            margin: 0 5px;
            cursor: pointer;
          }
          ul.pagination li:first-child {
            border-radius: 50%;
          }
          ul.pagination li:last-child {
            border-radius: 50px;
          }
          ul.pagination li a {
            text-decoration: none;
            color: #575757;
            font-size: 15px;
            // font-weight: bold;
          }
          ul.pagination li.active a {
            color: rgb(87, 87, 87);
            font-weight: bold;
          }
          ul.pagination li.active {
            background-color: #e8e8a6;
          }
          ul.pagination li a:hover,
          ul.pagination li a.active {
            color: #575757;
            font-weight: bold;
          }
          .page-selection {
            width: 48px;
            height: 30px;
            color: #575757;
          }
        `}
      </style>
      {isMobile ? (
        <div>
          <Container style={{ margin: "50px 0" }}>
            <div className={styles.search_div}>
              <input
                type="text"
                placeholder="찾으시는 제품을 검색해주세요."
                className={styles.mob_input}
                onChange={onChange}
                value={keyword}
              ></input>
              <button className={styles.search_btn} onClick={onClick}>
                <SearchIcon></SearchIcon>
              </button>
            </div>

            <div className={styles.search_num}>
              <p>총 {result.length}건</p>
            </div>

            <div className={styles.product_lists}>
              <ProductList list={currentProducts} />
            </div>

            <div>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={24}
                totalItemsCount={result.length}
                pageRangeDisplayed={5}
                prevPageText={"<"}
                nextPageText={">"}
                onChange={handlePageChange}
              />
            </div>
          </Container>
        </div>
      ) : (
        <div>
          <div style={{ display: "inline" }}>
            <Category />
          </div>
          <Container className={styles.container}>
            <div className={styles.search_div}>
              <input
                type="text"
                placeholder="찾으시는 제품을 검색해주세요."
                className={styles.search_input}
                onChange={onChange}
                value={keyword}
              ></input>
              <button className={styles.search_btn} onClick={onClick}>
                <SearchIcon></SearchIcon>
              </button>
            </div>

            <div className={styles.search_num}>
              <p>총 {result.length}건</p>
            </div>

            <div className={styles.product_lists}>
              <ProductList list={currentProducts} />
            </div>

            <div>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={24}
                totalItemsCount={result.length}
                pageRangeDisplayed={5}
                prevPageText={"<"}
                nextPageText={">"}
                onChange={handlePageChange}
              />
            </div>
          </Container>
        </div>
      )}
    </>
  );
}

export default Product;
