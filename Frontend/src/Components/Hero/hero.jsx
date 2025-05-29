import React, { useEffect, useState } from 'react'
import img1 from "../../assets/Kendal.png"
import img2 from "../../assets/kenny.png"
import img4 from "../../assets/phone.png"
import img5 from "../../assets/shraddha.png"
import mobile from "../../assets/mobile.png"
import fashion from "../../assets/cloth.png"
import "./hero.css"
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { useNavigate } from 'react-router-dom'



const Hero = () => {

  const navigate = useNavigate()

  const image =[img1,img2,img4,img5]

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(()=>{
    const Interval = setInterval(()=>{
        nextSlide()
    },3000)

    return ()=>{
        clearInterval(Interval)
    }
  },[currentIndex])

  function nextSlide(){
    setCurrentIndex((prevIndex)=>
        prevIndex === image.length-1? 0 : prevIndex+ 1
    )
  }

  function prevSlide(){
    setCurrentIndex((prevIndex)=>
        prevIndex === 0? image.length-1 : prevIndex-1
    )
  }


  return (


    <div className="hero">
        <div className="tabs">
            <div className="mobiles" onClick={()=>navigate("/mobiles")}>
                <img src={mobile} className="tabimage"></img>
                <p>Mobiles</p>
            </div>
            <div className="fashion" onClick={()=>navigate("/fashions")}>
                <img src={fashion} className="tabimage"></img>
                <p>Fashions</p>
            </div>
            <div className="fashions"></div>
        </div>
        <div className="slider">
          <SlArrowLeft className='backarrow' onClick={prevSlide}/>
          <SlArrowRight className='forwardkarrow' onClick={nextSlide}/>
           
          <img key={currentIndex} src={image[currentIndex]} alt="Sliding Image"></img>
         
        </div>
      
    </div>

  )
}

export default Hero
