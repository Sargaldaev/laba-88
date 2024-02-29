import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreatePost, Post, PostOne } from '../../types';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';

export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetchAll',
  async () => {
    const {data} = await axiosApi.get<Post[]>('/posts');
    return data;
  }
);


export const fetchPostOne = createAsyncThunk<PostOne, string>(
  'posts/fetchOne',
  async (id) => {
    const {data} = await axiosApi.get<PostOne | null>(`/posts/${id}`);
    if (data === null) {
      throw new Error('Not Found');
    }
    return data;
  }
);

export const createPost = createAsyncThunk<void, CreatePost, { state: RootState }>(
  'user/createPost',
  async (post: CreatePost, thunkAPI) => {
    const token = thunkAPI.getState().users.user?.token;

    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('description', post.description);
    if (post.image) {
      formData.append('image', post.image);
    }

    const response = await axiosApi.post(
      '/posts',
      formData,
      {
        headers: {
          'Authorization': token
        }
      }
    );
    return response.data;
  }
);