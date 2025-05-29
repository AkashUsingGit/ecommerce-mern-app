import React from 'react'
import banner from "../../assets/banner.png"

const Banner = () => {
  return (
    <div style={
        {
            width :   "100%",
            marginBottom : "25px"

        }
    }>
        <img src={banner} style={{ height : "400px", width : "100%"}}></img>
      
    </div>
  )
}

export default Banner
