import { IAuthState } from "src/modules/auth/store/types";
import { TAppRootState, TSelect } from "store/types";

export const selectEmail: TSelect<IAuthState["email"]> = (state: TAppRootState) => state.auth.email;
export const selectToken: TSelect<IAuthState["token"]> = (state: TAppRootState) => state.auth.token;
