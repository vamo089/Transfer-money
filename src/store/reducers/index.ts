import { REMOVE_TOKEN, SET_EMAIL, SET_TOKEN } from "store/types/auth";
import { AuthActionTypes } from "store/types/auth";

interface AuthState {
  email: string;
  token: string | null;
}

const initialState: AuthState = {
  email: "",
  token: null,
};

export function authReducer(
  state = initialState,
  action: AuthActionTypes
): AuthState {
  switch (action.type) {
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case REMOVE_TOKEN:
      return { ...state, token: null };
    default:
      return state;
  }
}
