import React, { useState } from 'react'
import DaumPostcode from "react-daum-postcode";
import { Modal } from 'semantic-ui-react'
import { TableRow, TableCell } from "@mui/material";
import { useMediaQuery } from 'react-responsive';

function AddressAddModal({ address, setAddress, open, setOpen }) {
  const [popup, setPopUp] = useState(false)
  const [form, setForm] = useState({
    name: "",
    phoneNum: "",
    subAddress: ""
  })

  const onCompletePost = (data) => {
    setAddress(data);
  };

  const isMobile = useMediaQuery({
    query: "(max-width : 768px)"
  });


  const postCodeStyle = {
    display: "block",
    width: "100%",
    height: "480px",
    zIndex: 100, 
    margin: "auto",
    position: "absolute"
  };

  const openPopup = () => {
    setPopUp((prev) => !prev)
  }

  const cancleModal = () => {
    setOpen((prev) => !prev)
    form.name = ""
    form.phoneNum = ""
    form.subAddress = ""
    address.address = ""
    address.zonecode = ""
  }

  const onChange = (event) => {
    const { name, value } = event.target
    setForm({
      ...form,
      [name] : value
    })
    console.log(form)
  }

  const registerAddress = () => {
    alert("hi")
    // axios post 요청 코드
  }

  return (
    <>
      {isMobile ? (
        <div>
          <Modal
            centered={false}
            open={open}
            style={{ position: "relative", width: "200px" }}
          >
            <Modal.Content>
              <TableRow style={{ display: "flex", justifyContent: "space-between", height: "50px", alignItems: "center", border: "1px solid black", height: "5rem" }}>
                <TableCell style={{ fontSize: "1.3rem", width: "40%" }}>받는사람이름</TableCell>
                <TableCell style={{ fontSize: "1.4rem", width: "60%" }}><input type="text" onChange={onChange} value={form.name} name="name" style={{ width: "60%" }} /></TableCell>
              </TableRow>
              <TableRow style={{ display: "flex", justifyContent: "space-between", height: "50px", alignItems: "center", border: "1px solid black", marginTop: "1%", height: "5rem" }}>
                <TableCell style={{ fontSize: "1.3rem", width: "40%" }}>연락처</TableCell>
                <TableCell style={{ fontSize: "1.4rem", width: "60%" }}><input type="text" onChange={onChange} value={form.phoneNum} name="phoneNum" style={{ width: "60%" }} /></TableCell>
              </TableRow>
              <TableRow style={{ display: "flex", justifyContent: "space-between", border: "1px solid black", marginTop: "1%" }}>
                <TableCell style={{ fontSize: "1.3rem", width: "40%" }}>주소</TableCell>
                  <TableCell style={{ fontSize: "1.3rem", width: "60%" }}>
                    <div style={{ display: "flex", justifyContent: "end", flexDirection: "column" }}>
                      <div style={{ display: "flex" }}>
                        <div style={{ border: "2px solid black", textAlign: "center", width: "59%", fontSize: "1rem" }} >{address.zonecode}</div>
                        <button onClick={openPopup} style={{ marginLeft: "1%" }} >주소검색</button>
                      </div>
                      <input value={address.address || ""} style={{ border: "2px solid black", textAlign: "center", marginTop: "2%", fontSize: "1rem", width: "100%", }} readOnly />
                      <input type="text" style={{ marginTop: "2%", textAlign: "center", fontSize: "1rem" }} onChange={onChange} value={form.subAddress} name="subAddress" />
                    </div>
                  </TableCell>
              </TableRow>
            </Modal.Content>
            {popup && <div>
              <DaumPostcode
                style={postCodeStyle}
                autoClose
                onComplete={onCompletePost}
              /></div>}
            <Modal.Actions>
              <button onClick={registerAddress}>등록</button>
              <button onClick={cancleModal}>취소</button>
            </Modal.Actions>
          </Modal>
        </div>
      ) : (
        <div>
          <Modal
            centered={false}
            open={open}
            style={{ position: "relative", width: "470px" }}
          >
            <Modal.Content>
              <TableRow style={{ display: "flex", justifyContent: "space-between", height: "50px", alignItems: "center", border: "1px solid black", height: "5rem" }}>
                <TableCell style={{ fontSize: "1.3rem", width: "40%" }}>받는사람이름</TableCell>
                <TableCell style={{ fontSize: "1.4rem", width: "60%" }}><input type="text" onChange={onChange} value={form.name} name="name" /></TableCell>
              </TableRow>
              <TableRow style={{ display: "flex", justifyContent: "space-between", height: "50px", alignItems: "center", border: "1px solid black", marginTop: "1%", height: "5rem" }}>
                <TableCell style={{ fontSize: "1.3rem", width: "40%" }}>연락처</TableCell>
                <TableCell style={{ fontSize: "1.4rem", width: "60%" }}><input type="text" onChange={onChange} value={form.phoneNum} name="phoneNum" /></TableCell>
              </TableRow>
              <TableRow style={{ display: "flex", justifyContent: "space-between", border: "1px solid black", marginTop: "1%" }}>
                <TableCell style={{ fontSize: "1.3rem", width: "40%" }}>주소</TableCell>
                  <TableCell style={{ fontSize: "1.3rem", width: "60%" }}>
                    <div style={{ display: "flex", justifyContent: "end", flexDirection: "column" }}>
                      <div style={{ display: "flex" }}>
                        <div style={{ border: "2px solid black", textAlign: "center", width: "59%", fontSize: "1rem" }} >{address.zonecode}</div>
                        <button onClick={openPopup} style={{ marginLeft: "1%" }} >주소검색</button>
                      </div>
                      <input value={address.address || ""} style={{ border: "2px solid black", textAlign: "center", marginTop: "2%", fontSize: "1rem", width: "100%", }} readOnly />
                      <input type="text" style={{ marginTop: "2%", textAlign: "center", fontSize: "1rem" }} onChange={onChange} value={form.subAddress} name="subAddress" />
                    </div>
                  </TableCell>
              </TableRow>
            </Modal.Content>
            {popup && <div>
              <DaumPostcode
                style={postCodeStyle}
                autoClose
                onComplete={onCompletePost}
              /></div>}
            <Modal.Actions>
              <button onClick={registerAddress}>등록</button>
              <button onClick={cancleModal}>취소</button>
            </Modal.Actions>
          </Modal>
        </div>
      )}
    </>
    // <div>
    //   <Modal
    //     centered={false}
    //     open={open}
    //     style={{ position: "relative", width: "470px" }}
    //   >
    //     <Modal.Content>
    //       <TableRow style={{ display: "flex", justifyContent: "space-between", height: "50px", alignItems: "center", border: "1px solid black", height: "5rem" }}>
    //         <TableCell style={{ fontSize: "1.3rem", width: "40%" }}>받는사람이름</TableCell>
    //         <TableCell style={{ fontSize: "1.4rem", width: "60%" }}><input type="text" onChange={onChange} value={form.name} name="name" /></TableCell>
    //       </TableRow>
    //       <TableRow style={{ display: "flex", justifyContent: "space-between", height: "50px", alignItems: "center", border: "1px solid black", marginTop: "1%", height: "5rem" }}>
    //         <TableCell style={{ fontSize: "1.3rem", width: "40%" }}>연락처</TableCell>
    //         <TableCell style={{ fontSize: "1.4rem", width: "60%" }}><input type="text" onChange={onChange} value={form.phoneNum} name="phoneNum" /></TableCell>
    //       </TableRow>
    //       <TableRow style={{ display: "flex", justifyContent: "space-between", border: "1px solid black", marginTop: "1%" }}>
    //         <TableCell style={{ fontSize: "1.3rem", width: "40%" }}>주소</TableCell>
    //           <TableCell style={{ fontSize: "1.3rem", width: "60%" }}>
    //             <div style={{ display: "flex", justifyContent: "end", flexDirection: "column" }}>
    //               <div style={{ display: "flex" }}>
    //                 <div style={{ border: "2px solid black", textAlign: "center", width: "59%", fontSize: "1rem" }} >{address.zonecode}</div>
    //                 <button onClick={openPopup} style={{ marginLeft: "1%" }} >주소검색</button>
    //               </div>
    //               <input value={address.address || ""} style={{ border: "2px solid black", textAlign: "center", marginTop: "2%", fontSize: "1rem", width: "100%", }} readOnly />
    //               <input type="text" style={{ marginTop: "2%", textAlign: "center", fontSize: "1rem" }} onChange={onChange} value={form.subAddress} name="subAddress" />
    //             </div>
    //           </TableCell>
    //       </TableRow>
    //     </Modal.Content>
    //     {popup && <div>
    //       <DaumPostcode
    //         style={postCodeStyle}
    //         autoClose
    //         onComplete={onCompletePost}
    //       /></div>}
    //     <Modal.Actions>
    //       <button onClick={registerAddress}>등록</button>
    //       <button onClick={cancleModal}>취소</button>
    //     </Modal.Actions>
    //   </Modal>
    // </div>
  )
}

export default AddressAddModal