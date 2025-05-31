import React from 'react'
import { useForm } from 'react-hook-form'
import axios from "axios"
import "./register.css"
import { toast } from "react-toastify";

const Register = ({setLogin}) => {

    const {register, handleSubmit, reset, formState : {errors}} = useForm()
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    function onSubmit(userData){

    reset()
    axios.post(`${BASE_URL}/user/registerUser`,
        {
            username : userData.username,
            email : userData.email,
            password : userData.password
        }
    )
    .then((response) => {
            toast.success(response.data.message);
            reset()
    })
    .catch((error) => {
            toast.error(error.response?.data?.message || "Something went wrong");
            reset()
    });
}


  return (
    <div className='register'>

        <form className="registerform" onSubmit={handleSubmit(onSubmit)}>

            <input placeholder='Enter username' type = "text" {...register("username",{required : true, minLength : 5})} />
            <input placeholder='Enter a valid email address' type = "email"  {...register("email",{required : true})}  />
            <input
            type = "password"  
            placeholder='Enter password'
            {...register("password",{
                required : true,
                minLength : {value : 8, message : "Password must be at least 8 characters long"},
                pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                    message: "Password must include an uppercase letter, a number, and a special character",
                }
            })}
            />
            {errors.password && <p>{errors.password.message}</p>}

            <button className="submitbtn" type="submit">Register</button>
        </form>

        <p>Already have an account?
            <button type='submit' onClick={()=>setLogin(true)}>Login</button>
        </p>
      
    </div>
  )
}

export default Register
