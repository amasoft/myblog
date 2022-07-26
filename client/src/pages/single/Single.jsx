import "./single.css"
import Post from '../../components/post/Post'
import Sidebar from '../../components/sidebar/Sidebar'
import SinglePost from '../../components/singlePost/SinglePost'

export default function Single() {
  return (
    <div  className="single">
<SinglePost/>        
              <Sidebar/>
    </div>
  )
}
