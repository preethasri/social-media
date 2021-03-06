import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getAllPostsService,getSinglePostService,createPostService,editPostService,deletePostService,likePostService, dislikePostService,
  addCommentService,
  editCommentService,
  deleteCommentService,
} from "../../services";
import toast from "react-hot-toast";

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const { data, status } = await getAllPostsService();

      if (status === 200) {
        return data.posts;
      }
    } catch {
      return rejectWithValue([], "Oops...Error occured");
    }
  }
);

export const getSinglePost = createAsyncThunk(
  "post/getSinglePost",
  async (postId, { rejectWithValue }) => {
    try {
      const { data, status } = await getSinglePostService(postId);

      if (status === 200) {
        return data.post;
      }
    } catch {
      return rejectWithValue([], "Oops...Error occured");
    }
  }
);

export const createPost = createAsyncThunk(
  "post/createPost",
  async (arg, { rejectWithValue }) => {
    const { input, token, user } = arg;

    try {
      const { data, status } = await createPostService({ input, token, user });

      if (status === 201) {
        toast.success("Post added");
        return data.posts;
      }
    } catch {
      return rejectWithValue([], "Oops...Error occured");
    }
  }
);

export const editPost = createAsyncThunk(
  "post/editPost",
  async (arg, { rejectWithValue }) => {
    const { token, post, input } = arg;

    try {
      const { data, status } = await editPostService({ token, post, input });

      if (status === 201) {
        return data.posts;
      }
    } catch {
      return rejectWithValue([], "Oops...Error occured");
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (arg, { rejectWithValue }) => {
    const { _id, token } = arg;

    try {
      const { data, status } = await deletePostService({ _id, token });

      if (status === 201) {
        return data.posts;
      }
    } catch {
      return rejectWithValue([], "Oops...Error occured");
    }
  }
);

export const likePost = createAsyncThunk(
  "post/likePost",
  async (arg, { rejectWithValue }) => {
    const { token, _id } = arg;

    try {
      const { data, status } = await likePostService({ token, _id });

      if (status === 201) {
        return data.posts;
      }
    } catch {
      return rejectWithValue([], "Oops... Error occured.");
    }
  }
);

export const dislikePost = createAsyncThunk(
  "post/dislikePost",
  async (arg, { rejectWithValue }) => {
    const { token, _id } = arg;

    try {
      const { data, status } = await dislikePostService({ token, _id });

      if (status === 201) {
        return data.posts;
      }
    } catch {
      return rejectWithValue([], "Oops...Error occured.");
    }
  }
);

export const addComment = createAsyncThunk(
  "post/addComment",
  async (arg, { rejectWithValue }) => {
    try {
      const { data, status } = await addCommentService(arg);

      if (status === 201) {
        return data.posts;
      }
    } catch(err) {
     
      return rejectWithValue([], "Oops...Error occured.",);
     
    }
  }
);

export const editComment = createAsyncThunk(
  "post/editComment",
  async (arg, { rejectWithValue }) => {
    try {
      const { data, status } = await editCommentService(arg);

      if (status === 201) {
        return data.posts;
      }
    } catch(err) {
     
      return rejectWithValue([], "Oops...Error occured. ");
    }
  }
);

export const deleteComment = createAsyncThunk(
  "post/deleteComment",
  async (arg, { rejectWithValue }) => {
    try {
      const { data, status } = await deleteCommentService(arg);

      if (status === 201) {
        return data.posts;
      }
    } catch {
      return rejectWithValue([], "Oops...Error occured. ");
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    singlePost: null,
    activeSort: "Latest",
    isLoading: false,
    error: "",
  },
  reducers: {
    resetSinglePost: (state) => {
      state.singlePost = null;
    },

    setActiveSort: (state, { payload }) => {
      state.activeSort = payload;
    },
  },

  extraReducers: {
    [getPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [getPosts.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.posts = payload;
    },
    [getPosts.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },

    [getSinglePost.pending]: (state) => {
      state.isLoading = true;
    },
    [getSinglePost.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.singlePost = payload;
    },
    [getSinglePost.rejected]: (state) => {
      state.isLoading = false;
    },

    [createPost.fulfilled]: (state, { payload }) => {
      state.posts = payload;
    },
    [createPost.rejected]: (state, { payload }) => {
      state.error = payload;
    },

    [editPost.fulfilled]: (state, { payload }) => {
      state.posts = payload;
    },
    [editPost.rejected]: (state, { payload }) => {
      state.error = payload;
    },

    [deletePost.fulfilled]: (state, { payload }) => {
      state.posts = payload;
    },
    [deletePost.rejected]: (state, { payload }) => {
      state.error = payload;
    },

    [likePost.fulfilled]: (state, { payload }) => {
      state.posts = payload;
    },
    [likePost.rejected]: (state, { payload }) => {
      state.error = payload;
    },

    [dislikePost.fulfilled]: (state, { payload }) => {
      state.posts = payload;
    },
    [dislikePost.rejected]: (state, { payload }) => {
      state.error = payload;
    },

    [addComment.fulfilled]: (state, { payload }) => {
      state.posts = payload;
    },
    [editComment.fulfilled]: (state, { payload }) => {
      state.posts = payload;
    },
    [deleteComment.fulfilled]: (state, { payload }) => {
      state.posts = payload;
    },
  },
});

export const { resetSinglePost, setActiveSort } = postSlice.actions;
export default postSlice.reducer;
