export const UserAvatar=({user})=>{
    const avatar=user?.profileUrl;
    
    const userInitials=user?.firstName[0].toUpperCase()

    
   
    return(
        <span className="user-avatar cursor-avatar select-none">
         {avatar ?(

<img  src={avatar} alt={user.username} className=" h-6 w-6 sm:h-8 sm:w-8 rounded-full normal-img1 "/>
         )
         :(
             <span className="h-8 w-8 text-sm flex justify-center items-center rounded-full bg-yellow-900 text-white">
                  {userInitials}
                 </span>
         )
             
          }
          </span>
    
    )

}