import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import AddressAddModal from "./AddressAddModal";
import AddressEditModal from "./AddressEditModal";
import styles from "../Mypage.module.css";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import Category from "../../product/Category";

function AddressTab() {
  let token = sessionStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [address, setAddress] = useState("");
  const [addressList, setAddressList] = useState([]);
  const [data, setData] = useState("");

  const isMobile = useMediaQuery({
    query: "(max-width : 768px)",
  });

  const handleModal = () => {
    setOpen((prev) => !prev);
  };

  const handleEditModal = (item) => {
    setData(item);
    setOpenEdit((prev) => !prev);
  };

  // 삭제 함수
  const deleteAddress = (item) => {
    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/api/v1/accounts/address/${item.id}`,
        {
          headers: headers,
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    window.location.reload(true);
  };

  const getAddress = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/accounts/address/`,
        {
          headers: headers,
        }
      );
      console.log(response.data);
      setAddressList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {isMobile ? (
        <>
          <Container style={{ marginTop: "5%" }}>
            <h2>배송지 목록</h2>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <button
                onClick={handleModal}
                className={styles.address_add_button_mob}
              >
                등록
              </button>
            </div>
            <Table style={{ marginTop: "5%" }}>
              <TableBody>
                {addressList.map((item) => (
                  <TableRow>
                    <TableCell>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{ textAlign: "center", lineHeight: "30px" }}
                        >
                          {item.address_name}
                        </div>
                        <div style={{ display: "flex" }}>
                          <div style={{ textAlign: "center" }}>
                            <button
                              className={styles.address_edit_button_mob}
                              onClick={() => handleEditModal(item)}
                            >
                              수정
                            </button>
                          </div>
                          <div style={{ textAlign: "center" }}>
                            <button
                              className={styles.address_delete_button_mob}
                              onClick={() => deleteAddress(item)}
                            >
                              삭제
                            </button>
                          </div>
                        </div>
                      </div>
                      <div style={{ marginTop: "2%" }}>
                        <div style={{ textAlign: "start", marginTop: "2%" }}>
                          {item.address}
                          {item.detailed_address}
                        </div>
                        <div style={{ textAlign: "start", marginTop: "2%" }}>
                          {item.phone_number}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <AddressAddModal
              open={open}
              setOpen={setOpen}
              address={address}
              setAddress={setAddress}
            />
            <AddressEditModal
              open={openEdit}
              setOpen={setOpenEdit}
              address={address}
              setAddress={setAddress}
              data={data}
            />
          </Container>
        </>
      ) : (
        <>
          <div style={{ display: "inline" }}>
            <Category />
          </div>
          <Container style={{ marginTop: "5%" }}>
            <h1>배송지 목록</h1>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2 style={{ marginTop: "auto" }}>
                자주 쓰는 배송지를 편리하게 통합 관리 하세요!
              </h2>
              <button
                onClick={handleModal}
                className={styles.address_add_button}
              >
                배송지 등록
              </button>
            </div>
            <Table style={{ marginTop: "2%" }}>
              <TableHead style={{ boxShadow: "0px 5px 10px rgb(207 206 206)" }}>
                <TableRow style={{ backgroundColor: "#F2F5C8" }}>
                  <TableCell
                    style={{
                      fontSize: "1rem",
                      width: "10%",
                      textAlign: "center",
                    }}
                  >
                    배송지
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "1rem",
                      width: "30%",
                      textAlign: "center",
                    }}
                  >
                    주소
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "1rem",
                      width: "20%",
                      textAlign: "center",
                    }}
                  >
                    연락처
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "1rem",
                      width: "10%",
                      textAlign: "center",
                    }}
                  ></TableCell>
                  <TableCell
                    style={{
                      fontSize: "1rem",
                      width: "10%",
                      textAlign: "center",
                    }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {addressList.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell style={{ textAlign: "center" }}>
                      {item.address_name}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {item.address}
                      {item.detailed_address}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {item.phone_number}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <button
                        className={styles.address_edit_button}
                        onClick={() => handleEditModal(item)}
                      >
                        수정
                      </button>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <button
                        className={styles.address_delete_button}
                        onClick={() => deleteAddress(item)}
                      >
                        삭제
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <AddressAddModal
              open={open}
              setOpen={setOpen}
              address={address}
              setAddress={setAddress}
            />
            <AddressEditModal
              open={openEdit}
              setOpen={setOpenEdit}
              address={address}
              setAddress={setAddress}
              data={data}
            />
          </Container>
        </>
      )}
    </div>
  );
}

export default AddressTab;
