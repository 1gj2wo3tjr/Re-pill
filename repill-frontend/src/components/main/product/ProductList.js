import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CardActionArea } from '@mui/material';
import styles from './Product.module.css';
import { useMediaQuery } from 'react-responsive';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function ProductList({ list }) {

  const isMobile = useMediaQuery({
    // query: "(max-width : 830px)"
    query: "(max-width : 768px)"
  });

  const isMiddle = useMediaQuery({
    query: "(max-width: 1200px)"
  })

  return (
    <>
      {isMobile ? (
        <h1>모바일</h1>
      ) : (
        <>
          {isMiddle ? (
            <>
              {list.map((item, index) => (
                <Card sx={{ maxWidth: "30%", minWidth: "30%", margin: "5px" }} key={index} >
                  <CardActionArea >
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.url}
                      alt="green iguana"
                    />
                    <CardContent style={{ height: "120px" }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions style={{ justifyContent: "end" }} >
                    <Button sx={{ borderRadius: "20px" }} style={{ backgroundColor: "#E8E8A6" }}>
                      <AddShoppingCartIcon sx={{ color: "rgb(87, 87, 87)" }}>
                      </AddShoppingCartIcon>
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </>
          ) : (
            <>
              {list.map((item, index) => (
                <Card sx={{ maxWidth: "23%", minWidth: "23%", margin: "1%" }} key={index} >
                  <CardActionArea >
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.url}
                      alt="green iguana"
                    />
                    <CardContent style={{ height: "120px" }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions style={{ justifyContent: "end" }} >
                    <Button sx={{ borderRadius: "20px" }} style={{ backgroundColor: "#E8E8A6" }}>
                      <AddShoppingCartIcon sx={{ color: "rgb(87, 87, 87)" }}>
                      </AddShoppingCartIcon>
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </>
          )}
        </>
      )
      }
    </>
  )
}

export default ProductList