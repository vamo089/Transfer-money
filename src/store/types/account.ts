import { UserInfo } from "services/getUserInfo";
import { TransactionResponse } from "services/getListOfTransactions";

export const SET_USER_DATA = "SET_USER_DATA";
export const SET_TRANSFER_USER_DATA = "SET_TRANSFER_USER_DATA";
export const SET_PREVIOUS_TRANSACTION_DATA = "SET_PREVIOUS_TRANSACTION_DATA";

interface SetUserData {
  type: typeof SET_USER_DATA;
  payload: Omit<UserInfo, "id" | "email">;
}

interface SetTransferUserData {
  type: typeof SET_TRANSFER_USER_DATA;
  payload: Omit<UserInfo, "balance" | "email">;
}

interface SetPreviousTransactionData {
  type: typeof SET_PREVIOUS_TRANSACTION_DATA;
  payload: TransactionResponse[];
}

export type AccountActionTypes =
  | SetUserData
  | SetTransferUserData
  | SetPreviousTransactionData;
