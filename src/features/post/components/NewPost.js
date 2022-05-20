import "../styles.css"
import {useDispatch,useSelector}from 'react-redux';
import { UserAvatar } from "../../../Components";
import { createPost } from "../postSlice";
import {useState,useRef} from 'react'
import {focusInput} from "../../../utils"
export const NewPost=()=>{
    const [input,setInput]=useState("")
    const {token,user}=useSelector((state)=>state.auth)
    const {users}=useSelector((state)=>state.user)

    const dispatch=useDispatch()

    const newPostRef=useRef();

    const currentUser=users?.find((dbUser)=>dbUser.username===user.username)

    const submitPost=(e)=>
       e.prevantDefault();
       dispatch(createPost({input,token,user}))

       setInput('')
       newPostRef.current.innerText="";

    return(
        <div className="grid grid-cols-[2rem_1fr] gap-2 items-start bg-white text-sm border-b border-black px-4 py-3 cursor-text " onClick={()=>{
            e.stopPropagation() 
        focusInput(newPostRef)}}>
         <UserAvatar user={currentUser} />
         <form onSubmit={submitPost} className="flex flex-col gap-4">
          <div role="textbox" ref={newPostRef} 
          contentEditable="true" 
          placeholder="What's happening?" 
          className="w-full break-all outline-none mt-1.5" 
          onInput={(e)=>setInput(e.currentTarget.textContent)}>
             <div>
                 <button type="submit" disabled={!input.trim()} className="bg-primarybg rounded-full py-1 px-3 disabled:opacity-50 disabled:cursor-not-allowed">
                     Post
                 </button>
             </div>
          </div>
         </form>
       
       
        </div>
    )


}