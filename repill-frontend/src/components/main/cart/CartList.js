import React, { useState, useEffect } from "react";
import axios from "axios";
import { TableCell, TableRow } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "./Cart.module.css";
import { Link } from "react-router-dom";

function CartList({ index, cart, productId, total, setTotal }) {
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [original, setOriginal] = useState(""); // 상품 금액
  const [price, setPrice] = useState(""); // 수량에 따른 상품 금액
  const [finalSum, setFinalSum] = useState(total);
  const [finalRes, setFinalRes] = useState([]);

  const getProduct = () => {
    axios
      .get(`http://127.0.0.1:8000/api/v1/products/items/${productId}`)
      .then((res) => {
        console.log(res.data);
        // console.log(cart);
        // console.log(index);
        setProduct(res.data);
        setOriginal(res.data.price);
        setQuantity(cart.quantity);
        setPrice(res.data.price * cart.quantity);
      })
      .catch((err) => console.log(err));
  };

  const quantitySub = () => {
    let q = quantity;
    if (quantity > 1) {
      q--;
      setQuantity(q);
      setPrice(q * original);
    }
  };

  const quantityAdd = () => {
    let q = quantity;
    if (quantity < 999) {
      q++;
      setQuantity(q);
      setPrice(q * original);
    }
  };

  useEffect(() => {
    getProduct();
    setFinalSum(finalSum);
    setFinalRes(finalRes);
  }, []);

  return (
    <TableRow>
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
      <TableCell style={{ textAlign: "center" }}>{/* 체크박스 */}</TableCell>
      <TableCell style={{ textAlign: "center" }}>
        {/* <Link to={`/product/${product.id}`}> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            height: "100px",
            alignItems: "center",
          }}
        >
          <Link to={`/product/${product.id}`}>
            <div
              style={{
                objectFit: "contain",
                height: "100px",
                cursor: "pointer",
              }}
            >
              <img
                src={product.thumbnail_url}
                alt=""
                style={{
                  objectFit: "contain",
                  height: "100%",
                  cursor: "pointer",
                }}
              />
            </div>
          </Link>
          <Link to={`/product/${product.id}`}>
            <p style={{ color: "rgba(0, 0, 0, 0.87)" }}>{product.name}</p>
          </Link>
        </div>
        {/* </Link> */}
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
            onClick={() => quantitySub()}
          ></RemoveIcon>
          <input
            type="text"
            value={quantity}
            title="상품개수"
            className={styles.qty_input}
            // onChange={onChange}
            disabled
          />
          <AddIcon
            className={styles.qty_icon}
            onClick={() => quantityAdd()}
          ></AddIcon>
        </div>
      </TableCell>
      <TableCell style={{ textAlign: "center" }}>
        {/* {(product.price * quantity).toLocaleString()} */}
        <p>{price}</p>
        {/* <input type="text" value={price} onChange={onChange} /> */}
      </TableCell>
      <TableCell style={{ textAlign: "center" }}>무료배송</TableCell>
    </TableRow>
  );
}

export default CartList;
