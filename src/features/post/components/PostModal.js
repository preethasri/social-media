import "../styles.css"
import {useRef,useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {createPost,editPost} from '../../../features/post'
import {focusInput} from '../../../utils/focusInput'
import { UserAvatar } from "../../../Components"


export const PostModal=({post,setShowNewPostModal,setShowOptions})=>{
    const [input,setInput]=useState('')
    const{token,user}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();

    const newPostRef=useRef();
    const {users}=useSelector((state)=>state.user);

    const currentUser=users?.find((dbUser)=>dbUser.username===user.username)

    const submitPost=(e)=>{
        e.preventDefault();
        if(post){
            dispatch(editPost({input,token,post}))
            setShowOptions(false)
        }
        else{
            dispatch(createPost({input,token,user}))
        }
        setInput("")
        setShowNewPostModal(false)
        newPostRef.current.innerText=""
    }
    useEffect(()=>{
        if(post) newPostRef.current.innerText=post.content;
    },[post])
    return(
        <div className="grid grid-cols-[2rem_1fr] gap-2 items-start bg-[#f1f1f1] text-sm px-4 py-3 cursor-text w-[80%] rounded border-white"
        onClick={(e)=>{
            e.stopPropagation();
            focusInput(newPostRef)

        }}
        >
            <UserAvatar user={currentUser} />

            <form className="flex flex-col gap-4" onSubmit={submitPost}>
               <div role="textbox"
               ref={newPostRef}
               contentEditable="true"
               placeholder="What's happening?"
               className="break-all w-full outline-none border-none mt-1.5"
               onInput={(e)=>setInput(e.currentTarget.textContent)}
               
               />
               <div className="ml-auto flex gap-2">
                   <button type="reset" className=" py-1 px-3 rounded-full"
                   onClick={()=>{
                       setShowNewPostModal(false)
                       post && setShowOptions(false)
                   }}
                >Cancel
                   </button>
                   <button 
                   type="submit"
                    className="bg-primarybg py-1 px-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed "
                    disabled={!input.trim() }>{post? "Save" :"Post"}
                   </button>
               </div>

               
            </form>

        </div>
    )
}