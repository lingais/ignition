import { createSlice } from '@reduxjs/toolkit';
import { format, addDays, startOfDay, formatDistance, fromUnixTime, differenceInSeconds } from 'date-fns';
import Web3 from 'web3';
import { HARMONY_MAINNET } from '../constant';
import { INSIGNIS_DECIMALS } from '../constant';

export const slice_web3 = createSlice({
  name: 'slice_web3',
  initialState: {
    web3: new Web3(Web3.givenProvider || "ws://localhost:8545"),
    network: HARMONY_MAINNET,
    wallet: null,
    balance: 0,
    epoch: 0,
    rebase_timer: '',
  },
  reducers: {
    /** reducer: update_web3 {{{ */
    update_web3: (state, action) => {
      state.web3 = new Web3(action.payload);
    },
    /** }}} */
    /** reducer: update_network {{{ */
    update_network: (state, action) => {
      state.network = action.payload;
    },
    /** }}} */
    /** reducer: update_wallet {{{ */
    update_wallet: (state, action) => {
      state.wallet = action.payload;
    },
    /** }}} */
    /** reducer: update_balance {{{ */
    update_balance: (state, action) => {
      const old_balance = state.balance;
      const new_balance = action.payload;
      const difference = new_balance - old_balance;

      if (Math.abs(difference) > 0) {
        state.balance = action.payload;
      }
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

export const { update_epoch,
  update_web3,
  update_wallet,
  update_network,
  update_balance,
  update_rebase_timer
} = slice_web3.actions;
export type RootState = ReturnType<typeof slice_web3.reducer>;
export default slice_web3.reducer;