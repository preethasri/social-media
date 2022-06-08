export const UserAvatar=({user})=>{
    const avatar=user?.profileAvatar;
    
    const userInitials = user?.fullName.split(" ");

    const initialsArray = userInitials?.map((initial) =>
      initial[0].toUpperCase()
    );
  

    
   
    return(
        <span className="user-avatar cursor-avatar select-none">
         {avatar ?(

        <img  src={avatar} alt={user.username} className="h-8 w-8 sm:h-8 sm:w-8 rounded-full "/>
         )
         :(
             <span className="h-8 w-8 text-sm flex justify-center items-center rounded-full bg-yellow-900 text-white">
                  {initialsArray?.join('')}
                 </span>
         )
             
          }
          </span>
    
    )

}