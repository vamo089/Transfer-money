import { combineReducers } from 'redux';
import { authSlice } from 'src/modules/auth/store/reducer';

export const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer
});
