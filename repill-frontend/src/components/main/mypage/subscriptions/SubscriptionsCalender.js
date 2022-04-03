import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import moment from "moment";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "@mui/material/Button";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { Component } from "react";

// function SubscriptionsCalender({ handleCancel }) {
//   const [value, onChange] = useState(new Date());
//   const selectionRange = {
//     startDate: new Date(),
//     endDate: new Date(),
//     key: "selection",
//   };

//   const onCancel = () => {
//     handleCancel();
//   };

//   return (
//     <div
//       className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-sky"
//       style={{ height: "70%", width: "100%" }}
//     >
//       <div className="bg-white rouded shadow-lg w-10 md:w-2/5">
//         <button
//           onClick={onCancel}
//           className="bg-green-300 hover:bg-green-500 rounded text-white "
//           style={{ border: "none" }}
//         >
//           <CancelIcon />
//         </button>
//         <h3 style={{ textAlign: "center" }}>구독 확인</h3>
//         <div className="flex justify-center items-center">
//           <Calendar
//             className="text-gray-500 mt-12"
//             onChange={onChange}
//             ranges={[selectionRange]}
//           />
//           <hr></hr>
//         </div>
//         <div className="text-gray-500 mt-4 flex justify-center items-center">
//           {moment(value).format("YYYY년 MM월 DD일")}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SubscriptionsCalender;

class SubscriptionsCalender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
      handleCancel: props.handleCancel,
    };
  }

  onRangeChange = (ranges) => {
    console.log(ranges["selection"]);
    this.setState({
      selection: ranges["selection"],
    });
  };

  onCancel = () => {
    this.state.handleCancel();
  };

  render() {
    return (
      <div
        style={{
          height: "50%",
          width: "40%",
          position: "absolute",
          top: "50%",
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
          onClick={this.onCancel}
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
        <h1 style={{ textAlign: "center" }}>구독 관리</h1>
        <div style={{ transform: "translate(10%, 15%)" }}>
          <DateRangePicker
            onChange={this.onRangeChange}
            months={1}
            minDate={addDays(new Date(), -300)}
            maxDate={addDays(new Date(), 900)}
            direction="vertical"
            scroll={{ enabled: true }}
            ranges={[this.state.selection]}
          />
          <div style={{ color: "green" }}>
            {" "}
            startDate : {this.state.selection.startDate.toString()}
          </div>
          <div style={{ color: "green" }}>
            {" "}
            endDate : {this.state.selection.endDate.toString()}
          </div>
        </div>
      </div>
    );
  }
}
export default SubscriptionsCalender;
