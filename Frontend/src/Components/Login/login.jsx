import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import "./login.css"
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../ContextApi';
import { toast } from 'react-toastify';
import { setCart } from '../../redux/slice';
import { useDispatch } from 'react-redux';

const Login = ({ setLogin }) => {

    const { setLoginstate, setUserdata } = useContext(LoginContext)
    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    async function onSubmit(userData) {
        try {
            const response = await axios.post(`${BASE_URL}/user/loginUser`,
                {
                    email: userData.email,
                    password: userData.password
                },
                {
                    withCredentials: true
                }
            )
            setUserdata(response.data.data.user.username)
            localStorage.setItem("showLoginToast", "true")
            await checkAuthStatus()
            await fetchCartFromBackend()
            navigate("/home")
        } catch (error) {
            reset()
            console.error("Error login user:", error);
            toast.error("Error logging in user");
        }
    }

    async function checkAuthStatus() {
        try {
            const { data } = await axios.get(`${BASE_URL}/user/checkAuth`, { withCredentials: true });
            setLoginstate(data.isAuthenticated);
        } catch (error) {
            console.error("Error checking authentication:", error);
            setLoginstate(false);
        }
    }

    async function fetchCartFromBackend() {
        try {
            const res = await axios.get(`${BASE_URL}/cart/getcart`, {
                withCredentials: true,
            });
            dispatch(setCart(res.data.items));
        } catch (err) {
            console.error("Failed to fetch cart:", err);
            toast.error("Could not load your cart");
        }
    }

    useEffect(() => {
        if (localStorage.getItem("showLogoutToast") === "true") {
            toast.success("Logged Out!")
            localStorage.removeItem("showLogoutToast")
        }
    })


    return (

        <div className='login'>
            <form className='loginform' onSubmit={handleSubmit(onSubmit)}>
                <input type="email"  {...register("email", { required: true })} placeholder='Enter email' />
                <input
                    type="password"
                    placeholder='Enter password'
                    {...register("password", {
                        required: true,
                        minLength: { value: 8, message: "Password must be at least 8 characters long" },
                        pattern: {
                            value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                            message: "Password must include an uppercase letter, a number, and a special character",
                        }
                    })}
                />
                {errors.password && <p>{errors.password.message}</p>}

                <button type="submit" className='submitbtn'>Login</button>
            </form>

            <p>Don't have an account?
                <button onClick={() => setLogin(false)}>Register</button>
            </p>

        </div>
    )
}

export default Login
