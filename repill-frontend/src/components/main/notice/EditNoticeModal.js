import React, { useState, useEffect } from 'react'
import { Modal, Form, TextArea } from 'semantic-ui-react'
import styles from './Notice.module.css';
import { useMediaQuery } from 'react-responsive';
import axios from "axios";

function EditNoticeModal({ setOpen, open, id }) {
  let token = localStorage.getItem('token')
  const headers = {
    Authorization: `Bearer ${token}`
  }
  const [form, setForm] = useState()
  const isMobile = useMediaQuery({
    query: "(max-width : 768px)"
  });

  const onChange = (event) => {
    const { name, value } = event.target
    setForm({
      ...form,
      [name] : value
    })
  }

  const editNotice = () => {
    if (!form.title && form.content) {
      alert("제목을 입력해주세요")
    } else if (!form.content && form.title) {
      alert("내용을 입력해주세요")
    } else if (!form.title && !form.content) {
      alert("제목과 내용을 입력해주세요")
    } else {
      // axios 요청 코드
      axios.put(`http://127.0.0.1:8000/api/v1/community/notice/${id}`, {
        title: form.title,
        content: form.content
      },
      {
        headers: headers
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      setOpen((prev) => !prev)
      window.location.reload(true)
    }
  }

  const cancleEdit = () => {
    form.title = ""
    form.content = ""
    setOpen((prev) => !prev)
  }

  const getForm = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/community/notice/${id}`)
      setForm(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getForm()
  }, [])

  return (
    <>
      {isMobile ? (
        <>
          {open ? (
            <Modal
              centered={false}
              open={open}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
            >
              <Modal.Header>공지사항 수정</Modal.Header>
              <Modal.Content>
                <Form>
                  <Form.Field>
                    <input onChange={onChange} value={form.title} name="title" />
                  </Form.Field>
                  <TextArea rows={10} onChange={onChange} value={form.content} name="content" className={styles.edit_content_mob}></TextArea>
                </Form>
              </Modal.Content>
              <Modal.Content style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={editNotice} className={styles.add_button_mob}>등록</button>
                <button onClick={cancleEdit} className={styles.close_button_mob}>취소</button>
              </Modal.Content>
            </Modal>) : null}
        </>) : (
        <>
          {open ? (
            <Modal
              centered={false}
              open={open}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
            >
              <Modal.Header>공지사항 수정</Modal.Header>
              <Modal.Content>
                <Form>
                  <Form.Field>
                    <input placeholder='제목을 작성해주세요' onChange={onChange} value={form.title} name="title" />
                  </Form.Field>
                  <TextArea rows={20} placeholder='내용을 작성해주세요' onChange={onChange} value={form.content} name="content" style={{ fontSize: "1.5rem", textAlign: "center" }}></TextArea>
                </Form>
              </Modal.Content>
              <Modal.Actions>
                <button onClick={editNotice} className={styles.add_button}>등록</button>
                <button onClick={() => setOpen(false)} className={styles.close_button}>취소</button>
              </Modal.Actions>
            </Modal>
          ) : null}
        </>)}
    </>
  )
}

export default EditNoticeModal