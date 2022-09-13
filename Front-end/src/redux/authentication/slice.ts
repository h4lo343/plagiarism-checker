import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthenticationState {
  loading: boolean;
  error: string | null;
  jwtToken: string | null;
  userType: string | null;
}

const initialState: AuthenticationState = {
  loading: false,
  error: null,
  jwtToken: null,
  userType: null,
}

export const login = createAsyncThunk(
  "authentication/login",
  async (parameters: {
    username: string,
    password: string
  }) => {

    const axiosResponse = await axios.post(
      `http://localhost:8888/auth/login`, {
      email: parameters.username,
      password: parameters.password
    }
    );
    
    return axiosResponse.data;
  }
);

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.error = null;
      state.jwtToken = null;
      state.userType = null;
    },


  },
  extraReducers: {
    [login.pending.type]: (state) => {
      state.loading = true;
    },
    [login.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.jwtToken = action.payload.token;
      state.userType = action.payload.role;
    },
    [login.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error
    }
  }
});

 
