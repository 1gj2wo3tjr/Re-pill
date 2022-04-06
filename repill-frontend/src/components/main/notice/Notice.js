import React, { useState, useEffect } from 'react'
import { Table, TableCell, TableHead, TableRow, Container } from "@mui/material";
import Content from "./Content"
import AddNoticeModal from "./AddNoticeModal"
import styles from './Notice.module.css';
import axios from "axios";
import Pagination from "./Pagination";
import { useMediaQuery } from 'react-responsive';

function Notice() {
  let staff = sessionStorage.getItem('staff')
  const isMobile = useMediaQuery({
    query: "(max-width : 768px)"
  });

  const [open, setOpen] = useState(false)
  const [list, setList] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const openModal = () => {
    setOpen((prev) => !prev)
  }
  const [keyword, setKeyword] = useState("")
  const searchTitle = (event) => {
    setKeyword(event.target.value)
  }


  const getNotices = async() => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/community/notice/")
      setList(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  const filter = (keyword) => {
    if (keyword !== "") {
      return list.filter((item) => item.title.includes(keyword))
    } else {
      return list
    }
  }

  let token = sessionStorage.getItem('token')
  const headers = {
    Authorization: `Bearer ${token}`
  }

  const kakaoTest = () => {
    // 카카오톡 링크 공유하기
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
          title: '디저트 사진',
          description: '아메리카노, 빵, 케익',
          imageUrl: 'http://mud-kage.kakao.co.kr/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
          link: {
              mobileWebUrl: 'https://googsu.com',
              webUrl: 'https://googsu.com',
              androidExecParams: 'test',
          },
      },
    });

    // 나에게 메시지 보내기
    // window.Kakao.API.request({
    //   url: '/v2/api/talk/memo/default/send',
    //   data: {
    //       template_object: {
    //           object_type: 'feed',
    //           content: {
    //               title: '카카오톡 링크 4.0',
    //               description: '디폴트 템플릿 FEED',
    //               image_url: 'http://test-tam.pe.kr/img/3.result.gif',
    //               link: {
    //                   mobileWebUrl: 'http://localhost:3000/',                                                        
    //                       web_url: 'http://localhost:3000/',
    //               },
    //           },
    //           social: {
    //               like_count: 100,
    //               comment_count: 200,
    //           },
    //           buttons: [{
    //                   title: '쇼핑하러가기',
    //                   link: {
    //                       mobileWebUrl: 'http://localhost:3000/',                                                        
    //                       web_url: 'http://localhost:3000/',
    //                   },
    //               },
    //           ]
    //       },
    //   },
    // });
  }

  useEffect(() => {
    getNotices()
    window.Kakao.init(process.env.REACT_APP_JS_KEY)
    }, [])


  return (
    <div>
      {isMobile ? (
        <>
          <Container style={{ marginTop: '5%' }}>
            <h3>공지사항</h3>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {staff ? (
                <>
                  <input type="text" placeholder="검색어를 입력해주세요" onChange={searchTitle} value={keyword} className={styles.search_content_mob}></input>
                  <button className={styles.add_notice_button} onClick={openModal}>+작성하기</button>
                </>) : (
                <><input type="text" placeholder="검색어를 입력해주세요" onChange={searchTitle} value={keyword} className={styles.search_content}></input></>)
              }
            </div>
            <Table style={{ marginTop: '2%' }}>
              {keyword.length ? (
                <>
                  <Content keyword={keyword} list={filter(keyword)} />
                </>) : (
                <>
                  <Content keyword={keyword} list={currentPosts(list)} />
                </>)}
            </Table>
            {keyword.length ? (null) : (
              <>
                <Pagination postsPerPage={postsPerPage} totalPosts={list.length} paginate={setCurrentPage} />
              </>)}
          </Container>
          <AddNoticeModal open={open} setOpen={setOpen} />
        </>) : (
          <>
            <Container style={{ marginTop: '5%' }}>
              <h1>공지사항</h1>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {staff ? (
                  <>
                    <input type="text" placeholder="검색어를 입력해주세요" onChange={searchTitle} value={keyword} className={styles.search_content}></input>
                    <button className={styles.add_notice_button} onClick={openModal}>+작성하기</button>
                  </>) : (
                  <><input type="text" placeholder="검색어를 입력해주세요" onChange={searchTitle} value={keyword} className={styles.search_content}></input></>)
                }
              </div>
              <Table style={{ marginTop: '2%' }}>
                <TableHead style={{ boxShadow: "0px 5px 10px rgb(207 206 206)" }}>
                  <TableRow style={{ backgroundColor: '#F2F5C8',  }}>
                    <TableCell style={{ fontSize: "1rem", width: '10%', textAlign: 'center' }}>글번호</TableCell>
                    <TableCell style={{ fontSize: "1rem", width: '40%', textAlign: 'center' }}>제목</TableCell>
                    <TableCell style={{ fontSize: "1rem", width: '10%', textAlign: 'center' }}>조회수</TableCell>
                    <TableCell style={{ fontSize: "1rem", width: '10%', textAlign: 'center' }}>작성자</TableCell>
                    <TableCell style={{ fontSize: "1rem", width: '10%', textAlign: 'center' }}>작성일</TableCell>
                    <TableCell style={{ fontSize: "1rem", width: '10%', textAlign: 'center' }}></TableCell>
                  </TableRow>
                </TableHead>
                {keyword.length ? (
                  <>
                    <Content keyword={keyword} list={filter(keyword)} />
                  </>) : (
                  <>
                    <Content keyword={keyword} list={currentPosts(list)} />
                  </>)}
              </Table>
              {keyword.length ? (null) : (
                <>
                  <Pagination postsPerPage={postsPerPage} totalPosts={list.length} paginate={setCurrentPage} />
                </>)}
            </Container>
            <AddNoticeModal open={open} setOpen={setOpen} />
          </>)}
        <button onClick={(e) => kakaoTest(e)}>kakao</button>
    </div>
  )
}

export default Notice