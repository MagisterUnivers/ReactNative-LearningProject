import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  createPostAPI,
  readPostsAPI,
  updatePostAPI,
  deletePostAPI,
  createCommentAPI,
} from '../../services/firebaseAPI';

export const createPost = createAsyncThunk(
  'posts/create',
  async (newPost, { rejectWithValue }) => {
    try {
      const postId = await createPostAPI(newPost);
      return {...newPost, id: postId};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const readPosts = createAsyncThunk(
  'posts/read',
  async (_, { getState, rejectWithValue }) => {
    try {
      const postsList = await readPostsAPI();
      return postsList;
    } catch (error) {
      rejectWithValue(error.message);
    }
  },
);

export const updatePost = createAsyncThunk(
  'posts/update',
  async (data, { rejectWithValue }) => {
    const { title, description, deadline, label } = data;
    try {
      const newData = await updateCardApi(data.id, {
        title,
        description,
        deadline,
        label,
      });
      Notiflix.Notify.success('Your card has been successfully updated');
      return newData;
    } catch (error) {
      const status = error.response.status;
      returnStatusNotify(status);

      return rejectWithValue(error.message);
    }
  },
);

export const deletePost = createAsyncThunk(
  'post/delete',
  async (id, { rejectWithValue }) => {
    try {
      await removeCardApi(id);
      Notiflix.Notify.success('Your card removed');
      return id;
    } catch (error) {
      const status = error.response.status;
      returnStatusNotify(status);

      return rejectWithValue(error.message);
    }
  },
);

export const createComment = createAsyncThunk(
  'comment/create',
  async (data, { rejectWithValue }) => {
    try {
      const postAndCommentData = await createCommentAPI(data);
      return postAndCommentData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)