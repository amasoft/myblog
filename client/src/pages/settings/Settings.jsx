import { useContext,useState } from "react"
import { useRef } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import { Context } from "../../context/Context"
import axios from "axios"

import "./settings.css"

export default function Settings() {
  const PF = "http://localhost:5000/images/"
  const [file,setfile]=useState('')
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [success,setSuccess]=useState(false)

  const{user,dispatch}=useContext(Context)
  const handleSubmit=async(e)=>{

  e.preventDefault();
  dispatch({type:"UPDATE_START"})
    const updateUser={
      userId:user._id,
      username,email,password
    }
    if(file){
      const data=new FormData();
      const filename=Date.now()+ file.name
      data.append("name",filename)
      data.append("file",file)
      console.log("my image daata"+data)
      updateUser.profilePic=filename
      try {
        await axios.post("http://localhost:5000/api/upload",data)
      } catch (error) {
        console.log("im erro"+error)
      }
    }
    try {
     const res=await axios.put("http://localhost:5000/api/users/"+user._id,updateUser)
     setSuccess(true)
     dispatch({type:"UPDATE_SUCCESS",payload:res.data})

// window.location.replace("/post/"+res.data._id)
    } catch (error) {
  dispatch({type:"UPDATE_FAILURE"})
      
    }
  }
  return (
    <div className="settings">
        <div className="settingsWrapper">
            <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update your Accoucunt{user.profilePic}</span>
            <span className="settingsDeleteTitle">Delete  Accoucunt</span>
            </div>
            <form  className="settingsForm" onSubmit={handleSubmit}>
            <label>Profile  Picture</label>
            <div className="settingsPP">
            
            <img 
            className=""
            src={file ? URL.createObjectURL(file) : PF+user.profilePic          }
            alt=""/>
              <label htmlFor="fileInput">
                <i className="settingsPPIcon far fa-user-circle"></i>
              </label>
              <input type="file" id="fileInput" style={{display:"none"}} onChange={(e)=>{
              setfile(e.target.files[0])
            }} />
            </div>;
            <label>Username</label>
            <input type="text" placeholder={user.username}  onChange={(e)=>{
              setUsername(e.target.value)}} />
            <label>Email</label>
            <input type="email" placeholder={user.email}    onChange={(e)=>{
              setEmail(e.target.value)}}/>
            <label>Password</label>
            <input type="password" placeholder=""   onChange={(e)=>{
              setPassword(e.target.value)}} />
            <button className="settingsSubmit" type="submit" >Update</button>
            {success && <span style={{color:"green",textAlign:"center",marginTop:"20px"}}>profile have been updated successfully....</span>}
       </form>
        </div>
        <Sidebar/>      
    </div>
  )
}
