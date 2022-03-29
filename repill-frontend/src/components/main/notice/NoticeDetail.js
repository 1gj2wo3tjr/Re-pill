import React, { useState, useEffect } from 'react'
import { Container, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from './Notice.module.css';
import axios from "axios";
import EditNoticeModal from './EditNoticeModal';
import { useMediaQuery } from 'react-responsive';

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

  const isMobile = useMediaQuery({
    query: "(max-width : 768px)"
  });

  const getDetail = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/community/notice/${params.id}`)
      console.log(response.data)
      setDetail(response.data)
      if (response.data.cursor.previous !== null) {
        setPreviousId(response.data.cursor.previous.id)
        setPreviousTitle(response.data.cursor.previous.title)
      } else {
        setPreviousId(null)
        setPreviousTitle(null)
      }
      if (response.data.cursor.next !== null) {
        setNextId(response.data.cursor.next.id)
        setNextTitle(response.data.cursor.next.title)
      } else {
        setNextId(null)
        setNextTitle(null)
      }
      setSlicedDate(response.data.created_at.slice(0, 10))
    } catch (err) {
      console.log(err)
    }
  }

  const getLength = async () => {
    try {
      const notices = await axios.get("http://127.0.0.1:8000/api/v1/community/notice/")
      setList(notices.data.length)
    } catch (err) {
      console.log(err)
    }
  }

  const openModal = () => {
    setOpen((prev) => !prev)
  }

  const openDeleteModal = () => {
    setRemove((prev) => !prev)
  }

  const checkDelete = () => {
    setRemove(false)
    // axios delete 요청 코드
    axios.delete(`http://127.0.0.1:8000/api/v1/community/notice/${params.id}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    navigate('/notice')
  }

  const checkCancle = () => {
    setRemove(false)
  }

  useEffect(() => {
    getDetail()
    getLength()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id])

  return (
    <>
      {isMobile ? (
        <>
          <Container>
            <h3 style={{ marginTop: "5%" }}>공지사항</h3>
            {user==="admin" ? (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button className={styles.edit_notice_button_mob} onClick={openModal}>수정하기</button>
                <button className={styles.delete_notice_button_mob} onClick={openDeleteModal}>삭제하기</button>
              </div>) : null}
            <Table style={{ marginTop: "3%" }}>
              <TableHead>
                <TableRow style={{ backgroundColor: '#F2F5C8', boxShadow: "0px 5px 10px rgb(207 206 206)" }}>
                  <TableCell style={{ display: "grid", gridTemplateColumns: "20% 60% 20%" }}>
                    <div></div>
                    <div className={styles.notice_title_mob}>{detail.title}</div>
                    <div className={styles.notice_date_mob}>{slicedDate}</div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell style={{ fontSize: "1.4rem", textAlign: "center" }}>
                    {detail.content}
                  </TableCell>
                </TableRow>
                {previousId===null ? (null) : (
                  <>
                    <TableRow className={styles.notice_link}>
                      <TableCell style={{ display: "flex" }}>
                        <div>이전글</div>
                        <div style={{ margin: "auto" }}><Link to={`/notice/${previousId}`} style={{ color: "inherit" }}>{previousTitle}</Link></div>
                      </TableCell>
                    </TableRow>
                  </>)}
                {nextId===null ? (null) : (
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
              <button className={styles.goNotice_button_mob} onClick={goNotice}>목록보기</button>
            </div>
          </Container>
          <EditNoticeModal open={open} setOpen={setOpen} id={params.id} />
          {/* 취소 확인 모달 */}
          <Modal
            size='tiny'
            open={remove}
            style={{ width: "80%" }}
          >
            <Header icon='archive' content='공지사항을 삭제하시겠습니까?' style={{ fontSize: "1.1rem" }} />
            <Modal.Actions>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button color='green' onClick={checkDelete}>
                  <Icon name='checkmark' /> 삭제
                </Button>
                <Button color='red' onClick={checkCancle}>
                  <Icon name='remove' /> 취소
                </Button>
              </div>
            </Modal.Actions>
          </Modal>
        </>) : (
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
                {previousId===null ? (null) : (
                  <>
                    <TableRow className={styles.notice_link}>
                      <TableCell style={{ display: "flex" }}>
                        <div>이전글</div>
                        <div style={{ margin: "auto" }}><Link to={`/notice/${previousId}`} style={{ color: "inherit" }}>{previousTitle}</Link></div>
                      </TableCell>
                    </TableRow>
                  </>)}
                {nextId===null ? (null) : (
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
          <EditNoticeModal open={open} setOpen={setOpen} id={params.id} />
          
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
        </>)}
    </>
  )
}

export default NoticeDetail