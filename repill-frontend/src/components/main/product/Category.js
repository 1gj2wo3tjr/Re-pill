import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useMediaQuery } from 'react-responsive';

const style = {
  width: '200px',
  maxWidth: 200,
  bgcolor: 'background.paper',
  float: 'left',
  margin: '0px 20px 0 100px',
  paddingTop: '62px',
  position: "sticky",
  top: "0"
};

function Category() {

  const isMobile = useMediaQuery({
    query: "(max-width : 768px)"
  });

  return (
    <>
      {isMobile ? (
        <></>
      ) : (
        <List sx={style} component="nav" aria-label="mailbox folders" >
          <h2 style={{ padding: "0px 0 0 8px " }}>카테고리</h2>
          <ListItem button>
            <ListItemText primary="Inbox" />
          </ListItem>
          <Divider />
          <ListItem button divider>
            <ListItemText primary="Drafts" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Trash" />
          </ListItem>
          <Divider light />
          <ListItem button>
            <ListItemText primary="Spam" />
          </ListItem>
        </List>)}
    </>
  )
}

export default Category