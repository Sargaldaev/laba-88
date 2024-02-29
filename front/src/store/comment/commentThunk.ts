import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Comment, CommentMutation } from '../../types';
import { RootState } from '../../app/store';

export const fetchComments = createAsyncThunk<Comment[], string>(
  'comments/fetchAll',
  async (id: string) => {
    const {data} = await axiosApi.get<Comment[]>('/comments/' + id);
    return data;
  }
);

export const createComment = createAsyncThunk<void, CommentMutation, { state: RootState }>(
  'comments/create',
  async (commentMutation, thunkAPI) => {
    const userState = thunkAPI.getState().users;
    const token = userState.user?.token;

    const newComment = {
      ...commentMutation
    };

    await axiosApi.post(
      '/comments',
      newComment,
      {
        headers: {
          'Authorization': token
        }
      }
    );
  }
);

