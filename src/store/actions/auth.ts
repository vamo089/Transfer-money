import {
  AuthActionTypes,
  REMOVE_TOKEN,
  SET_EMAIL,
  SET_TOKEN,
} from "../types/auth";

export const setEmail = (email: string): AuthActionTypes => {
  return { type: SET_EMAIL, payload: email };
};

export const setToken = (token: string): AuthActionTypes => {
  return {
    type: SET_TOKEN,
    payload: token,
  };
};
export const removeToken = (): AuthActionTypes => {
  return {
    type: REMOVE_TOKEN,
  };
};
