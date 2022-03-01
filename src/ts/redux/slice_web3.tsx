import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    balance_vault: 0,
    amount_to_stake: 0,
    amount_to_withdraw: 0,
    epoch: 0,
    rebase_timer: '',
    withdraw_timer: '',
    withdraw_possible: false
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
      state.balance = action.payload / Math.pow(10, INSIGNIS_DECIMALS);
    },
    /** }}} */
    /** reducer: update_balance_vault {{{ */
    update_balance_vault: (state, action) => {
      state.balance_vault = action.payload / Math.pow(10, INSIGNIS_DECIMALS);
    },
    /** }}} */
    /** reducer: update_amount_to_stake {{{ */
    update_amount_to_stake: (state, action) => {
      if (action.payload > state.balance) {
        state.amount_to_stake = state.balance;
      } else {
        state.amount_to_stake = action.payload;
      }
    },
    /** }}} */
    /** reducer: update_amount_to_withdraw {{{ */
    update_amount_to_withdraw: (state, action) => {
      if (action.payload > state.balance_vault) {
        state.amount_to_withdraw = state.balance_vault;
      } else {
        state.amount_to_withdraw = action.payload;
      }
    },
    /** }}} */
    /** reducer: update_rebase_timer {{{ */
    update_rebase_timer: (state, action) => {
      state.rebase_timer = action.payload;
    },
    /** }}} */
    /** reducer: update_withdraw_timer {{{ */
    update_withdraw_timer: (state, action) => {
      state.withdraw_timer = action.payload;
    },
    /** }}} */
    /** reducer: update_withdraw_possible {{{ */
    update_withdraw_possible: (state, action) => {
      state.withdraw_possible = action.payload;
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
  update_balance_vault,
  update_rebase_timer,
  update_amount_to_stake,
  update_amount_to_withdraw,
  update_withdraw_timer,
  update_withdraw_possible
} = slice_web3.actions;
export type RootState = ReturnType<typeof slice_web3.reducer>;
export default slice_web3.reducer;