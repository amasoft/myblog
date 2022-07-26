import Post from "../post/Post"
import  "./posts.css"
// react nodejs social media app tutorial-mearn stack app full courser webkitURL/hooks
export default function Posts({posts}) {
 var arraydata=["name","age","birth"]
 const data =[{"name":"test1"},{"name":"test2"}];
 const listItems = data.map((d) => <li key={d.name}>{d.name}</li>);
console.log("Amadi"+posts)
return (
    <div className="posts">

      {posts.map((p)=>{
         return (   
            <Post post={p} />
       )
       })}
   </div>
  )
}
