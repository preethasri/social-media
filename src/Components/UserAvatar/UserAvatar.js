export const UserAvatar=({user})=>{
    const avatar=user?.profileUrl;
    
    
   
    return(
        <span className="user-avatar cursor-avatar select-none">
         {avatar &&
             <img  src={avatar} alt={user.username} className=" h-6 w-6 sm:h-8 sm:w-8 rounded-full normal-img1 "/>
          }
          </span>
    
    )

}