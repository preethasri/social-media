import { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserAvatar } from "../../../Components";
import { CommentOptionModal } from "../../../features/post";
import { getPostDate } from "../../../utils";
import { useSelector } from "react-redux";

export const CommentCard = ({ comment, post }) => {
  
    const {users}=useSelector((state)=>state.user)
    const {user}=useSelector((state)=>state.auth)
   const [showCommentOptions,setCommentOptions]=useState(false)
    const currentUser=users?.find((user)=>user.username===post?.username)
   const commentRef=useRef(null)
   const navigate=useNavigate()
  return (
    <div className="border-slate-300 border-b px-4 py-3 text-black grid grid-cols-[2rem_1fr] gap-2 pt-3 ">
    <div onClick={(e)=>{
        e.stopPropagation()
        navigate(`/profile/${username}`)

    }}>
          <UserAvatar user={comment} />

    </div>
    <div className="flex flex-col gap-1 break-all">
    <div className="flex justify-between">
        <div 
        className="flex items-start 2xl:items-center gap-1 cursor-pointer"
        onClick={(e)=>{
            e.stopPropagation()
            navigate(`/profile/${username}`)
        }}
        >
         <div className="flex flex-col gap-0 2xl:flex-row 2xl:gap-1">
              <span className="font-bold tracking-wide">{comment.fullName}</span>
              <span className="text-grey">@{comment.username}</span>
            </div>
            <span className="text-grey">·</span>
            <div className="text-grey">{getPostDate(comment.createdAt)}</div>
          </div>
        {user.username === comment.username ? (
            <div className="relative" ref={commentRef}>
                <button
                    className="w-6 h-6 text-slate-800 dark:text-slate-300"
                    onClick={(e) => {
                        e.stopPropagation();
                        setCommentOptions((prev) => !prev);
                    }}
                >
                    <span className="material-icons-outlined pointer-events-none">more_vert</span>
                </button>
                {showCommentOptions ? (
                    <CommentOptionModal currentUser={currentUser} currentComment={comment} post={post} />
                ) : null}
            </div>
        ) : null}
    </div>
    <div className="py-2 px-4 text-black break-all mt-2">{comment.comment}</div>
   </div>
</div>
    
  );
};
