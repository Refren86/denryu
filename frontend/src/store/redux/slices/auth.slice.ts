import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { isFetching } from '../../../helpers/redux';
import { UserDto } from '../../../types/User';
import { ITokens } from '../../../types/Token';
import { ValidationErrors } from '../../../types/Error';
import { LoginCredentials } from './../../../services/auth.service';
import {
  authService,
  RegistrationCredentials,
} from '../../../services/auth.service';

type State = {
  user: UserDto | null;
  isAuth: boolean;
  status: string;
  error: string | undefined;
};

const initialState: State = {
  user: null,
  isAuth: false,
  status: '',
  error: '',
};

// 1st param in generic - what thunk returns, 2nd - what parameter accepts, 3rd - types for dispatch/rejectWithValue/getState
export const signUp = createAsyncThunk<
  ITokens & { user: UserDto },
  RegistrationCredentials,
  { rejectValue: ValidationErrors }
>(
  'register',
  async (credentials: RegistrationCredentials, { rejectWithValue }) => {
    try {
      const { data } = await authService.register(credentials);

      return data;
    } catch (err: any) {
      console.log(err);
      let error: AxiosError<ValidationErrors> = err; // cast the error for access

      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk<
  ITokens & { user: UserDto },
  LoginCredentials,
  { rejectValue: ValidationErrors }
>('login', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await authService.login(credentials);
    return data;
  } catch (err: any) {
    console.log(err);
    let error: AxiosError<ValidationErrors> = err; // cast the error for access

    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk<
  { message: string },
  void,
  { rejectValue: ValidationErrors }
>('logout', async (_, { rejectWithValue }) => {
  try {
    const { data } = await authService.logout();
    return data;
  } catch (err: any) {
    console.log(err);
    let error: AxiosError<ValidationErrors> = err; // cast the error for access

    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.data);
  }
});

export const checkAuth = createAsyncThunk<
  ITokens & { user: UserDto },
  void,
  { rejectValue: ValidationErrors }
>('checkAuth', async (_, { rejectWithValue }) => {
  try {
    // here we need plain axios without interceptors to check for 401 status (unauthorized)
    const { data } = await authService.refresh(); // will send cookies to server (withCredentials: true)
    return data;
  } catch (err: any) {
    let error: AxiosError<ValidationErrors> = err; // cast the error for access

    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.data);
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
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'rejected';

        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })

      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.accessToken);
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'rejected';

        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })

      .addCase(logout.fulfilled, (state) => {
        localStorage.removeItem('token');
        state.isAuth = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'rejected';

        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })

      .addCase(checkAuth.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.accessToken);
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.status = 'rejected';

        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })

      .addMatcher(isFetching, (state) => {
        state.status = 'pending';
        state.error = '';
      });
  },
});

export default authSlice.reducer;
