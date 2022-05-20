export const UserAvatar=({user})=>{
    const avatar=user?.profileAvatar;
    const userInitials=user?.fullName.split(' ')
    const initialsArray=userInitials?.map((initial)=>initial[0].toUpperCase())
   
    return(
        <span className="user-avatar cursor-avatar select-none">
         {avatar?(
             <img  src={avatar} alt={user.username} className="h-6 w-6 sm:h-8 sm:w-8 rounded-full normal-img1"/>
         ):(
           <span className="h-8 w-8 text-sm flex justify-center items-center rounded-full bg-primary">
               {initialsArray.join("")}
           </span>
         )}
        </span>
    )

}