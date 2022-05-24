import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserAvatar } from "../../../Components";
import { PostOptionModal, likePost, dislikePost } from "../../../features/post";
import { addBookmark, removeBookmark } from "../../../features/user";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import {
  LikedByLoggedUser,
  PostInBookmarks,
  getPostDate,
  
} from "../../../utils";
import { CommentModal } from "../../../features/post/components/CommentModal";

export const PostCard = ({ post }) => {
  const { user, token } = useSelector((state) => state.auth);
  const { users, bookmarks } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const postRef = useRef();

  const [showOptions, setShowOptions] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);

  const currentPost = posts?.find((dbPost) => dbPost._id === post._id);
  const { _id, username, fullName, content, id, likes, createdAt } =
    currentPost;

  const currentUser = users?.find(
    (dbUser) => dbUser.username === post.username
  );

  useOnClickOutside(postRef, setShowOptions);

  return (
    <div
      className="grid grid-cols-[2rem_1fr] gap-2 bg-darkSecondary text-sm border-b border-darkGrey px-4 py-3 cursor-pointer"
    
      ref={postRef}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/profile/${username}`);
        }}
      >
        <UserAvatar user={currentUser} />
      </div>

      <div className="flex flex-col gap-2 break-all">
        <div className="flex justify-between ">
          <div
            className="flex items-start 2xl:items-center gap-1.5"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/profile/${username}`);
            }}
          >
            <div className="flex flex-col gap-0 2xl:flex-row 2xl:gap-1">
              <span className="font-bold tracking-wide">{fullName}</span>
              <span className="text-lightGrey">@{username}</span>
            </div>
            <span className="text-lightGrey">·</span>
            <div className="text-lightGrey">{getPostDate(createdAt)}</div>
          </div>

          <div className="relative">
            <i
              className="fa-solid fa-ellipsis p-2 cursor-pointer hover:bg-dark hover:rounded-full"
              onClick={(e) => {
                setShowOptions((prev) => !prev);
                e.stopPropagation();
              }}
            ></i>

            {showOptions ? (
              <PostOptionModal
                post={currentPost}
                setShowOptions={setShowOptions}
              />
            ) : null}
          </div>
        </div>

        <div>{content}</div>

        <div className="flex gap-6 -ml-2 mt-1">
          <div>
            <button
              className={`cursor-pointer hover:bg-dark hover:rounded-full `}
              onClick={(e) => {
                e.stopPropagation();
                LikedByLoggedUser(currentPost, user)
                  ? dispatch(dislikePost({ token, _id }))
                  : dispatch(likePost({ token, _id }));
              }}
            >
              <i
                className={` fa-heart p-2 ${
                  LikedByLoggedUser(currentPost, user)
                    ? "fa-solid text-red"
                    : "fa-regular"
                }`}
              ></i>
            </button>
            {likes.likeCount > 0 && (
              <span className="ml-1">{likes.likeCount}</span>
            )}
          </div>

          <div>
            <button
              className="cursor-pointer hover:bg-dark hover:rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setShowCommentModal(true);
              }}
            >
              <i className="fa-regular fa-message p-2"></i>
            </button>
            {currentPost.comments > 0 && (
              <span className="ml-1">{currentPost.comments}</span>
            )}
          </div>

          <button
            className="cursor-pointer hover:bg-dark hover:rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              PostInBookmarks(bookmarks, _id)
                
                ? dispatch(removeBookmark({ token, _id }))
                : dispatch(addBookmark({ token, _id }));
            }}
          >
            
             <i className={`fa-bookmark p-2 ${PostInBookmarks(bookmarks,_id)?"fa-solid text-primary ":"fa-regular"}`}></i>
          </button>

          <button
            className="cursor-pointer hover:bg-dark hover:rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              sharePost(id);
            }}
          >
            <i className="fa-solid fa-share-nodes p-2"></i>
          </button>
        </div>
      </div>

      {showCommentModal ? (
        <div
          className="bg-[#00000080] top-0 left-0 fixed w-full h-full z-40 flex justify-center items-center cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          <CommentModal
            setShowCommentModal={setShowCommentModal}
            postId={currentPost?._id}
          />
        </div>
      ) : null}
    </div>
  );
};
