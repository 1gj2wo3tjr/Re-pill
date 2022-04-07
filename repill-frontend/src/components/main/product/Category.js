import React from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useMediaQuery } from "react-responsive";

const style = {
  width: "150px",
  maxWidth: 200,
  bgcolor: "background.paper",
  float: "left",
  margin: "0px 50px 0 50px",
  paddingTop: "45px",
  position: "sticky",
  top: "0",
};

function Category() {
  const isMobile = useMediaQuery({
    query: "(max-width : 768px)",
  });

  return (
    <>
      {isMobile ? (
        <></>
      ) : (
        <List sx={style} component="nav" aria-label="mailbox folders">
          {/* <h2 style={{ padding: "0px 0 0 8px " }}>카테고리</h2> */}
          <Link to="/mypage/userinfo">
            <ListItem button>
              <ListItemText primary="회원정보 관리" />
            </ListItem>
          </Link>
          <Divider />
          <Link to="/mypage/address">
            <ListItem button divider>
              <ListItemText primary="배송지 관리" />
            </ListItem>
          </Link>
          <Link to="/mypage/myorder">
            <ListItem button>
              <ListItemText primary="결제 내역" />
            </ListItem>
          </Link>
          <Divider light />
          <Link to="/mypage/subscriptions">
            <ListItem button>
              <ListItemText primary="구독 관리" />
            </ListItem>
          </Link>
        </List>
      )}
    </>
  );
}

export default Category;
