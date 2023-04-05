import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

import { isError } from '../../../helpers/redux';

const errorSlice = createSlice({
  name: 'error',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isError, (state, action) => {
      if (action.payload.status !== 401) {
        toast.error(action.payload.message);
      }
    });
  },
});

export default errorSlice.reducer;
