export const PostInBookmarks = (bookmarks, postId) =>
  bookmarks.find((bookmark) => bookmark === postId);
