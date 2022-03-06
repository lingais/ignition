import { configureStore } from '@reduxjs/toolkit'
import reducer_web3 from './slice_web3'
import reducer_menu from './slice_menu'

export default configureStore({
  reducer: {
    web3: reducer_web3,
    menu: reducer_menu,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})