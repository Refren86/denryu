import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { isFetching } from '../../../helpers/redux';
import { userService } from '../../../services/user.service';

export type UserState = {
  users: TUser[];
  status: string;
};

const initialState: UserState = {
  users: [],
  status: '',
};

export const getUsers = createAsyncThunk<
  TUser[],
  void,
  { rejectValue: string }
>('getUsers', async (_, { rejectWithValue }) => {
  try {
    const { data } = await userService.getUsers();
    return data;
  } catch (err: any) {
    const error: AxiosError<TErrorRes> = err;
    return rejectWithValue(error.response?.data.message!);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })

      .addMatcher(isFetching, (state) => {
        state.status = 'pending';
      });
  },
});

export default userSlice.reducer;
