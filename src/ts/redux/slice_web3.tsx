import { createSlice } from '@reduxjs/toolkit';
import Web3 from 'web3';
import { HARMONY_MAINNET } from '../constant';

export const slice_web3 = createSlice({
  name: 'slice_web3',
  initialState: {
    web3: new Web3(Web3.givenProvider || "ws://localhost:8545"),
    network: HARMONY_MAINNET,
    wallet: null,
    balance: 0,
    epoch: 0,
    supply: 0,
    usd: 0.000001,
    mcap: 0,
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
    /** reducer: update_supply {{{ */
    update_supply: (state, action) => {
      state.supply = action.payload;
    },
    /** }}} */
    /** reducer: update_usd {{{ */
    update_usd: (state, action) => {
      state.usd = action.payload;
    },
    /** }}} */
    /** reducer: update_mcap {{{ */
    update_mcap: (state, action) => {
      state.mcap = action.payload;
    },
    /** }}} */
  },
});

export const { update_epoch,
  update_web3,
  update_wallet,
  update_network,
  update_balance,
  update_rebase_timer,
  update_supply,
  update_usd,
  update_mcap
} = slice_web3.actions;
export type RootState = ReturnType<typeof slice_web3.reducer>;
export default slice_web3.reducer;