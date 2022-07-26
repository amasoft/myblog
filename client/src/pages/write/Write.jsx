import { useState } from "react"
import "./write.css"
import axios from "axios"
import {Editor} from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { useContext } from "react"
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {Context} from "../../context/Context"
export default function Write() {
  const [title,settitle]=useState('')
  const [desc,setdesc]=useState('')
  const [editorState,seteditorState]=useState('')
  const [file,setfile]=useState('')
const{user}=useContext(Context)
const checktext=()=>{
alert("thank boss"+editorState)
console.log("text"+JSON.stringify(editorState))
}
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const newPost={
      username:user.username,

      title,
      desc
    }
    if(file){
      const data=new FormData();
      const filename=Date.now()+ file.name
      data.append("name",filename)
      data.append("file",file)
      console.log("my image daata"+data)
      newPost.photo=filename
      try {
        await axios.post("http://localhost:5000/api/upload",data)
      } catch (error) {
        console.log("im erro"+error)
      }
    }
    try {
     const res=await axios.post("http://localhost:5000/api/posts/",newPost)
window.location.replace("/post/"+res.data._id)
    } catch (error) {
      
    }
  }
  return (
    <div className="write">
      {
        file && (
<img 
        // src={require('../../components/assets/work2.webp')}
        src={URL.createObjectURL(file)}
        alt="" 
         className="writeImg" />
        )
      }
        
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
            <label htmlFor="fileInput">
                <i className="writeIcon fas fa-plus"></i>
            </label>
            <input type="file" id="fileInput"  style={{display:"none"}} 
            onChange={(e)=>{
              setfile(e.target.files[0])
            }}
            />
            <input type="text" placeholder="Title" className="writeInput" autoFocus={true}
             onChange={(e)=>{
              settitle(e.target.value)
            }}
            />
        </div>
        <div className="writeFormGroup">
            <textarea placeholder="Tell your story" type="text" className="writeInput writeText"
             onChange={(e)=>{
              setdesc(e.target.value)
            }}
            ></textarea>
        </div>
        <p>rich editor uder</p>
        <Editor
  editorState={editorState}
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
  onEditorStateChange={ this.seteditorState}
/>;
<button className="writeSubmit" type="submit">Publish</button>
<button className="w" onClick={checktext}>check test</button>
      </form>
    </div>
  )
}
