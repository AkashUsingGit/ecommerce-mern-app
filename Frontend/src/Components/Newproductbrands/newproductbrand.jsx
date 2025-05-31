import React, { useEffect, useRef, useState } from 'react'
import "./newproductbrand.css"
import { ProductApi } from '../ProductApi'
import { FaShoppingCart } from "react-icons/fa";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from '../../redux/slice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const Newproductbrand = ({ category, productType }) => {
    const [product, setProduct] = useState();
    const [newProducts, setnewProducts] = useState()
    const slider = useRef()
    const dispatch = useDispatch()
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const BASE_IMAGE_URL = import.meta.env.VITE_API_BASE_IMAGE_URL;

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
    }, [])

    useEffect(() => {
        if (product) {
            const filteredProduct = product.filter((item) => {
                return item.category === category && item.productType === productType
            })
            setnewProducts(filteredProduct)
        }
    }, [product])//filter products

    let tx = 0

    function slideBack() {
        if (tx < 0) {
            tx += 12
            slider.current.style.transform = `translateX(${tx}%)`
        }
    }

    function slideForward() {
        console.log("slided")
        if (tx <= 0 && tx >= -45) {
            tx -= 12
            slider.current.style.transform = `translateX(${tx}%)`
            slider.current.style.transition = "transform 0.7s ease"
        }
        console.log(tx)
    }

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

        <div className="slider-container">
            <SlArrowLeft className='backarrow' onClick={slideBack} />
            <SlArrowRight className='forwardkarrow' onClick={slideForward} />

            <div className="swiper" ref={slider}>
                {newProducts?.map((newproduct, index) => (
                    <Link to={`/productdetail/${newproduct._id}`} className="newproduct" >

                        <div className="productimage">
                            <img
                                src={`${BASE_IMAGE_URL}${newproduct.Image}`}
                                alt="productImage"
                            />
                            <div className="cartdiv">
                                {
                                    cart.some((item) => item.productId._id === newproduct._id)
                                        ? <MdOutlineRemoveShoppingCart className='cart' onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleRemove(newproduct._id) }} />
                                        : <FaShoppingCart className='cart' onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(newproduct._id) }} />
                                }
                            </div>
                        </div>
                        <div className="discription">
                            <p className="title">{newproduct.title}</p>
                            <p className="price">{`$${newproduct.price}`}</p>
                        </div>
                    </Link>
                ))}
            </div>


        </div>

    )
}

export default Newproductbrand
