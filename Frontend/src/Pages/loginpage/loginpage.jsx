import React from 'react'
import loginimg from "../../assets/login.jpg"
import { useState } from 'react'
import Register from '../../Components/Register/register.jsx'
import Login from '../../Components/Login/login.jsx'
import "./loginpage.css"
import { FaFacebookF } from "react-icons/fa";
import { ImTwitter } from "react-icons/im";
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {

    const [login, setLogin] = useState(true)

    return (
        <div className='Loginpage'>
            <div className="left">
                <img src={loginimg} alt="loginimg" />
            </div>

            <div className="right">
                <div className='signin'>
                    <p>Sign in with</p>
                    <FaGoogle className='icon' />
                    <ImTwitter className='icon' />
                    <FaFacebookF className='icon' />
                </div>
                <div class="divider">
                    <div class="line"></div>
                    <span class="text">Or</span>
                    <div class="line"></div>
                </div>
                {
                    login ? (
                        <Login setLogin={setLogin} />
                    ) : (
                        <Register setLogin={setLogin} />
                    )
                }
            </div>

        </div>
    )
}

export default LoginPage
