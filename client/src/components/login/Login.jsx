import { useContext } from "react"
import { Link } from "react-router-dom"
import { Context } from "../../context/Context"
import { useRef } from "react"
import "./login.css"
import axios from "axios"
export default function Login() {
  const userRef=useRef()
  const passwordRef=useRef()
  const{user,dispatch,isFetching}=useContext(Context)
  const handleSubmt=async(e)=>{
         e.preventDefault();
      // alert("welcome bos")
    dispatch({type:"LOGIN_START"})
    try {
      const res=await axios.post("http://localhost:5000/api/auth/login",{
        username:userRef.current.value,
        password:passwordRef.current.value
      })
      console.log("data"+res)
      dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    } catch (error) {
      dispatch({type:"LOGIN_FAILURE"})
      console.log("infor"+error)

    }
  }
  console.log({
    "use":user,
  "isfetching":isFetching
  })
  return (
    <div className="login">
        <span className="loginTitle">Login</span>
      <form action="" className="loginForm" onSubmit={handleSubmt}>
        <label >Username</label>
        <input type="text"
         className="loginInput"
          placeholder="Enter your username"
          ref={userRef}
          />
        <label >Password</label>
        <input type="password"
         className="loginInput"
          placeholder="Enter your password"
          ref={passwordRef}
          />
        <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
      </form>
      <button className="loginRegisterButton"><Link className="link" to="/register">Register</Link></button>
    </div>
  )
}
