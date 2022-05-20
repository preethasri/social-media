import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserAvatar } from "../../../Components";
import {PostOptionModal} from "../../../features/post"
import {addBookmark,removeBookmark} from '../../../features/user'
import {useOnClickOutside} from "../../../hooks/useOnClickOutside"
import {likedByLoggedUser,postInBookmarks,getPostDate} from "../../../utils"
import {useState,useRef} from 'react'

export const PostCard=({post})=>{
    const {user,token}=useSelector((state)=>state.auth)
    const{users,bookmarks}=useSelector((state)=>state.user)
    const {posts}=useSelector((state)=>state.post)
    const dispatch=useDispatch()
    const postRef=useRef();
   
    const [showOptions,setShowOptions]=useState(false)
    const[showCommentModal,setShowCommentModal]=useState(false)

    const navigate=useNavigate();

    const currentPost=posts?.find((dbPost)=>dbPost._id===post._id)
    const {_id,username,firstName,content,id,likes,createdAt}=currentPost
 
    const currentUser=users?.find((dbUser)=>dbUser.username===post.username)

    useOnClickOutside(postRef,setShowOptions)

    return(
        <div className="grid grid-cols-[2rem_1fr gap-2 text-sm border-primarybg border-b px-4 py-3 cursor-pointer " onClick={()=>navigate(`/post/${id}`)} ref={postRef}>
              <div onClick={(e)=>{
                  e.stopPropagation()
                  navigate(`/profile/${username}`)
              }}>
                   <UserAvatar user={currentUser} />


              </div>
              <div className="flex flex-col gap-1 break-all">
                  <div className="flex justify-between">
                      <div className="flex items-start 2xl:items-center gap-15" onClick={(e)=>{
                           e.stopPropagation();
                           navigate(`/profile/${username}`)
                      }}>
                          <div className="flex flex-col gap-0 2xl:flex-row 2xl:gap-1">
                              <span className="font-bold">
                                 {firstName}
                              </span>
                              <span>@{username}</span>
                            </div>
                              <span className="text-gray-500">·</span>
                              <div className="text-gary-600">{getPostDate(createdAt)}</div>
                          </div>
                          <div className="relative">
                              <i className="fa-solid fa-ellipsis p-2 cursor-pointer hover:bgprimarybg rounded-full" onClick={(e)=>{
                                  e.stopPropagation();
                                  setShowOptions((prev)=>!prev)
                              }}> </i>
                              {showOptions ?(
                                  <PostOptionModal post={currentPost} setShowOptions={setShowOptions} />

                              ):null
                              }

                          </div>

                      </div>
                      <div>{content}</div>
                      <div className="flex gap-6 -ml-2 mt-1">
                          <div >
                              <button className={`hover:primarybg cursor-pointer rounded-full`}
                              onClick={(e)=>{
                                  e.stopPropagation();
                                  likedByLoggedUser(currentPost,user)
                                  ?dispatch(dislikePost({token,_id}))
                                  :dispatch(likePost({token,_id}))
                              }}
                              >
                                <i className={`fa-heart p-2 
                                ${likedByLoggedUser(currentPost,user)
                                ?"fa-solid text-red" :"fa-regular"
                                }`}>

                                </i>
                              </button>
                              {likes.likeCount >0 &&(
                                  <span className="ml-1">{likes.likeCount}</span>

                              )}
                              {likes.likeCount===1 ?(<span className="p-0.5">like</span>):(<span className="p-0.5">likes</span>)}
                          </div>
                          <div>
                              <button className="hover:bg-primary-bg cursor-pointer rounded-full"
                               onClick={()=>{e.stopPropagation()
                                setShowCommentModal(true)
                             }}
                              >
                               <i className="fa-regular fa-message p-2"></i>
                              </button>
                              {currentPost.comments.length >0 &&(
                                  <span className="ml-1">{currentPost.comments.length}</span>
                              )}
                                {currentPost.commnets.length===1 ?(<span className="p-0.5">Comment</span>):(<span className="p-0.5">Comments</span>)}
                          </div>
                          <button className="hover:bg-primarybg cursor-pointer rounded-full"
                          onClick={()=>{
                              e.stopPropagation();
                              postInBookmarks(bookmarks,_id)
                              ?dispatch(removeBookmark({token,_id}))
                              :dispatch(addBookmark({token,_id}))}}
                           >
                               <i className={`fa-bookmark p-2 
                               ${postInBookmarks(bookmarks,_id) ?"fa-solid text-primary" :"fa-regular"
                                }`}>

                               </i>

                          </button>
                      </div>

                  </div>
                  {
                      showCommentModal ?(
                          <div className="bg-[#f1f1f1] top-0 left-0 fixed w-full h-full z-40 flex justify-center items-center cursor-default b-solid primary "
                          onClick={(e)=>e.stopPropagation()}
                          >
                              <CommentModal setShowCommentModal={setShowCommentModal} postId={currentPost?._id}/>
                          </div>
                      ):null}
                  
    </div>
               
    


    )
}  