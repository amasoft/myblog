import "./header.css"

export default function Header() {
  return (
    <div className='header'>
        <div className="headerTitles">
            <span className="headerTitlesSm">React & node</span>
            <span className="headerTitlesLg">Blog</span>
        </div>
        <img className="headerImg" src={require('../assets/work2.webp')} alt=""/>
    </div>
  )
}
