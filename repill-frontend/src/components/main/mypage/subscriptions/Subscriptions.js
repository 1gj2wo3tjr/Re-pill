import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SubscriptionsCompo from "./SubscriptionsCompo";
import { styled, useTheme } from "@mui/material/styles";
import Category from "../../product/Category";
import { Container } from "semantic-ui-react";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [login, setLogin] = useState();

  useEffect(() => {
    if (sessionStorage.getItem("token") === null) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  });

  return (
    <>
      <div style={{ display: "inline" }}>
        <Category />
      </div>

      <Container style={{ marginTop: "100px", marginBottom: "150px" }}>
        {login ? <SubscriptionsCompo /> : <h1>로그인 하고 들어와라</h1>}
      </Container>
    </>
  );
}
