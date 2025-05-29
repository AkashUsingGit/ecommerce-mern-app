import React from "react";

const PaymentFail = () => {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        fontFamily: "Arial, sans-serif",
        color: "red",
      }}
    >
      <h2>❌ Payment Failed</h2>
      <p>Unfortunately, your payment could not be processed. Please try again.</p>
    </div>
  );
};

export default PaymentFail;
