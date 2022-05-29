import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, editComment } from "../../../features/post";
import { UserAvatar } from "../../../Components";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

export const CommentModal = ({
   post,
   setShowCommentModal,
   currentUser,
   currentComment,
}) => {
  const { user, token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
 
  const [comment, setComment] = useState(currentComment?currentComment.comment:"");
  const commentRef = useRef(null);
  const modalRef = useRef(null);

  const loggedInUser = users.find(
    (dbUser) => dbUser.username === user.username
  );

console.log(post)
  const addCommentHandler = (e) => {
    e.preventDefault();
    if(comment.trim()){
      dispatch(editComment({token,postId:post.id,commentData:{...currentComment,comment}}))
    }else{
      dispatch(addComment({token,postId:post.id,commentData:{comment}}))
    }
    setComment("")
    setShowCommentModal(false)

  };
  
  useEffect(() => {
     commentRef.current.innerText = comment;
  }, [comment]);

  useOnClickOutside(modalRef, setShowCommentModal);

  return (
    <div
      className="grid grid-cols-[2rem_1fr] gap-2 items-start bg-[#f1f1f1] text-sm  border-darkGrey px-4 py-3 cursor-text w-[80%] sm:w-1/2 text-black rounded border"
      ref={modalRef}
    >
      <UserAvatar user={loggedInUser} />

      <form className="flex flex-col gap-4" onSubmit={addCommentHandler}>
        <div
          role="textbox"
          ref={commentRef}
          contentEditable={true}
          placeholder="Post your reply"
          className="w-full break-all bg-inherit outline-none mt-1.5 text-black"
          onInput={(e) => setComment(e.currentTarget.textContent)}
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
            
          >
           Comment
          </button>
        </div>
      </form>
    </div>
  );
};
