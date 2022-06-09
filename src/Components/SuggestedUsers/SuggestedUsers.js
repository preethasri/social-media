import "./SuggestedUsers.css"
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom"
import { UserAvatar } from "../UserAvatar/UserAvatar"
import { followUser } from "../../features/user"

 const SuggestedUsers=()=>{
    const {token,user}=useSelector((state)=>state.auth)
    const {users}=useSelector((state)=>state.user)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const userData=users?.find((dbUser)=>dbUser.username===user.username)
    const filteredUsers=users
    ?.filter((dbUser)=>dbUser.username !== userData?.username)
    ?.filter((eachUser)=>!userData?.following.find((item)=>item.username===eachUser.username))
    
    
    return(
        <div>
        {filteredUsers.length ?(
            <div className="aside-container fixed top-0">
            <div className="aside-input">
            <span className="aside-search material-icons">search</span>
            <input type="text" placeholder="search" />
            </div>
            <div className="text-lg font-bold tracking-wide">
                <h2>Who To Follow</h2>
            </div>
            <div className="bg-[#f1f1f1] pt-4 p-2">
            {filteredUsers.map((user)=>(
                <div>
                <div className="flex items-start cursor-pointer gap-2" key={user._id} onClick={()=>{navigate(`/profile/${user.username}`)}}>
                    <div>
                   <UserAvatar user={user} />
                   </div>
                <div className=" flex flex-col grow mt-5 ">
                        <h3>{user.firstName}
                            <span className="aside-item-headerSpecial mt-5">
                                @{user.username} </span>
                        </h3>
                    </div>
                <div>
                    
                    
                        <button className="bg-primarybg text-sm py-1 px-4 rounded-full text-white mt-5" onClick={(e)=>{
                            e.stopPropagation() 
                            dispatch(followUser({token,followUserId:user._id})
                            )}}>Follow

                        </button>

                    

                </div>
                </div>
                </div>
            ))}
            </div>
            </div>
        ):
        null}
    </div>

    )

}
export {SuggestedUsers}
