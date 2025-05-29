import React, { useEffect, useState } from "react";
import axios from "axios";
import "./orderpage.css";

const Orderpage = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/v1/order/getorder", {
                withCredentials: true,
            });
            setOrders(res.data.data);
        } catch (err) {
            console.error("Failed to fetch orders:", err);
        }
    }; //fetch orders

    useEffect(() => {
        fetchOrders();
    }, []);

    const deleteOrder = async (orderId) => {
        console.log(orderId)
        try {
            await axios.delete(`http://localhost:4000/api/v1/order/deleteorder/${orderId}`, {
                withCredentials: true,
            });
            setOrders((prev) => prev.filter((_, i) => orders[i]._id !== orderId));
        } catch (err) {
            console.error("Failed to delete order:", err);
        }
    };

    return (
        <div className="order-container">
            <h2 className="order-title">Your Orders</h2>
            {orders.map((order, i) => (
                <div className="order-card" key={i}>
                    <div className="order-header">
                        <div className="payment-method">
                            Payment Method: <span>{order.paymentMethod}</span>
                        </div>
                        <button
                                    className="delete-btn"
                                    onClick={() => deleteOrder(order._id)}
                                >
                                    Delete Order
                                </button>
                    </div>
                    <div className="product-grid">
                        {order.productDetail.map((product) => (
                            <div className="product-card" key={product._id}>
                                <img
                                    src={`http://localhost:4000${product.Image}`}
                                    alt={product.title}
                                    className="product-image"
                                />
                                <div className="product-info">
                                    <h4 className="product-title">{product.title}</h4>
                                    <p className="product-category">{product.category}</p>
                                    <p className="product-price">Price: ₹{product.price}</p>
                                    <p className="product-qty">Quantity: {product.quantity}</p>
                                    <p className="product-type">
                                        {product.productType === "old" ? "Old Product" : "New Product"}
                                    </p>
                                </div>

                                
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Orderpage;
