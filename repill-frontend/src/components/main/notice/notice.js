import React, { useState } from 'react'
import { Button } from 'semantic-ui-react';
import { Table, TableCell, TableHead, TableRow, Container } from "@mui/material";
import Content from "./Content"
import ModalCompo from "./ModalCompo"
// import styles from './Notice.module.css';

const btnStyle = {
  color: "black",
  background: "#F2F5C8",
  padding: ".375rem .75rem",
  border: "0",
  borderRadius: "25px",
  fontSize: "1rem",
  lineHeight: 1.5,
  boxShadow: "0px 5px 10px rgb(207 206 206)",
  marginLeft: '10px'
};

function Notice() {
  const [open, setOpen] = useState(false)
  const openModal = () => {
    setOpen((prev) => !prev)
  }
  const [keyword, setKeyword] = useState("")
  const searchTitle = (event) => {
    setKeyword(event.target.value)
  }

  return (
    <div >
      <Container style={{ marginTop: '5%' }}>
        <h2>공지사항</h2>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {/* <Search 
            placeholder='Search'
            onChange={inputTitle}
          /> */}
          <input type="text" placeholder="search the title" onChange={searchTitle} value={keyword} />
          <Button style={btnStyle} onClick={openModal}>+작성하기</Button>
        </div>
        <Table style={{ marginTop: '2%' }}>
          <TableHead>
            <TableRow style={{ backgroundColor: '#F2F5C8',  }}>
              <TableCell style={{ fontSize: "1rem", width: '15%', textAlign: 'center' }}>글번호</TableCell>
              <TableCell style={{ fontSize: "1rem", width: '40%', textAlign: 'center' }}>제목</TableCell>
              <TableCell style={{ fontSize: "1rem", width: '15%', textAlign: 'center' }}>조회수</TableCell>
              <TableCell style={{ fontSize: "1rem", width: '15%', textAlign: 'center' }}>작성자</TableCell>
              <TableCell style={{ fontSize: "1rem", width: '15%', textAlign: 'center' }}>작성일</TableCell>
            </TableRow>
          </TableHead>
          <Content keyword={keyword} />
        </Table>
      </Container>
      <ModalCompo open={open} setOpen={setOpen} />
    </div>
  )
}

export default Notice