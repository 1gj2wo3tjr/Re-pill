import React, { useState, useEffect } from "react";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  RadioGroup,
  FormControl,
} from "@mui/material";
import styles from "./Order.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import axios from "axios";
import { useMediaQuery } from "react-responsive";

function Subscription({ orderList }) {
  const [form, setForm] = useState({
    subscribe_times: "",
    period: "",
  });
  const isMobile = useMediaQuery({
    query: "(max-width : 768px)",
  });
  const [subStatus, setSubStatus] = useState(false)

  //  구독
  const subsChange = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (!regex.test(e.target.value)) {
      alert("숫자를 입력해주세요")
      e.target.value = ""
    }
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    console.log(form)
  };

  // 구독하기 누르면 서버로 데이터 전송하고, 끝나면 해당상품에대한 구독 정보를 받아오는 함수 실행(getSubscription)
  const openSubAlert = async(item) => {
    try {
      const response = await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/api/v1/accounts/subscription/`,
          {
            product: item.id,
            subscribe_times: form.subscribe_times,
            period: form.period,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`
            },
          }
        )
        .then((res) => {
          console.log(res.data)
          // alert("구독 신청 완료!");
        })
        .catch((err) => {
          console.log(err)
          // alert("구독 실패!");
        });
    } catch(err) {
      console.log(err)
    }
    getSubscription(item)
  };

  // 해당상품에대한 구독정보를 받아와 start_date 의 유무를 판단해서 구독하기 버튼의 innerText를 구독설정완료로 변경
  const getSubscription = async(item) => {
    try {
      const response_sub = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/accounts/subscription/${item.id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      })
      console.log(response_sub.data)
      setSubStatus((prev) => !prev)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    
  }, [])

  return (
  <>
    {isMobile ? (
      <Table>
        <>
          <TableBody>
            <TableRow>
              <TableCell style={{ width: "60%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={orderList.thumbnail_url}
                    alt=""
                    style={{ width: "100px" }}
                  />
                  <div
                    style={{ marginLeft: "30px", fontSize: "13px" }}
                  >
                    <p
                      style={{
                        color: "rgba(0, 0, 0, 0.87)",
                        fontWeight: "bold",
                        marginBottom: "8px",
                      }}
                    >
                      {orderList.company}
                    </p>
                    <p style={{ color: "rgba(0, 0, 0, 0.87)" }}>
                      {orderList.name}
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.address_right}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    style={{ fontSize: "14px", marginLeft: "10px" }}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: "14px",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        "& > :not(style)": { m: 1, width: "16ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      {subStatus === true ? (
                        <>
                          <TextField
                            id="filled-basic"
                            label="받을 횟수"
                            variant="filled"
                            name="subscribe_times"
                            value={form.subscribe_times}
                            readOnly
                            style={{ height: "10px" }}
                          />
                          <TextField
                            id="filled-basic"
                            label="배송 주기"
                            variant="filled"
                            name="period"
                            value={form.period}
                            readOnly
                          />
                          <button
                            className={styles.mob_subscription_buy}
                            disabled
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <p>구독설정완료</p>
                            </div>
                          </button>
                        </>
                        ) : (
                        <>
                          <TextField
                            id="filled-basic"
                            label="받을 횟수"
                            variant="filled"
                            name="subscribe_times"
                            value={form.subscribe_times}
                            onChange={subsChange}
                            style={{ height: "20px" }}
                          />
                          <TextField
                            id="filled-basic"
                            label="배송 주기"
                            variant="filled"
                            name="period"
                            value={form.period}
                            onChange={subsChange}
                          />
                          <button
                            className={styles.mob_subscription_buy}
                            onClick={() => openSubAlert(orderList)}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <CreditScoreIcon
                                style={{ marginRight: "10px" }}
                              ></CreditScoreIcon>
                              <p>구독하기</p>                      
                            </div>
                          </button>
                        </>
                        )}
                    </Box>
                  </RadioGroup>
                </FormControl>
              </TableCell>
            </TableRow>
          </TableBody>
        </>
      </Table>
    ) : (
      <Table>
        <>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ width: "20%", padding: "0px" }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                className={styles.address_left}
                style={{ textAlign: "center" }}
              >
                <p>구독</p>
              </TableCell>
              <TableCell style={{ width: "80%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    margin: "0 60px",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={orderList.thumbnail_url}
                    alt=""
                    style={{ width: "100px" }}
                  />
                  <div
                    style={{ marginLeft: "30px", fontSize: "13px" }}
                  >
                    <p
                      style={{
                        color: "rgba(0, 0, 0, 0.87)",
                        fontWeight: "bold",
                        marginBottom: "8px",
                      }}
                    >
                      {orderList.company}
                    </p>
                    <p style={{ color: "rgba(0, 0, 0, 0.87)" }}>
                      {orderList.name}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className={styles.address_right}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    style={{ fontSize: "14px", marginLeft: "20px" }}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: "14px",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        "& > :not(style)": { m: 1, width: "25ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      {subStatus === true ? (
                        <>
                          <TextField
                            id="filled-basic"
                            label="받을 횟수"
                            variant="filled"
                            name="subscribe_times"
                            value={form.subscribe_times}
                            readOnly
                          />
                          <TextField
                            id="filled-basic"
                            label="배송 주기"
                            variant="filled"
                            name="period"
                            value={form.period}
                            readOnly
                          />
                          <button
                            className={styles.button_buy}
                            disabled
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <p>구독설정완료</p>
                            </div>
                          </button>
                        </>
                        ) : (
                        <>
                          <TextField
                            id="filled-basic"
                            label="받을 횟수"
                            variant="filled"
                            name="subscribe_times"
                            value={form.subscribe_times}
                            onChange={subsChange}
                          />
                          <TextField
                            id="filled-basic"
                            label="배송 주기"
                            variant="filled"
                            name="period"
                            value={form.period}
                            onChange={subsChange}
                          />
                          <button
                            className={styles.button_buy}
                            onClick={() => openSubAlert(orderList)}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <CreditScoreIcon
                                style={{ marginRight: "10px" }}
                              ></CreditScoreIcon>
                              <p>구독하기</p>                      
                            </div>
                          </button>
                        </>
                        )}
                    </Box>
                  </RadioGroup>
                </FormControl>
              </TableCell>
            </TableRow>
          </TableBody>
        </>
      </Table>
    )}
    {
    /* <Table>
      <>
        <TableHead>
          <TableRow>
            <TableCell
              style={{ width: "20%", padding: "0px" }}
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell
              className={styles.address_left}
              style={{ textAlign: "center" }}
            >
              <p>구독</p>
            </TableCell>
            <TableCell style={{ width: "80%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  margin: "0 60px",
                  alignItems: "center",
                }}
              >
                <img
                  src={orderList.thumbnail_url}
                  alt=""
                  style={{ width: "100px" }}
                />
                <div
                  style={{ marginLeft: "30px", fontSize: "13px" }}
                >
                  <p
                    style={{
                      color: "rgba(0, 0, 0, 0.87)",
                      fontWeight: "bold",
                      marginBottom: "8px",
                    }}
                  >
                    {orderList.company}
                  </p>
                  <p style={{ color: "rgba(0, 0, 0, 0.87)" }}>
                    {orderList.name}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell className={styles.address_right}>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  style={{ fontSize: "14px", marginLeft: "20px" }}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: "14px",
                    },
                  }}
                >
                  <Box
                    sx={{
                      "& > :not(style)": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    {subStatus === true ? (
                      <>
                        <TextField
                          id="filled-basic"
                          label="받을 횟수"
                          variant="filled"
                          name="subscribe_times"
                          value={form.subscribe_times}
                          readOnly
                        />
                        <TextField
                          id="filled-basic"
                          label="배송 주기"
                          variant="filled"
                          name="period"
                          value={form.period}
                          readOnly
                        />
                        <button
                          className={styles.button_buy}
                          disabled
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <p>구독설정완료</p>
                          </div>
                        </button>
                      </>
                      ) : (
                      <>
                        <TextField
                          id="filled-basic"
                          label="받을 횟수"
                          variant="filled"
                          name="subscribe_times"
                          value={form.subscribe_times}
                          onChange={subsChange}
                        />
                        <TextField
                          id="filled-basic"
                          label="배송 주기"
                          variant="filled"
                          name="period"
                          value={form.period}
                          onChange={subsChange}
                        />
                        <button
                          className={styles.button_buy}
                          onClick={() => openSubAlert(orderList)}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <CreditScoreIcon
                              style={{ marginRight: "10px" }}
                            ></CreditScoreIcon>
                            <p>구독하기</p>                      
                          </div>
                        </button>
                      </>
                      )}
                  </Box>
                </RadioGroup>
              </FormControl>
            </TableCell>
          </TableRow>
        </TableBody>
      </>
    </Table> */
    }
  </>
  )
}

export default Subscription