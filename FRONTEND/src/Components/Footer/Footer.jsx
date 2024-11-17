import React from 'react'
import "./Footer.css"
import footer_logo from '../../assets/Frontend_Assets/logo_big.png'
import instagram_icon from "../../assets/Frontend_Assets/instagram_icon.png"
import pintester_icon from "../../assets/Frontend_Assets/pintester_icon.png"
import whatsapp_icon from "../../assets/Frontend_Assets/whatsapp_icon.png"
const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt="footer_logo" />
            <p>SHOP<span>PER</span></p>
        </div>
        <ul className='footer-links'>
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icons-container">
                <img src={instagram_icon} alt="isnta-icon" />
            </div>
            <div className="footer-icons-container">
                <img src={pintester_icon} alt="pintester-icon" />
            </div>
            <div className="footer-icons-container">
                <img src={whatsapp_icon} alt="whatsapp-icon" />
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright &copy; {new Date().getFullYear()} CHINARSHOP - All Rights Reserved</p>

        </div>
    </div>
  )
}

export default Footer