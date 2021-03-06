import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { useMediaQuery } from "react-responsive";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const [isToggled, setIsToggled] = useState(false);
  const [login, setLogin] = useState();
  const navigate = useNavigate();

  const isMobile = useMediaQuery({
    query: "(max-width : 768px)",
  });

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

  const userProfile = sessionStorage.getItem("img");
  const [keyword, setKeyword] = useState("");

  const onChange = (e) => {
    // console.log(e.target.value);
    setKeyword(e.target.value);
  };

  const goProduct = () => {
    navigate(`/product`, { state: { keyword: "" } });
  };

  const onKeyPress = (e) => {
    // console.log(e.key);
    if (e.key === "Enter") {
      onClick();
    }
  };
  const onClick = () => {
    setKeyword("");
    navigate(`/product`, { state: { keyword: keyword } });
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <style>
        {`
        .css-6hp17o-MuiList-root-MuiMenu-list{
         
        }
        .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root{
          margin:0 30px;
          color: #464646;
        }
        .css-tbcuck-MuiPaper-root-MuiAppBar-root{
          box-shadow:3px 3px 5px #f3f3f3
        }
      `}
      </style>
      {isMobile ? (
        <AppBar position="sticky" sx={{ backgroundColor: "white" }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                LOGO1
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                  sx={{ color: "#464646" }}
                >
                  <MenuIcon style={{ fontSize: "25px" }} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                    marginTop: "10px",
                  }}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/recommend">
                      <Typography textAlign="center">
                        <p
                          style={{
                            color: "#464646",
                            fontWeight: "bold",
                            fontSize: "15px",
                          }}
                        >
                          ????????????
                        </p>
                      </Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <p
                        onClick={goProduct}
                        style={{
                          color: "#464646",
                          fontWeight: "bold",
                          fontSize: "15px",
                          cursor: "pointer",
                        }}
                      >
                        ????????????
                      </p>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/notice">
                      <Typography textAlign="center">
                        <p
                          style={{
                            color: "#464646",
                            fontWeight: "bold",
                            fontSize: "15px",
                          }}
                        >
                          ????????????
                        </p>
                      </Typography>
                    </Link>
                  </MenuItem>
                </Menu>
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              >
                <Link to="/">
                  <img
                    src="/img/logo_1.png"
                    alt=""
                    style={{ width: "90px", marginTop: "10px" }}
                  />
                </Link>
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                    <Avatar alt="Remy Sharp" src={userProfile} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  style={{ marginTop: "53px" }}
                >
                  {login ? (
                    <>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Link to="/mypage/userinfo">
                          <Typography textAlign="center">
                            <p
                              style={{
                                color: "#464646",
                                fontWeight: "bold",
                                fontSize: "15px",
                              }}
                            >
                              ???????????? ??????
                            </p>
                          </Typography>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Link to="">
                          <Typography textAlign="center">
                            <p
                              style={{
                                color: "#464646",
                                fontWeight: "bold",
                                fontSize: "15px",
                              }}
                            >
                              ?????? ?????????
                            </p>
                          </Typography>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Link to="/mypage/subscriptions">
                          <Typography textAlign="center">
                            <p
                              style={{
                                color: "#464646",
                                fontWeight: "bold",
                                fontSize: "15px",
                              }}
                            >
                              ?????? ??????
                            </p>
                          </Typography>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Link to="/mypage/address">
                          <Typography textAlign="center">
                            <p
                              style={{
                                color: "#464646",
                                fontWeight: "bold",
                                fontSize: "15px",
                              }}
                            >
                              ????????? ??????
                            </p>
                          </Typography>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Link to="/mypage/myorder">
                          <Typography textAlign="center">
                            <p
                              style={{
                                color: "#464646",
                                fontWeight: "bold",
                                fontSize: "15px",
                              }}
                            >
                              ?????? ??????
                            </p>
                          </Typography>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Link to="/">
                          <Typography onClick={clickLogout}>
                            <p
                              style={{
                                color: "#464646",
                                fontWeight: "bold",
                                fontSize: "15px",
                              }}
                            >
                              ????????????
                            </p>
                          </Typography>
                        </Link>
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Link to="/kakaologin">
                          <Typography onClick={clickLogout}>
                            <p
                              style={{
                                color: "#464646",
                                fontWeight: "bold",
                                fontSize: "15px",
                              }}
                            >
                              ?????????
                            </p>
                          </Typography>
                        </Link>
                      </MenuItem>
                    </>
                  )}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      ) : (
        <>
          {login ? (
            <div className={styles.navbar_main}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <nav className={styles.navbar_top}>
                  <ul className={styles.navbar_top_ul}>
                    <li>
                      <Link to="/notice" className={styles.navbar_top_list}>
                        ????????????
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/mypage/userinfo"
                        className={styles.navbar_top_list}
                      >
                        ???????????????
                      </Link>
                    </li>
                    <li>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={clickLogout}
                        className={styles.navbar_top_list}
                      >
                        ????????????
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
                  <img
                    src="/img/logo_1.png"
                    style={{ width: "140px" }}
                    alt=""
                  />
                </Link>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  position: "sticky",
                  top: "0",
                }}
              >
                <nav className={styles.navbar}>
                  <div>
                    <ul className={styles.nav_menus}>
                      <li>
                        <Link to="/recommend" className={styles.nav_menu}>
                          ????????????
                        </Link>
                      </li>
                      <li>
                        <p
                          className={styles.nav_menu}
                          onClick={goProduct}
                          style={{ cursor: "pointer" }}
                        >
                          ????????????
                        </p>
                      </li>
                      <li>
                        <div className={styles.nav_menu}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <input
                              type="text"
                              placeholder="???????????? ????????? ??????????????????."
                              className={styles.search_input}
                              onChange={onChange}
                              onKeyPress={onKeyPress}
                              value={keyword}
                            ></input>
                            <button
                              className={styles.search_btn}
                              onClick={onClick}
                            >
                              <SearchIcon
                                style={{ fontSize: "25px" }}
                              ></SearchIcon>
                            </button>
                          </div>
                        </div>
                      </li>
                      <li>
                        <Link to="/cart" className={styles.nav_menu}>
                          ????????????
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          ) : (
            <div className={styles.navbar_main}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <nav className={styles.navbar_top}>
                  <ul className={styles.navbar_top_ul}>
                    <li>
                      <Link to="/notice" className={styles.navbar_top_list}>
                        ????????????
                      </Link>
                    </li>
                    <li>
                      <Link to="/kakaologin" className={styles.navbar_top_list}>
                        ?????????
                      </Link>
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
                  <img
                    src="/img/logo_1.png"
                    style={{ width: "140px" }}
                    alt=""
                  />
                </Link>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <nav className={styles.navbar}>
                  <div>
                    <ul className={styles.nav_menus}>
                      <li>
                        <Link to="/recommend" className={styles.nav_menu}>
                          ????????????
                        </Link>
                      </li>
                      <li>
                        <p
                          className={styles.nav_menu}
                          onClick={goProduct}
                          style={{ cursor: "pointer" }}
                        >
                          ????????????
                        </p>
                      </li>
                      <li>
                        <div className={styles.nav_menu}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <input
                              type="text"
                              placeholder="???????????? ????????? ??????????????????."
                              className={styles.search_input}
                              onChange={onChange}
                              onKeyPress={onKeyPress}
                              value={keyword}
                            ></input>
                            <button
                              className={styles.search_btn}
                              onClick={onClick}
                            >
                              <SearchIcon
                                style={{ fontSize: "25px" }}
                              ></SearchIcon>
                            </button>
                          </div>
                        </div>
                      </li>
                      <li>
                        <Link to="/cart" className={styles.nav_menu}>
                          ????????????
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Navbar;
