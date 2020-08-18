export const SET_EMAIL = "SET_EMAIL";
export const SET_TOKEN = "SET_TOKEN";
export const REMOVE_TOKEN = "REMOVE_TOKEN";

interface SetEmailAction {
  type: typeof SET_EMAIL;
  payload: string;
}

interface SetTokenAction {
  type: typeof SET_TOKEN;
  payload: string;
}

interface RemoveTokenAction {
  type: typeof REMOVE_TOKEN;
}

export type AuthActionTypes =
  | SetEmailAction
  | SetTokenAction
  | RemoveTokenAction;