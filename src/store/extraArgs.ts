import { AuthService } from "src/modules/auth/store/service";

export const extraArgs = {
  authService: new AuthService()
};

export type TAppExtraArgs = typeof extraArgs;
