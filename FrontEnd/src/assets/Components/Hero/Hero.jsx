import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/Frontend_Assets/hand_icon.png'
import arrow_icon from '../Assets/Frontend_Assets/arrow.png'
import hero_img from '../Assets/Frontend_Assets/hero_image.png'

const Hero = () => {
    return (
        <div className='hero'>
            {/*  Hero Left Section  */}
            <div className="hero-left">
                <h2>NEW ARRIVALS ONLY</h2>

                <div className="hero-hand-icon">
                    <p>new  <img src={hand_icon} alt='' /></p>
                    <p>Collection</p>
                    <p>for everyone</p>
                </div>

                <div className="hero-latest-btn">
                    <div>Latest Collection</div>
                    <img src={arrow_icon} alt="" />
                </div>
            </div>

            {/*  Hero Right Section (img) */}
            <div className="hero-right">
                <img src={hero_img} alt="" />
            </div>
        </div>
    )
}

export default Hero
