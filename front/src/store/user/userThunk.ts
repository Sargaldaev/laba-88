import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { GlobalError, RegisterMutation, User, ValidationError } from '../../types';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store';
import { clearUser } from './userSlice.ts';

export const register = createAsyncThunk<User, RegisterMutation, { rejectValue: ValidationError }>(
  'user/register',
  async (user, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<User>('/users', user);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);


export const logout = createAsyncThunk<void, void, { state: RootState }>(
  'user/logout',
  async (_, {getState, dispatch}) => {

    const token = getState().users.user?.token;
    await axiosApi.delete('/users/logout', {headers: {'Authorization': token}});
    dispatch(clearUser());
  }
);

export const login = createAsyncThunk<User, RegisterMutation, { rejectValue: GlobalError }>(
  'user/login',
  async (user, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<User>('/users/sessions', user);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);


