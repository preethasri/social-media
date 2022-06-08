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
   
  return (
    <div className="border-b border-slate-400 px-4 py-3 text-black">
    <div className="flex justify-between">
        <div className="flex">
            <UserAvatar username={comment.user} />
            {post?.createdAt ? (
                <span className="font-medium text-xs text-slate-800 dark:text-slate-100 mt-2">
                    · {getPostDate(comment.createdAt)}
                </span>
            ) : null}
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
    <div className="py-2 px-4 text-slate-900 dark:text-slate-100 break-all mt-2">{comment.comment}</div>
</div>
    
  );
};
