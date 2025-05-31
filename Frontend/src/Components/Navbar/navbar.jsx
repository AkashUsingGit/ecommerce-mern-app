import React, { useEffect } from 'react'
import "./navbar.css"
import { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import logo from "../../assets/logo192.png";
import user from "../../assets/user.png"
import { useContext } from 'react';
import {LoginContext} from "../ContextApi"
import { Link } from 'react-router-dom';
import UserDropdown from "../UserDropdown/dropdown.jsx"
import { useNavigate } from 'react-router-dom';
  

const Navbar = () => {
  
  const {loginstate} = useContext(LoginContext)
  const [searchbar, setSearchbar] = useState(false)
  const [query, setQuery] = useState("")
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate()
  


  useEffect(()=>{

    const handleScroll = () => {
      console.log("scrolling")
      setIsSticky(window.scrollY > 50); 
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  },[])
  console.log(isSticky)

  function toggleSearch(){
    console.log("clicked")
    setSearchbar(!searchbar)
  }

  function handleKeyDown(e){
    if(e.key==="Enter" && query.trim()){
      const encodedQuery = encodeURIComponent(query);
      navigate(`/search?q=${encodedQuery}`) 
    }
  }

  function handleIconClick(){
    setSearchbar(!searchbar)
  }

  return (
    <nav className= {` ${isSticky? "sticky" : "navbar"}`}>
          <div className='leftNav'>
        <img src={logo} className='reactlogo'></img>

        {
          searchbar?
          <div class="search-container">
               <input type="text" placeholder="Search..." class="search-input" onChange={(e)=>setQuery(e.target.value)} onKeyDown={handleKeyDown}/>
               <IoSearchOutline className='search' onClick={handleIconClick}/>
          </div>
         : <IoSearchOutline className='search' onClick={toggleSearch}/>
        }
        
        <div className='cartHeading'>
            <IoCartOutline onClick={()=>navigate("/cart")} className='cartlogo'/>
            <p>Cart</p>
        </div>
        
            </div>
          <div className='rightNav'>
                <ul className='navlist'>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/order">Order</Link></li>
                        <li><Link to="/userprofile">Profile</Link></li>
                        <li><Link to="/aboutus">About</Link></li>
                </ul>
            {
             loginstate? (<UserDropdown />) : (<button className='loginbutton'><Link to="/login" className="link-text">Login</Link></button>)
            }
         </div>
    </nav>

  )
}

export default Navbar


