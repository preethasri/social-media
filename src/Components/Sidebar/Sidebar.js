import {useState} from 'react'
import {Link,NavLink} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {UserAvatar} from '../UserAvatar/UserAvatar'
import {PostModal} from '../../features/post'
import { logOutHandler } from '../../Pages/Authentication';
import './Sidebar.css'
const activeStyle={
    backgroundColor:"#c175ff",
    fontWeight:"bold",
    color:"black",
}

export const Sidebar=()=>{
    const {user}=useSelector((state)=>state.auth)
    const {users}=useSelector((state)=>state.user)

    const currentUser=users.find((dbUser)=>dbUser.username===user.username)
    
    const [showNewPostModal,setShowNewPostModal]=useState(false)
    const dispatch=useDispatch()

    return(
        <>
        <div className='sidebar-container fixed-top'>
        <div className='brand'>
            <Link to="/" className='link-tag'>
          
          <div className='brand-name'>Connect</div>
          </Link>
       </div>
        
        <NavLink to="/" style={({isActive })=>(isActive ?activeStyle :undefined)}>
        <div className='sidebar-items'>
          <span className="material-icons">home</span>
          <h2>Home</h2>

        </div>
        </NavLink>
        <NavLink to="/explore" style={({isActive })=>(isActive ?activeStyle :undefined)}>
        <div className="sidebar-items">
        <span className="material-icons">tag</span>
        <h2>Explore</h2>
        </div>
        </NavLink>
        <NavLink to="/bookmarks" style={({isActive })=>(isActive ?activeStyle :undefined)}>
        <div className="sidebar-items">
        <span className="material-icons">bookmark</span>
        <h2>BookMarks</h2>
        
        </div>
        </NavLink>
        <NavLink to={`/profile/${currentUser?.username}`} style={({isActive })=>(isActive ?activeStyle :undefined)}>
        <div className="sidebar-items">
        <UserAvatar user={currentUser}  />
        <h2>{currentUser?.fullName}</h2>
        </div>
        </NavLink>
        <div className="sidebar-items">
        <button onClick={()=>dispatch(logOutHandler())} className="sidebar-items" >
        <span className="material-icons"   >logout</span>
        <h2>Logout</h2>
        </button>
        </div>
       

        <button className='sidebar-tweet-btn' to="/bookmarks" onClick={()=>setShowNewPostModal(true)}>
            Post

        </button>
        {showNewPostModal ?(
            <div className=' top-0 left-0 fixed w-full h-full z-40 flex justify-center items-center cursor-default' onClick=
            {(e)=>e.stopPropagation()}
        
            >
              <PostModal setShowNewPostModal={setShowNewPostModal} />
            </div>
        ):(
            null
        )
    }

    </div>
        </>
    )















}