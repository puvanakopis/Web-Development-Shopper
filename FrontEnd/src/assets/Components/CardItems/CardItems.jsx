import React, { useContext } from 'react'
import './CardItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/Frontend_Assets/cart_cross_icon.png'

const CardItems = () => {
    // Destructuring values from ShopContext
    const { all_product, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext)

    console.log(getTotalCartAmount())

    return (
        <div className='cardItems'>

            {/* Cart Header Row */}
            <div className="cartitem-form-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />



            {/* Cart Items List */}
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitem-format">
                                <img src={e.image} alt="" className='cartitem-product-icon' />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className='cartitem-quantity'>{cartItems[e.id]}</button>
                                <p>${e.new_price * cartItems[e.id]}</p>
                                <img 
                                    src={remove_icon} 
                                    onClick={() => removeFromCart(e.id)} 
                                    alt="Remove"  
                                    className='cartItems-remove-icon' 
                                />
                            </div>
                            <hr />
                        </div>
                    )
                }
                return null;
            })}



            {/* Cart Summary Section */}
            <div className='cartitem-down'>

                <div className="cartitem-total">
                    <h1>Cart Total</h1>
                    <div>
                        <div className="cartitem-total-item">
                            <p>Sub total</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitem-total Shipping">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitem-total">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>Proceed To Checkout</button>
                </div>



                {/* Promo Code Section */}
                <div className="cartitems-promocode">
                    <p>If you have a promo code, enter it here</p>
                    <div className="cartitem-promobox">
                        <input type="text" placeholder='Promo code' />
                        <button type='submit'>Submit</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CardItems
