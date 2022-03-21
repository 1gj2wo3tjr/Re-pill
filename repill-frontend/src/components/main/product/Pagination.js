import React from 'react'
import styles from './Pagination.module.css';

function Paging({ postPerPage, totalPosts, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  console.log(pageNumbers)

  return (
    <nav>
      <ul className={styles.pagination}>
        {pageNumbers.map(num =>
          <li key={num}>
            <p onClick={() => paginate(num)}>{num}</p>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Paging

// https://goddino.tistory.com/218
// https://cotak.tistory.com/112