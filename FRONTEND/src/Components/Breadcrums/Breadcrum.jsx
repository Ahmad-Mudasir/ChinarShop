import React from 'react'
import "./Breadcrum.css"
import arrow_icon from '../../assets/Frontend_Assets/breadcrum_arrow.png';
const Breadcrum = (props) => {
    const {product} = props;//sand data from parent product page
  return (
    <div className='breadcrum'>
        HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.name}
        </div>
  )
}

export default Breadcrum;