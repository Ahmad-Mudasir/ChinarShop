import React from 'react'
import "./Offers.css"
import exlusive_image from "../../assets/Frontend_Assets/exclusive_image.png"
const Offers = () => {
  return (
    //Parent div
    <div className='offers'>
             {/* LEFT DIV */}
        <div className='offers-left'>
            <h1>Exlusive</h1>
            <h1>Offers For You</h1>
            <p>ONLY ON BEST SELLERS PRODUCTS</p>
            <button>Check Now</button>
        </div>
            {/* RIGHT DIV */}
        <div className='offers-right'>
            <img src={exlusive_image} alt="" />
        </div>
    </div>
  )
}

export default Offers