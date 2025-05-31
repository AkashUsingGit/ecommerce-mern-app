import React from 'react'
import { useState, useEffect } from 'react'
import "./productdeals.css"
import { FaShoppingCart } from "react-icons/fa";
import { ProductApi } from '../ProductApi';
import { Link } from "react-router-dom"
import { toast } from 'react-toastify';
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../../redux/slice';


const Productdeals = ({ category, productType }) => {

  const cart = useSelector((state) => state.cart.items) || [];
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const BASE_IMAGE_URL = import.meta.env.VITE_API_BASE_IMAGE_URL;
 
  const [product, setProduct] = useState();
  const [oldProducts, setOldProducts] = useState();
  const dispatch = useDispatch()


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
  }; //fetch cart after action(add to cart)

  useEffect(() => {
    ProductApi(setProduct)
    fetchCart()
  }, []);

  useEffect(() => {
    if (product) {
      const filteredProduct = product.filter((item) => {
        return item.category === category && item.productType === productType;
      });

      setOldProducts(filteredProduct);
    }
  }, [product]);// Filter products when 'product' changes

  async function handleAddToCart(id) {

    try {

      const response = await axios.post(`${BASE_URL}/cart/addToCart`,
        {
          productId: id,
          quantity: 1, 
        },
        {
          withCredentials: true,
        }
      );
      // console.log(response.data.data.items)
      toast.success("product added to cart");
      fetchCart()
    } catch (error) {
      console.log(error.response)
      console.error("Add to cart failed", error);
      toast.error("Login first to use cart");
    }
  }

  async function handleRemove(id){
    try {
      await axios.delete(
        `${BASE_URL}/cart/removecart/${id}`,
        { withCredentials : true }
      );
      toast.error("product removed from cart");
      fetchCart();
    } catch (err) {
      console.error('Failed to remove product:', err);
    }
  };


  return (
    <div className='mobiledeals'>
      {
        oldProducts ? (
          oldProducts.map((oldproduct) => {
            return <Link to={`/productdetail/${oldproduct._id}`} className="oldproduct">

              <div className='productimage'>
                <img src={`${BASE_IMAGE_URL}${oldproduct.Image}`} alt="productImage"></img>
                <div className='cartdiv' >
                  {
                    cart.some((item)=>item.productId._id === oldproduct._id) 
                    ? <MdOutlineRemoveShoppingCart className='cart' onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleRemove(oldproduct._id) }}/>
                    : <FaShoppingCart className='cart' onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(oldproduct._id) }}/>
                  }
                  </div>
              </div>

              <div className='discription'>
                <p className='title'>{oldproduct.title}</p>
                <p className='price'>{`$${oldproduct.price}`}</p>
              </div>

            </Link >

          })
        ) : (<p> old products not found</p>)
      }

    </div>
  )
}

export default Productdeals


// <Link to={`/productdetail/${oldproduct._id}`}>
// </Link >
