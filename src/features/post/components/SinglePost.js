import {useSelector,useDispatch} from 'react-redux'
import {useState,useEffect,useRef} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import {Loader,Sidebar,SuggestedUsers,UserAvatar} from '../../../Components'
import { PostOptionModal,
       likePost,
       dislikePost,
       getSinglePost,
       resetSinglePost,
       CommentCard,
       addComment,
 } from "../../../features/post"
import {addBookmark,removeBookmark,getAllUsers,FollowListModal} from '../../../features/user'
import { useOnClickOutside } from '../../../hooks/useOnClickOutside'
import { LikedByLoggedUser,PostInBookmarks,focusInput,getPostDate } from '../../../utils'


export const SinglePost=()=>{
    const {postId}=useParams();
    const navigate=useNavigate();

  const {user,token}=useSelector((state)=>state.auth)
  const {
    
    singlePost,
    posts,
    isLoading,
  } = useSelector((state) => state.post);
   const {users,bookmarks}=useSelector((state)=>state.user)
   const dispatch=useDispatch();

   const [showOptions,setShowOptions]=useState(false)
   const[comment,setComment]=useState("")
   const [showLikesModal,setShowLikesModal]=useState(false)
 
   const postRef=useRef()
   const newCommentRef=useRef();
   const currentPost=posts.find((post)=>post.id===postId)
   const currentUser=users?.find((dbUser)=>dbUser.username===currentPost?.username)
 
   const loggedInUser=users.find((dbUser)=>dbUser.username===user.username)

   useEffect(()=>{
       dispatch(getSinglePost(postId))
       dispatch(getAllUsers())
      return ()=>dispatch(resetSinglePost())
   },[posts,postId,dispatch])
   useOnClickOutside(postRef,setShowOptions)
  

function commentSubmitHandler(e) {
    e.preventDefault();
    if (comment.trim()) {
        dispatch(addComment({ token, postId: currentPost._id, commentData: { comment } }));
    }
    setComment("");
}

   return(
       <div className='grid sm:grid-cols-[5rem_1fr] lg:grid-cols-[15rem_1fr] xl:grid-cols-[13rem_1fr_18rem] w-100% lg:[w-80%] mb-16 sm:m-auto'>
           <Sidebar />
           <div className='sm:border-x border-[#f1f1f1]'>
               <h1 className="text-bold p-4 sticky top-0 bg-primary text-white backdrop-blur-sm z-10">
                  <i className='fa-solid fa-arrow-left mr-4 cursor-pointer' onClick={()=>navigate(-1)}></i> 
                 Post
               </h1>
               <div>
                   {isLoading ?(
                       <Loader />
                   ):currentPost?(
                       <div className='flex flex-col gap-2 text-sm border-b border-grey px-4 py-3 break-all' ref={postRef}>
                           <div className='grid grid-cols-[2rem_1fr]gap-2'>
                               <div className='cursor-pointer'
                                 onClick={(e)=>{
                                     e.stopPropagation()
                                     navigate(`/profile/${currentPost?.username}`)
                                 }}>
                                     <UserAvatar user={currentUser} />

                               </div>

                           
                           <div className='flex flex-col gap-2'>
                                <div className='fex justify-between'>
                                    <div className='flex gap-2' onClick={(e)=>{
                                        e.stopPropagation();
                                        navigate(`/profile/${currentPost?.username}`)
                                    }}>
                                     <div className='flex flex-col cursor-pointer' >
                                         <span className='font-bold tracking-wide'>
                                            {currentPost?.fullName}
                                         </span>
                                         <span className='text-gray-600 -mt-1'>
                                             @{currentPost?.username}
                                         </span>

                                     </div>
                                     <span className='text-gray-600 -mt-1'>.</span>
                                     <div className='text-gray'>{getPostDate(currentPost?.createdAt)}</div>
                                    </div>
                                    <div className='relative'>
                                        <i className="fa-solid fa-ellipsis p-2 cursor-pointer hover:bg-primarybg rounded-full" 
                                        onClick={(e)=>{
                                            setShowOptions((prev)=>!prev)
                                            e.stopPropagation()
                                            
                                        }}></i>
                                        {
                                            showOptions ?(
                                                <PostOptionModal 
                                                post={currentPost} 
                                                setShowOptions={setShowOptions} />
                                            ):null
                                        }
                                    </div>
                                </div>
                                <div>{currentPost?.content}</div>

                           </div>

                           </div>

                           {
                               currentPost?.likes.likeCount >0?(
                               <button className='border-b border-primarybg text-left pt-2 mt-2 cursor-pointer ' 
                               onClick={()=>{setShowLikesModal(true)}}
                               >
                               <span className='text-bold'>
                                 {currentPost?.likes.likeCount}
                               </span>{" "}
                               <span className='text-black'>Likes</span>
                               </button>

                           ):null}
                           <div className='flex justify-evenly gap-6 pt-1 mt-1 -mb-1 border-b border-primarybg'>
                               <div>
                                   <button className='cursor-pointer rounded-full '
                                    onClick={()=>{
                                        LikedByLoggedUser(currentPost,user)
                                        ? dispatch(dislikePost({token,_id:currentPost._id}))
                                        :dispatch(likePost({token,_id:currentPost._id}))
                                    }}
                                   >
                                        <i className={` fa-heart p-2 ${ LikedByLoggedUser(currentPost, user)
                                         ? "fa-solid text-red"
                                        : "fa-regular"
                }`}
              ></i>


                                   </button>
                                   {currentPost?.likes.likeCount >0 &&(
                                       <span className='ml-1'>{currentPost?.likes.likeCount}</span>
                                   )}
                               </div>
                               <div>
                                   <button className='cursor-pointer rounded-full hover:bg-primarybg'
                                    onClick={()=>focusInput(newCommentRef)}
                                   >
                                      <i className='fa-regular fa-message p-2'></i>
                                   </button>
                                   {currentPost?.comments.length >0 &&(
                                       <span className='ml-1'>{currentPost?.comments.length}</span>
                                   )}
                               </div>
                               <div>
                                   <button className='rounded-full cursor-pointer '
                                    onClick={() => {
                                        PostInBookmarks(bookmarks, currentPost?._id)
                                          ? dispatch(
                                              removeBookmark({ token, postId: currentPost?._id })
                                            )
                                          : dispatch(
                                              addBookmark({ token, postId: currentPost?._id })
                                            );
                                      }}
                                    >
                                      <i
                                        className={`fa-bookmark p-2 ${
                                          PostInBookmarks(bookmarks, currentPost?._id)
                                            ? "fa-solid text-primary"
                                            : "fa-regular"
                                        }`}
                                      ></i>
                                   </button>
                               </div>

                           </div>
                           <div className='grid grid-cols-[2rem_1fr] gap-2 pt-3 border-b border-primarybg'>
                               <UserAvatar user={loggedInUser} />
                                <form className='flex justify-between' 
                                onSubmit={commentSubmitHandler}>
                                        <input type="text" 
                                        required 
                                        ref={newCommentRef} 
                                        placeholder="comment your reply" 
                                        className='outline-none w-full bg-inherit' 
                                         value={comment} 
                                         onChange={(e)=>setComment(e.target.value)}/>
                                        <button className='bg-primarybg rounded-full py-1 px-3 ml-4 disabled:opacity-50 disabled:cursor-not-allowed w-[5.2rem]' 
                                        disabled={!comment.trim()} 
                                        type="submit" > Reply </button>
                                        </form>
                                
                           </div>
                           {currentPost?.comments ?
                            [...currentPost?.comments] ?.reverse()
                            .map((comment)=>(
                                <CommentCard comment={comment} key={comment._id} post={currentPost}/>
                            )):null
                        }
                        </div>):(
                            <p className='p-4 text-center'>Post not found</p>
                        )}

                   
               </div>
               {showLikesModal ?(
                   <div className='bg-[#000000] top-0 left-0 w-full h-full z-40 flex justify-center items-center'>
                       <FollowListModal followModal={{title:"Liked By", list:currentPost?.likes.likedBy}}
                        setFollowModal={setShowLikesModal} />
                   
                   
                   </div>
               ):null}

           </div>
           <div className='hidded xl:block'>
               <SuggestedUsers />

           </div>

       </div>
      
   )

}