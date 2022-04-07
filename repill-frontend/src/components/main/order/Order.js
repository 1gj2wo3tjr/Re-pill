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
import {
  Link,
  useNavigate,
  useLocation,
  BrowserRouter,
  useHref,
} from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import Linked from "@mui/material/Link";
import Checkbox from "@mui/material/Checkbox";
import AddressModal from "./AddressModal";
import PayReady from "./PayReady";
import axios from "axios";
import Subscription from "./Subscription";

function Order() {
  let token = sessionStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const navigate = useNavigate();

  // navigate()로 보낸 값 받기
  const location = useLocation();
  console.log("state", location.state);
  const { orderList } = location.state;

  const [radio, setRadio] = useState("new");
  const [radioPay, setRadioPay] = useState("kakaopay");
  const [selector, setSelector] = useState(1);
  const [selectorAddress, setSelectorAddress] = useState(0);
  const [modal, setModal] = useState(false);
  const [address, setAddress] = useState("");
  const [pay, setPay] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState([]);
  const [newAddress, setNewAddress] = useState("");

  const [total, setTotal] = useState(0);
  const [finalOrder, setFinalOrder] = useState([]);

  const isMobile = useMediaQuery({
    query: "(max-width : 768px)",
  });

  const agreementCheck = () => {
    console.log("agreement ", agreement);
    setAgreement((prev) => !prev);

    // if (agreement === true) {
    //   goKakaoPay();
    // }
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/cart`);
  };

  const getAddressList = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/v1/accounts/address/`, {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data);
        setAddressList(res.data);
        // getSelectAddress(0);
      })
      .catch((err) => console.log(err));
  };

  // 기존.신규 배송지 메소드
  const handleChange = (e) => {
    console.log(e.target.value);
    setRadio(e.target.value);

    if (e.target.value === "new") {
      setSelectedAddress({
        id: "",
        address_name: "",
        address: "",
        detailed_address: "",
        phone_number: "",
        zipcode: "",
      });
      setNewAddress({ address_name: "" });
    } else {
      setAddress("");
      getSelectAddress(0);
    }
  };

  // 신규 배송지 입력 확인 event
  const onChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    setNewAddress({
      ...newAddress,
      [name]: value,
    });
  };

  const checkPay = (e) => {
    setRadioPay(e.target.value);
  };

  const getSelectAddress = (idx) => {
    // addressList의 index 가져오자
    const selected = addressList[idx];
    setSelectedAddress(selected);
  };

  const handleAddress = (event) => {
    setSelectorAddress(event.target.value);
    getSelectAddress(event.target.value);
  };

  const handleRequest = (e) => {
    setSelector(e.target.value);
  };

  const openModal = () => {
    setModal((prev) => !prev);
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

  const getTotal = () => {
    orderList.map((item, index) => setTotal((total) => total + item.price));
  };

  const getFinalOrder = () => {
    orderList.map((item, index) =>
      setFinalOrder((finalOrder) => [
        { number: item.id, quantity: item.quantity },
        ...finalOrder,
      ])
    );
  };

  let finalAddress = "";
  const openPay = () => {
    if (agreement) {
      setPay((prev) => !prev);

      // let finalAddress="" ;
      if (radio === "new") {
        console.log("신규");
        console.log(newAddress.address_name);

        if (
          newAddress.address_name === "" ||
          newAddress.address_name === undefined ||
          address.address === "" ||
          address.address === undefined ||
          newAddress.detailed_address === "" ||
          newAddress.detailed_address === undefined
        ) {
          alert("배송 정보를 입력해주세요.");
        } else {
          finalAddress = address.address + " " + newAddress.detailed_address;

          params.item_name = itemName;
          params.total_amount = total;

          axios({
            url: "/v1/payment/ready",
            method: "POST",
            headers: {
              Authorization: "KakaoAK de0e3076b485b703b1f1a4a2419440e6",
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            params,
          })
            .then((response) => {
              // 응답에서 필요한 data만 뽑는다.
              const {
                data: { next_redirect_pc_url, tid },
              } = response;
              // console.log("tid : ", tid);
              // 응답 data로 state 갱신
              setData({ next_redirect_pc_url, tid });
              window.localStorage.setItem("tid", tid);
              window.open(next_redirect_pc_url, "_self");

              axios
                .post(
                  `${process.env.REACT_APP_BASE_URL}/api/v1/accounts/order/`,
                  {
                    products: finalOrder,
                    address: finalAddress,
                    order_status: 1,
                    order_receive: newAddress.address_name,
                  },
                  { headers: headers }
                )
                .then((res) => {})
                .catch((err) => alert("주문실패ㅠㅠ"));
            })
            .catch((error) => console.log("error!", error));
          deleteCart();
        }
      } else {
        console.log("기존");
        finalAddress =
          selectedAddress.address + " " + selectedAddress.detailed_address;

        params.item_name = itemName;
        params.total_amount = total;

        console.log("approval_url", params.approval_url);
        console.log("fail ", params.fail_url);
        axios({
          url: "/v1/payment/ready",
          method: "POST",
          headers: {
            Authorization: "KakaoAK de0e3076b485b703b1f1a4a2419440e6",
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },

          params,
        })
          .then((response) => {
            // 응답에서 필요한 data만 뽑는다.
            const {
              data: { next_redirect_pc_url, tid },
            } = response;
            // console.log("tid : ", tid);
            // 응답 data로 state 갱신
            setData({ next_redirect_pc_url, tid });
            window.localStorage.setItem("tid", tid);

            // QR
            window.open(next_redirect_pc_url, "_self");

            axios
              .post(
                `${process.env.REACT_APP_BASE_URL}/api/v1/accounts/order/`,
                {
                  products: finalOrder,
                  address: finalAddress,
                  order_status: 1,
                  order_receive: selectedAddress.address_name,
                },
                { headers: headers }
              )
              .then((res) => {})
              .catch((err) => alert("주문실패ㅠㅠ"));
            deleteCart();
          })
          .catch((error) => console.log("error!", error));
      }
    } else {
      alert("동의해주세요");
    }
  };

  const [itemName, setItemName] = useState();

  const getItemName = () => {
    if (orderList.length > 1) {
      const string = orderList[0].name + " 외 " + (orderList.length - 1) + "건";
      setItemName(string);
    } else if (orderList.length === 1) {
      setItemName(orderList[0].name);
    }
  };

  const approval = process.env.REACT_APP_FRONT_BASE_URL + "/payResult";
  // const approval = process.env.REACT_APP_FRONT_BASE_URL + "/payResult";
  console.log("approval ", typeof approval);
  const fail = process.env.REACT_APP_FRONT_BASE_URL + "/cart";

  const [data, setData] = useState({
    next_redirect_pc_url: "",
    tid: "",
    params: {
      cid: "TC0ONETIME",
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      item_name: "리필",
      quantity: orderList.length,
      total_amount: 1,
      vat_amount: 0,
      tax_free_amount: 0,
      // router에 지정한 PayResult의 경로로 수정
      approval_url: approval,
      fail_url: fail,
      cancel_url: fail,
    },
  });

  const { params } = data;
  const { next_redirect_pc_url } = data;

  const deleteCart = () => {
    orderList.map((item, index) =>
      axios
        .delete(
          `${process.env.REACT_APP_BASE_URL}/api/v1/products/cart/${item.cartId}`,
          {
            headers: headers,
          }
        )
        .then((res) => {
          console.log("주문 및삭제");
          // navigate(`/product`);
        })
        .catch((err) => console.log(err))
    );
  };

  useEffect(() => {
    setTotal(0);
    setFinalOrder([]);
    getAddressList();
    getTotal();
    getFinalOrder();
    getItemName();
    setAgreement(false);
  }, []);

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
                {orderList &&
                  orderList.map((item, index) => (
                    <>
                      <TableBody>
                        <TableCell>
                          <div className={styles.mob_order_list}>
                            <img alt="" src={item.thumbnail_url} />
                            <div className={styles.mob_order_view}>
                              {/* <p>{item.company}</p> */}
                              <p>{item.name}</p>
                              <div
                                style={{
                                  marginTop: "15px",
                                  textAlign: "right",
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: "12px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    margin: "0",
                                  }}
                                >
                                  <p>구매 수량 </p>
                                  <p>{item.quantity}</p>
                                </div>
                                <p style={{ fontSize: "14px" }}>
                                  {item.price.toLocaleString()} 원
                                </p>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableBody>
                    </>
                  ))}
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
                        </RadioGroup>
                      </FormControl>
                      {radio === "existing" ? (
                        <div>
                          <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <Select
                              value={selectorAddress}
                              onChange={handleAddress}
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
                              className={styles.address_selector}
                              sx={{
                                "&.Mui-selected": {
                                  border: "1px solid #f2f5c8",
                                },
                              }}
                            >
                              {addressList.map((item, index) => (
                                <MenuItem value={index}>
                                  {item.address_name} ({item.address})
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      ) : null}
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
                      {radio === "existing" ? (
                        <input
                          type="text"
                          value={selectedAddress.address_name}
                          title="받는분"
                          className={styles.mob_address_input}
                          onChange={onChange}
                          name="address_name"
                        />
                      ) : (
                        <input
                          type="text"
                          value={newAddress.address_name}
                          title="받는분"
                          className={styles.mob_address_input}
                          onChange={onChange}
                          name="address_name"
                          defaultValue=""
                        />
                      )}
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
                        {address ? (
                          <input
                            type="text"
                            value={address.zonecode}
                            title="우편번호"
                            className={styles.mob_address_input}
                            defaultValue=""
                            disabled
                          />
                        ) : (
                          <input
                            type="text"
                            value={selectedAddress.zipcode}
                            title="우편번호"
                            className={styles.mob_address_input}
                            defaultValue=""
                            disabled
                          />
                        )}
                        <Button
                          className={styles.mob_button_search}
                          onClick={openModal}
                        >
                          <p>우편번호 검색</p>
                        </Button>
                      </div>
                      {address ? (
                        <input
                          type="text"
                          value={address.address}
                          title="주소"
                          className={styles.mob_address_input}
                          style={{ width: "100%", marginBottom: "15px" }}
                          defaultValue=""
                          disabled
                        />
                      ) : (
                        <input
                          type="text"
                          value={selectedAddress.address}
                          title="주소"
                          className={styles.mob_address_input}
                          style={{ width: "100%", marginBottom: "15px" }}
                          defaultValue=""
                          disabled
                        />
                      )}
                      {radio === "existing" ? (
                        <input
                          type="text"
                          value={selectedAddress.detailed_address}
                          title="상세주소"
                          className={styles.mob_address_input}
                          style={{ width: "100%" }}
                        />
                      ) : (
                        <input
                          type="text"
                          value={newAddress.detailed_address}
                          title="상세주소"
                          className={styles.mob_address_input}
                          style={{ width: "100%" }}
                          onChange={onChange}
                          name="detailed_address"
                          defaultValue=""
                        />
                      )}
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
                        type="text"
                        value={selectedAddress.phone_number}
                        title="휴대폰번호"
                        className={styles.mob_address_input}
                        style={{ width: "100%" }}
                        defaultValue=""
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
                  {total.toLocaleString()} 원
                </p>
              </div>
              <div className={styles.mob_agreement}>
                <input
                  type="checkbox"
                  onChange={agreementCheck}
                  checked={agreement}
                  style={{ width: "18px", height: "18px", margin: "15px 0" }}
                />
                <div style={{ fontSize: "12px", margin: "10px" }}>
                  <p style={{ margin: "0px" }}>
                    <span style={{ fontWeight: "bold" }}>(필수)</span> 구매하실
                    상품의 결제정보를 확인하였으며,
                  </p>
                  <p>구매진행에 동의합니다.</p>
                </div>
              </div>

              <button className={styles.mob_button_buy} onClick={openPay}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CreditScoreIcon
                    style={{ marginRight: "10px" }}
                  ></CreditScoreIcon>
                  <p>결제하기</p>
                </div>
              </button>
            </div>
          </Container>
          {modal ? (
            <>
              <AddressModal
                modal={modal}
                setModal={setModal}
                address={address}
                setAddress={setAddress}
              />
            </>
          ) : null}
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
                        width: "50%",
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
                  </TableRow>
                </TableHead>
                {orderList &&
                  orderList.map((item, index) => (
                    <>
                      <TableBody>
                        <TableCell>
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
                              // onChange={onChange}
                              // defaultValue=""
                            />
                          </div>
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          <p>{item.price.toLocaleString()} 원</p>
                        </TableCell>
                      </TableBody>
                    </>
                  ))}
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
                    <TableCell
                      className={styles.address_right}
                      // style={{ height: "79px" }}
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        height: "79px",
                      }}
                    >
                      <div style={{ marginTop: "5px" }}>
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            style={{
                              fontSize: "14px",
                              marginLeft: "22px",
                            }}
                            value={radio}
                            onChange={handleChange}
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: "14px",
                              },
                            }}
                          >
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
                          </RadioGroup>
                        </FormControl>
                      </div>
                      {radio === "existing" ? (
                        <div>
                          <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <Select
                              value={selectorAddress}
                              onChange={handleAddress}
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
                              className={styles.address_selector}
                              sx={{
                                "&.Mui-selected": {
                                  border: "1px solid #f2f5c8",
                                },
                              }}
                            >
                              {addressList.map((item, index) => (
                                <MenuItem value={index}>
                                  {item.address_name} ({item.address})
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      ) : null}
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
                      {radio === "existing" ? (
                        <input
                          type="text"
                          value={selectedAddress.address_name}
                          title="받는분"
                          className={styles.address_input}
                          onChange={onChange}
                          name="address_name"
                        />
                      ) : (
                        <input
                          type="text"
                          value={newAddress.address_name}
                          title="받는분"
                          className={styles.address_input}
                          onChange={onChange}
                          name="address_name"
                          defaultValue=""
                        />
                      )}
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
                        {address ? (
                          <input
                            type="text"
                            value={address.zonecode}
                            title="우편번호"
                            className={styles.address_input}
                            defaultValue=""
                            disabled
                          />
                        ) : (
                          <input
                            type="text"
                            value={selectedAddress.zipcode}
                            title="우편번호"
                            className={styles.address_input}
                            defaultValue=""
                            disabled
                          />
                        )}
                        <Button
                          className={styles.button_search}
                          onClick={openModal}
                        >
                          <p>우편번호 검색</p>
                        </Button>
                      </div>
                      <div style={{ marginTop: "15px" }}>
                        {address ? (
                          <input
                            type="text"
                            value={address.address}
                            title="주소"
                            defaultValue=""
                            className={styles.address_input}
                            style={{ width: "330px" }}
                            disabled
                          />
                        ) : (
                          <input
                            type="text"
                            value={selectedAddress.address}
                            title="주소"
                            defaultValue=""
                            className={styles.address_input}
                            style={{ width: "330px" }}
                            disabled
                          />
                        )}
                        {radio === "existing" ? (
                          <input
                            type="text"
                            value={selectedAddress.detailed_address}
                            title="상세주소"
                            // defaultValue=""
                            className={styles.address_input}
                          />
                        ) : (
                          <input
                            type="text"
                            value={newAddress.detailed_address}
                            title="상세주소"
                            defaultValue=""
                            className={styles.address_input}
                            onChange={onChange}
                            name="detailed_address"
                          />
                        )}
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
                        type="text"
                        value={selectedAddress.phone_number}
                        title="휴대폰번호"
                        defaultValue=""
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
                        </RadioGroup>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <Subscription orderList={orderList} />

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
                  {total.toLocaleString()} 원
                </p>
              </div>
              <div className={styles.agreement}>
                <div style={{ margin: "11px" }}>
                  <input
                    type="checkbox"
                    onChange={agreementCheck}
                    checked={agreement}
                    style={{ width: "18px", height: "18px" }}
                  />
                </div>
                <div>
                  <p style={{ fontSize: "15px", lineHeight: "37px" }}>
                    <span style={{ fontWeight: "bold" }}>(필수)</span> 구매하실
                    상품의 결제정보를 확인하였으며, 구매진행에 동의합니다.
                  </p>
                </div>
              </div>
              {/* <Link to={`/orderCompleted`}> */}
              {/* <Link to={`/payReady`}> */}
              <button className={styles.button_buy} onClick={openPay}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CreditScoreIcon
                    style={{ marginRight: "10px" }}
                  ></CreditScoreIcon>
                  <p>결제하기</p>
                </div>
              </button>
              {/* </Link> */}
            </div>
            {modal ? (
              <>
                <AddressModal
                  modal={modal}
                  setModal={setModal}
                  address={address}
                  setAddress={setAddress}
                />
              </>
            ) : null}
            {/* {pay ? <PayReady open={pay} setOpen={setPay} /> : null} */}
          </Container>
        </div>
      )}
    </>
  );
}

export default Order;
