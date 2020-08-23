import {
  SET_USER_DATA,
  SET_TRANSFER_USER_DATA,
  SET_PREVIOUS_TRANSACTION_DATA,
} from "store/types/account";
import { AccountActionTypes } from "store/types/account";
import { UserInfo } from "services/getUserInfo";
import { TransactionResponse } from "services/getListOfTransactions";

interface AuthState {
  userData: Omit<UserInfo, "id" | "email">;
  transferUserData: Omit<UserInfo, "balance" | "email"> | null;
  previousTransactionData: TransactionResponse[];
}

const initialState: AuthState = {
  userData: {
    name: "",
    balance: 0,
  },
  transferUserData: null,
  previousTransactionData: [],
};

export function accountReducer(
  state = initialState,
  action: AccountActionTypes
): AuthState {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, userData: action.payload };
    case SET_TRANSFER_USER_DATA:
      return { ...state, transferUserData: action.payload };
    case SET_PREVIOUS_TRANSACTION_DATA:
      return { ...state, previousTransactionData: action.payload };
    default:
      return state;
  }
}
