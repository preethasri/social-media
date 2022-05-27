import {useSelector,useDispatch} from "react-redux"
import { useState } from "react"
import {UserAvatar,Loader} from '../../../Components'
import { logOutHandler } from "../../../Pages/Authentication"
import { EditProfileModal } from "./EditProfileModal"
import { FollowListModal } from "./FollowListModal"
import { followUser,unfollowUser } from "../../user"
import '../styles.css'

export const ProfileDetails=({currentUser})=>{
    const { user, token } = useSelector((state) => state.auth);
    const { users, isLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
  
    const [editModal,setEditModal]=useState(false)

    const [followModal,setFollowModal]=useState({
        show:false,
        title:"",
        list:[],
    })
   const authUser=users.find((dbUser)=>dbUser.username===user.username)

   const {id,username,fullName,website="",bio="",following,followers}=currentUser

   const userAlreadyFollowing=followers?.find((follower)=>follower.username===authUser.username)

   return(
       <div className="profile-details p-4 grid sm:grid-cols-[7rem-1fr] gap-3 border-b border-primarybg">
           {isLoading ? <Loader /> : <UserAvatar user={currentUser} />}

           <div className="flex flex-col grow gap-3 ">
               <div>
                   <div className="flex justify-between items-start w-full">
                       <div className="flex flex-col">
                       <span className="font-bold text-xl">{fullName}</span>
                       <span className="text-sm text-black">@{username}</span>
                     </div>
                     <div className="flex items-center flex-col sm:flex-row gap-2">
                         {id===user.id ?(
                             <>
                             <button className="border border-primary rounded-full text-sm py-1 px-4 w-max"
                              onClick={()=>setEditModal(true)}
                             >
                              Edit Profile 
                             </button>
                             <button title="Logout" className="ml-auto" onClick={()=>dispatch(logOutHandler())}>
                                 <i className="fa-solid fa-sign-out"></i>

                             </button>
                             </>

                         ):(
                             <button className={`py-1 px-4 rounded-full text-sm ${
                                 userAlreadyFollowing
                                 ? "border border-primarybg"
                                 :"bg-primarybg"
                             }`} onClick={
                                 (e)=>{e.stopPropagation()
                                 userAlreadyFollowing ? dispatch(unfollowUser({
                                     token,
                                     followUserId:currentUser._id
                                 }))
                                : dispatch(
                                     followUser({token,followUserId:currentUser._id})
                                 )
                             }}>
                                {userAlreadyFollowing ? "Unfollow" : "follow"}
                             </button>

                         )}

                     </div>

                   </div>
               </div>
               {(website || bio)  && (
                   <div>
                       {bio && <p className="text-black">{bio}</p>}

                       {website && (
                           <a href={website} target="_blank" rel="noreferrer" className="hover:underline text-primary">
                               <i className="fa-solid fa-link mr-1 text-xs">
                                   {website.slice(8)}
                               </i>

                           </a>
                       )}</div>
               )}
               <div className="flex gap-6">
                   <div 
                   className="hover:underline cursor-pointer"
                   onClick={()=>
                       setFollowModal(()=>({
                           show:true,
                           title:"Following",
                           list:following,
                       }))
                   }>
                   <span className="font-bold">{following.length}</span>{" "}
                   <span className="text-grey-600"> Following</span>

                   </div>
                   <div 
                   className="hover:underline cursor-pointer"
                   onClick={()=>
                       setFollowModal(()=>({
                           show:true,
                           title:"Followers",
                           list:followers,
                       }))
                   }>
                   <span className="font-bold">{followers.length}</span>{" "}
                   <span className="text-grey-600"> Followers</span>

                   </div>
            </div>

           </div>
           {editModal ? (
               <div className="bg-secondary top-0 left-0 fixed w-full h-full z-40 flex justify-center items-center ">
                  <EditProfileModal setEditModal={setEditModal} />
               </div>
           ):null}
           {
               followModal.show ?(
                <div className="bg-secondary top-0 left-0 fixed w-full h-full z-40 flex justify-center items-center ">
                <FollowListModal followModal={followModal}  setFollowModal={setFollowModal}/>
             </div>
                   
               ):null
           }

       </div>
   )
}