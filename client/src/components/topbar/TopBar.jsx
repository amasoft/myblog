import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import "./topbar.css"
import { Context } from '../../context/Context';
export default function TopBar() {
  const {user,dispatch}=useContext(Context);
  const PF = "http://localhost:5000/images/"
  
  const handleLogout=()=>{
    dispatch({type:"LOGOUT"})
  }
  return (
    <div className='top'>
      <div className="topLeft">
      <i className="topIcon fa-brands fa-facebook-square"></i>
      <i className="topIcon fa-brands fa-twitter"></i>
      <i className="topIcon fa-brands fa-pinterest-p"></i>
      <i className="topIcon fa-brands fa-instagram-square"></i>
      </div>
      <div className="topCenter">
       <ul className="topList">
       {/* <li className='toplistitem'><Link className='link' to="/">{user && user.username}</Link></li> */}

        <li className='toplistitem'><Link className='link' to="/">HOME</Link></li>
        <li className='toplistitem'><Link className='link' to="/About">ABOUT</Link></li>
        <li className='toplistitem'><Link className='link' to="/">CONTACT</Link></li>
        <li className='toplistitem'><Link className='link' to="/Write">WRITE</Link></li>
        <li className='toplistitem' onClick={handleLogout}>{user && "LOGOUT"}</li>

       </ul>
       </div>
      <div className="topRight">
        {
          user ? (
            <Link to="/settings"> 

            <img  
            src={PF+user.profilePic}
      // src={require('./amadi.jpg')}
      // src={require(`http://localhost:5000/api/images/${user.profilePic}`)}
      className='topImg' alt='progfile'
       />
       </Link>

          ):(
            <ul className="topList">
              <li className="toplistitem">
              <Link className='link' to="/login">LOGIN</Link>
              </li>
              <li className="toplistitem">
              <Link className='link' to="/register">REGISTER</Link>
              </li>
            </ul>
          )
        }
      
      <i class="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  )
}
