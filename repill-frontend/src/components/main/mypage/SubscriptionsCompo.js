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

function SubscriptionsCompo() {
  const [modalOn, setModalOn] = useState(false);
  const [selected, setSelected] = useState();

  const navigate = useNavigate();
  const productNames = [
    "알약",
    "물약",
    "쓴약",
    "단약",
    "가루약",
    "텐텐",
    "비타민",
    "한약",
  ];
  const handleProduct = () => {
    navigate("/product");
  };
  const handleCalender = (data) => {
    setSelected(data);
    setModalOn(true);
  };
  const handleCancel = () => {
    setModalOn(false);
  };

  return (
    <div class="subscriptionCompo">
      <div class="ui grid container">
        {productNames.map((productName) => (
          <div class="four wide column">
            <Card
              sx={{
                maxWidth: "100%",
                minWidth: "80%",
              }}
            >
              <CardActionArea onClick={handleProduct}>
                <CardMedia
                  component="img"
                  height="140"
                  image="#"
                  alt="subscription"
                />
                <CardContent style={{ height: "120px" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    기간 들어갈 예정
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
                  onClick={handleCalender}
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
        />
      )}
    </div>
  );
}

export default SubscriptionsCompo;
