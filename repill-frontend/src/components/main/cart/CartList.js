import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DragHandleIcon from "@mui/icons-material/DragHandle";

function CartList({ cart, total, setTotal }) {
  const [product, setProduct] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [idList, setIdList] = useState([]);

  const getProduct = () => {
    let ids = [];

    cart.map((item, index) =>
      axios
        .get(`http://127.0.0.1:8000/api/v1/products/items/${item.product}`)
        .then((res) => {
          console.log(res.data);
          // setProduct((product) => [res.data, ...product]);
          setProduct((product) => [
            {
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
      getTotal();
    } else {
      setCheckList([]);
      setTotal(0);
    }
  };

  const getTotal = () => {
    setTotal(0);
    product.map((item, index) => setTotal((total) => total + item.price));
  };

  const onChangeEach = (e, id) => {
    console.log("onChangeEach: ", e.target.checked);
    // check되면 checkList에 상품 id 넣기
    const m = product.find((a) => a.id === id);

    if (e.target.checked) {
      setCheckList([...checkList, id]);
      setTotal((total) => total + m.price);
    } else {
      // check 해제하면, checkList에 해당 productId 아닌 것만 넣기..
      setCheckList(checkList.filter((unchecked) => unchecked !== id));

      setTotal((total) => total - m.price);
    }
  };

  useEffect(() => {
    setProduct([]);
    getProduct();
  }, [cart]);

  // useEffect(() => {
  //   checkList.map((list, index) => {
  //     const m = product.find((a) => a.id === list);
  //     setTotal((total) => total + m.price);
  //   });
  // }, [checkList]);

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
                {product.map((item, index) => (
                  <TableRow>
                    <TableCell style={{ textAlign: "center" }}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        onChange={(e) => onChangeEach(e, item.id)}
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
                          // onClick={() => quantitySub()}
                        ></RemoveIcon>
                        <input
                          type="text"
                          value={item.quantity}
                          title="상품개수"
                          className={styles.qty_input}
                          // onChange={onChange}
                          disabled
                        />
                        <AddIcon
                          className={styles.qty_icon}
                          // onClick={() => quantityAdd()}
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
    </>
  );
}

export default CartList;
