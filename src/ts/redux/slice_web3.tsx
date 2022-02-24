import { createSlice } from '@reduxjs/toolkit'
import Web3 from 'web3';

export const slice_web3 = createSlice({
  name: 'slice_web3',
  initialState: {
    value: new Web3(Web3.givenProvider || "ws://localhost:8545"),
  },
  reducers: {
    update: (state, action) => {
      state.value = new Web3(action.payload)
    },
  },
})

export const { update } = slice_web3.actions
export default slice_web3.reducer