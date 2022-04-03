import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CardActionArea } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";

function ProductList({ list }) {
  const isMobile = useMediaQuery({
    query: "(max-width : 768px)",
  });

  const isMiddle = useMediaQuery({
    query: "(max-width: 1200px)",
  });

  return (
    <>
      <style>
        {`
        .css-h93ljk-MuiTypography-root,.css-r40f8v-MuiTypography-root,
        .css-pxfymf-MuiTypography-root,.css-1tt4jnm-MuiTypography-root,
        .css-kxbeit-MuiTypography-root,.css-tn2rp-MuiTypography-root,
        .css-3gthtk-MuiTypography-root, .css-162xqhf-MuiTypography-root,
        .css-1ef4pj9-MuiTypography-root{
          font-family: "Noto Sans KR";
        }

      `}
      </style>
      {isMobile ? (
        <>
          {list.map((item, index) => (
            <Card
              sx={{
                maxWidth: "100%",
                minWidth: "100%",
                marginBottom: "15px",
              }}
              key={index}
            >
              <Link to={`/product/${item.id}`}>
                <CardActionArea
                  sx={{ display: "flex", justifyContent: "start" }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.thumbnail_url}
                    alt="thumbnail_url"
                    sx={{
                      objectFit: "scale-down",
                      paddingTop: "20px",
                    }}
                  />
                  <CardContent style={{ height: "120px" }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        color: "#219f94",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      {item.company}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.name}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="text.secondary"
                      sx={{
                        float: "right",
                        paddingTop: "10px",
                        fontWeight: "bold",
                        color: "#219f94",
                      }}
                    >
                      {item.price.toLocaleString()}원
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
              <CardActions CardActions style={{ justifyContent: "end" }}>
                <Button
                  sx={{ borderRadius: "20px" }}
                  style={{ backgroundColor: "#E8E8A6" }}
                >
                  <AddShoppingCartIcon
                    sx={{ color: "rgb(87, 87, 87)" }}
                  ></AddShoppingCartIcon>
                </Button>
              </CardActions>
            </Card>
          ))}
        </>
      ) : (
        <>
          {isMiddle ? (
            <>
              {list.map((item, index) => (
                <Card
                  sx={{
                    maxWidth: "30%",
                    minWidth: "30%",
                    marginRight: "2%",
                    marginBottom: "2%",
                  }}
                  key={index}
                >
                  <Link to={`/product/${item.id}`}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.thumbnail_url}
                        alt="thumbnail_url"
                        sx={{ objectFit: "contain", padding: "10px" }}
                      />
                      <CardContent style={{ height: "120px" }}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          sx={{
                            color: "rgba(0, 0, 0, 0.6)",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                        >
                          {item.company}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.name}
                        </Typography>
                        <Typography
                          variant="h5"
                          color="text.secondary"
                          sx={{
                            float: "right",
                            paddingTop: "10px",
                            fontWeight: "bold",
                            color: "#219f94",
                          }}
                        >
                          {item.price.toLocaleString()}원
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                  <CardActions CardActions style={{ justifyContent: "end" }}>
                    <Button
                      sx={{ borderRadius: "20px" }}
                      style={{ backgroundColor: "#E8E8A6" }}
                    >
                      <AddShoppingCartIcon
                        sx={{ color: "rgb(87, 87, 87)" }}
                      ></AddShoppingCartIcon>
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </>
          ) : (
            <>
              {list.map((item, index) => (
                <Card
                  sx={{
                    maxWidth: "23%",
                    minWidth: "23%",
                    marginRight: "2%",
                    marginBottom: "2%",
                  }}
                  key={index}
                >
                  <Link to={`/product/${item.id}`}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        image={item.thumbnail_url}
                        alt="thumbnail_url"
                        sx={{ objectFit: "contain", padding: "10px" }}
                      />
                      <CardContent style={{ height: "130px" }}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          sx={{
                            color: "rgba(0, 0, 0, 0.6)",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                        >
                          {item.company}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: "13px" }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          variant="h5"
                          color="text.secondary"
                          sx={{
                            float: "right",
                            paddingTop: "10px",
                            fontWeight: "bold",
                            color: "#219f94",
                          }}
                        >
                          {item.price.toLocaleString()}원
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                  <CardActions style={{ justifyContent: "end" }}>
                    <Button
                      sx={{ borderRadius: "20px" }}
                      style={{ backgroundColor: "#E8E8A6" }}
                    >
                      <AddShoppingCartIcon
                        sx={{ color: "rgb(87, 87, 87)" }}
                      ></AddShoppingCartIcon>
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
}

export default ProductList;
