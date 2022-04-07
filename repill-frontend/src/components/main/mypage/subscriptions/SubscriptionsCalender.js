import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import moment from "moment";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "@mui/material/Button";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import styles from "../Mypage.module.css"

function SubscriptionsCalender({ selectedData, handleCancel, period }) {
  const [value, onChange] = useState(new Date());

  const [dates, setDates] = useState(selectedData)

  const onCancel = () => {
    handleCancel();
  };

  return (
    <>
      <style>
        {`
          .react-calendar { 
            width: 400px;
            max-width: 100%;
            background-color: #fff;
            color: #222;
            border-radius: 8px;
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.125em;
          }
          .react-calendar__navigation button {
            color: #6f48eb;
            min-width: 44px;
            background: none;
            font-size: 16px;
            margin-top: 8px;
          }
          .react-calendar__navigation button:enabled:hover,
          .react-calendar__navigation button:enabled:focus {
            background-color: #f8f8fa;
          }
          .react-calendar__navigation button[disabled] {
            background-color: #f0f0f0;
          }
          abbr[title] {
            text-decoration: none;
          }
          /* .react-calendar__month-view__days__day--weekend {
            color: #d10000;
          } */
          .react-calendar__tile:enabled:hover,
          .react-calendar__tile:enabled:focus {
            background: #f8f8fa;
            color: #6f48eb;
            border-radius: 6px;
          }
          .react-calendar__tile--now {
            background: #6f48eb33;
            border-radius: 6px;
            font-weight: bold;
            color: #6f48eb;
          }
          .react-calendar__tile--now:enabled:hover,
          .react-calendar__tile--now:enabled:focus {
            background: #6f48eb33;
            border-radius: 6px;
            font-weight: bold;
            color: #6f48eb;
          }
          .react-calendar__tile--hasActive:enabled:hover,
          .react-calendar__tile--hasActive:enabled:focus {
            background: #f8f8fa;
          }
          .react-calendar__tile--active {
            background: #6f48eb;
            border-radius: 6px;
            font-weight: bold;
            color: white;
          }
          .react-calendar__tile--active:enabled:hover,
          .react-calendar__tile--active:enabled:focus {
            background: #6f48eb;
            color: white;
          }
          .react-calendar--selectRange .react-calendar__tile--hover {
            background-color: #f8f8fa;
          }
          .react-calendar__tile--range {
            background: #f8f8fa;
            color: #6f48eb;
            border-radius: 0;
          }
          .react-calendar__tile--rangeStart {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
            background: #6f48eb;
            color: white;
          }
          .react-calendar__tile--rangeEnd {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
            background: #6f48eb;
            color: white;
          }
        `}
      </style>
      <div
        style={{
          height: "50%",
          width: "27%",
          position: "absolute",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -70%)",
          backgroundColor: "white",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Button
          variant="contained"
          onClick={onCancel}
          style={{
            border: "none",
            backgroundColor: "#E8E8A6",
            float: "right",
            marginTop: "5px",
            marginRight: "5px",
          }}
        >
          <CancelIcon />
        </Button>
        <h1 style={{ textAlign: "center", marginLeft: "55px" }}>구독 정보 보기</h1>
        <div style={{ transform: "translate(10%, 10%)" }}>
          <Calendar
            onChange={onChange}
            value={value}
            formatDay={(locale, date) => moment(date).format("DD")}
            tileContent={({ date, view }) => {
              let html = []
              if (dates.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                html.push(<div className={styles.dot}></div>)
              }
              return (
                <>
                  <div className="flex justify-center items-center absoluteDiv">
                    {html}
                  </div>
                </>
              );
              }
            }
          />
        <div style={{ marginTop: "7%" }}>
          <p>
            구독 주기 :{period.period} 일
          </p>
          <p>
            구독 횟수 :{period.subscribe_times} 회
          </p>
        </div>
        </div>
      </div>
  </>)
}

export default SubscriptionsCalender;
