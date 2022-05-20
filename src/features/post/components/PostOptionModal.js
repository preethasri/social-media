import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useLocation,useNavigate} from 'react-router-dom'
import {deletePost,PostModal} from 'features/post'

export const PostOptionModal=({post,setShowOptions})=>{
    const {_id,username}=post;
    const {token,user}=useSelector((state)=>state.auth)
    const {users}=useSelector((state)=>state.user)
    const dispatch=useDispatch();

    const [showNewPostModal,setShowNewPostModal]=useState(false)
    const {pathname}=useLocation()
    const navigate=useNavigate();

    return(
        <div className='flex flex-col absolute right-1.5 w-max rounded border-solid primary '>
        {username===user.username ?(
            <div>
                <button className='px-4 py-2 text-left cursor-pointer '
                onClick={(e)=>{
                    e.stopPropagation();
                    setShowNewPostModal(true);

                }}>
                    <i className='fa-solid fa-pen-to-square mr-2'>Edit</i>

                </button>
                <button className='px-4 py-2 text-left cursor-pointer '
                onClick={(e)=>{
                    e.stopPropagation();
                    if(pathname!=="/") navigate('/')
                    dispatch(deletePost({token,_id}))

                }}>
                    <i className='fa-solid fa-trash mr-2'>Delete</i>

                </button>
            </div>

            
        ):(
            null

        )}
        {showNewPostModal ?(
            <div className="bg-[#f1f1f1] top-0 left-0 fixed w-full h-full z-40 flex justify-center items-center cursor-default b-solid primary "
            onClick={(e)=>e.stopPropagation()}
            >
               <PostModal post={post} setShowOptions={setShowOptions} setShowNewPostModal={setShowNewPostModal}/>
            </div>
        ):(null)}
        </div>
    )
}
