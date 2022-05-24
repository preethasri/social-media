export const LikedByLoggedUser=(post,user)=>
   post?.likes.likedBy.find((likeUser)=>likeUser.username===user.username)