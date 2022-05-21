
import {useRef,useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {addComment,editComment} from '../../../features/post'

import { UserAvatar } from "../../../Components"


export const CommentModal=({commentExists,setShowCommentModal,postId})=>{
    const [comment,setComment]=useState('')
    const{token,user}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();

    const commentRef=useRef();
    const {users}=useSelector((state)=>state.user);

    const loggedInUser=users?.find((dbUser)=>dbUser.username===user.username)
   const commentId=commentExists?._id;
    const addCommentHandler=(e)=>{
        e.preventDefault();
        if(commentExists){
            dispatch(editComment({token,commentData:{comment},postId,commentId}))
            
        }
        else{
            dispatch(addComment({token,commentData:{comment},postId}))
        }
        setShowCommentModal(false)
    }
    useEffect(()=>{
        if(commentExists) commentRef.current.innerText=commentExists.content;
    },[commentExists])
    return(
        <div className="grid grid-cols-[2rem_1fr] gap-2 items-start bg-[#f1f1f1] text-sm px-4 py-3 cursor-text w-[80%] rounded border"
        
        >
            <UserAvatar user={currentUser} />

            <form className="flex flex-col gap-4" onSubmit={addCommentHandler}>
               <div role="textbox"
               ref={commentRef}
               contentEditable="true"
               placeholder="comment your thoughts?"
               className="break-all w-full outline-none border-none mt-1.5"
               onInput={(e)=>setComment(e.currentTarget.textContent)}
               
               />
               <div className="ml-auto flex gap-2">
                   <button type="reset" className=" py-1 px-3 rounded-full"
                   onClick={()=>{
                       setShowCommentModal(false)
                    
                   }}
                >Cancel
                   </button>
                   <button 
                   type="submit"
                    className="bg-primarybg py-1 px-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed">
                    disabled={!comment.trim() || comment.trim()===commentExists.comment}
                    {commentExists? "Save" :"Post"}
                   </button>
               </div>

               
            </form>

        </div>
    )
}