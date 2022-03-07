import { createSlice } from '@reduxjs/toolkit';
import { format, addDays, startOfDay, formatDistance, fromUnixTime, differenceInSeconds } from 'date-fns';

export const slice_menu = createSlice({
  name: 'slice_menu',
  initialState: {
    epoch_rebase: 0,
    epoch_launch: 0,
    heartbeat: false
  },
  reducers: {
    /** reducer: trigger_heartbeat {{{ */
    trigger_heartbeat: (state) => {
      state.heartbeat = !state.heartbeat;

      console.log("should trigger pulse");
    },
    /** }}} */
    /** reducer: reset_rebase {{{ */
    reset_rebase: (state, action) => {
    },
    /** }}} */
  },
});

export const {
  trigger_heartbeat,
  reset_rebase
} = slice_menu.actions;
export type RootState = ReturnType<typeof slice_menu.reducer>;
export default slice_menu.reducer;