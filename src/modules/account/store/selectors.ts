import { TransactionResponse } from "services/getListOfTransactions";
import { TAppRootState } from "store/types";

import { IUserInfo } from "./types";

export const selectTransferUserData: (state: TAppRootState) => Omit<IUserInfo, "balance" | "email"> | null = (
  state: TAppRootState
) => state.account.transferUserData;

export const selectUserData: (state: TAppRootState) => Omit<IUserInfo, "id" | "email"> = (state: TAppRootState) =>
  state.account.userData;

export const selectPreviousTransactionData: (state: TAppRootState) => TransactionResponse[] = (state: TAppRootState) =>
  state.account.previousTransactionData;
