import { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const LoginContext = createContext()

export const LoginContextProvider = ({children})=>{

    const [loginstate, setLoginstate] = useState(null)
    const [userData, setUserdata] = useState("")
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // console.log("Context running")
    

    useEffect(() => {

        // console.log("use Effect Running")
        axios.get(`${BASE_URL}/user/checkAuth`, { withCredentials: true }) 
        .then((response) => {
            if (response.data.isAuthenticated) {
                setLoginstate(true);
                setUserdata(response.data.username)
            } else {
                setLoginstate(false); 
            }
          })
        .catch((error) => {
            setLoginstate(false);
          });
      }, []);

    return(
        <LoginContext.Provider value={{loginstate,setLoginstate,userData,setUserdata}}>
            {children}
        </LoginContext.Provider>
    )
}