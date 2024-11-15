import React, { useState } from 'react'
import './Navbar.css'
import logo from "../../assets/Frontend_Assets/logo2.png"
import cart_icon from "../../assets/Frontend_Assets/cart_icon.png"
import { Link } from 'react-router-dom'
const Navbar = () => {
    const [menu,setMenu] = useState("shop")
  return (
    <div className='navbar'>
       <div className='nav-logo'>
        <img height={100} src={logo} alt=''/>
       </div>
    
       <ul className='nav-menu'>
        <li onClick={()=> setMenu("shop")}><Link style={{textDecoration:'none',color:'#626262'}} to='/'>Shop</Link> {menu==="shop"?<hr/> : <></>}</li>
            <li onClick={()=> setMenu("Men")}> <Link style={{textDecoration:'none',color:'#626262'}} to='/mens'>Men</Link> {menu==="Men"?<hr/> : <></>}</li>
            <li onClick={()=> setMenu("Women")}><Link style={{textDecoration:'none',color:'#626262'}} to='/womens'>Women</Link> {menu==="Women"?<hr/> : <></>}</li>
            <li onClick={()=> setMenu("Kids")}><Link style={{textDecoration:'none',color:'#626262'}} to='/kids'>Kids</Link> {menu==="Kids"?<hr/> : <></>}</li>
       </ul>
       <div className='nav-login-cart'>
             <Link to='/login'><button>Login</button></Link>
             <Link to='/cart'><img src={cart_icon} alt="carticon" /></Link>
             <div className='nav-cart-count'>0</div>
       </div>
    </div>
  )
}

export default Navbar