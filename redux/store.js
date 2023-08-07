import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import logger from "redux-logger";

import authReducer from './slices/authSlice';
import loaderSliceReducer from './slices/loaderSlice';
import postsSliceReducer from './slices/postsSlice';

const authPersistConfig = {
  key: 'token',
  storage: AsyncStorage,
  whitelist: ['token', 'refreshToken', 'user'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    authorized: persistedAuthReducer,
    posts: postsSliceReducer,
    loader: loaderSliceReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);