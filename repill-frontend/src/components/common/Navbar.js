import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import SearchIcon from "@mui/icons-material/Search";

function Navbar() {
  const [isToggled, setIsToggled] = useState(false);
  const [login, setLogin] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("token") === null) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  });
  const clickLogout = () => {
    sessionStorage.clear();
    setLogin(false);
    navigate("/");
  };

  // const [keyword, setKeyword] = useState("");
  // const onChange = (e) => {
  //   console.log(e.target.value);
  //   setKeyword(e.target.value);
  // };

  // const onClick = () => {
  //   // window.location.reload(true);
  //   navigate(`/product`, { state: { keyword: keyword } });
  //   setKeyword("");
  // };

  return (
    <>
      {login ? (
        <div className={styles.navbar_main}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <nav className={styles.navbar_top}>
              <ul className={styles.navbar_top_ul}>
                {/* <li>
                  <Link to="/notice" className={styles.navbar_top_list}>
                    공지사항
                  </Link>
                </li> */}
                <li>
                  <Link to="/mypage" className={styles.navbar_top_list}>
                    마이페이지
                  </Link>
                </li>
                <li>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={clickLogout}
                    className={styles.navbar_top_list}
                  >
                    로그아웃
                  </span>
                </li>
              </ul>
            </nav>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link to="/">
              <img src="/img/logo_1.png" style={{ width: "140px" }} />
            </Link>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <nav className={styles.navbar}>
              <div>
                <ul className={styles.nav_menus}>
                  <li>
                    <Link to="/recommend" className={styles.nav_menu}>
                      상품추천
                    </Link>
                  </li>
                  <li>
                    <Link to="/product" className={styles.nav_menu}>
                      제품보기
                    </Link>
                    {/* <p
                      className={styles.nav_menu}
                      onClick={onClick}
                      style={{ cursor: "pointer" }}
                    >
                      제품보기
                    </p> */}
                  </li>
                  {/* <li>
                    <div className={styles.nav_menu}>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <input
                          type="text"
                          placeholder="찾으시는 제품을 검색해주세요."
                          className={styles.search_input}
                          onChange={onChange}
                          value={keyword}
                        ></input>
                        <button className={styles.search_btn} onClick={onClick}>
                          <SearchIcon style={{ fontSize: "25px" }}></SearchIcon>
                        </button>
                      </div>
                    </div>
                  </li> */}
                  <li>
                    <Link to="/notice" className={styles.nav_menu}>
                      공지사항
                    </Link>
                  </li>
                  <li>
                    <Link to="/cart" className={styles.nav_menu}>
                      장바구니
                    </Link>
                  </li>
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
              </div>
            </nav>
          </div>

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
                  로그아웃
                </Link>
              </li>
            </ul>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className={styles.navbar_main}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link to="/">
              <img
                src="/img/main_logo_2.png"
                style={{ width: "140px", marginTop: "22px" }}
              />
            </Link>
          </div>
          <div>
            <nav className={styles.navbar}>
              <div>
                <ul className={styles.nav_menus}>
                  <li>
                    <Link to="/recommend" className={styles.logout_nav_menu}>
                      상품추천
                    </Link>
                  </li>
                  <li>
                    <Link to="/product" className={styles.logout_nav_menu}>
                      제품보기
                    </Link>
                  </li>

                  <li>
                    <Link to="/notice" className={styles.logout_nav_menu}>
                      공지사항
                    </Link>
                  </li>
                  <li>
                    <Link to="/cart" className={styles.logout_nav_menu}>
                      장바구니
                    </Link>
                  </li>
                  <li>
                    <Link to="/kakaologin" className={styles.nav_menu}>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={clickLogout}
                        className={styles.logout_nav_menu}
                      >
                        로그인
                      </span>
                    </Link>
                  </li>
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
              </div>
            </nav>
          </div>
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
      )}
    </>
  );
}

export default Navbar;
