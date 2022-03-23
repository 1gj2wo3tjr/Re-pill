import React from 'react'
import styles from './Notice.module.css';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <div className={styles.page_nav}>
        {pageNumbers.map((number) => (
          <div key={number} className={styles.page_li}>
            <div onClick={() => paginate(number)}>
              {number}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Pagination