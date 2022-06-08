import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import {Loader,Sidebar,SuggestedUsers,BottomNav} from '../../Components'
import { getPosts,PostCard } from "../../features/post"
import { getAllUsers,ProfileDetails } from "../../features/user"
import { useParams,useNavigate}from 'react-router-dom'

export const ProfilePage=()=>{
    const dispatch=useDispatch()
    const {username}=useParams()
    const navigate=useNavigate()
    const {users}=useSelector((state)=>state.user )
    const {posts,isLoading}=useSelector((state)=>state.post)

    useEffect(()=>{
        dispatch(getPosts())
        dispatch(getAllUsers())
    },[dispatch])
    const currentUser=users?.find((user)=>user.username===username)
    const currentUserPosts=posts?.filter((post)=>post.username===username)
    return(
        
        <div className="grid sm:grid-cols-[5rem_1fr] lg:grid-cols-[15rem_1fr] xl:grid-cols-[13rem_1fr_18rem] w-[100%] lg:w-[80%] mb-16 sm:m-auto">
            <Sidebar />
            <div className="sm:border-x border-darkGrey">
            <h1 className="text-bold px-4 py-2 sticky top:0 backdrop-blur-sm z-10 border-b border-darkGrey flex items-center rounded-full text-primary-900">
              <i className="fa-solid fa-arrow-left mr-4 cursor-pointer" onClick={()=>navigate(-1)}> </i>
              <span>
                  <p className="font-bold tracking-wide text-black">{currentUser?.firstName}</p>
                  <p className="text-sm text-black">
                      {currentUserPosts?.length}posts

                  </p>
              </span>
           
           
              </h1>
            
            
        {currentUser ? <ProfileDetails currentUser={currentUser} />:null}
        
        
            {isLoading ?(
                <Loader />


            ):!currentUser ?(
                <p className="p-4 text-center">User Not Found</p>
            ):currentUserPosts?.length ?(
                [...currentUserPosts]?.reverse()
                .map((post)=><PostCard post={post} key={post._id} />)
            ):(
                <div className="connect-container grid sm:grid-cols-[5rem_1fr] lg:grid-cols-[15rem_1fr] xl:grid-cols-[13rem_1fr_18rem] w-[100%] lg:w-[80%] mb-16 sm:m-auto">
                <p className="p-4 text-center">No Posts to Show</p>
                </div>
            )}
            </div>
            <div className="hidden xl:block">
                <SuggestedUsers />

            </div>
            
            <BottomNav />
            </div>
            
    )
}