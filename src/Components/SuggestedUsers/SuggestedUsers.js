import "./SuggestedUsers.css"
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom"
import { UserAvatar } from "../UserAvatar/UserAvatar"

 const SuggestedUsers=()=>{
    const {token,user}=useSelector((state)=>state.auth)
    const {users}=useSelector((state)=>state.user)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const userData=users?.find((dbUser)=>dbUser.username===user.username)
    const filteredUsers=users
    ?.filter((dbUser)=>dbUser.username !==userData?.username)
    ?.filter((eachUser)=>!userData?.following.find((item)=>item.username===eachUser.username))
    
    
    return(
        <div>
        {filteredUsers.length ?(
            <div className="aside-container">
            <div className="aside-input">
            <span className="aside-search material-icons">search</span>
            <input type="text" placeholder="search" />
            </div>
            <div className="aside aside-header">
                <h2>Who To Follow</h2>
            </div>
            {filteredUsers.map((user)=>(
                <div className="aside aside-items">
                <div className="aside aside-item cursor-pointer" key={user._id} onClick={()=>{navigate(`/profile/${user.username}`)}}>
                   <UserAvatar user={user} />
                <div className="aside-item-headerText">
                        <h3>{user.firstName}
                            <span className="aside-item-headerSpecial">
                                @{user.username} </span>
                        </h3>
                    </div>
                <div>
                    
                    <div className="aside-item-btn">
                        <button className="follow-btn" onClick={(e)=>{e.stopPropagation() }}>Follow

                        </button>

                    </div>

                </div>
                </div>
                </div>
            ))}
            </div>
        ):
        null}
    </div>

    )

}
export {SuggestedUsers}
