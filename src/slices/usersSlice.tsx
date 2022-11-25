import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "axios";

interface UsersState {
  users: [];
  userDetails: any;
  isUserEdited: boolean;
}

const initialState = {
  users: [],
  userDetails: {},
  isUserEdited: false,
} as UsersState;

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  }
);

export const fetchUserDetails = createAsyncThunk(
  "users/fetchUserDetails",
  async (userId: number) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    return response.data;
  }
);

export const fetchPostInfoUserDetails = createAsyncThunk(
  "users/fetchPostInfoUserDetails",
  async (userId: number) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    return response.data;
  }
);

export const modifyUserDetails = createAsyncThunk(
  "users/modifyUserDetails",
  async (userData: any) => {
    const response = await axios.patch(
      `https://jsonplaceholder.typicode.com/users/${userData.userId}`,
      userData.userUpdatedData
    );
    return { data: response.data, location: userData.location };
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        return {
          ...state,
          isUserEdited: false,
          users: !state.isUserEdited ? action.payload : state.users,
        };
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        return {
          ...state,
          isUserEdited: false,
          userDetails: !state.isUserEdited ? action.payload : state.userDetails,
        };
      })
      .addCase(fetchPostInfoUserDetails.fulfilled, (state, action) => {
        return {
          ...state,
          isUserEdited: false,
          userDetails: action.payload,
        };
      })
      .addCase(modifyUserDetails.fulfilled, (state, action) => {
        const updatedData: any = state.users.map((currentUser: any) =>
          currentUser.id === action.payload.data.id
            ? action.payload.data
            : currentUser
        );
        return {
          ...state,
          userDetails: action.payload.data,
          users: updatedData,
          isUserEdited: true,
        };
      });
  },
});

export const usersSelector = (state: RootState) => state["users"];

export default usersSlice.reducer;
