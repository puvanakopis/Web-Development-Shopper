import './Navbar.css'
import logo from './../Assets/Frontend_Assets/logo.png'
import cart_icon from './../Assets/Frontend_Assets/cart_icon.png'
import { useState } from 'react'
import { Link } from 'react-router-dom';


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
                <li className={menu === 'shop' ? 'activeLi' : ''} onClick={() => { setMenu('shop') }}> <Link className='list' to='/' style={{ textDecoration: 'none'  }}>Shop</Link>  </li>
                <li className={menu === 'men' ? 'activeLi' : ''} onClick={() => { setMenu('men') }}> <Link className='list'  to='/men' style={{ textDecoration: 'none' }}>Men</Link> </li>
                <li className={menu === 'women' ? 'activeLi' : ''} onClick={() => { setMenu('women') }}><Link className='list'  to='/women'  style={{ textDecoration: 'none' }}>Women</Link>  </li>
                <li className={menu === 'kids' ? 'activeLi' : ''} onClick={() => { setMenu('kids') }}> <Link className='list'  to='/kids'  style={{ textDecoration: 'none' }}>Kids</Link> </li>
            </ul>

            {/* Login and cart section */}
            <div className="nav_login_card">
                <Link to='/login'><button>Log in</button></Link>
                <div className="cart_icon_container">
                    <Link to='/card'><img src={cart_icon} alt="Cart" /> </Link>
                    <div className='nav_cart_count'>0</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
