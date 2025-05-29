import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const PaymentSuccess = () => {

  const savedAddress = JSON.parse(localStorage.getItem("address"))
  console.log(savedAddress)
  // const orderCart = useSelector((state) => state.cart.items)
  const orderCart = JSON.parse(localStorage.getItem("cartItems"))
  console.log(orderCart)

  useEffect(() => {

    const order = async () => {

      try {
        const response = await axios.post('http://localhost:4000/api/v1/order/createorder',
          {
            items : orderCart,
            address : savedAddress,
          },
          {
            withCredentials: true,
          }
        );
      } catch (error) {
        console.error("Order creation failed:", error)
      }
    }

    order()
  }, []) //create order

  useEffect(() => {

    const clearCart = async () => {

      try {
        const response = await axios.delete('http://localhost:4000/api/v1/cart/clearcart',
          {
            withCredentials: true,
          }
        );
      } catch (error) {
        console.error("Order creation failed:", error)
      }
    }

    clearCart()
  }, []) //clear cart



  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        marginBottom : "100px",
        fontFamily: "Arial, sans-serif",
        color: "green",
      }}
    >
      <h2>🎉 Payment Successful!</h2>
      <p>Thank you for your purchase. Your payment has been processed successfully.</p>
    </div>
  );
};

export default PaymentSuccess;
