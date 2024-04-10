import { TAppExtraArgs } from 'store/extraArgs';

import { getStore, store as appStore } from './index';

export type TAppRootState = ReturnType<typeof appStore.getState>;
export type TAppStore = ReturnType<typeof getStore>;
export type TAppDispatch = typeof appStore.dispatch;
export type TAppGetState = TAppStore['getState'];
export type TAppAsyncThunkConfig = {
  dispatch: TAppDispatch;
  state: ReturnType<TAppGetState>;
  extra: TAppExtraArgs;
};
export type TSelect<T> = (state: TAppRootState) => T;
