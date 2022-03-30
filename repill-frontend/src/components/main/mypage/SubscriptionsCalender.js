import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import moment from "moment";
import CancelIcon from "@mui/icons-material/Cancel";

function SubscriptionsCalender({ handleCancel }) {
  const [value, onChange] = useState(new Date());

  const onCancel = () => {
    handleCancel();
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-sky">
      <div className="bg-white rouded shadow-lg w-10 md:w-1/5">
        <button
          onClick={onCancel}
          style={{ border: "none", backgroundColor: "none" }}
        >
          <CancelIcon />
        </button>
        <h3 style={{ textAlign: "center" }}>구독 확인</h3>
        <div>
          <Calendar
            className="text-gray-500 mt-4"
            onChange={onChange}
            value={value}
            style={{ marginRight: "0" }}
          />
          <hr></hr>
          <div className="text-gray-500 mt-4">
            {moment(value).format("YYYY년 MM월 DD일")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionsCalender;
