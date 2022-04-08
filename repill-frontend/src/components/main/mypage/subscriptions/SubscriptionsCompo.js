import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CardActionArea } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useNavigate } from "react-router-dom";
import SubscriptionsCalender from "./SubscriptionsCalender";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import Modal from "@mui/material/Modal";
import axios from "axios";

function SubscriptionsCompo() {
  let token = sessionStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ` + `${token}`,
  };
  const [modalOn, setModalOn] = useState(false);
  const [selected, setSelected] = useState([]);
  const [products, setProducts] = useState([]);
  const [period, setPeriod] = useState([]);
  const filtered_date = [];

  const navigate = useNavigate();

  const handleProduct = (item) => {
    navigate(`/product/${item.product}`);
  };
  const handleCalender = (item) => {
    const sub_list = item.subscribe_dates;
    for (var key in sub_list) {
      var date_num = sub_list[key];
      filtered_date.push(date_num);
    }
    setPeriod(item);
    setSelected(filtered_date);
    setModalOn(true);
    console.log("열렸다!");
  };
  const handleCancel = () => {
    setModalOn(false);
  };

  const getSubscriptions = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/accounts/subscription/`,
        {
          headers: headers,
        }
      );
      console.log(response.data);
      response.data.map((item) =>
        axios
          .get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/products/items/${item.product}`
          )
          .then((res) => {
            console.log(res);
            setProducts((products) => [
              {
                subscription_id: item.id,
                period: item.period,
                start_date: item.start_date,
                subscribe_dates: item.subscribe_dates,
                subscribe_times: item.subscribe_times,
                title: res.data.name,
                img_url: res.data.thumbnail_url,
                product: item.product,
              },
              ...products,
            ]);
          })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSubscription = async (item) => {
    await axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/api/v1/accounts/subscription/${item.product}`,
        {
          headers: headers,
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    getSubscriptions();
    setTimeout(window.location.reload(true), 500);
  };

  React.useEffect(() => {
    getSubscriptions();
    setProducts([]);
  }, []);

  return (
    <div class="subscriptionCompo">
      <h2>구독 내역</h2>
      <div class="ui grid container" style={{ marginTop: "50px" }}>
        {products.map((item) => (
          <div class="four wide column">
            <Card
              sx={{
                maxWidth: "100%",
                minWidth: "80%",
              }}
            >
              <CardActionArea onClick={() => handleProduct(item)}>
                <CardMedia
                  component="img"
                  height="160"
                  image={item.img_url}
                  alt="subscription"
                  sx={{ objectFit: "contain", padding: "10px" }}
                />
                <CardContent style={{ height: "150px" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    <p>{item.title}</p>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.start_date.slice(0, 10)}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions CardActions style={{ justifyContent: "end" }}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#E8E8A6",
                    color: "black",
                    borderRadius: "20px",
                  }}
                  onClick={() => handleCalender(item)}
                >
                  <BuildOutlinedIcon
                    sx={{ color: "rgb(87, 87, 87)" }}
                  ></BuildOutlinedIcon>
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#E8E8A6",
                    color: "black",
                    borderRadius: "20px",
                  }}
                  onClick={() => deleteSubscription(item)}
                >
                  <CancelOutlinedIcon
                    sx={{ color: "rgb(87, 87, 87)" }}
                  ></CancelOutlinedIcon>
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
      {modalOn && (
        <SubscriptionsCalender
          selectedData={selected}
          handleCancel={handleCancel}
          period={period}
        />
      )}
    </div>
  );
}

export default SubscriptionsCompo;
