import React, { useState } from 'react'
import { Container, Table, TableCell, TableHead, TableRow, TableBody } from "@mui/material";
import AddressAddModal from "./AddressAddModal"
import AddressEditModal from "./AddressEditModal"
import styles from "../Mypage.module.css"
import { useMediaQuery } from 'react-responsive';

function AddressTab() {
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [address, setAddress] = useState("")
  // axios 로 배송지 받아와 담는 list
  // const [addressList, setAddressList] = useState([])

  const isMobile = useMediaQuery({
    query: "(max-width : 768px)"
  });

  const handleModal = () => {
    setOpen((prev) => !prev)
  }

  const handleEditModal = () => {
    setOpenEdit((prev) => !prev)
  }

  // 삭제 함수
  const deleteAddress = () => {
    alert("삭제")
  }

  return (
    <div>
      {isMobile ? (
      <>
        <Container style={{ marginTop: "5%" }}>
          <h2>배송지 목록</h2>
          <div style={{ display: 'flex', justifyContent: "end" }}>
            <button onClick={handleModal} className={styles.address_add_button_mob}>등록</button>
          </div>
          <Table style={{ marginTop: '5%' }}>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ textAlign: 'center', lineHeight: '30px' }}>우리집</div>
                    <div style={{ display: 'flex' }}>
                      <div style={{ textAlign: 'center' }}><button className={styles.address_edit_button_mob} onClick={handleEditModal}>수정</button></div>
                      <div style={{ textAlign: 'center' }}><button className={styles.address_delete_button_mob} onClick={deleteAddress}>삭제</button></div>
                    </div>
                  </div>
                  <div style={{ marginTop: "2%" }}>
                    <div style={{ textAlign: 'start', marginTop: "2%" }}>서울특별시 가나다라구 마바사동 어디어디아파트가나다라마바사</div>
                    <div style={{ textAlign: 'start', marginTop: "2%" }}>010-1234-5678</div>
                  </div>         

                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <AddressAddModal open={open} setOpen={setOpen} address={address} setAddress={setAddress} />
          <AddressEditModal open={openEdit} setOpen={setOpenEdit} address={address} setAddress={setAddress} />
        </Container>
      </>) : (
      <>
        <Container style={{ marginTop: "5%" }}>
          <h1>배송지 목록</h1>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2 style={{ marginTop: "auto" }} >자주 쓰는 배송지를 편리하게 통합 관리 하세요!</h2>
            <button onClick={handleModal} className={styles.address_add_button}>배송지 등록</button>
          </div>
          <Table style={{ marginTop: '2%' }}>
            <TableHead style={{ boxShadow: "0px 5px 10px rgb(207 206 206)" }}>
              <TableRow style={{ backgroundColor: '#F2F5C8',  }}>
                <TableCell style={{ fontSize: "1rem", width: '10%', textAlign: 'center' }}>배송지</TableCell>
                <TableCell style={{ fontSize: "1rem", width: '30%', textAlign: 'center' }}>주소</TableCell>
                <TableCell style={{ fontSize: "1rem", width: '20%', textAlign: 'center' }}>연락처</TableCell>
                <TableCell style={{ fontSize: "1rem", width: '10%', textAlign: 'center' }}></TableCell>
                <TableCell style={{ fontSize: "1rem", width: '10%', textAlign: 'center' }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{ textAlign: 'center' }}>우리집</TableCell>
                <TableCell style={{ textAlign: 'center' }}>서울특별시</TableCell>
                <TableCell style={{ textAlign: 'center' }}>010-1234-5678</TableCell>
                <TableCell style={{ textAlign: 'center' }}><button className={styles.address_edit_button} onClick={handleEditModal}>수정</button></TableCell>
                <TableCell style={{ textAlign: 'center' }}><button className={styles.address_delete_button} onClick={deleteAddress}>삭제</button></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <AddressAddModal open={open} setOpen={setOpen} address={address} setAddress={setAddress} />
          <AddressEditModal open={openEdit} setOpen={setOpenEdit} address={address} setAddress={setAddress} />
        </Container>
      </>)}
    </div>
  )
}

export default AddressTab