import React from 'react'
import './Footer.css'
import Footer_logo from '../Assets/Frontend_Assets/logo_big.png'
import Instagram_icon from '../Assets/Frontend_Assets/instagram_icon.png'
import Pintester_icon from '../Assets/Frontend_Assets/pintester_icon.png'
import Whatapp_icon from '../Assets/Frontend_Assets/whatsapp_icon.png'

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-logo">
                <img src={Footer_logo} alt="" />
                <p>SHOPPER</p>
            </div>
            <ul className="footer-links">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>

            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <img src={Instagram_icon} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={Pintester_icon} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={Whatapp_icon} alt="" />
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @ 2025 - All Right Reserved</p>
            </div>
        </div>
    )
}

export default Footer