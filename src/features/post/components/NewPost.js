import "../styles.css"
import {useDispatch,useSelector}from 'react-redux';
import { UserAvatar } from "../../../Components";
import { createPost } from "../../../features/post";
import {useState,useRef} from 'react'
import {focusInput} from "../../../utils"
export const NewPost=()=>{
    const [input,setInput]=useState("")
    const {token,user}=useSelector((state)=>state.auth)
    const {users}=useSelector((state)=>state.user)

    const dispatch=useDispatch()

    const newPostRef=useRef();

    const currentUser=users?.find((dbUser)=>dbUser.username===user.username)

    const submitPost=(e)=>{
       e.preventDefault();
       dispatch(createPost({input,token,user}))

       setInput('')
       newPostRef.current.innerText="";
    }

    return(
        <div className="grid grid-cols-[2rem_1fr] gap-2 items-start  text-sm border-b border-primarybg px-4 py-3 cursor-text " onClick={(e)=>{
            e.stopPropagation() 
          focusInput(newPostRef)}}>
         <UserAvatar user={currentUser} />
         <form  className="flex flex-col gap-4" onSubmit={submitPost}>
          <div role="textbox" ref={newPostRef} 
          contentEditable="true" 
          placeholder="What's happening?" 
          className="w-full break-all outline-none mt-1.5 new_post" 
           onInput={(e) => setInput(e.currentTarget.textContent)} />
              
             <div className="ml-auto flex-gap-2">
                 <button type="submit" 
                 disabled={!input.trim()} 
                 className="bg-primarybg rounded-full py-1 px-3 disabled:opacity-50 disabled:cursor-not-allowed">
                     Post
                 </button>
             </div>
          
         </form>
       
       
        </div>
    )


}