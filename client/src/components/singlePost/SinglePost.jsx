import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import "./singlePost.css"
import axios from 'axios'
import { useContext } from "react"
import {Context} from "../../context/Context"
export default function SinglePost() {
  const location=useLocation()
  console.log( location)
  const path=location.pathname.split("/")[2]
  console.log( path)
  const[post,setPost]=useState({})
  const PF="http://localhost:5000/images/"
  const{user}=useContext(Context)
  const [title,setTitle]=useState("")
  const [desc,setDesc]=useState("")
  const [updateMood,setUpdateMood]=useState(false)

 
useEffect(()=>{
  const getPost=async ()=>{
    const res=await axios.get("http://localhost:5000/api/posts/" + path)
    setPost(res.data)
    setTitle(res.data.title)
setDesc(res.data.desc)
    // console.log(res)
  }
  getPost()
},[path])
const handleDelete=async()=>{
console.log("user"+user.username)
  try {
    await axios.delete(`http://localhost:5000/api/posts/${path}`,
    {
      data:{
        username:user.username,
        "id":"ama"
      }
    }).then((res)=>{
      console.log("detailsy"+" "+res)
    })
    window.location.replace("/")
  
  } catch (error) {
    console.log("deel"+error)
  }
}
const handleUpdate= async()=>{
  try {
    await axios.put(`http://localhost:5000/api/posts/${post._id}`,
    {
      //data:{
        username:user.username,
        title:title,
        desc:desc
    //  }
    }).then((res)=>{
      console.log("detailsy"+" "+res)
    })
    // window.location.reload()
  setUpdateMood(false)
  } catch (error) {
    console.log("deel"+error)
  }
}
  return (
    <div className="singlePost">
        <div className="singlePostWrapper">
          {/* /if there is ost image
           */}
        {post.photo && (
          <img 
        // s rc={require('../assets/work2.webp')}
        src={PF+post.photo}
         alt="" 
         className="singlePostImg" />  
        )}
        {
          updateMood ? <input type="text" value={title} className="singlePostTitleInput" autoFocus onChange={(e)=>(setTitle(e.target.value))}/> : (
<h1 className="singlePostTitle">
         {title} 
         {post.username===user?.username && (
 <div className="singlePostEdit">
 <i className="singlePostIcon fa fa-edit"  onClick={()=>{
  setUpdateMood(true)
 }}></i>
 <i className="singlePostIcon fa fa-trash-alt" onClick={handleDelete}></i>
 </div>

         )}
            </h1>  
         
          )
        }
            <div className="singlePostInfo">
            <span className="singlePostAuthor">
            Author:
              <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b></Link></span> 
            <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            {updateMood ? (
              <textarea className="singlePostDescInput" value={desc} onChange={(e)=>(setDesc(e.target.value))}/>
            ):(
              <p className="singlePostDesc">{desc}</p>

            )
          
          }
          {updateMood && ( 
             <button className="singlePostButton" onClick={handleUpdate}>update</button>
          )
        }
        </div>      
    </div>
  )
}
