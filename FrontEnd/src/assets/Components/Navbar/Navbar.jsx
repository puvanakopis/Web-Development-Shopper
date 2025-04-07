import './Navbar.css'
import logo from './../Assets/Frontend_Assets/logo.png'
import cart_icon from './../Assets/Frontend_Assets/cart_icon.png'
import { useState } from 'react'

const Navbar = () => {

    const [menu, setMenu] = useState('shop')

    return (
        <div className='navbar'>
            
            {/* Logo section */}
            <div className="nav_logo">
                <img src={logo} alt="Logo" />
                <p>Shopper</p>
            </div>

            {/* Navigation menu */}
            <ul className="nav_menu">
                <li onClick={()=>{setMenu('shop')}}>Shop {menu==='shop'? <hr/>:<></>} </li>
                <li onClick={()=>{setMenu('men')}}>Men {menu==='men'? <hr/>:<></>}</li>
                <li onClick={()=>{setMenu('women')}}>Women {menu==='women'? <hr/>:<></>}</li>
                <li onClick={()=>{setMenu('kids')}}>Kids {menu==='kids'? <hr/>:<></>}</li>
            </ul>

            {/* Login and cart section */}
            <div className="nav_login_card">
                <button>Log in</button>
                <div className="cart_icon_container">
                    <img src={cart_icon} alt="Cart" />
                    <div className='nav_cart_count'>0</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
