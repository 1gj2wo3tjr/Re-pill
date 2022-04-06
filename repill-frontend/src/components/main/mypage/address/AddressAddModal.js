import React, { useState, useEffect } from 'react'
import DaumPostcode from "react-daum-postcode";
import { Modal } from 'semantic-ui-react'
import { TableRow, TableCell } from "@mui/material";
import { useMediaQuery } from 'react-responsive';
import styles from "../Mypage.module.css"
import axios from "axios"

function AddressAddModal({ address, setAddress, open, setOpen }) {
  let token = sessionStorage.getItem('token')
  const headers = {
    Authorization: `Bearer ${token}`
  }
  const [popup, setPopUp] = useState(false)
  const [form, setForm] = useState({
    name: "",
    phoneNum: "",
    subAddress: ""
  })

  const [phoneNum, setPhoneNum] = useState("")

  const onCompletePost = (data) => {
    setAddress(data);
  };

  const isMobile = useMediaQuery({
    query: "(max-width : 768px)"
  });

  const openPopup = () => {
    setPopUp((prev) => !prev)
  }

  const cancleModal = () => {
    setAddress("")
    setForm("")
    setPhoneNum("")
    setPopUp(false)
    setOpen((prev) => !prev)
  }

  const onChange = (event) => {
    const { name, value } = event.target
    setForm({
      ...form,
      [name] : value
    })
  }

  const checkPhoneNum = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setPhoneNum(e.target.value);
    } else {
      alert("숫자만 입력해주세요")
    }
  }

  const registerAddress = () => {
    // axios post 요청 코드
    axios.post("http://127.0.0.1:8000/api/v1/accounts/address/", {
      address_name: form.name,
      address: address.address,
      detailed_address: form.subAddress,
      zipcode: address.zonecode,
      phone_number: phoneNum
    },
    {
      headers: headers
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    setAddress("")
    setForm("")
    setPhoneNum("")
    setPopUp(false)
    window.location.reload(true)
  }

  useEffect(() => {
    if (phoneNum.length === 10) {
      setPhoneNum(phoneNum.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'))
    }
    if (phoneNum.length === 13) {
      setPhoneNum(phoneNum.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'))
    }
  })

  return (
    <>
      {isMobile ? (
        <div>
          <Modal
            centered={false}
            open={open}
            style={{ position: "relative", width: "100%", marginTop: "25%" }}
          >
            <Modal.Content>
              <TableRow style={{ display: "flex", alignItems: "center", border: "1px solid black", height: "5rem", textAlign: "center" }}>
                <div style={{ fontSize: "1rem", width: "40%" }}>받는사람이름</div>
                <div style={{ fontSize: "1rem", width: "60%" }}><input type="text" onChange={onChange} value={form.name} name="name" style={{ width: "82%" }} /></div>
              </TableRow>
              <TableRow style={{ display: "flex", alignItems: "center", border: "1px solid black", marginTop: "1%", height: "5rem", textAlign: "center" }}>
                <div style={{ fontSize: "1rem", width: "40%" }}>연락처</div>
                <div style={{ fontSize: "1rem", width: "60%" }}><input type="text" onChange={checkPhoneNum} value={phoneNum} name="phoneNum" style={{ width: "82%" }} maxlength="13" /></div>
              </TableRow>
              <TableRow style={{ display: "flex", justifyContent: "space-between", border: "1px solid black", marginTop: "1%" }}>
                <TableCell style={{ fontSize: "1rem", width: "40%", textAlign: "center" }}>주소</TableCell>
                <TableCell style={{ fontSize: "1rem", width: "60%" }}>
                  <div style={{ display: "flex", justifyContent: "end", flexDirection: "column" }}>
                    <div style={{ display: "flex" }}>
                      <div style={{ border: "2px solid black", textAlign: "center", width: "68%", fontSize: "1rem" }} >{address.zonecode}</div>
                      <button onClick={openPopup} style={{ marginLeft: "3%" }} >검색</button>
                    </div>
                    <input value={address.address || ""} style={{ border: "2px solid black", textAlign: "center", marginTop: "2%", fontSize: "1rem", width: "100%", }} readOnly />
                    <input type="text" style={{ marginTop: "2%", textAlign: "center", fontSize: "1rem" }} onChange={onChange} value={form.subAddress} name="subAddress" />
                  </div>
                </TableCell>
              </TableRow>
              <div style={{ display: "flex", justifyContent: "center" ,marginTop: "5%" }}>
                <button onClick={registerAddress} className={styles.address_add_button_mob} >등록</button>
                <button onClick={cancleModal} className={styles.address_cancle_button_mob}>취소</button>
              </div>
            </Modal.Content>
            {popup && <div>
              <DaumPostcode
                className={styles.address_search_address_modal}
                autoClose
                onComplete={onCompletePost}
              /></div>}
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
              <TableRow style={{ display: "flex", justifyContent: "space-between", height: "5rem", alignItems: "center", border: "1px solid black" }}>
                <TableCell style={{ fontSize: "1.3rem", width: "40%" }}>받는사람이름</TableCell>
                <TableCell style={{ fontSize: "1.4rem", width: "60%" }}><input type="text" onChange={onChange} value={form.name} name="name" style={{ height: "30px" }} /></TableCell>
              </TableRow>
              <TableRow style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid black", marginTop: "1%", height: "5rem" }}>
                <TableCell style={{ fontSize: "1.3rem", width: "40%" }}>연락처</TableCell>
                <TableCell style={{ fontSize: "1.4rem", width: "60%" }}><input type="text" onChange={checkPhoneNum} value={phoneNum} name="phoneNum" maxlength="13" /></TableCell>
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
                className={styles.address_search_address_modal}
                autoClose
                onComplete={onCompletePost}
              /></div>}
            <Modal.Actions>
              <button onClick={registerAddress} className={styles.address_register_button}>등록</button>
              <button onClick={cancleModal} className={styles.address_cancle_button}>취소</button>
            </Modal.Actions>
          </Modal>
        </div>
      )}
    </>
  )
}

export default AddressAddModal