import React from 'react'
import './Hero.css'
import arrow_icon from "../../assets/Frontend_Assets/arrow.png"
import hero_image from "../../assets/Frontend_Assets/exclusive_image.png"
const Hero = () => {
  return (
    //parent div
    <div className='hero'>
        {/* LEFT DIV */}
    <div className='hero-left'>
         <h2>NEW ARRIVALS ONLY</h2>
         <div>
            <p>Elevate Your Look</p>
            <p className='Discover'>Discover</p>
            <p>Your Style</p>
         </div>
         <div className="hero-latest-btn">
            <div>Latest Collection</div>
            <img src={arrow_icon} alt="arror-icon" />
         </div>
    </div>
        {/* RIGHT DIV */}
    <div className='hero-right'>
<img   src={hero_image}  alt="" />
    </div>
    </div>
  )
}

export default Hero