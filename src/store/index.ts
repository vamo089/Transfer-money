import { composeWithDevTools } from "redux-devtools-extension";
import { Store, createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { authReducer } from "store/reducers/auth";
import {accountReducer} from "store/reducers/account";

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer
});
const store: Store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

export type RootState = ReturnType<typeof rootReducer>;


export const dispatch = store.dispatch;

export default store;
