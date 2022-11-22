import { createAsyncThunk } from "@reduxjs/toolkit";

export const asyncThunk = (
  type: string,
  asyncAction: (arg0: void) => Promise<any>
) =>
  createAsyncThunk(type, async (payload, { rejectWithValue }) => {
    return await asyncAction(payload).catch(({ response }) => {
      throw rejectWithValue(response);
    });
  });
