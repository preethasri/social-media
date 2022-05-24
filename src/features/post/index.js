import {postSlice} from './postSlice'

export {NewPost} from'./components/NewPost'
export {PostCard} from './components/PostCard'
export {PostModal} from './components/PostModal'
export {PostOptionModal}from './components/PostOptionModal'
export {SinglePost} from './components/SinglePost'
export {CommentModal} from'./components/CommentModal'
export {CommentCard} from './components/CommentCard'
export {CommentOptionModal} from './components/CommentOptions'
export {getPosts,
    getSinglePost,
    resetSinglePost,
    setActiveSort,
    createPost,
    deletePost,
    editPost,
    likePost,
    dislikePost,
    addComment,
    editComment,
    deleteComment
} from './postSlice'
export default postSlice.reducer;
 