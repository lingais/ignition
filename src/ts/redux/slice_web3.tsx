import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import Web3 from 'web3';

export const slice_web3 = createSlice({
  name: 'slice_web3',
  initialState: {
    web3: new Web3(Web3.givenProvider || "ws://localhost:8545"),
    wallet: null,
    balance: 0,
    balance_vault: 0,
    epoch: 0,
    rebase_timer: moment()
  },
  reducers: {
    /** reducer: update_web3 {{{ */
    update_web3: (state, action) => {
      state.web3 = new Web3(action.payload);
    },
    /** }}} */
    /** reducer: update_wallet {{{ */
    update_wallet: (state, action) => {
      state.wallet = action.payload;
    },
    /** }}} */
    /** reducer: update_balance {{{ */
    update_balance: (state, action) => {
      state.balance = action.payload;
    },
    /** }}} */
    /** reducer: update_balance_vault {{{ */
    update_balance_vault: (state, action) => {
      state.balance_vault = action.payload;
    },
    /** }}} */
    /** reducer: update_rebase_timer {{{ */
    update_rebase_timer: (state, action) => {
      state.rebase_timer = action.payload;
    },
    /** }}} */
    /** reducer: update_epoch {{{ */
    update_epoch: (state, action) => {
      state.epoch = action.payload;
    },
    /** }}} */
  },
});

export const { update_epoch, update_web3, update_wallet, update_balance, update_balance_vault, update_rebase_timer } = slice_web3.actions;
export type RootState = ReturnType<typeof slice_web3.reducer>;
export default slice_web3.reducer;