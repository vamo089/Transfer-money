import {
  AccountActionTypes,
  SET_USER_DATA,
  SET_TRANSFER_USER_DATA,
  SET_PREVIOUS_TRANSACTION_DATA,
} from "store/types/account";
import { UserInfo } from "services/getUserInfo";
import { TransactionResponse } from "services/getListOfTransactions";

export const setUserData = (
  userData: Omit<UserInfo, "id" | "email">
): AccountActionTypes => {
  return { type: SET_USER_DATA, payload: userData };
};

export const setTransferUserData = (
  transferUserData: Omit<UserInfo, "balance" | "email">
): AccountActionTypes => {
  return {
    type: SET_TRANSFER_USER_DATA,
    payload: transferUserData,
  };
};
export const setPreviousTransactionData = (
  previousTransactionData: TransactionResponse[]
): AccountActionTypes => {
  return {
    type: SET_PREVIOUS_TRANSACTION_DATA,
    payload: previousTransactionData,
  };
};
