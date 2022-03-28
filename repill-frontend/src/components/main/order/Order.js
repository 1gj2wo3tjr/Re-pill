import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Container,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import styles from "./Order.module.css";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import Linked from "@mui/material/Link";
import Checkbox from "@mui/material/Checkbox";

function Order() {
  const [radio, setRadio] = useState("existing");
  const [radioPay, setRadioPay] = useState("kakaopay");
  const [selector, setSelector] = useState(1);

  const isMobile = useMediaQuery({
    query: "(max-width : 768px)",
  });

  const handleClick = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setRadio(e.target.value);
  };

  const checkPay = (e) => {
    setRadioPay(e.target.value);
  };

  const handleRequest = (e) => {
    setSelector(e.target.value);
  };

  const breadcrumbs = [
    // react-router-dom 의 Link와 겹치지 않도록
    <Linked
      underline="hover"
      key="1"
      color="#BCBCBC"
      href="/"
      onClick={handleClick}
      fontSize={"20px"}
      fontWeight={"bold"}
    >
      01. 장바구니
    </Linked>,
    <Typography key="2" color="#219F94" fontSize={"20px"} fontWeight={"bold"}>
      02. 주문/결제
    </Typography>,
    <Typography key="3" color="#BCBCBC" fontSize={"20px"} fontWeight={"bold"}>
      03. 주문완료
    </Typography>,
  ];

  return (
    <>
      <style>
        {`
        .css-1ygcj2i-MuiTableCell-root, .css-1ex1afd-MuiTableCell-root,
        .css-1ygcj2i-MuiTableCell-root, .css-1ex1afd-MuiTableCell-root,
        .css-1pt4gei-MuiTypography-root-MuiLink-root,
        .css-1d2qdko-MuiTypography-root, .css-1sgufif-MuiTypography-root,
        .css-j204z7-MuiFormControlLabel-root .MuiFormControlLabel-label{
          font-family:"Noto Sans KR";
        }
        .css-1e6y48t-MuiButtonBase-root-MuiButton-root{
          background-color: #f2f5c8;
          padding: 10px 15px;
          color: rgb(87, 87, 87);
          font-size: 11px;
          border: 0px;
          border-radius: 20px;
          cursor: pointer;
          margin-left: 20px;
        }
      `}
      </style>
      {isMobile ? (
        <div>
          <Container className={styles.mob_container}>
            <div className={styles.mob_top}>
              <h3>주문/결제</h3>
            </div>
            <div className={styles.mob_order_main}>
              <p
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                주문 상세 내역
              </p>
              <Table>
                <TableHead>
                  <TableCell style={{ padding: "0px" }}></TableCell>
                </TableHead>
                <TableBody>
                  <TableCell>
                    <div className={styles.mob_order_list}>
                      <img
                        alt=""
                        src="https://shopping-phinf.pstatic.net/main_2877420/28774205554.20210909130858.jpg?type=f300"
                      />
                      <div className={styles.mob_order_view}>
                        <p>회사명</p>
                        <p>상품명</p>
                      </div>
                    </div>
                  </TableCell>
                </TableBody>
              </Table>
            </div>

            <div className={styles.mob_address_div}>
              <p
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                배송 정보
              </p>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{ width: "50px", padding: "0px" }}
                    ></TableCell>
                    <TableCell style={{ padding: "0px" }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      className={styles.mob_address_left}
                      style={{ textAlign: "center" }}
                    >
                      <p>배송지 확인</p>
                    </TableCell>
                    <TableCell className={styles.mob_address_right}>
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          style={{ fontSize: "12px" }}
                          value={radio}
                          onChange={handleChange}
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: "14px",
                            },
                          }}
                        >
                          <FormControlLabel
                            value="existing"
                            control={
                              <Radio
                                sx={{
                                  color: "#cfcfcf",
                                  "&.Mui-checked": {
                                    color: "#219F94",
                                  },
                                }}
                              />
                            }
                            label="기존 배송지"
                          />
                          <FormControlLabel
                            value="new"
                            control={
                              <Radio
                                sx={{
                                  color: "#cfcfcf",
                                  "&.Mui-checked": {
                                    color: "#219F94",
                                  },
                                }}
                              />
                            }
                            label="신규 배송지"
                          />
                        </RadioGroup>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className={styles.mob_address_left}
                      style={{ textAlign: "center" }}
                    >
                      <p>받는 분</p>
                    </TableCell>
                    <TableCell className={styles.mob_address_right}>
                      <input
                        type="text"
                        // value={quantity}
                        title="받는분"
                        className={styles.mob_address_input}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className={styles.mob_address_left}
                      style={{ textAlign: "center" }}
                    >
                      <p>주소</p>
                    </TableCell>
                    <TableCell className={styles.mob_address_right}>
                      <div style={{ marginBottom: "15px" }}>
                        <input
                          type="text"
                          // value={quantity}
                          title="우편번호"
                          className={styles.mob_address_input}
                          disabled
                        />
                        <Button className={styles.mob_button_search}>
                          <p>우편번호 검색</p>
                        </Button>
                      </div>
                      <input
                        type="text"
                        // value={quantity}
                        title="주소"
                        className={styles.mob_address_input}
                        style={{ width: "100%", marginBottom: "15px" }}
                      />
                      <input
                        type="text"
                        // value={quantity}
                        title="상세주소"
                        className={styles.mob_address_input}
                        style={{ width: "100%" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className={styles.mob_address_left}
                      style={{ textAlign: "center" }}
                    >
                      <p>휴대폰 번호</p>
                    </TableCell>
                    <TableCell className={styles.mob_address_right}>
                      <input
                        type="number"
                        // value={quantity}
                        title="휴대폰번호"
                        className={styles.mob_address_input}
                        style={{ width: "100%" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className={styles.mob_address_left}
                      style={{ textAlign: "center" }}
                    >
                      <p>배송 요청사항</p>
                    </TableCell>
                    <TableCell className={styles.mob_address_right}>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                          value={selector}
                          onChange={handleRequest}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          className={styles.mob_address_selector}
                          sx={{
                            "&.Mui-selected": {
                              // 색상 변경 안돼ㅠㅠ
                              border: "1px solid #f2f5c8",
                            },
                          }}
                          style={{ width: "100%", margin: "0px" }}
                        >
                          <MenuItem value="1">
                            배송 메세지를 선택해주세요.
                          </MenuItem>
                          <MenuItem value="2">
                            부재시 경비실에 맡겨주세요.
                          </MenuItem>
                          <MenuItem value="3">
                            부재시 문 앞에 놓아주세요.
                          </MenuItem>
                          <MenuItem value="4">배송 전에 연락주세요.</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className={styles.mob_pay_div}>
              <p
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  marginBottom: "30px",
                }}
              >
                결제수단 선택
              </p>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{ width: "20%", padding: "0px" }}
                    ></TableCell>
                    <TableCell style={{ padding: "0px" }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      className={styles.address_left}
                      style={{ textAlign: "center" }}
                    >
                      <p>결제 수단</p>
                    </TableCell>
                    <TableCell className={styles.address_right}>
                      <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          style={{ fontSize: "14px", marginLeft: "20px" }}
                          value={radioPay}
                          onChange={checkPay}
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: "14px",
                            },
                          }}
                        >
                          <FormControlLabel
                            value="kakaopay"
                            control={
                              <Radio
                                sx={{
                                  color: "#cfcfcf",
                                  "&.Mui-checked": {
                                    color: "#219F94",
                                  },
                                }}
                              />
                            }
                            label="카카오페이"
                          />
                        </RadioGroup>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className={styles.mob_order_bottom}>
              <div className={styles.mob_final_pay}>
                <p>최종 결제 금액</p>
                <p
                  style={{
                    color: "#219f94",
                    fontSize: "25px",
                    lineHeight: "25px",
                    marginLeft: "10px",
                  }}
                >
                  50,000원
                </p>
              </div>
              <div className={styles.mob_agreement}>
                <Checkbox
                  aria-label="a"
                  sx={{
                    color: "#cfcfcf",
                    "&.Mui-checked": {
                      color: "#219F94",
                    },
                  }}
                />
                <div style={{ fontSize: "12px", margin: "10px" }}>
                  <p style={{ margin: "0px" }}>
                    <span style={{ fontWeight: "bold" }}>(필수)</span> 구매하실
                    상품의 결제정보를 확인하였으며,
                  </p>
                  <p>구매진행에 동의합니다.</p>
                </div>
              </div>
              <Link to={`/orderCompleted`}>
                <button className={styles.mob_button_buy}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <CreditScoreIcon
                      style={{ marginRight: "10px" }}
                    ></CreditScoreIcon>
                    <p>결제하기</p>
                  </div>
                </button>
              </Link>
            </div>
          </Container>
        </div>
      ) : (
        <div>
          <Container className={styles.container}>
            <div className={styles.order_top}>
              <h2>주문/결제</h2>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="20px" />}
                aria-label="breadcrumb"
                sx={{ fontSize: "20px" }}
              >
                {breadcrumbs}
              </Breadcrumbs>
            </div>

            <div className={styles.order_main}>
              <p style={{ fontSize: "17px", fontWeight: "bold" }}>
                주문 상세 내역
              </p>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#F2F5C8" }}>
                    <TableCell
                      style={{
                        fontSize: "1rem",
                        width: "40%",
                        textAlign: "center",
                      }}
                    >
                      상품 정보
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "1rem",
                        width: "15%",
                        textAlign: "center",
                      }}
                    >
                      수량
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "1rem",
                        width: "10%",
                        textAlign: "center",
                      }}
                    >
                      상품 금액
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "1rem",
                        width: "10%",
                        textAlign: "center",
                      }}
                    >
                      배송비
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell style={{ textAlign: "center" }}>a</TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <input
                        type="text"
                        // value={quantity}
                        title="상품개수"
                        className={styles.qty_input}
                        // onChange={onChange}
                        disabled
                      />
                    </div>
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>a</TableCell>
                  <TableCell style={{ textAlign: "center" }}>a</TableCell>
                </TableBody>
              </Table>
            </div>

            <div className={styles.address_div}>
              <p
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  marginBottom: "30px",
                }}
              >
                배송 정보
              </p>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{ width: "20%", padding: "0px" }}
                    ></TableCell>
                    <TableCell style={{ padding: "0px" }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      className={styles.address_left}
                      style={{ textAlign: "center" }}
                    >
                      <p>배송지 확인</p>
                    </TableCell>
                    <TableCell className={styles.address_right}>
                      <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          style={{ fontSize: "14px", marginLeft: "20px" }}
                          value={radio}
                          onChange={handleChange}
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: "14px",
                            },
                          }}
                        >
                          <FormControlLabel
                            value="existing"
                            control={
                              <Radio
                                sx={{
                                  color: "#cfcfcf",
                                  "&.Mui-checked": {
                                    color: "#219F94",
                                  },
                                }}
                              />
                            }
                            label="기존 배송지"
                          />
                          <FormControlLabel
                            value="new"
                            control={
                              <Radio
                                sx={{
                                  color: "#cfcfcf",
                                  "&.Mui-checked": {
                                    color: "#219F94",
                                  },
                                }}
                              />
                            }
                            label="신규 배송지"
                          />
                        </RadioGroup>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className={styles.address_left}
                      style={{ textAlign: "center" }}
                    >
                      <p>받는 분</p>
                    </TableCell>
                    <TableCell className={styles.address_right}>
                      <input
                        type="text"
                        // value={quantity}
                        title="받는분"
                        className={styles.address_input}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className={styles.address_left}
                      style={{ textAlign: "center" }}
                    >
                      <p>주소</p>
                    </TableCell>
                    <TableCell className={styles.address_right}>
                      <div>
                        <input
                          type="text"
                          // value={quantity}
                          title="우편번호"
                          className={styles.address_input}
                          disabled
                        />
                        <Button className={styles.button_search}>
                          <p>우편번호 검색</p>
                        </Button>
                      </div>
                      <div style={{ marginTop: "15px" }}>
                        <input
                          type="text"
                          // value={quantity}
                          title="주소"
                          className={styles.address_input}
                          style={{ width: "330px" }}
                        />
                        <input
                          type="text"
                          // value={quantity}
                          title="상세주소"
                          className={styles.address_input}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className={styles.address_left}
                      style={{ textAlign: "center" }}
                    >
                      <p>휴대폰 번호</p>
                    </TableCell>
                    <TableCell className={styles.address_right}>
                      <input
                        type="number"
                        // value={quantity}
                        title="휴대폰번호"
                        className={styles.address_input}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className={styles.address_left}
                      style={{ textAlign: "center" }}
                    >
                      <p>배송 요청사항</p>
                    </TableCell>
                    <TableCell className={styles.address_right}>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                          value={selector}
                          onChange={handleRequest}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          className={styles.address_selector}
                          sx={{
                            "&.Mui-selected": {
                              // 색상 변경 안돼ㅠㅠ
                              border: "1px solid #f2f5c8",
                            },
                          }}
                        >
                          <MenuItem value="1">
                            배송 메세지를 선택해주세요.
                          </MenuItem>
                          <MenuItem value="2">
                            부재시 경비실에 맡겨주세요.
                          </MenuItem>
                          <MenuItem value="3">
                            부재시 문 앞에 놓아주세요.
                          </MenuItem>
                          <MenuItem value="4">배송 전에 연락주세요.</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className={styles.pay_div}>
              <p
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  marginBottom: "30px",
                }}
              >
                결제수단 선택
              </p>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{ width: "20%", padding: "0px" }}
                    ></TableCell>
                    <TableCell style={{ padding: "0px" }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      className={styles.address_left}
                      style={{ textAlign: "center" }}
                    >
                      <p>결제 수단</p>
                    </TableCell>
                    <TableCell className={styles.address_right}>
                      <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          style={{ fontSize: "14px", marginLeft: "20px" }}
                          value={radioPay}
                          onChange={checkPay}
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: "14px",
                            },
                          }}
                        >
                          <FormControlLabel
                            value="kakaopay"
                            control={
                              <Radio
                                sx={{
                                  color: "#cfcfcf",
                                  "&.Mui-checked": {
                                    color: "#219F94",
                                  },
                                }}
                              />
                            }
                            label="카카오페이"
                          />
                          {/* <FormControlLabel
                            value="new"
                            control={
                              <Radio
                                sx={{
                                  color: "#cfcfcf",
                                  "&.Mui-checked": {
                                    color: "#219F94",
                                  },
                                }}
                              />
                            }
                            label="신규 배송지"
                          /> */}
                        </RadioGroup>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className={styles.order_bottom}>
              <div className={styles.final_pay}>
                <p>최종 결제 금액</p>
                <p
                  style={{
                    color: "#219f94",
                    fontSize: "25px",
                    lineHeight: "25px",
                    marginLeft: "10px",
                  }}
                >
                  50,000원
                </p>
              </div>
              <div className={styles.agreement}>
                <Checkbox
                  aria-label="a"
                  sx={{
                    color: "#cfcfcf",
                    "&.Mui-checked": {
                      color: "#219F94",
                    },
                  }}
                />
                <p style={{ fontSize: "15px", lineHeight: "37px" }}>
                  <span style={{ fontWeight: "bold" }}>(필수)</span> 구매하실
                  상품의 결제정보를 확인하였으며, 구매진행에 동의합니다.
                </p>
              </div>
              <Link to={`/orderCompleted`}>
                <button className={styles.button_buy}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <CreditScoreIcon
                      style={{ marginRight: "10px" }}
                    ></CreditScoreIcon>
                    <p>결제하기</p>
                  </div>
                </button>
              </Link>
            </div>
          </Container>
        </div>
      )}
    </>
  );
}

export default Order;
