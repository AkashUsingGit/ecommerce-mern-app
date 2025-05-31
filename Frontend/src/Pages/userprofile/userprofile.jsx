import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./userprofile.css"
import { FaGithub } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";

const UserProfile = () => {

  const [userProfile, setUserprofile] = useState()
  const navigate = useNavigate({})
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const getUser = async () => {
      try {
        const userAuth = await axios.get(`${BASE_URL}/user/checkAuth`, {
          withCredentials: true
        })

        if (userAuth.data.isAuthenticated == false) {
          console.log("login first")
          navigate("/login")
          return
        } else if (userAuth.data.isAuthenticated == true) {
          const user = await axios.get("http://localhost:4000/api/v1/user/getUser", {
            withCredentials: true
          })
          if (user) {
            setUserprofile(user.data.data)
          }

          console.log(user.data.data.username)
        }

      } catch (error) {
        console.log(error)
      }
    }

    getUser()
  }, [])


  if (!userProfile) return <p>Loading user data...</p>;

  return (
    <div className="container">
      <div className="sidebar">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
          alt="Profile"
          className="avatar"
        />
        <h2>{userProfile.username?.split(" ")[0].toUpperCase()}</h2>
        <p className="role">{userProfile.role}</p>
        <p>Contact US</p>
        <div className="profileicons">

          <a href="https://github.com/AkashUsingGit" target="_blank" rel="noopener noreferrer">
            <FaGithub className="giticon" />
          </a>
          <a href="https://www.linkedin.com/in/akash-singh-1a514127a/" target="_blank" rel="noopener noreferrer">
            <BsLinkedin className='linkedinicon' />
          </a>

        </div>
      </div>

      <div className="main">
        <h2 className="header">USER INFORMATION</h2><hr />
        <div className="info">
          <p><strong>Name:</strong> {userProfile.username}</p>
          <p><strong>Email:</strong> {userProfile.email}</p>
        </div>

        <h3 className="subheader">Details</h3><hr />
        <div className="details">
          <p>Order: {userProfile.order?.length}</p>
          <p>Contact Us: 0</p>
        </div>

        <div className="contact-section">
          <h3>Contact Us:</h3>
          <textarea placeholder="Type your message here..." />
          <button className='profilebutton'>Send</button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
