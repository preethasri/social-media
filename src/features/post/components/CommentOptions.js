import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CommentModal } from "./CommentModal";
import { deleteComment ,editComment} from "../../../features/post";
import { useParams } from "react-router-dom";
import { editPostCommentHandler } from "../../../backend/controllers/CommentController";

export const CommentOptionModal = ({ currentUser,currentComment,post }) => {
  const [showCommentModal, setShowCommentModal] = useState(false);

  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  
  const [comment,setComment]=useState(currentComment?currentComment.comment:"")
  
  
  return (
    <div className="flex flex-col   absolute right-1.5 w-max rounded "
     onClick={(e)=>e.stopPropagation()}
    >
    
        <>
          <button
            className="py-2 px-4 text-left cursor-pointer "
            onClick={
             (e)=>{
               e.stopPropagation()
               setShowCommentModal(true)
             }
            }
          >
            <i className="fa-solid fa-pen-to-square mr-2"></i>Edit
          </button>
          <button
            className="py-2 px-4 text-left cursor-pointer text-red "
            onClick={(e) => {
              e.stopPropagation();
              dispatch(
                deleteComment({ commentId:currentComment._id,postId:post._id,token })
              );
            }}
          >
            <i className="fa-solid fa-trash mr-2"></i>Delete
          </button>
        </>
   
      

      {showCommentModal ? (
        
          <CommentModal
           post={post}
           currentUser={currentUser}
           currentComment={currentComment}
            setShowCommentModal={setShowCommentModal}
          />
        
      ) : null}
    </div>
  );
};
