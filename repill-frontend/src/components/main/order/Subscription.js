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

function Subscription({ orderList }) {
  const [products, setProducts] = useState([])

  const [form, setForm] = useState({
    subscribe_times: "",
    period: "",
  });

  //  구독
  const subsChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    console.log(form)
  };

  const openSubAlert = (item) => {
    console.log(item.id)
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/accounts/subscription/`,
        {
          product: item.id,
          subscribe_times: form.subscribe_times,
          period: form.period,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res)
        // alert("구독 신청 완료!");
      })
      .catch((err) => {
        console.log(err)
        // alert("구독 실패!");
      });
  };

  useEffect(() => {
    setProducts(orderList)
  }, [])

  return (
  <>
    <div className={styles.pay_div}>
      <p
        style={{
          fontSize: "17px",
          fontWeight: "bold",
          marginBottom: "30px",
        }}
      >
        구독하시겠습니까?
      </p>
      <Table>
        {products &&
          products.map((item, index) => (
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
                        src={item.thumbnail_url}
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
                          {item.company}
                        </p>
                        <p style={{ color: "rgba(0, 0, 0, 0.87)" }}>
                          {item.name}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <input
                        type="text"
                        value={item.quantity}
                        title="상품개수"
                        className={styles.qty_input}
                      />
                    </div>
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <p>{item.price.toLocaleString()} 원</p>
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
                          component="form"
                          sx={{
                            "& > :not(style)": { m: 1, width: "25ch" },
                          }}
                          noValidate
                          autoComplete="off"
                        >
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
                            onClick={() => openSubAlert(item)}
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
                        </Box>
                      </RadioGroup>
                    </FormControl>
                  </TableCell>
                </TableRow>
              </TableBody>

            </>
        ))}
      </Table>
    </div>
  </>
  )
}

export default Subscription