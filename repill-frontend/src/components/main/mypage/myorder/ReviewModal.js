import React from 'react'
import { useMediaQuery } from 'react-responsive';

function ReviewModal() {

  const isMobile = useMediaQuery({
    query: "(max-width : 768px)"
  });

  return (
    <div>
      {isMobile ? (
        <>
          <Modal
            open={open}
            centered={false}
          >
            <Header icon='archive' content='공지사항을 삭제하시겠습니까?' />
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
        </>) : (
        <>
          <Modal
            open={open}
            centered={false}
          >
            <Header icon='archive' content='공지사항을 삭제하시겠습니까?' />
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
        </>
        )}
    </div>
  )
}

export default ReviewModal