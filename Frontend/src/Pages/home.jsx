import Navbar from "../Components/Navbar/navbar.jsx"
import Hero from "../Components/Hero/hero.jsx"
import Container from "../Container/container.jsx"
import ProductHeading from "../Components/ProductHeading/productHeading.jsx"
import Productdeals from "../Components/ProductDeals/productdeals.jsx"
import Service from '../Components/Service/service.jsx'
import Newproductbrand from '../Components/Newproductbrands/newproductbrand.jsx'
import Banner from '../Components/banner/banner.jsx'
import { toast } from "react-toastify";
import { useEffect } from 'react'

const Home = () => {

  useEffect(()=>{
    if(localStorage.getItem("showLoginToast") === "true"){
      toast.success("You have successfully logged in!");
      localStorage.removeItem("showLoginToast")
    }
  },[])

  return (
    <Container>
    {/* <Navbar /> */}
    <Hero />
    <ProductHeading heading={"Top Mobiles Deals"} />
    <Productdeals category={"mobile"} productType={"old"}/>
    <ProductHeading heading={"Services"} />
    <Service />
    <ProductHeading heading={"New Mobile brands"} />
    <Newproductbrand  category={"mobile"} productType={"new"}/>
    <Banner />
    <ProductHeading heading={"Top Fashion Deals"} />
    <Productdeals category={"fashion"} productType={"old"}/>
    <ProductHeading heading={"new Fashion brands"} />
    <Newproductbrand  category={"fashion"} productType={"new"}/>
    
  </Container>
  )
}

export default Home
