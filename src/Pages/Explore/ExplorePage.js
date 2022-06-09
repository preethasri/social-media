import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import {Loader,Sidebar,SuggestedUsers,BottomNav} from '../../Components'
import { getPosts,PostCard } from "../../features/post"
import { getAllUsers } from "../../features/user"
import { sortByDate } from "../../utils"
export const ExplorePage=()=>{
    const dispatch=useDispatch()
   
    let {posts,isLoading}=useSelector((state)=>state.post)

    useEffect(()=>{
        dispatch(getPosts())
        dispatch(getAllUsers())
    },[dispatch])
    const latestPosts=sortByDate(posts,"Latest")
    return(
        
        
        <div className=" grid sm:grid-cols-[5rem_1fr] lg:grid-cols-[15rem_1fr] md:grid-cols-1 xl:grid-cols-[13rem_1fr_18rem] w-[100%] lg:w-[80%] mb-16 sm:m-auto offset-sm-6 ">
            <Sidebar />
            <div className="sm:border-x border-darkGrey">
           <h1 className="text-bold p-4 sticky top:0  backdrop-blur-sm z-20 border-b border-darkGrey flex items-center justify-between rounded-full text-primary-900">
             Explore
            </h1>
            
        
        
      
        <div>
            {isLoading ?(
                <Loader />


            ):latestPosts?.length ?(
                [...latestPosts]
                .reverse()
                .map((post)=><PostCard post={post} key={post._id}/>)
            ):(<div className="p-4 text-enter">No Posts</div>)
            }
        </div>
        </div>
    
        <div className="hidden xl:block">
            <SuggestedUsers />

        </div>
        
        <BottomNav />
        </div>
    )
}