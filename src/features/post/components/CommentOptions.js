import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { CommentModal } from './CommentModal'
import {deleteComment} from '../../../features/post'

export const CommentOptionModal=({comment,setShowOptions,postId})=>{

    const {token}=useSelector((state)=>state.auth)
    const {users}=useSelector((state)=>state.user)
    const dispatch=useDispatch();

    const [showCommentModal,setShowCommentModal]=useState(false)
    const {pathname}=useLocation()
    const navigate=useNavigate();

    return(
        <div className='flex flex-col absolute right-1.5 w-max rounded border-solid primary '>
    
    
                <button className='px-4 py-2 text-left cursor-pointer '
                onClick={(e)=>{
                    e.stopPropagation();
                    setShowCommentModal(true);

                }}>
                    <i className='fa-solid fa-pen-to-square mr-2'>Edit</i>

                </button>
                <button className='px-4 py-2 text-left cursor-pointer '
                onClick={(e)=>{
                    e.stopPropagation();
                    
                    dispatch(deleteComment({token,commentId:comment._id,postId}))

                }}>
                    <i className='fa-solid fa-trash mr-2'>Delete</i>

                </button>
        

            
        
        {showCommentModal ?(
            <div className="bg-[#f1f1f1] top-0 left-0 fixed w-full h-full z-40 flex justify-center items-center cursor-default b-solid primary "
            onClick={(e)=>e.stopPropagation()}
            >
               <CommentModal commentExists={comment} setShowCommentModal={setShowCommentModal} postId={postId}/>
            </div>
        ):(null)}
        </div>
    )
}
