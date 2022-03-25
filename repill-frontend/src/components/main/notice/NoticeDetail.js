import React, { useState, useEffect } from 'react'
import { Container, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
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
  const [user, setUser] = useState("admin")
  const [open, setOpen] = useState(false)
  const [slicedDate, setSlicedDate] = useState("")
  const [remove, setRemove] = useState(false)
  const [previousId, setPreviousId] = useState()
  const [nextId, setNextId] = useState()
  const [previousTitle, setPreviousTitle] = useState()
  const [nextTitle, setNextTitle] = useState()

  const getDetail = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/community/notice/${params.id}`)
    setDetail(response.data)
    if (response.data.cursor.previous !== null) {
      setPreviousId(response.data.cursor.previous.id)
      setPreviousTitle(response.data.cursor.previous.title)
    }
    if (response.data.cursor.next !== null) {
      setNextId(response.data.cursor.next.id)
      setNextTitle(response.data.cursor.next.title)
    }
    setSlicedDate(response.data.created_at.slice(0, 10))
  }

  const getLength = async () => {
    const notices = await axios.get("http://127.0.0.1:8000/api/v1/community/notice/")
    setList(notices.data.length)
  }

  const openModal = () => {
    setOpen((prev) => !prev)
  }

  const openDeleteModal = () => {
    setRemove((prev) => !prev)
  }

  useEffect(() => {
    getDetail()
    getLength()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id])

  return (
    <>
      <Container>
        <h2 style={{ marginTop: "5%" }}>공지사항</h2>
        {user==="admin" ? (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className={styles.edit_notice_button} onClick={openModal}>수정하기</button>
            <button className={styles.delete_notice_button} onClick={openDeleteModal}>삭제하기</button>
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
                    <div style={{ margin: "auto" }}><Link to={`/notice/${previousId}`} style={{ color: "inherit" }}>{previousTitle}</Link></div>
                  </TableCell>
                </TableRow>
              </>)}
            {params.id==="1000" ? (null) : (
              <>
                <TableRow className={styles.notice_link}>
                  <TableCell style={{ display: "flex"}}>
                    <div>다음글</div>
                    <div style={{ margin: "auto" }}><Link to={`/notice/${parseInt(nextId)}`} style={{ color: "inherit" }}>{nextTitle}</Link></div>
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
      {/* 삭제하기 버튼 클릭 시 확인용 모달 생성 */}
      <Modal
        size='tiny'
        open={remove}
      >
        <Header icon='archive' content='공지사항을 삭제하시겠습니까?' />
        <Modal.Actions>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button color='green' onClick={() => setRemove(false)}>
              <Icon name='checkmark' /> 삭제
            </Button>
            <Button color='red' onClick={() => setRemove(false)}>
              <Icon name='remove' /> 취소
            </Button>
          </div>
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default NoticeDetail