import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../../redux/slice.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './cartpage.css';
import { useEffect } from 'react';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart.items) || [];
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const BASE_IMAGE_URL = import.meta.env.VITE_API_BASE_IMAGE_URL;


  // Fetch cart from backend and update redux
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/cart/getCart`,
         {
           withCredentials : true
         },
      );
      dispatch(setCart(res.data.data.items));
      console.log(res.data.data.items)
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  };

  useEffect(()=>{
    fetchCart()
  },[])

  const handleIncrease = async (item) => {
    try {
      await axios.post(
        `${BASE_URL}/cart/addToCart`,
        { productId: item.productId._id, quantity: 1 },
        { withCredentials : true }
      );
      fetchCart();
    } catch (err) {
      console.error('Failed to increase quantity:', err);
    }
  };

  const handleDecrease = async (item) => {
    try {
      await axios.put(
        `${BASE_URL}/cart/decreaseQuantity/${item.productId._id}`,
        {},
        { withCredentials : true }
      );
      fetchCart();
    } catch (err) {
      console.error('Failed to decrease quantity:', err);
    }
  };

  const handleRemove = async (item) => {
    try {
      await axios.delete(
        `${BASE_URL}/cart/removecart/${item.productId._id}`,
        { withCredentials : true }
      );
      fetchCart();
    } catch (err) {
      console.error('Failed to remove product:', err);
    }
  };

  const totalPrice = Array.isArray(cart)
  ? cart.reduce((acc, item) => acc + item.productId.price * item.quantity, 0)
  : 0;

  return (
  <div className="cartpage-container">
    <div className="cartpage-left">
      <h2 className="cartpage-title">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="cartpage-empty">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cartpage-list">
            {cart.map((item) => (
              <li key={item.productId._id} className="cartpage-item">
                <img
                  src={`${BASE_IMAGE_URL}${item.productId.Image}`}
                  alt={item.productId.title}
                  className="cartpage-image"
                />

                <div className="cartpage-content">
                  <div className="cartpage-info">
                    <h3 className="cartpage-name">{item.productId.title}</h3>
                    <p className="cartpage-price">${item.productId.price}</p>

                    <div className="cartpage-controls">
                      <button
                        onClick={() => handleDecrease(item)}
                        className="cartpage-btn"
                      >
                        -
                      </button>
                      <span className="cartpage-qty">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrease(item)}
                        className="cartpage-btn"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(item)}
                      className="cartpage-remove"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="cartpage-desc-box">
                    <p className="cartpage-desc">{item.productId.desc}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>


    {cart.length > 0 && (
      <aside className="cartpage-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>


        <div className="summary-row">
          <span>Tax</span>
          <span>₹{(totalPrice * 0.01).toFixed(2)}</span>
        </div>

        <div className="summary-row">
          <span>Shipping</span>
          <span>${2.0.toFixed(2)}</span>
        </div>

        <div className="summary-separator"></div>

        <div className="summary-row total">
          <span>Total</span>
          <span>
            ${(totalPrice + totalPrice * 0.01 + 10).toFixed(2)}
          </span>
        </div>

        <button className="summary-btn btn-checkout" onClick={()=>navigate("/checkout")}>Confirm Payment</button>
        <button className="summary-btn btn-continue">Continue Shopping</button>
      </aside>
    )}
  </div>
);

};

export default CartPage;
