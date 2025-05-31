import React from 'react'
import { useState,useEffect } from 'react'
import { useSearchParams, Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./searchpage.css"


const SearchPage = () => {
    const [searchproduct, setsearchProduct] = useState()
    const [searchParams] = useSearchParams()
    const query = searchParams.get("q")
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const BASE_IMAGE_URL = import.meta.env.VITE_API_BASE_IMAGE_URL;

    useEffect(()=>{

        const fetchSearchProduct = async () => {
            try {
                const response = await fetch(`${BASE_URL}/product/getSearchproduct?q=${query}`);
                const data = await response.json();
                setsearchProduct(data.data);
            } catch (error) {
            }
        }

        if(query){
            fetchSearchProduct();
        }
    },[query])

  return (
    <>
    <div className="searchreq">Search request for [{query}]</div>
    <div className='mobiledeals mainsearchdiv'>
        
        {
            searchproduct?(
                searchproduct.map((searchproduct)=>{
                    return <Link to={`/productdetail/${searchproduct._id}`}  className="oldproduct">
                        
                        <div className='productimage'>
                            <img src={`${BASE_IMAGE_URL}${searchproduct.Image}`} alt="productImage"></img>
                            <div className='cartdiv'><FaShoppingCart className='cart'/></div>
                        </div>
                        
                        <div className='discription'>
                            <p className='title'>{searchproduct.title}</p>
                            <p className='price'>{`$${searchproduct.price}`}</p>
                        </div>  
                        
                    </Link >
                    
                })
            ) : (<p> Search products not found</p>)
        }
  
    </div>
    </>
  )
}

export default SearchPage
