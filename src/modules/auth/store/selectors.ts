import { IAuthState } from "src/modules/auth/store/types";
import { TAppRootState, TSelect } from "store/types";

export const selectEmail: TSelect<IAuthState["email"]> = (state: TAppRootState) => state.auth.email;
export const selectToken: TSelect<IAuthState["token"]> = (state: TAppRootState) => state.auth.token;
export const selectIsLoadingAuth: TSelect<IAuthState["isLoading"]> = (state: TAppRootState) => state.auth.isLoading;
export const selectIsRejectedAuth: TSelect<IAuthState["hasErrors"]> = (state: TAppRootState) => state.auth.hasErrors;
