import { useState } from 'react'
import './App.css'
import Home from './Pages/home.jsx'
import Layout from './Components/Layout.jsx'
import LoginPage from './Pages/loginpage/loginpage.jsx'
import SearchPage from './Pages/searchpage/searchpage'
import {Routes, Route} from "react-router-dom"
import { ToastContainer } from "react-toastify";
import Productdetail from './Pages/productdetail/productdetail.jsx'
import UserProfile from './Pages/userprofile/userprofile.jsx'
import AboutUs from './Pages/aboutuspage/aboutus.jsx'
import CartPage from './Pages/cartpage/cartpage.jsx'
import CheckoutPage from './Pages/checkoutpage/checkout.jsx'
import PaymentSuccess from './Pages/paymentsuccess.jsx'
import PaymentFail from './Pages/paymentfail.jsx'
import OrderPage from './Pages/orderpage/orderpage.jsx'
import MobilePage from './Pages/mobilepage/mobilepage.jsx'
import FashionPage from './Pages/fashionpage/fashionpage.jsx'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <ToastContainer 
      position="top-center" 
      autoClose={1000} // Closes after 3 seconds
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
    

    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />}  />
        <Route path="/home" element={<Home />}  />
        <Route path ="/login" element={<LoginPage/>} />
        <Route path = "/productdetail/:id" element={<Productdetail/>}/>
        <Route path = "/search" element={<SearchPage />} />
        <Route path ="/userprofile" element={<UserProfile />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path ="/cart" element={<CartPage />} />
        <Route path ="/checkout" element ={<CheckoutPage/>}/>
        <Route path ="/success" element ={<PaymentSuccess/>}/>
        <Route path ="/fail" element ={<PaymentFail/>}/>
        <Route path ="/order" element ={<OrderPage/>}/>
        <Route path ="/mobiles" element ={<MobilePage/>}/>
        <Route path ="/fashions" element ={<FashionPage/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
