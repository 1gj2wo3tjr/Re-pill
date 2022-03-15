import React from 'react'
import { Modal, Button, Form, TextArea } from 'semantic-ui-react'

function ModalCompo({setOpen, open}) {

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
              <TextArea placeholder='Tell us more'></TextArea>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setOpen(false)}>OK</Button>
          </Modal.Actions>
        </Modal>
      ) : null}
    </>
  )
}

export default ModalCompo