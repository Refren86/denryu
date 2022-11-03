import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userService } from '../../../services/user.service';
import { ValidationErrors } from '../../../types/Error';
import { User } from '../../../types/User';

type State = {
  users: User[];
  status: string;
  error: string | undefined;
};

const initialState: State = {
  users: [],
  status: '',
  error: '',
};

export const getUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: ValidationErrors }
>('getUsers', async () => {
  const { data } = await userService.getUsers();
  return data;
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
      .addCase(getUsers.rejected, (state, action) => {
        state.status = 'rejected';

        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export default userSlice.reducer;
