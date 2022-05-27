import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAvatar } from"../../../Components";
import {CommentOptionModal} from '../../../features/post'
import { getPostDate} from "../../../utils";

export const CommentCard=({comment,postId})=>{
    const navigate=useNavigate()

    

    const {username,firstName,createdAt,comment:commentText}=comment
    const [showOptions,setShowOptions]=useState(false)
     
    const loggedInUser=user.username===username

    return(
       <div className="grid grid-cols-[2rem_1fr] gap-2 pt-3 border-b border-primarybg">
         <div onClick={(e)=>{
             e.stopPropagation()
             navigate(`/profile/${username}`)
             }}>
               <UserAvatar user={comment} />
         </div>
         <div className="flex flex-col gap-1 break-all">
             <div className="flex justify-between">
                 <div className="flex items-start 2xl:items-center gap-1 cursor-pointer"
                  onClick={(e)=>{
                      e.stopPropagation()
                      navigate(`/profile/${username}`)
                  }}
                 >
                     <div className="flex flex-col gap-0 2xl:flex-row 2xl:gap-1">
                         <span className="font-bold tracking-wide">{firstName}</span>
                         <span className="text-gray-600">@{username}</span>
                     </div>
                        <span className="text-gray-600">.</span>
                        <div className="text-gary-600">{getPostDate(createdAt)}</div>
                 </div>
                 
                     <div className="relative">
                          <i className="fa-solid fa-ellipsis p-2 cursor-pointer hover:bg-primarybg rounded-full" 
                          onClick={(e)=>{
                              e.stopPropagation()
                              setShowOptions((prev)=>!prev) }}></i>

                        
                            {showOptions ?(
                                  <CommentOptionModal comment={comment} postId={postId} setShowOptions={setShowOptions} />
                                  ):null}
                                  </div>
                        
                              </div>
                              <div>{commentText}</div>
    
                       </div>
                       </div>
    
    
    )








}