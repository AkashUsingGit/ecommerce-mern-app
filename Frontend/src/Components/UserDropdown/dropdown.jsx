import { useState } from "react";
import user from "../../assets/user.png"
import "./dropdown.css"
import axios from "axios"
import { useContext } from "react";
import {LoginContext} from "../ContextApi.jsx"
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setCart } from "../../redux/slice.js";


const UserDropdown = () => {

  const {userData, setLoginstate} = useContext(LoginContext)
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  console.log(userData)

  async function handlelogout(){
      try{
          await axios.get(`${BASE_URL}/user/logoutUser`,
            {
              withCredentials : true
            }
          )
        console.log("logged out succesfully")
        setIsOpen(!isOpen)
        setLoginstate(false)
        localStorage.setItem("showLogoutToast","true")
        dispatch(setCart([]))
        navigate("/login")
      }catch(error){
        console.log(error)
      }
  }

  return (
    <div className="user-container">
      {/* User Icon as Image */}
      <img src={user}  alt="User"  className="user-icon" onClick={toggleDropdown} />

      {/* Dropdown Box */}
      {isOpen && (
        <div className="dropdown">
          <button className="user">{userData}</button>
          <button className="user" onClick={()=>navigate("/userprofile")}>Profile</button>
          <button className="user logout" onClick={handlelogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
