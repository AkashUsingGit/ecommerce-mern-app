import React, { useState } from "react";
import "./footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setEmail("");
      alert("Thanks for subscribing! You'll now get our best deals and updates.");
    }
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <h2>Subscribe Now</h2>
        <p>Join our newsletter and be the first to know about exclusive deals and offers!</p>
        <form onSubmit={handleSubscribe} className="subscribe-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ShopEasy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
