import React, { useState } from 'react'
import { Container, Table, TableCell, TableHead, TableRow, TableBody } from "@mui/material";
import AddressAddModal from "./AddressAddModal"
import AddressEditModal from "./AddressEditModal"
import styles from "./Mypage.module.css"


function AddressTab() {
  const [open, setOpen] = useState(false)
  const [address, setAddress] = useState("")
  // axios 로 배송지 받아와 담는 list
  // const [addressList, setAddressList] = useState([])

  const handleModal = () => {
    setOpen((prev) => !prev)
  }

  // 삭제 함수
  const deleteAddress = () => {
    alert("삭제")
  }

  return (
    <div>
      <Container style={{ marginTop: "5%" }}>
        <h1>배송지 목록</h1>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 style={{ marginTop: "auto" }} >자주 쓰는 배송지를 편리하게 통합 관리 하세요!</h2>
          <button onClick={handleModal} className={styles.add_button}>배송지 등록</button>
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
              <TableCell style={{ textAlign: 'center' }}><button className={styles.edit_button} onClick={handleModal}>수정</button></TableCell>
              <TableCell style={{ textAlign: 'center' }}><button className={styles.delete_button} onClick={deleteAddress}>삭제</button></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <AddressAddModal open={open} setOpen={setOpen} address={address} setAddress={setAddress} />
        <AddressEditModal open={open} setOpen={setOpen} address={address} setAddress={setAddress} />
      </Container>
    </div>
  )
}

export default AddressTab