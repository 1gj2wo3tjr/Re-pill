import React from 'react'
import styles from './Pagination.module.css';
import { useMediaQuery } from 'react-responsive';

function Paging({ postPerPage, totalPosts, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  const isMobile = useMediaQuery({
    query: "(max-width : 768px)"
  });

  return (
    <>
      {isMobile ? (
        <></>
      ) : (
        <nav>
          <ul className={styles.pagination}>
            {pageNumbers.map(num =>
              <li key={num}>
                <p onClick={() => paginate(num)}>{num}</p>
              </li>
            )}
          </ul>
        </nav>
      )}
    </>
  )
}

export default Paging

// https://goddino.tistory.com/218
// https://cotak.tistory.com/112