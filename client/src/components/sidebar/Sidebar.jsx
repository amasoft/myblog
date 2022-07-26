import { useEffect } from "react"
import { useState } from "react"
import "./sidebar.css"
import axios from 'axios'
import { Link } from "react-router-dom"

export default function Sidebar() {
  const [cats, setCats]=useState([])
  useEffect(()=>{
 const getCat=async ()=>{
  const res=await axios.get("http://localhost:5000/api/categories")
  console.log("cat"+ JSON.stringify(res))
  setCats(res.data)
 }
 getCat()
  },[])//[ bec we will fire it at the beging of loaading of the page]
  return (
    <div className="sidebar">
        <div className="sidebarItem">
          <span className="sidebarTitle">ABOUT ME</span>  
          <img className="headerImg" src={require('../assets/work2.webp')} alt=""/>
       <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor optio eaque minus, in deserunt adipisci impedit. Ipsa, qui itaque! Modi dicta eligendi nihil architecto minus maxime quod,
          voluptatum rerum quae.</p>
        </div>
        <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>  
        <ul className="sidebarList">
          {cats.map((c)=>{

                return(
                  <> 
                  <Link to={`/?cat=${c.name}`} className="link">

                  <li className="sidebarListItem">{c.name}</li>

                  </Link>
                  </>
                  )
// console.log("patrick"+c.name)
          })}
        
        </ul>
        </div>
        <div className="sidebarItem">
          <div className="sidebarTitles">FOLLOW US</div>
          <div className="sidebarSocial">
            <i className="sidebarIcon fa-brands fa-facebook-square"></i>
            <i className="sidebarIcon fa-brands fa-twitter"></i>
            <i className="sidebarIcon fa-brands fa-pinterest-p"></i>
            <i className="sidebarIcon fa-brands fa-instagram-square"></i>
            
            </div>  
        </div>
      </div>
  )
}
