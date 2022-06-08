import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, editComment } from "../../../features/post";
import { UserAvatar } from "../../../Components";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { focusInput } from "../../../utils";
export const CommentModal = ({
   post,
   setShowCommentModal,
   currentUser,
   currentComment,
}) => {
  const { user, token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
 
  const [comment, setComment] = useState(currentComment? currentComment.comment:"");
  const commentRef = useRef(null);
  const modalRef = useRef(null);

  const loggedInUser = users.find(
    (dbUser) => dbUser.username === user.username
  );
  const commentId = currentComment?._id;

  const addCommentHandler = (e) => {
    e.preventDefault();

    if(comment.trim()){
      if(currentComment._id){
      dispatch(editComment({token,postId:post._id,commentData:{...currentComment,comment},commentId}))
      }
    else{
    
        dispatch(addComment({token,postId:post._id,commentData:{comment}}))
    }
  }
    setComment("")
    setShowCommentModal(false)

  };
  
   useEffect(() => {
     if(currentComment) commentRef.current.innerText = currentComment.comment;
     
   }, [currentComment]);

  useOnClickOutside(modalRef, setShowCommentModal);

  return (
    <div
      className="grid grid-cols-[2rem_1fr] gap-2 items-start bg-[#f1f1f1] text-sm  border-darkGrey px-4 py-3  w-[80%] sm:w-1/2 text-black rounded border"
      ref={modalRef}
      
    >
      <UserAvatar user={loggedInUser} />

      <form className="flex flex-col gap-4" onSubmit={addCommentHandler} >
        <div
          role="textbox"
          ref={commentRef}
          contentEditable
          placeholder="Post your reply"
          className="w-full bg-inherit outline-none mt-1.5 text-black; "
          onInput={(e) => {
            setComment(e.currentTarget.textContent)
            
          }}
        />

        <div className="ml-auto flex gap-2">
          <button
            type="reset"
            className="border border-primary rounded-full py-1 px-3"
            onClick={() => setShowCommentModal(false)}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-primary rounded-full py-1 px-3 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={(e)=>{
              e.stopPropagation()
              dispatch(addComment({token,postId:post._id,commentData:{comment}}))
              setComment("")
               setShowCommentModal(false)
            }}
            
          >
           Comment
          </button>
        </div>
      </form>
    </div>
  );
};
