import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "axios";

interface PostsState {
  posts: never[];
  postDetails: any;
  editedPost: any;
  comments: never[];
  isPostEdited: boolean;
}

const initialState = {
  posts: [],
  postDetails: {},
  comments: [],
  editedPost: {},
  isPostEdited: false,
} as PostsState;

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async (userId: number) => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts",
      { params: { userId: userId } }
    );
    return response.data;
  }
);

export const fetchPostDetails = createAsyncThunk(
  "posts/fetchPostDetails",
  async (postId: any) => {
    const response = await axios.patch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    return response.data;
  }
);

export const modifyPostDetails = createAsyncThunk(
  "users/modifyPostDetails",
  async (postData: any) => {
    const response = await axios.patch(
      `https://jsonplaceholder.typicode.com/posts/${postData.postId}`,
      postData.updatedPostData
    );
    return response.data;
  }
);

export const fetchComments = createAsyncThunk(
  "posts/fetchComments",
  async (postId: number) => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/comments",
      { params: { postId: postId } }
    );
    return response.data;
  }
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async (commentId: number) => {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/comments/${commentId}`
    );
    return { data: response.data, commentId: commentId };
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId: number) => {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    return { data: response.data, postId: postId };
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        const updatedData: any = action.payload.map((currentPost: any) =>
          currentPost.id === state.editedPost.id
            ? state.editedPost
            : currentPost
        );
        return {
          ...state,
          posts: updatedData,
        };
      })
      .addCase(deleteComment.fulfilled, (state, { payload }) => {
        return {
          ...state,
          comments: state.comments.filter(({ id }) => id !== payload.commentId),
        };
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        return {
          ...state,
          posts: state.posts.filter(({ id }) => id !== payload.postId),
        };
      })
      .addCase(fetchPostDetails.fulfilled, (state, { payload }) => {
        return {
          ...state,
          postDetails: payload,
        };
      })
      .addCase(modifyPostDetails.fulfilled, (state, { payload }) => {
        return {
          ...state,
          editedPost: payload,
        };
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        return {
          ...state,
          comments: action.payload,
        };
      });
  },
});

export const postsSelector = (state: RootState) => state["posts"];

export default postsSlice.reducer;
