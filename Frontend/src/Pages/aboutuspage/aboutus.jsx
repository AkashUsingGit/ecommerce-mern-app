import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import "./aboutus.css"

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="aboutus-container">
      <h3>
        <strong>Developed by :</strong>{' '}
        <span className="highlight">Akash Singh</span>
      </h3>

      <h4>Contact US</h4>

      <div className="icon-row">
        <a href="https://github.com/AkashUsingGit" target="_blank" rel="noopener noreferrer">
          <FaGithub className="abouticon" />
        </a>
        <a href="https://www.linkedin.com/in/akash-singh-1a514127a/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="abouticon" />
        </a>
      </div>

      <p>Thank You!</p>

      <button className="home-btn" onClick={() => navigate('/home')}>
        Go to Home
      </button>
    </div>
  );
};

export default AboutUs;
