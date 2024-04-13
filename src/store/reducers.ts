import { combineReducers } from "redux";
import { accountSlice } from "src/modules/account/store/reducer";
import { authSlice } from "src/modules/auth/store/reducer";

export const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [accountSlice.name]: accountSlice.reducer
});
