import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      
      {/* Top bar */}
      <div className="footer-top">
        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to top
        </button>
      </div>

      {/* Main links */}
      <div className="footer-main">
        <div className="footer-column">
          <h4>Get to Know Us</h4>
          <a href="#">About EcoShop</a>
          <a href="#">Careers</a>
          <a href="#">Sustainability</a>
        </div>

        <div className="footer-column">
          <h4>Connect with Us</h4>
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
        </div>

        <div className="footer-column">
          <h4>Make Money with Us</h4>
          <a href="#">Sell on EcoShop</a>
          <a href="#">Affiliate Program</a>
          <a href="#">Advertise Products</a>
        </div>

        <div className="footer-column">
          <h4>Let Us Help You</h4>
          <a href="#">Your Account</a>
          <a href="#">Orders</a>
          <a href="#">Help Center</a>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} EcoShop. All rights reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;
