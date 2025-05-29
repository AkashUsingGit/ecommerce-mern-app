import React from 'react'
import { useState,useEffect } from 'react'
import { useSearchParams, Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./searchpage.css"


const SearchPage = () => {
    const [searchproduct, setsearchProduct] = useState()
    const [searchParams] = useSearchParams()
    const query = searchParams.get("q")

    useEffect(()=>{

        const fetchSearchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/v1/product/getSearchproduct?q=${query}`);
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
                            <img src={`http://localhost:4000${searchproduct.Image}`} alt="productImage"></img>
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
