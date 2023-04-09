import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { isAuthError, isAuthFetching } from '../../../helpers/redux';
import { LoginCredentials } from './../../../services/auth.service';
import {
  authService,
  RegistrationCredentials,
} from '../../../services/auth.service';
import { userService } from '../../../services/user.service';
import { UserDto } from '../../../helpers/constructors';

export type AuthState = {
  user: TUserDto | null;
  isAuth: boolean;
  status: TStatus;
};

const initialState: AuthState = {
  user: null,
  isAuth: false,
  status: 'idle',
};

// 1st param in generic - what thunk returns, 2nd - what parameter accepts, 3rd - types for dispatch/rejectWithValue/getState
export const signUp = createAsyncThunk<
  TTokens & { user: TUserDto },
  RegistrationCredentials,
  { rejectValue: TRejectValue }
>(
  'register/auth',
  async (credentials: RegistrationCredentials, { rejectWithValue }) => {
    try {
      const { data } = await authService.register(credentials);

      return data;
    } catch (err: any) {
      const error: AxiosError<TErrorRes> = err;
      return rejectWithValue({
        message: error.response?.data.message!,
        status: error.response?.status!,
      });
    }
  }
);

export const login = createAsyncThunk<
  TTokens & { user: TUserDto },
  LoginCredentials,
  { rejectValue: TRejectValue }
>('login/auth', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await authService.login(credentials);
    return data;
  } catch (err: any) {
    const error: AxiosError<TErrorRes> = err;
    return rejectWithValue({
      message: error.response?.data.message!,
      status: error.response?.status!,
    });
  }
});

export const logout = createAsyncThunk<
  { message: string },
  void,
  { rejectValue: TRejectValue }
>('logout/auth', async (_, { rejectWithValue }) => {
  try {
    const { data } = await authService.logout();

    return data;
  } catch (err: any) {
    const error: AxiosError<TErrorRes> = err;
    return rejectWithValue({
      message: error.response?.data.message!,
      status: error.response?.status!,
    });
  }
});

export const checkAuth = createAsyncThunk<
  TTokens & { user: TUserDto },
  void,
  { rejectValue: TRejectValue }
>('checkAuth/auth', async (_, { rejectWithValue }) => {
  try {
    // here we need plain axios without interceptors to check for 401 status (unauthorized)
    const { data } = await authService.refresh(); // will send cookies to server (withCredentials: true)
    return data;
  } catch (err: any) {
    const error: AxiosError<TErrorRes> = err;
    return rejectWithValue({
      message: error.response?.data.message!,
      status: error.response?.status!,
    });
  }
});

export const updateUser = createAsyncThunk<
  TUserDto,
  { userId: string; newData: Partial<TUser> },
  { rejectValue: TRejectValue }
>('updateUser/auth', async ({ userId, newData }, { rejectWithValue }) => {
  try {
    const { data } = await userService.updateUser({ userId, newData });
    return data;
  } catch (err: any) {
    const error: AxiosError<TErrorRes> = err;
    return rejectWithValue({
      message: error.response?.data.message!,
      status: error.response?.status!,
    });
  }
});

export const uploadAvatar = createAsyncThunk<
  TUserDto,
  { userId: string; avatar: any },
  { rejectValue: TRejectValue }
>('uploadAvatar/auth', async ({ userId, avatar }, { rejectWithValue }) => {
  try {
    const { data } = await userService.uploadAvatar({ userId, avatar });
    return data;
  } catch (err: any) {
    const error: AxiosError<TErrorRes> = err;
    return rejectWithValue({
      message: error.response?.data.message!,
      status: error.response?.status!,
    });
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.accessToken);
        state.isAuth = true;
        state.user = action.payload.user;
        state.status = 'idle';
      })

      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.accessToken);
        state.isAuth = true;
        state.user = action.payload.user;
        state.status = 'idle';
      })

      .addCase(logout.fulfilled, (state) => {
        localStorage.removeItem('token');
        state.isAuth = false;
        state.user = null;
        state.status = 'idle';
      })

      .addCase(checkAuth.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.accessToken);
        state.isAuth = true;
        state.user = action.payload.user;
        state.status = 'idle';
      })

      .addCase(checkAuth.rejected, (state) => {
        localStorage.removeItem('token');
        state.isAuth = false;
        state.user = null;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        state.status = 'idle';
      })

      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        state.status = 'idle';
      })

      .addMatcher(isAuthFetching, (state) => {
        state.status = 'loading';
      })

      .addMatcher(isAuthError, (state, action) => {
        state.status = 'idle';
      });
  },
});

export default authSlice.reducer;
