import * as React from "react";
import SubscriptionsCompo from "./SubscriptionsCompo";

function Subscriptions() {
  return (
    <>
      <h1 style={{ textAlign: "center", margin: "5%" }}>구독 상품</h1>
      <div style={{ margin: "5%", marginLeft: "300px" }}>
        <SubscriptionsCompo />
      </div>
    </>
  );
}

export default Subscriptions;
