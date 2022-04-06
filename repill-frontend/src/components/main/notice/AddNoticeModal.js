import React, { useState } from 'react'
import { Modal, Form, TextArea } from 'semantic-ui-react';
import styles from './Notice.module.css';
import axios from "axios";
import { useMediaQuery } from 'react-responsive';

function AddNoticeModal({setOpen, open }) {
  let token = sessionStorage.getItem('token')
  const headers = {
    Authorization: `Bearer ${token}`
  }

  const [form, setForm] = useState({
    title: "",
    content: ""
  })

  const isMobile = useMediaQuery({
    query: "(max-width : 768px)"
  });

  const onChange = (event) => {
    const { name, value } = event.target
    setForm({
      ...form,
      [name] : value
    })
    console.log(form)
  }

  const addNotice = () => {
    if (!form.title && form.content) {
      alert("제목을 입력해주세요")
    } else if (!form.content && form.title) {
      alert("내용을 입력해주세요")
    } else if (!form.title && !form.content) {
      alert("제목과 내용을 입력해주세요")
    } else {
      axios.post('http://127.0.0.1:8000/api/v1/community/notice/', 
        { 
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

  const closeModal = () => {
    setOpen((prev) => !prev)
  }

  return (
    <>
      {isMobile ? (
        <>
          {open ? (
            <Modal
              centered={false}
              open={open}
            >
              <Modal.Header>공지사항 등록</Modal.Header>
              <Modal.Content>
                <Form>
                  <Form.Field>
                    <input placeholder='제목을 작성해주세요' onChange={onChange} value={form.title} name="title" />
                  </Form.Field>
                  <TextArea rows={10} placeholder='내용을 작성해주세요' onChange={onChange} value={form.content} name="content"></TextArea>
                </Form>
              </Modal.Content>
              <Modal.Content style={{ display: "flex", justifyContent: "center" }}>
                <button className={styles.add_notice_button_modal_mob} onClick={addNotice}>등록</button>
                <button onClick={closeModal} className={styles.close_button_mob}>취소</button>
              </Modal.Content>
            </Modal>
          ) : null}
        </>) : (
        <>
          {open ? (
            <Modal
              centered={false}
              open={open}
            >
              <Modal.Header>공지사항 등록</Modal.Header>
              <Modal.Content>
                <Form>
                  <Form.Field>
                    <input placeholder='제목을 작성해주세요' onChange={onChange} value={form.title} name="title" />
                  </Form.Field>
                  <TextArea rows={20} placeholder='내용을 작성해주세요' onChange={onChange} value={form.content} name="content"></TextArea>
                </Form>
              </Modal.Content>
              <Modal.Actions>
                <button className={styles.add_notice_button_modal} onClick={addNotice}>등록</button>
                <button onClick={closeModal} className={styles.close_button}>취소</button>
              </Modal.Actions>
            </Modal>
          ) : null}
        </>)}

    </>
  )
}

export default AddNoticeModal