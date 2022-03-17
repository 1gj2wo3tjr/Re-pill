import React, { useState } from 'react'
import { Modal, Button, Form, TextArea } from 'semantic-ui-react'

const btnStyle = {
  color: "black",
  padding: ".375rem .75rem",
  background: "#F2F5C8",
  border: "0",
  borderRadius: "25px",
  fontSize: "1rem",
  lineHeight: 1.5,
  boxShadow: "0px 5px 10px rgb(207 206 206)",
  marginLeft: '10px'
};

function ModalCompo({setOpen, open }) {
  const [form, setForm] = useState({
    title: "",
    content: ""
  })

  const onChange = (event) => {
    const { name, value } = event.target
    setForm({
      ...form,
      [name] : value
    })
    console.log(form)
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
            <Button style={btnStyle} onClick={() => setOpen(false)}>등록</Button>
            <Button onClick={() => setOpen(false)}>취소</Button>
          </Modal.Actions>
        </Modal>
      ) : null}
    </>
  )
}

export default ModalCompo