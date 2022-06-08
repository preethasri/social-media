import './BottomNav.css'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {UserAvatar} from '../UserAvatar/UserAvatar'
const activeStyle={
    
    fontWeight:"bold",
    color:"#b042ff",
}


export const BottomNav=()=>{
    const {user}=useSelector((state)=>state.auth)
    const {users}=useSelector((state)=>state.user)

    const currentUser=users.find((dbUser)=>dbUser.username===user.username)
    
    return(
        <>
        
        <div className='bottom-nav'>
            <div className='bottom-nav-menu'>
                <div className='bottom-nav-list'>
                 <NavLink to="/" style={({isActive })=>(isActive ?activeStyle :undefined)}>
                    <div className='bottom-nav-item'>
                      <span className="material-icons">home</span>
                    </div>
                    </NavLink>
                    <NavLink to="/explore" style={({isActive })=>(isActive ?activeStyle :undefined)}>
                    <div className='bottom-nav-item'>
                      <span className="material-icons">tag</span>
                    </div>
                   </NavLink>
                   <NavLink to="/bookmarks" style={({isActive })=>(isActive ?activeStyle :undefined)}>
                   <div className='bottom-nav-item'>
                      <span className="material-icons">bookmark</span>
                    </div>
                    </NavLink>
                    <NavLink to={`/profile/${currentUser?.username}`} style={({isActive })=>(isActive ?activeStyle :undefined)}>
                    <div className='bottom-nav-item'>
                        <UserAvatar user={currentUser}  />
                    </div>
                    </NavLink>

                </div>

            </div>

        </div>
        </>
    )
}
