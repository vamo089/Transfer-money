import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAccountState } from "src/modules/account/store/types";

const initialState: IAccountState = {
  userData: {
    name: "",
    balance: 0
  },
  transferUserData: null,
  previousTransactionData: []
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IAccountState["userData"]>): IAccountState => ({
      ...state,
      userData: action.payload
    }),
    setTransferUserData: (state, action: PayloadAction<IAccountState["transferUserData"]>): IAccountState => ({
      ...state,
      transferUserData: action.payload
    }),
    setPreviousTransactionData: (
      state,
      action: PayloadAction<IAccountState["previousTransactionData"]>
    ): IAccountState => ({
      ...state,
      previousTransactionData: action.payload
    })
  }
});

export const { setUserData, setTransferUserData, setPreviousTransactionData } = accountSlice.actions;
