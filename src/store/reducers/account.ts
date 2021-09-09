import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TransactionResponse } from 'services/getListOfTransactions';
import { UserInfo } from 'services/getUserInfo';

interface AccountState {
  userData: Omit<UserInfo, 'id' | 'email'>;
  transferUserData: Omit<UserInfo, 'balance' | 'email'> | null;
  previousTransactionData: TransactionResponse[];
}

const initialState: AccountState = {
  userData: {
    name: '',
    balance: 0
  },
  transferUserData: null,
  previousTransactionData: []
};

const reducer = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<AccountState['userData']>): AccountState => ({
      ...state,
      userData: action.payload
    }),
    setTransferUserData: (state, action: PayloadAction<AccountState['transferUserData']>): AccountState => ({
      ...state,
      transferUserData: action.payload
    }),
    setPreviousTransactionData: (
      state,
      action: PayloadAction<AccountState['previousTransactionData']>
    ): AccountState => ({
      ...state,
      previousTransactionData: action.payload
    })
  }
});

export const { setUserData, setTransferUserData, setPreviousTransactionData } = reducer.actions;

export const accountReducer = reducer.reducer;
