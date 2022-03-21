import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CardActionArea } from '@mui/material';
import styles from './Pagination.module.css';

function ProductList({ list }) {
  return (
    <>
      {list.map((item, index) => (
        <Card sx={{ maxWidth: 200, minWidth: 200, margin: 1 }} key={index} className={styles.product}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={item.url}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.title}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small">장바구니</Button>
            <Button size="small">바로 구매</Button>
          </CardActions>
        </Card>
      ))}
    </>
  )
}

export default ProductList