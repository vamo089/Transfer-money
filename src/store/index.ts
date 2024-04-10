import { configureStore } from '@reduxjs/toolkit';
import { extraArgs } from 'store/extraArgs';
import { rootReducer } from 'store/reducers';

export function getStore() {
  return configureStore({
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: true,
        serializableCheck: true,
        thunk: {
          extraArgument: extraArgs
        }
      }),
    reducer: rootReducer
  });
}

export const store = getStore();
