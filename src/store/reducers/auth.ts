import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  email: string;
  token: string | null;
}

const initialState: AuthState = {
  email: '',
  token: null
};

const reducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<AuthState['email']>): AuthState => ({ ...state, email: action.payload }),
    setToken: (state, action: PayloadAction<AuthState['token']>): AuthState => ({ ...state, token: action.payload }),
    removeToken: (state): AuthState => ({ ...state, token: null })
  }
});

export const { setEmail, setToken, removeToken } = reducer.actions;

export const authReducer = reducer.reducer;
