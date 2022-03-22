import React, { useState, useEffect } from 'react'
import { Container, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from './Notice.module.css';
import axios from "axios";
import EditNoticeModal from './EditNoticeModal';

function NoticeDetail() {
  let params = useParams()
  const navigate = useNavigate()
  const goNotice = () => {
    navigate('/notice/')
  }
  const [detail, setDetail] = useState([])
  const [list, setList] = useState()
  const [previous, setPrevious] = useState()
  const [next, setNext] = useState()
  const [user, setUser] = useState("admin")
  const [open, setOpen] = useState(false)
  const [slicedDate, setSlicedDate] = useState("")

  const getDetail = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/community/notice/${params.id}`)
    setDetail(response.data)
    let plus_views = detail.views + 1
    setSlicedDate(response.data.created_at.slice(0, 10))
  }

  const getLength = async () => {
    const notices = await axios.get("http://127.0.0.1:8000/api/v1/community/notice/")
    setList(notices.data.length)
  }

  const getPrev = async () => {
    if (params.id > 1) {
      const previousNotice = await axios.get(`http://127.0.0.1:8000/api/v1/community/notice/${params.id-1}`)
      setPrevious(previousNotice.data.title)
    }
  }

  const getNext = async () => {
    let int_params = parseInt(params.id)
    let list_len = parseInt(list)
    if (int_params !== list_len) {
      const nextNotice = await axios.get(`http://127.0.0.1:8000/api/v1/community/notice/${int_params+1}`)
      console.log(nextNotice)
      setNext(nextNotice.data.title)
    }
  }

  // data 확인 용 테스트 함수
  const prac = async () => {
    const exam = await axios.get(`http://127.0.0.1:8000/api/v1/community/notice/`).catch((err) => console.log(err))
    console.log(exam)
  }

  const openModal = () => {
    setOpen((prev) => !prev)
  }

  useEffect(() => {
    getDetail()
    getLength()
    getPrev()
    getNext()
    prac()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id])

  return (
    <>
      <Container>
        <h2 style={{ marginTop: "5%" }}>공지사항</h2>
        {user==="admin" ? (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className={styles.edit_notice_button} onClick={openModal}>수정하기</button>
          </div>) : null}
        <Table style={{ marginTop: "3%" }}>
          <TableHead>
            <TableRow style={{ backgroundColor: '#F2F5C8', boxShadow: "0px 5px 10px rgb(207 206 206)" }}>
              <TableCell style={{ display: "grid", gridTemplateColumns: "10% 80% 10%" }}>
                <div></div>
                <div className={styles.notice_title}>{detail.title}</div>
                <div className={styles.notice_date}>{slicedDate}</div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow style={{ height: "30rem" }}>
              <TableCell style={{ fontSize: "2rem", textAlign: "center" }}>
                {detail.content}
              </TableCell>
            </TableRow>
            {params.id==="1000" ? (null) : (
              <>
                <TableRow className={styles.notice_link}>
                  <TableCell style={{ display: "flex" }}>
                    <div>이전글</div>
                    <div style={{ margin: "auto" }}><Link to={`/notice/${parseInt(params.id)-1}`} style={{ color: "inherit" }}>{previous}</Link></div>
                  </TableCell>
                </TableRow>
              </>)}
            {params.id==="1000" ? (null) : (
              <>
                <TableRow className={styles.notice_link}>
                  <TableCell style={{ display: "flex"}}>
                    <div>다음글</div>
                    <div style={{ margin: "auto" }}><Link to={`/notice/${parseInt(params.id)+1}`} style={{ color: "inherit" }}>{next}</Link></div>
                  </TableCell>
                </TableRow>
              </>)}
          </TableBody>
        </Table>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className={styles.goNotice_button} onClick={goNotice}>목록보기</button>
        </div>
      </Container>
      <EditNoticeModal open={open} setOpen={setOpen} title={detail.title} content={detail.body} />
    </>
  )
}

export default NoticeDetail