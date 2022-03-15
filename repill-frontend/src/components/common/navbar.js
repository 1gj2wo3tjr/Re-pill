import { Link } from 'react-router-dom';
import React from 'react';
import styles from './navbar.module.css';

function navbar() {
  return (
    <nav className={styles.navbar}>
      {/* logo */}
      <Link to="/" className={styles.nav_logo}>
        Logo
      </Link>
      <ul className={styles.nav_links}>
        <li className={styles.nav_item}>
          <Link to="/" className={styles.nav_link}>상품추천</Link>
        </li>
        <li className={styles.nav_item}>
          <Link to="/product" className={styles.nav_link}>제품보기</Link>
        </li>
        <li className={styles.nav_item}>
          <Link to="/notice" className={styles.nav_link}>공지사항</Link>
        </li>
        <li className={styles.nav_item}>
          <Link to="/" className={styles.nav_link}>장바구니</Link>
        </li>
        <li className={styles.nav_item}>
          <Link to="/login" className={styles.nav_link}>로그인</Link>
        </li>
      </ul>
    </nav>
  )
}

export default navbar