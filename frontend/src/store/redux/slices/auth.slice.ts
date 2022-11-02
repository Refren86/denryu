import { LoginCredentials } from './../../../services/auth.service';
import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  authService,
  RegistrationCredentials,
} from '../../../services/auth.service';
import { IValidationErrors } from '../../../types/Error';
import { ITokens } from '../../../types/Token';
import { UserDto } from '../../../types/User';

// 1st param in generic - what thunk returns, 2nd - what parameter accepts, 3rd - types for dispatch/rejectWithValue/getState
export const register = createAsyncThunk<
  ITokens & { user: UserDto },
  RegistrationCredentials,
  { rejectValue: IValidationErrors }
  >('register', async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await authService.register(credentials);
      return data;
    } catch (err: any) {
      console.log(err);
      let error: AxiosError<IValidationErrors> = err; // cast the error for access

      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
});

export const login = createAsyncThunk<
  ITokens & { user: UserDto },
  LoginCredentials,
  { rejectValue: IValidationErrors }
>('login', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await authService.login(credentials);
    return data;
  } catch (err: any) {
    console.log(err);
    let error: AxiosError<IValidationErrors> = err; // cast the error for access

    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export default authSlice.reducer;
