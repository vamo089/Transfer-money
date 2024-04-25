import { TransactionResponse } from "services/getListOfTransactions";

export interface IUserInfo {
  id: string;
  name: string;
  email: string;
  balance: number;
}

export type TGetUserInfo = () => Promise<IUserInfo>;
export interface IAccountState {
  userData: Omit<IUserInfo, "id" | "email">;
  transferUserData: Omit<IUserInfo, "balance" | "email"> | null;
  previousTransactionData: TransactionResponse[];
}

export interface IFilterUserListData {
  id: string;
  name: string;
}

export type TFilterUserList = (filter: string) => Promise<IFilterUserListData[]>;
