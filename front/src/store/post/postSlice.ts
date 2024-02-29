import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post, PostOne } from '../../types';
import { createPost, fetchPostOne, fetchPosts } from './postThunk';

interface PostsState {
  posts: Post[];
  postOne: PostOne | null;
  fetchLoading: boolean;
  postOneLoad:boolean;
  createLoading: boolean;
  createPostError: boolean;
}

const initialState: PostsState = {
  posts: [],
  postOne: null,
  fetchLoading: false,
  postOneLoad:false,
  createLoading: false,
  createPostError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
      state.fetchLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchPostOne.pending, (state) => {
      state.postOneLoad = true;
    });
    builder.addCase(fetchPostOne.fulfilled, (state, action: PayloadAction<PostOne>) => {
      state.postOneLoad = false;
      state.postOne = action.payload;
    });
    builder.addCase(fetchPostOne.rejected, (state) => {
      state.postOneLoad = false;
    });

    builder.addCase(createPost.pending, (state) => {
      state.createLoading = true;
      state.createPostError = false;
    });
    builder.addCase(createPost.fulfilled, (state) => {
      state.createLoading = false;
      state.createPostError = false;
    });
    builder.addCase(createPost.rejected, (state) => {
      state.createLoading = false;
      state.createPostError = true;
    });
  }
});

export const postsReducer = postsSlice.reducer;