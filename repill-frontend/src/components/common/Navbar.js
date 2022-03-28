import { Link } from "react-router-dom";
import React, { useState } from "react";
import styles from "./Navbar.module.css";

function Navbar() {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div>
      <nav className={styles.navbar}>
        <ul className={styles.nav_logo}>
          <Link to="/">Logo</Link>
        </ul>
        <ul className={styles.nav_menus}>
          <li>
            <Link to="/" className={styles.nav_menu}>
              상품추천
            </Link>
          </li>
          <li>
            <Link to="/product" className={styles.nav_menu}>
              제품보기
            </Link>
          </li>
          <li>
            <Link to="/notice" className={styles.nav_menu}>
              공지사항
            </Link>
          </li>
          <li>
            <Link to="/" className={styles.nav_menu}>
              장바구니
            </Link>
          </li>
          <li>
            <Link to="/mypage" className={styles.nav_menu}>
              마이페이지
            </Link>
          </li>
        </ul>
        <ul className={styles.nav_login}>
          <Link to="/kakaologin" className={styles.nav_menu}>
            로그인
          </Link>
        </ul>
        <ul
          className={styles.nav_toggle_btn}
          onClick={() => {
            setIsToggled(!isToggled);
          }}
        >
          {" "}
          <a href="#!" className={styles.nav_toggle_btn_text}>
            Menu
          </a>
        </ul>
      </nav>

      {isToggled ? (
        <ul className={styles.toggle_menus}>
          <li className={styles.toggle_menu}>
            <Link to="/" className={styles.toggle_menu_text}>
              상품추천
            </Link>
          </li>
          <li className={styles.toggle_menu}>
            <Link to="/product" className={styles.toggle_menu_text}>
              제품보기
            </Link>
          </li>
          <li className={styles.toggle_menu}>
            <Link to="/notice" className={styles.toggle_menu_text}>
              공지사항
            </Link>
          </li>
          <li className={styles.toggle_menu}>
            <Link to="/" className={styles.toggle_menu_text}>
              장바구니
            </Link>
          </li>
          <li className={styles.toggle_menu}>
            <Link to="/" className={styles.toggle_menu_text}>
              로그인
            </Link>
          </li>
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Navbar;
