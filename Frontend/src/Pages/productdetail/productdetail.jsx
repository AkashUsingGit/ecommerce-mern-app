import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./productdetail.css"
import { FaCartShopping } from "react-icons/fa6";
import axios from 'axios';
import { FaUser } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { setCart } from '../../redux/slice';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';


const Productdetail = ({ starcount = 5 }) => {

  const [product, setProduct] = useState(null)
  const [starvalue, setStarvalue] = useState()
  const [hovervalue, setHovervalue] = useState(0)
  const [productreview, setProductreview] = useState()
  const [reviews, setReviews] = useState([  ])
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useDispatch()
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const BASE_IMAGE_URL = import.meta.env.VITE_API_BASE_IMAGE_URL;
  const navigate = useNavigate()

  const { id } = useParams()


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

    async function fetchProduct() {
      try {
        const response = await fetch(`${BASE_URL}/product/getProduct/${id}`);
        const data = await response.json();
        setProduct(data.data);
        // console.log(data.message)
      } catch (error) {
      }
    }

    fetchProduct()

  }, [id]) //feth product detail with its id

  function handleChange(e) {
    setProductreview(e.target.value)
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    try {

      const response = await axios.post(`${BASE_URL}/review/createreview`,
        {
          productId: id,
          reviewText: productreview,
          rating: starvalue
        },
        {
          withCredentials: true
        }
      )
      setProductreview("")

    } catch (error) {
      if (error.status === 401) {
        toast.error("Please login to submit a review");
        setProductreview("")
        setStarvalue(0)
      } else {
        alert("Something went wrong. Try again later.");
        setProductreview("")
        setStarvalue(0)
      }
    }
  }//submit review

  useEffect(()=>{

    async function getReviews(){

      try{
        const response = await axios.get(`${BASE_URL}/review/getreview/${id}`)

        setReviews(response.data.data)

        // console.log(reviews)
        // console.log(response.data.data)

      }catch(error){
        console.log(error.response)
      }
     }

    getReviews()

  },[productreview])//get reviews

  async function handleAddToCart() {
  try {

    const response = await axios.post(
      `${BASE_URL}/cart/addToCart`,
      {
        productId: id,
        quantity: 1,
      },
      {
        withCredentials: true,
      }
    );
    // console.log(response.data.data.items)
    fetchCart(); 
    setIsAdded(true); 
    setTimeout(() => setIsAdded(false), 1000);
  } catch (error) {
    console.log(error.response.data.message)
    console.error("Add to cart failed", error);
    toast.error("Login first to use cart");
  }
  }//add product to cart



  return (
    <div className='productMain'>
      {product ? (
        <div className="productMain2">
          <div className='leftDiv'>
            <div className="productborder">
              <div className="product">

                <img src={`${BASE_IMAGE_URL}${product.Image}`} alt="productImage"></img>

                <div className="buttons">
                  <button className={`btn1 ${isAdded ? 'added' : ''}`}
                          disabled={isAdded}
                          onClick={()=>handleAddToCart()}
                          ><FaCartShopping />
                          {isAdded ? '✓ Added' : 'Add to Cart'}
                  </button>
                  <button className='btn2' onClick={()=> navigate("/cart")}>Buy now</button>
                </div>
              </div>
            </div>
            <div className="productdetail">
              <h3 className='title'>{product.title}</h3>
              <p className='price'>{`Price : $${product.price}`}</p>
              <p className="description1">Description</p>
              <p className="description2">{product.desc}</p>
            </div>
          </div>

          <div className='rightDiv'>
            <h3 className='reviewHeading'>Review 3</h3>

            <div className="rating">
              {
                new Array(starcount).fill(0).map((val, index) => {
                  return <span
                    className={hovervalue === 0 && index < starvalue || index < hovervalue ? "goldclass" : ""}
                    onClick={() => setStarvalue(index + 1)}
                    onMouseEnter={() => setHovervalue(index + 1)}
                    onMouseLeave={() => setHovervalue(0)}
                  >&#9733;</span>
                })
              }
            </div>

            <form className='ratingform' onSubmit={handleSubmit}>
              <input type="text" value={productreview} onChange={handleChange} placeholder="Write your review here..." />
              <button type="submit">Submit</button>
            </form>


            {
              reviews && reviews.length !== 0 ? ( 
              <div className="reviewdivmain">
                {
                  reviews.map((review)=>(
                    <div className='reviewdiv'>
                      <div className="leftreview" key={review._id}>
                          <FaUser className='reviewuser'/>
                          <div className="leftreviewtext">
                                <h3 className='reviewer'>{review.username}</h3>
                                <span className='reviewdate'>{new Date(review.createdAt).toISOString().split('T')[0]}</span>
                                <p className='reviewtext'>{review.reviewText}</p>
                          </div>
                      </div>
                      <div className="rightreview">
                          <h3 className='revierating'>{review.rating}</h3>
                          <IoIosStar className='starrating'/> 
                      </div>
                    </div>
                  ))
                }
                    
              </div>
              ) : (<div></div>)
            }
            
          </div>
        </div>
      ) : (<p>product not found</p>)
      }
    </div>
  )
}

export default Productdetail
