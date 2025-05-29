import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/navbar.jsx";
import Footer from "./Footer/footer.jsx";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
