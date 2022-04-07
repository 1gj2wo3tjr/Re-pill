import * as React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Category from "../../product/Category";

function UserInfo() {
  const navigate = useNavigate();
  const handleAdress = () => {
    navigate("/mypage/address");
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }));
  const classes = useStyles();
  const userName = sessionStorage.getItem("name");
  const userEmail = sessionStorage.getItem("email");
  const userProfile = sessionStorage.getItem("img");
  return (
    <div>
      <style>
        {`
          .css-1vw6mcs-MuiTypography-root,.css-18k87ye-MuiTypography-root{
            font-family:"Noto Sans KR";
          }
        `}
      </style>
      <div style={{ margin: "0 30px" }}>
        <h2 style={{ marginBottom: "3%" }}>회원정보 관리</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            margin: "30px 30px",
          }}
        >
          <Avatar
            src={userProfile}
            sx={{
              width: 180,
              height: 180,
              marginTop: "20px",
              marginBottom: "20px",
              marginRight: "150px",
            }}
          />
          <div style={{ alignSelf: "center" }}>
            <p style={{ fontSize: "22px", fontWeight: "bold" }}>{userName}</p>
            <p style={{ fontSize: "22px", fontWeight: "bold" }}>{userEmail}</p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "100px 0",
          }}
        >
          <div>
            <h2>배송지 관리</h2>
            <p>
              배송지를 등록하거나 기존 배송지를 추가, 변경, 삭제할 수 있습니다.
            </p>
          </div>

          <div>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#E8E8A6",
                color: "black",
                borderRadius: "20px",
                padding: "10px 40px",
              }}
              onClick={handleAdress}
            >
              <span>배송지 관리</span>
            </Button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "60px 0",
          }}
        >
          <div>
            <h2>회원 탈퇴</h2>
            <p>Re:pill 서비스에서 탈퇴합니다.</p>
            <a href="#">찾으시는 제품을 찾지 못하셨나요?</a>
          </div>
          <div>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#E8E8A6",
                color: "black",
                borderRadius: "20px",
                padding: "10px 40px",
              }}
              onClick={handleAdress}
            >
              <span>회원탈퇴 </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
