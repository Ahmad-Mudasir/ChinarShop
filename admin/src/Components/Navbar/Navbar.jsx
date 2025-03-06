import React from 'react';
import './Navbar.css'; // Import the CSS file
import logo from "../../assets/Images/logo2.png";
import profile from "../../assets/Images/product_28.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo on the left */}
      <div className="navbar-logo">
        <img src={logo} alt="ChinnarShop Logo" />
        <span>ChinnarShop</span>
      </div>

      {/* Profile icon on the right */}
      <div className="navbar-profile">
        <img src={profile} alt="Profile" />
      </div>
    </nav>
  );
};

export default Navbar;