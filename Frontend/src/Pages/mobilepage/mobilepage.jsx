import React from 'react'
import { useState, useEffect } from 'react'
import "./mobilepage.css"
import { FaShoppingCart } from "react-icons/fa";
import { ProductApi } from '../../Components/ProductApi.js';
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from '../../redux/slice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdOutlineRemoveShoppingCart } from "react-icons/md";


const MobilePage = () => {

    const [product, setProduct] = useState();
    const [mobileProducts, setMobileProducts] = useState();
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const BASE_IMAGE_URL = import.meta.env.VITE_API_BASE_IMAGE_URL;

    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart.items) || [];

    const fetchCart = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/cart/getCart`,
                {
                    withCredentials: true
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
    }, []);

    // Filter products when 'product' changes
    useEffect(() => {
        if (product) {
            const filteredProduct = product.filter((item) => {
                return item.category === "mobile";
            });

            setMobileProducts(filteredProduct);
        }
    }, [product]);

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

    async function handleRemove(id) {
        try {
            await axios.delete(
                `${BASE_URL}/cart/removecart/${id}`,
                { withCredentials: true }
            );
            toast.error("product removed from cart");
            fetchCart();
        } catch (err) {
            console.error('Failed to remove product:', err);
        }
    };


    return (
        <>
            <div className="mobileheading" style={{
                marginLeft: "65px",
                marginTop: "70px",
                fontSize: "25px"
            }} >Mobile Products</div>
            <div className='mobileproductdeals'>


                {
                    mobileProducts ? (
                        mobileProducts.map((mobileproduct) => {
                            return <Link to={`/productdetail/${mobileproduct._id}`} className="mobileproduct">

                                <div className='mobileimage'>
                                    {/* {console.log(oldproduct)} */}
                                    <img className="img" src={`${BASE_IMAGE_URL}${mobileproduct.Image}`} alt="productImage"></img>
                                    <div className='cartdiv'>
                                        {
                                            cart.some((item) => item.productId._id === mobileproduct._id)
                                                ? <MdOutlineRemoveShoppingCart className='cart' onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleRemove(mobileproduct._id) }} />
                                                : <FaShoppingCart className='cart' onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(mobileproduct._id) }} />
                                        }
                                    </div>
                                </div>

                                <div className='mobilediscription'>
                                    <p className='mobiletitle'>{mobileproduct.title}</p>
                                    <p className='mobileprice'>{`$${mobileproduct.price}`}</p>
                                </div>

                            </Link >

                        })
                    ) : (<p> Mobile products not found</p>)
                }


            </div>
        </>
    )
}

export default MobilePage

