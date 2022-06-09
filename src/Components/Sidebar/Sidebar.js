import {useState} from 'react'
import {Link,NavLink} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {UserAvatar} from '../UserAvatar/UserAvatar'
import {PostModal} from '../../features/post'
import { logOutHandler } from '../../Pages/Authentication';
import './Sidebar.css'
const activeStyle={
    
    fontWeight:"bold",
    color:"#c175ff",
}

export const Sidebar=()=>{
    const {user}=useSelector((state)=>state.auth)
    const {users}=useSelector((state)=>state.user)

    const currentUser=users.find((dbUser)=>dbUser.username===user.username)
    
    const [showNewPostModal,setShowNewPostModal]=useState(false)
    const dispatch=useDispatch()

    return(
        
        <div className='sidebar-container sm:sticky bg-dark  flex sm:flex-col sm:justify-between sm:h-screen sm:top-0 sm:overflow-y-auto overflow-x-hidden fixed bottom-0 left-0 w-full items-center  sm:border-0 border-t-2 border-darkGrey sm:z-0 z-40  '>
       <div className='flex items-center sm:items-start justify-around  sm:justify-start px-3 py-1 sm:py-4 sm:flex-col gap-3 sm:gap-2 tracking-wide grow'>
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
        </div>
        {showNewPostModal ?(
            <div className="z-50 top-0 left-20 fixed w-[60%] h-full  flex justify-center items-center cursor-default "
            onClick={(e)=>e.stopPropagation()}
            >
               <PostModal  setShowNewPostModal={setShowNewPostModal}/>
            </div>
        ):(null)}

    </div>
        
    )
}