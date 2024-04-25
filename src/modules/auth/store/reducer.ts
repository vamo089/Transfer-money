import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAppAsyncThunkConfig } from "store/types";

import { IAuthResponse, IAuthState, ILoginParams, IRegistrationParams } from "./types";

const initialState: IAuthState = {
  email: "",
  token: null,
  hasErrors: false,
  isLoading: false
};
export const login = createAsyncThunk<IAuthResponse, ILoginParams, TAppAsyncThunkConfig>(
  "auth/login",
  async (params, { extra: { authService }, rejectWithValue }) => {
    try {
      return await authService.login(params);
    } catch (err) {
      throw rejectWithValue({ errorMessage: err });
    }
  }
);

export const registration = createAsyncThunk<IAuthResponse, IRegistrationParams, TAppAsyncThunkConfig>(
  "auth/registration",
  async (params, { extra: { authService }, rejectWithValue }) => {
    try {
      return await authService.registration(params);
    } catch (err) {
      throw rejectWithValue({ errorMessage: err });
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, { payload }: PayloadAction<IAuthState["email"]>) => {
      state.email = payload;
    },
    setToken: (state, { payload }: PayloadAction<IAuthState["token"]>) => {
      state.token = payload;
    },
    removeToken: (state) => {
      state.token = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state: IAuthState) => {
      state.isLoading = true;
      state.hasErrors = false;
    });

    builder.addCase(login.fulfilled, (state: IAuthState, { payload }) => {
      state.isLoading = false;
      state.hasErrors = false;
      state.token = payload.id_token;
    });

    builder.addCase(login.rejected, (state: IAuthState) => {
      state.isLoading = false;
      state.hasErrors = true;
    });

    builder.addCase(registration.pending, (state: IAuthState) => {
      state.isLoading = true;
      state.hasErrors = false;
    });

    builder.addCase(registration.fulfilled, (state: IAuthState, { payload }) => {
      state.isLoading = false;
      state.hasErrors = false;
      state.token = payload.id_token;
    });

    builder.addCase(registration.rejected, (state: IAuthState) => {
      state.isLoading = false;
      state.hasErrors = true;
    });
  }
});

export const { setEmail, setToken, removeToken } = authSlice.actions;

export const authReducer = authSlice.reducer;
