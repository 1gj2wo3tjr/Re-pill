import React, { useState } from 'react'
import { Modal, Button, Form, TextArea } from 'semantic-ui-react'
import styles from './Notice.module.css';


function EditNoticeModal({ setOpen, open, title, content }) {
  const [form, setForm] = useState({
    title: title,
    content: content
  })

  const onChange = (event) => {
    const { name, value } = event.target
    setForm({
      ...form,
      [name] : value
    })
    console.log(form)
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

      setOpen((prev) => !prev)
    }
  }

  return (
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
            <Button onClick={editNotice}>등록</Button>
            <button onClick={() => setOpen(false)} className={styles.close_button}>취소</button>
          </Modal.Actions>
        </Modal>
      ) : null}
    </>
  )
}

export default EditNoticeModal