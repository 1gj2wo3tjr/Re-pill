import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import moment from "moment";
import CancelIcon from "@mui/icons-material/Cancel";

function SubscriptionsCalender({ handleCancel }) {
  const [value, onChange] = useState(new Date());

  return (
    <div>
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
  );
}

export default SubscriptionsCalender;
