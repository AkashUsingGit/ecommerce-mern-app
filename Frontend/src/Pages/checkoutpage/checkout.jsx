import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./checkout.css";

const CheckoutPage = () => {


  const cartItems = useSelector((state) => state.cart.items) || [];
  console.log(cartItems)


  const [address, setAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone : ""
  });


  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  console.log(address)

  const handlePayNow = async () => {

    localStorage.setItem("address", JSON.stringify(address))
    localStorage.setItem("cartItems",JSON.stringify(cartItems))

    try {
      const res = await axios.post('http://localhost:4000/api/v1/checkout/payment', {
        items: cartItems,
        address,// not using it in backend
      });

      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error("Error creating checkout session", error);
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-section">
        <h3 className="section-title">Shipping Address</h3>
        <input type="text" name="fullName" placeholder="Full Name" onChange={handleInputChange} className="checkout-input" />
        <input type="text" name="address" placeholder="Address" onChange={handleInputChange} className="checkout-input" />
        <input type="text" name="city" placeholder="City" onChange={handleInputChange} className="checkout-input" />
        <input type="number" name="postalCode" placeholder="Postal Code" onChange={handleInputChange} className="checkout-input" />
        <input type="text" name="country" placeholder="Country" onChange={handleInputChange} className="checkout-input" />
        <input type="number" name="phone" placeholder="Phone" onChange={handleInputChange} className="checkout-input" />
      </div>

      <button onClick={handlePayNow} className="checkout-button">
        Pay Now
      </button>
    </div>
  );
};

export default CheckoutPage;
