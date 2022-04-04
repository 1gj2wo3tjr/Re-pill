import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Container,
} from "@mui/material";
import axios from "axios";
import styles from "./Cart.module.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function CartList({ cart, total, setTotal, setChecked }) {
  let token = sessionStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const navigate = useNavigate();
  const isMobile = useMediaQuery({
    query: "(max-width : 768px)",
  });

  const [product, setProduct] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [idList, setIdList] = useState([]);

  const getProduct = () => {
    let ids = [];

    cart.map((item, index) =>
      axios
        .get(`http://127.0.0.1:8000/api/v1/products/items/${item.product}`)
        .then((res) => {
          // console.log(cart);
          console.log(res.data);
          // setProduct((product) => [res.data, ...product]);
          setProduct((product) => [
            {
              cartId: item.id,
              id: res.data.id,
              name: res.data.name,
              company: res.data.company,
              thumbnail_url: res.data.thumbnail_url,
              original: res.data.price,
              quantity: item.quantity,
              price: res.data.price * item.quantity,
            },
            ...product,
          ]);

          ids[index] = res.data.id;
        })
        .catch((err) => console.log(err))
    );

    setIdList(ids);
  };

  // checkbox 전체 선택 => checkList에 product id값 다 넣기, 해제하면 빈 배열
  const onCheckedAll = (e) => {
    console.log("전체 선택 클릭 : ", e.target.checked);
    // setCheckList(e.target.checked ? idList : []);
    if (e.target.checked) {
      setCheckList(idList);
      setChecked(idList);
      getTotal();
    } else {
      setCheckList([]);
      setChecked([]);
      setTotal(0);
    }
  };

  const getTotal = () => {
    setTotal(0);
    product.map((item, index) => setTotal((total) => total + item.price));
  };

  const onChangeEach = (e, id, cartId) => {
    console.log("onChangeEach: ", e.target.checked);
    // check되면 checkList에 상품 id 넣기
    const m = product.find((a) => a.id === id);
    // console.log(checkList);
    // console.log(m);
    if (e.target.checked) {
      setCheckList([...checkList, id]);
      setChecked([...checkList, id]);
      setTotal((total) => total + m.price);
    } else {
      // check 해제하면, checkList에 해당 productId 아닌 것만 넣기..
      setCheckList(checkList.filter((unchecked) => unchecked !== id));
      setChecked(checkList.filter((unchecked) => unchecked !== id));

      setTotal((total) => total - m.price);
    }
  };

  const quantitySub = (item) => {
    if (item.quantity > 1) {
      const a = --item.quantity;
      axios
        .patch(
          `http://127.0.0.1:8000/api/v1/products/cart/${item.cartId}`,
          {
            quantity: a,
            product: item.id,
          },
          {
            headers: headers,
          }
        )
        .then((res) => {
          setProduct(
            product.map((p) =>
              p.id === item.id
                ? { ...p, quantity: a, price: a * item.original }
                : p
            )
          );
          setCheckList(
            checkList.includes(item.id) ? checkList : [...checkList, item.id]
          );
          setChecked(
            checkList.includes(item.id) ? checkList : [...checkList, item.id]
          );
          console.log("total : ", total);
          if (total === 0 || !checkList.includes(item.id)) {
            setTotal((total) => total + item.price - item.original);
          } else {
            setTotal((total) => total - item.original);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const quantityAdd = (item) => {
    if (item.quantity < 999) {
      const a = ++item.quantity;
      axios
        .patch(
          `http://127.0.0.1:8000/api/v1/products/cart/${item.cartId}`,
          {
            quantity: a,
            product: item.id,
          },
          {
            headers: headers,
          }
        )
        .then((res) => {
          setProduct(
            product.map((p) =>
              p.id === item.id
                ? { ...p, quantity: a, price: a * item.original }
                : p
            )
          );
          setCheckList(
            checkList.includes(item.id) ? checkList : [...checkList, item.id]
          );
          setChecked(
            checkList.includes(item.id) ? checkList : [...checkList, item.id]
          );
          console.log("total : ", total);
          if (total === 0 || !checkList.includes(item.id)) {
            setTotal((total) => total + item.price + item.original);
          } else {
            setTotal((total) => total + item.original);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const deleteBtn = () => {
    if (checkList.length === 0) {
      alert("선택된 상품이 없습니다!");
    } else {
      console.log(checkList); // 상품 아이디 [4,7]
      // product에서 [4,7] => cartId

      checkList.map((item, index) => {
        console.log(item);
        const deleteList = product.find((a) => a.id === item);
        console.log(deleteList);

        axios
          .delete(
            `http://127.0.0.1:8000/api/v1/products/cart/${deleteList.cartId}`,
            { headers: headers }
          )
          .then((res) => {
            console.log(res);
            console.log("삭제");
            window.location.reload(true);
          })
          .catch((err) => console.log(err));
      });
    }
  };

  const partOrder = () => {
    console.log(checkList);
    const orderList = checkList.map((item, index) =>
      product.find((p) => p.id === item)
    );
    console.log(orderList);
    navigate(`/order`, { state: { orderList: orderList } });
  };

  const allOrder = () => {
    navigate(`/order`, { state: { orderList: product } });
  };

  useEffect(() => {
    setProduct([]);
    setCheckList([]);
    setChecked([]);
    setTotal(0);
    getProduct();
  }, [cart]);

  return (
    <>
      <style>
        {`
        .css-i4bv87-MuiSvgIcon-root{
          width: 30px;
          height: 30px;
        }
        .css-1ex1afd-MuiTableCell-root, .css-1ygcj2i-MuiTableCell-root{
          font-family:"Noto Sans KR";
        }
      `}
      </style>

      {isMobile ? (
        <Table style={{ width: "100%" }}>
          <TableHead>
            <TableRow style={{ backgroundColor: "#F2F5C8" }}>
              <TableCell
                style={{
                  fontSize: "1rem",
                  width: "5%",
                  textAlign: "left",
                }}
              >
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  onChange={onCheckedAll}
                  checked={checkList.length === idList.length}
                />
              </TableCell>
              <TableCell>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <button className={styles.mob_btn_delete} onClick={deleteBtn}>
                    <p>선택 상품 삭제</p>
                  </button>
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {cart.length !== 0 ? (
                <>
                  {product &&
                    product.map((item, index) => (
                      <TableRow>
                        <TableCell>
                          <input
                            type="checkbox"
                            className={styles.checkbox}
                            onChange={(e) =>
                              onChangeEach(e, item.id, item.cartId)
                            }
                            checked={checkList.includes(item.id)}
                          />
                        </TableCell>
                        <TableCell style={{ paddingLeft: "0" }}>
                          <div
                            style={{
                              display: "flex",
                              height: "100px",
                              alignItems: "center",
                            }}
                          >
                            <Link to={`/product/${item.id}`}>
                              <div
                                style={{
                                  objectFit: "contain",
                                  height: "90px",
                                  cursor: "pointer",
                                  marginRight: "20px",
                                }}
                              >
                                <img
                                  src={item.thumbnail_url}
                                  alt=""
                                  style={{
                                    objectFit: "contain",
                                    height: "100%",
                                    cursor: "pointer",
                                  }}
                                />
                              </div>
                            </Link>
                            <Link to={`/product/${item.id}`}>
                              <div style={{ fontSize: "13px" }}>
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
                            </Link>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: "20px",
                            }}
                          >
                            <div>
                              <RemoveIcon
                                style={{ marginLeft: "0" }}
                                className={styles.qty_icon}
                                onClick={() => quantitySub(item)}
                              ></RemoveIcon>
                              <input
                                type="text"
                                value={item.quantity}
                                title="상품개수"
                                className={styles.mob_qty_input}
                                // onChange={changQty}
                                disabled
                              />
                              <AddIcon
                                className={styles.qty_icon}
                                onClick={() => quantityAdd(item)}
                              ></AddIcon>
                            </div>
                            <div>
                              <p
                                style={{ fontSize: "17px", fontWeight: "bold" }}
                              >
                                {item.price.toLocaleString()} 원
                              </p>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </>
              ) : (
                <>
                  <TableRow>
                    <TableCell colSpan={4}>
                      <div
                        style={{
                          width: "100%",
                          height: "100px",
                          textAlign: "center",
                          display: "table",
                          margin: "30px 0",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "15px",
                            display: "table-cell",
                            verticalAlign: "middle",
                          }}
                        >
                          장바구니 목록이 없습니다. 😥
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                </>
              )}
            </>
          </TableBody>
        </Table>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button className={styles.btn_delete} onClick={deleteBtn}>
              <p>선택 상품 삭제</p>
            </button>
          </div>

          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#F2F5C8" }}>
                <TableCell
                  style={{
                    fontSize: "1rem",
                    width: "5%",
                    textAlign: "center",
                  }}
                >
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    onChange={onCheckedAll}
                    checked={checkList.length === idList.length}
                  />
                </TableCell>
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
              </TableRow>
            </TableHead>
            <TableBody>
              <>
                {cart.length !== 0 ? (
                  <>
                    {product &&
                      product.map((item, index) => (
                        <TableRow>
                          <TableCell style={{ textAlign: "center" }}>
                            <input
                              type="checkbox"
                              className={styles.checkbox}
                              onChange={(e) =>
                                onChangeEach(e, item.id, item.cartId)
                              }
                              checked={checkList.includes(item.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <div
                              style={{
                                display: "flex",
                                height: "100px",
                                alignItems: "center",
                              }}
                            >
                              <Link to={`/product/${item.id}`}>
                                <div
                                  style={{
                                    objectFit: "contain",
                                    height: "100px",
                                    cursor: "pointer",
                                    marginRight: "70px",
                                  }}
                                >
                                  <img
                                    src={item.thumbnail_url}
                                    alt=""
                                    style={{
                                      objectFit: "contain",
                                      height: "100%",
                                      cursor: "pointer",
                                    }}
                                  />
                                </div>
                              </Link>
                              <Link to={`/product/${item.id}`}>
                                <div style={{ fontSize: "13px" }}>
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
                              </Link>
                            </div>
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <RemoveIcon
                                className={styles.qty_icon}
                                onClick={() => quantitySub(item)}
                              ></RemoveIcon>
                              <input
                                type="text"
                                value={item.quantity}
                                title="상품개수"
                                className={styles.qty_input}
                                // onChange={changQty}
                                disabled
                              />
                              <AddIcon
                                className={styles.qty_icon}
                                onClick={() => quantityAdd(item)}
                              ></AddIcon>
                            </div>
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            <p>{item.price.toLocaleString()} 원</p>
                          </TableCell>
                        </TableRow>
                      ))}
                  </>
                ) : (
                  <>
                    <TableRow>
                      <TableCell colSpan={4}>
                        <div
                          style={{
                            width: "100%",
                            height: "100px",
                            textAlign: "center",
                            display: "table",
                            margin: "30px 0",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "15px",
                              display: "table-cell",
                              verticalAlign: "middle",
                            }}
                          >
                            장바구니 목록이 없습니다. 😥
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </>
            </TableBody>
          </Table>
          <div className={styles.cart_bottom}>
            <div
              style={{
                width: "300px",
                textAlign: "center",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "end",
                marginTop: "20px",
              }}
            >
              <p style={{ margin: "0px", fontSize: "15px" }}>
                총 {checkList.length}개의 상품 금액
              </p>
              <p
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  color: "#f27370",
                }}
              >
                {total.toLocaleString()} 원
              </p>
            </div>
          </div>
          <div className={styles.cart_btn}>
            <button className={styles.button_check} onClick={partOrder}>
              <p>선택 상품 주문</p>
            </button>

            <button className={styles.button_all} onClick={allOrder}>
              <p>전체 상품 주문</p>
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default CartList;
