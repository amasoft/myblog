import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import "./register.css"
export default function Register() {
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setpassword]=useState("")
const [erro,setError]=useState(false)
  const handleSubmit=async(e)=>{
    setError(false)
    e.preventDefault()
 try {
  const res=await axios.post("http://localhost:5000/api/auth/register",{
    username,email,password
  })
  console.log(res)
  res.data && window.location.replace("/login")
 } catch (error) {
  console.log('error'+ " "+error)
setError(true)
 }

   
  }
  return (
    <div className="register">
        <span className="registerTitle">Register</span>
      <form action="" className="registerForm" onSubmit={handleSubmit}>
      <label >Username</label>
        <input type="text" className="registerInput" placeholder="Enter your Username"
        onChange={e=>setUsername(e.target.value)}
        />
        <label >Email</label>
        <input type="email" className="registerInput" placeholder="Enter your Email"
                onChange={e=>setEmail(e.target.value)}

        />
        <label >Password</label>
        <input type="password" className="registerInput" placeholder="Enter your password"
                onChange={e=>setpassword(e.target.value)}

        />
        <button className="registerButton" type="submit">Register</button>
        
      </form>
      <button className="registerLoginButton"><Link className="link" to="/login">Login</Link></button>
    {erro && <span style={{color:"red"}}>Something went wrong</span>}
    </div>
  )
}
