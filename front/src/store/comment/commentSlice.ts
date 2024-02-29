import { Comment } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, fetchComments } from './commentThunk';

interface CommentsState {
  comments: Comment[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: CommentsState = {
  comments: [],
  fetchLoading: false,
  createLoading: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
      state.fetchLoading = false;
      state.comments = action.payload;
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(createComment.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createComment.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createComment.rejected, (state) => {
      state.createLoading = false;
    });

  }
});

export const commentsReducer = commentsSlice.reducer;