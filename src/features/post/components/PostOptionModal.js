import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useLocation,useNavigate} from 'react-router-dom'
import {deletePost,PostModal} from '../../../features/post'
import { followUser,unfollowUser } from '../../user'
export const PostOptionModal=({post,setShowOptions})=>{
    const {_id,username}=post;
    const {token,user}=useSelector((state)=>state.auth)
    const {users}=useSelector((state)=>state.user)
    const dispatch=useDispatch();

    const [showNewPostModal,setShowNewPostModal]=useState(false)
    const {pathname}=useLocation()
    const navigate=useNavigate();

    const userToFollow = users.find((dbUser) => dbUser.username === username);

    const userAlreadyFollowing = userToFollow.followers.find(
      (follower) => follower.username === user.username
    );

    return(
        <div className='flex flex-col  bg-[#f1f1f1] absolute right-1.5 w-max rounded shadow-dark shadow-lg border border-primarybg '>
        {username===user.username ?(
            <>
                <button className='px-4 py-2 text-left cursor-pointer hover:bg-primarybg hover:text-white hover:rounded-full '
                onClick={(e)=>{
                    e.stopPropagation();
                    setShowNewPostModal(true);

                }}>
                    <i className='fa-solid fa-pen-to-square mr-2'>Edit</i>

                </button>
                <button className='px-4 py-2 text-left cursor-pointer hover:bg-primarybg hover:text-white hover:rounded-full '
                onClick={(e)=>{
                    e.stopPropagation();
                    if(pathname!=="/") navigate('/')
                    dispatch(deletePost({token,_id}))

                }}>
                    <i className='fa-solid fa-trash mr-2'>Delete</i>

                </button>
            </>

            
        ):(
            <button
          className="py-2 px-4 text-left cursor-pointer hover:bg-primarybg"
          onClick={(e) => {
            e.stopPropagation();
            userAlreadyFollowing
              ? dispatch(
                  unfollowUser({ token, followUserId: userToFollow._id })
                )
              : dispatch(followUser({ token, followUserId: userToFollow._id }));
            setShowOptions(false);
          }}
        >
          <i
            className={`mr-2 fa-solid fa-user-${
              userAlreadyFollowing ? "xmark" : "plus"
            } `}
          ></i>
          {userAlreadyFollowing ? "Unfollow" : "Follow"}
        </button>

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
