import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import moment from "moment";

function SubscriptionsCalender({ handleCancel }) {
  const [value, onChange] = useState(new Date());

  return (
    <div className="flex justify-center items-center">
      <div>
        <div style={{ position: "relative", left: "20%" }}>
          <Calendar
            className="text-gray-500 mt-4"
            onChange={onChange}
            value={value}
            style={{ position: "relative" }}
          />
        </div>
        <hr></hr>
        <div className="text-gray-500 mt-4">
          {moment(value).format("YYYY년 MM월 DD일")}
        </div>
      </div>
    </div>
  );
}

export default SubscriptionsCalender;
