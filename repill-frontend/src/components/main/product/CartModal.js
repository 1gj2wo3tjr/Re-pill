import React, { useState, useEffect } from "react";
import { Header, Icon, Modal } from "semantic-ui-react";
import { useMediaQuery } from "react-responsive";
import styles from "./Product.module.css";
import { Link, useNavigate } from "react-router-dom";

function CartModal({ open, setOpen }) {
  const isMobile = useMediaQuery({
    query: "(max-width : 768px)",
  });

  const navigate = useNavigate();

  const goProduct = () => {
    setOpen(false);
    navigate(`/product`, { state: { keyword: "" } });
  };

  return (
    <>
      <style>
        {`
          .ui.header>.icon+.content{
            font-family:"Noto Sans KR";
          }
      `}
      </style>
      {isMobile ? (
        <Modal open={open} style={{ position: "relative", width: "300px" }}>
          <Header
            icon="add to cart"
            content="장바구니 담기 성공!"
            style={{ marginTop: "10px" }}
          />
          <Modal.Content style={{ margin: "30px 0", textAlign: "center" }}>
            <p style={{ fontSize: "15px" }}>장바구니에 추가되었습니다.</p>
          </Modal.Content>
          <Modal.Actions style={{ textAlign: "center" }}>
            <button
              className={styles.mob_modal_btn_continue}
              onClick={goProduct}
            >
              <Icon name="remove" /> <p>쇼핑 계속하기</p>
            </button>
            <Link to={`/cart`}>
              <button
                className={styles.mob_modal_btn_cart}
                onClick={() => setOpen(false)}
              >
                <Icon name="checkmark" /> <p>장바구니 확인</p>
              </button>
            </Link>
          </Modal.Actions>
        </Modal>
      ) : (
        <Modal open={open} style={{ position: "relative", width: "400px" }}>
          <Header
            icon="add to cart"
            content="장바구니 담기 성공!"
            style={{ marginTop: "10px" }}
          />
          <Modal.Content style={{ margin: "30px 0", textAlign: "center" }}>
            <p style={{ fontSize: "15px" }}>장바구니에 추가되었습니다.</p>
          </Modal.Content>
          <Modal.Actions style={{ textAlign: "center" }}>
            <button className={styles.modal_btn_continue} onClick={goProduct}>
              <Icon name="remove" /> <p>쇼핑 계속하기</p>
            </button>
            <Link to={`/cart`}>
              <button
                className={styles.modal_btn_cart}
                onClick={() => setOpen(false)}
              >
                <Icon name="checkmark" /> <p>장바구니 확인</p>
              </button>
            </Link>
          </Modal.Actions>
        </Modal>
      )}
    </>
  );
}

export default CartModal;
