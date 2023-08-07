// import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  registerAPI,
  loginAPI,
  logoutAPI,
  getUserProfileAPI,
  updateUserProfileAPI,
} from '../../services/firebaseAPI';

// const axiosHeaderToken = {
//   set(token) {
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//   },
//   unset() {
//     axios.defaults.headers.common.Authorization = '';
//   },
// };

export const register = createAsyncThunk(
  'auth/register',
  async ({ avatar, name, email, password }, { rejectWithValue }) => {
    try {
      const userData = await registerAPI({ avatar, name, email, password });
      return {
        user: {
          uid: userData.stsTokenManager.uid,
          name: userData.displayName,
          email: userData.email,
          avatar: userData.photoURL,
        },
        token: userData.stsTokenManager.accessToken,
        refreshToken: userData.stsTokenManager.refreshToken
      };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message ?? error.message);
    }
  }
);

// {
// "_redirectEventId": undefined, 
// "apiKey": "AIzaSyC_16jIDL-iDcr5hHsWWHJ08WAepmmwe3Q", 
// "appName": "[DEFAULT]", 
// "createdAt": "1689590620049", 
// "displayName": undefined, 
// "email": "test@mail.com", 
// "emailVerified": false, 
// "isAnonymous": false, 
// "lastLoginAt": "1689590620049", 
// "phoneNumber": undefined, 
// "photoURL": undefined, 
// "providerData": [[Object]], 
// "stsTokenManager": { 
//    "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE0ZWI4YTNiNjgzN2Y2MTU4ZWViNjA3NmU2YThjNDI4YTVmNjJhN2IiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYmM0OC1yZWFjdC1uYXRpdmUtaHciLCJhdWQiOiJiYzQ4LXJlYWN0LW5hdGl2ZS1odyIsImF1dGhfdGltZSI6MTY4OTU5MDYyMCwidXNlcl9pZCI6ImtLRWF4TGRoT2FlaDNvdHZmZnJxUlBpME1sYzIiLCJzdWIiOiJrS0VheExkaE9hZWgzb3R2ZmZycVJQaTBNbGMyIiwiaWF0IjoxNjg5NTkwNjIwLCJleHAiOjE2ODk1OTQyMjAsImVtYWlsIjoidGVzdEBtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0QG1haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.pt7VypHj7lA79WPpJlkC9pg-6qarryXSTmsd_66avL0IrT9k-BdJ_mkjx4ibKfLU5Q-OThl9L_SLTkhIq28LIutHkhvdH0fOgoFFNCEKCMNYRzzNaKEobu9sRIHlTxEX0CdoAAvEKb4Exi0dkzpT7a5Lv_MJ-B2v62AehQbCRx8rK22ZbHHKjC0uEvBovqX0GUrgtbO2xuv-PNlzu3456fopUFNDnvUxVqKd5_ekH7dulJwkQyQoydYxHnlmXTOX1A-KHPJJ7ojbjDPCnSD-9QDZThCbJ5W_0SpwA0wS1os7-9UgatByRty5fHMInJRDYe_MWjZi12M5FyUtAMOVhw", "expirationTime": 1689594220275,
//    "refreshToken": "AMf-vBwJfKTyPJvvINf_Nytu6ig-YGmaoriaRtWYxonp1LSiBpQXZBZFLov5-4lPNI-AUC6OohoduoGwRvtxd5zNTasF88l-6fc-5gvYL9d_0eU7xkEeC1mtO8I307SFgJ1KgqueviEEgViZRPzB6AgCMXOu5R_Iw6E0rH3ocrBj_zH20PjMrkWNB1J2E57sFr0V1-B6_e_DOddrEx8_FsgyOmFIDjnVkQ" }, 
//    "tenantId": undefined, "uid": "kKEaxLdhOaeh3otvffrqRPi0Mlc2"
// }


export const login = createAsyncThunk(
  'auth/login',
  async ({email, password}, { rejectWithValue, dispatch }) => {
    try {
      const userData = await loginAPI({email, password});
      // setTimeout(() => {
      //   dispatch(getCurrentUserInfo());
      // }, 0);
      // axiosHeaderToken.set(token);
      
      return {
        user: {
          uid: userData.stsTokenManager.uid,
          name: userData.displayName,
          email: userData.email,
          avatar: userData.photoURL,
        },
        token: userData.stsTokenManager.accessToken,
        refreshToken: userData.stsTokenManager.refreshToken
      };
    } catch (error) {
      return rejectWithValue('Email or password is wrong');
    }
  }
);

export const getCurrentUserInfo = createAsyncThunk(
  'auth/getCurrentUserInfo',
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().authorized;
    axiosHeaderToken.set(token);
    try {
      const userInfo = await getUserProfileAPI();
      return userInfo;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { token } = getState().authorized;
      return Boolean(token);
    },
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue, getState }) => {
    // const { token } = getState().authorized;
    // axiosHeaderToken.set(token);
    try {
      await logoutAPI();
      // axiosHeaderToken.unset();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);