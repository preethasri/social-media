import { userSlice } from "./userSlice"

export {getAllUsers,getBookmarks,addBookmark,removeBookmark,followUser,unfollowUser,updateProfile} from "./userSlice"
import './styles.css'

export {ProfileDetails} from './components/ProfileDetails'
export {EditProfileModal} from './components/EditProfileModal'
export {FollowListModal} from './components/FollowListModal'

export const {setLoading}=userSlice.actions;

export default userSlice.actions