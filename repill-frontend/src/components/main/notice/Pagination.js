import React, { useEffect, useState } from "react";
import styles from "./Notice.module.css";
import axios from "axios";

const Pagination = ({ setList }) => {
  let token = sessionStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [total, setTotal] = useState("");
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(parseInt(total) / 10); i++) {
    pageNumbers.push(i);
  }

  const getNextNotices = (number) => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/community/notice?page=${number}`
      )
      .then((res) => setList(res.data.results))
      .catch((err) => console.log(err));
  };

  const getNotice = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/community/notice/`
      );
      console.log(response.data);
      setList(response.data.results);
      setTotal(response.data.count);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNotice();
  }, []);
  return (
    <>
      <div className={styles.page_nav}>
        {pageNumbers.map((number) => (
          <div
            key={number}
            className={styles.page_li}
            onClick={() => getNextNotices(number)}
          >
            <div>{number}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Pagination;
