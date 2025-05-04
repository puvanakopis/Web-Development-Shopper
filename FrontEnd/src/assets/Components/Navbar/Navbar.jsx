import './Navbar.css'
import logo from './../Assets/Frontend_Assets/logo.png'
import cart_icon from './../Assets/Frontend_Assets/cart_icon.png'
import { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/Frontend_Assets/nav_dropdown.png'


const Navbar = () => {

    const [menu, setMenu] = useState('shop')

    const { getTotalCartItem } = useContext(ShopContext)

    const menuRef = useRef()

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav_menu-visible')
        e.target.classList.toggle('open')
    }

    return (
        <div className='navbar'>

            {/* Logo section */}
            <div className="nav_logo">
                <img src={logo} alt="Logo" />
                <p>Shopper</p>
            </div>

            {/* Navigation menu */}
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className="nav_menu">
                <li className={menu === 'shop' ? 'activeLi' : ''} onClick={() => { setMenu('shop'), window.scrollTo(0, 0) }}> <Link className='list' to='/' style={{ textDecoration: 'none' }}>Shop</Link>  </li>
                <li className={menu === 'men' ? 'activeLi' : ''} onClick={() => { setMenu('men') }}> <Link className='list' to='/men' style={{ textDecoration: 'none' }}>Men</Link> </li>
                <li className={menu === 'women' ? 'activeLi' : ''} onClick={() => { setMenu('women') }}><Link className='list' to='/women' style={{ textDecoration: 'none' }}>Women</Link>  </li>
                <li className={menu === 'kids' ? 'activeLi' : ''} onClick={() => { setMenu('kids') }}> <Link className='list' to='/kids' style={{ textDecoration: 'none' }}>Kids</Link> </li>
            </ul>

            {/* Login and cart section */}
            <div className="nav_login_card">
                {localStorage.getItem('auth-token') ? (<button onClick={() => {
                    localStorage.removeItem('auth-token');
                    window.location.replace('/');
                }}> Logout</button>) : <Link to='/login'><button>Log in</button></Link>}


                <div className="cart_icon_container">
                    <Link to='/card'><img src={cart_icon} alt="Cart" />
                        <div className='nav_cart_count'>{getTotalCartItem()}</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
