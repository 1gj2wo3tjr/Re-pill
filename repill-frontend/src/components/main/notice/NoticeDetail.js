import React, { useState, useEffect } from 'react'
import { Container, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../common/navbar"
import styles from './Notice.module.css';
import axios from "axios";

function NoticeDetail() {
  let params = useParams()
  const navigate = useNavigate()
  const goNotice = () => {
    navigate(-1)
  }
  const [detail, setDetail] = useState([])

  const getDetail = async() => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
    setDetail(response.data)
  }

  useEffect(() => {
    getDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <>
    <Navbar />
      <Container>
        <Table style={{ marginTop: '5%' }}>
          <TableHead>
            <TableRow style={{ backgroundColor: '#F2F5C8', boxShadow: "0px 5px 10px rgb(207 206 206)" }}>
              <TableCell>
                <button className={styles.notice_button}>공지사항</button>
                <span className={styles.notice_title}>{detail.title}</span>
              </TableCell>
              <TableCell align="right"><span className={styles.notice_date}>날짜</span></TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={styles.notice_content}>
            <Container style={{ marginTop: '2%' }}>
              {detail.body}
            </Container>
          </TableBody>
        </Table>
        <button className={styles.goNotice_button} onClick={goNotice}>목록보기</button>
      </Container>
    </>
  )
}

export default NoticeDetail