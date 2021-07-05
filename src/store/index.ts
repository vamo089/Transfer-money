import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { accountReducer } from 'store/reducers/account';
import { authReducer } from 'store/reducers/auth';

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer
});
const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const { dispatch } = store;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
