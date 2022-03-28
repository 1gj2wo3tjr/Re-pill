import * as React from "react";
import { Link } from "react-router-dom";
import MypageCompo from "./MypageCompo";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptTwoToneIcon from "@mui/icons-material/ReceiptTwoTone";
import CardMembershipTwoToneIcon from "@mui/icons-material/CardMembershipTwoTone";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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

  return (
    <Box sx={{ display: "flex", height: "700px", color: "grey" }}>
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{ mr: 2, ...(open && { display: "none" }) }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <Link to="/recommend">분석리포트</Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <Link to="/">회원정보 관리</Link>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ReceiptTwoToneIcon />
            </ListItemIcon>
            <Link to="/">결제 내역</Link>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CardMembershipTwoToneIcon />
            </ListItemIcon>
            <Link to="/">구독관리</Link>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HomeWorkIcon />
            </ListItemIcon>
            <Link to="/">배송지 관리</Link>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        {/* <DrawerHeader />
        <Typography paragraph>
          <h1>Mypage</h1>
        </Typography>
        <Typography paragraph>
          <MypageCompo />
        </Typography>
        <Typography paragraph>
          <h1>마이페이지</h1>
        </Typography> */}
        <MypageCompo />
      </Main>
    </Box>
  );
}
