import { configureStore } from '@reduxjs/toolkit'
import reducer_web3 from './slice_web3'

export default configureStore({
  reducer: {
    web3: reducer_web3,
  },
})