import { createSlice } from '@reduxjs/toolkit';
import { format, addMinutes, startOfDay, formatDistance, fromUnixTime, differenceInSeconds } from 'date-fns';

export const slice_menu = createSlice({
  name: 'slice_menu',
  initialState: {
    date_rebase: new Date(),
    timer_rebase: "0:00",
    date_launch: 0,
    heartbeat: false
  },
  reducers: {
    /** reducer: trigger_heartbeat {{{ */
    trigger_heartbeat: (state) => {
      state.heartbeat = !state.heartbeat;

      // adds 5 minutes to the current time
      if (state.heartbeat) {
        state.date_rebase = addMinutes(new Date(), 5);
      }
    },
    /** }}} */
    /** reducer: timer_rebase_update {{{ */
    timer_rebase_update: (state) => {
      const now = new Date().getTime();
      const rebase_timer: any = state.date_rebase;
      const timeleft = rebase_timer - now;
      //const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      //const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

      const seconds_format = seconds < 10 ? "0" + seconds : seconds;

      if (minutes > 0 || seconds > 0) state.timer_rebase = `${minutes}:${seconds_format}`;
      else state.timer_rebase = `waiting`;
    },
    /** }}} */
  },
});

export const {
  trigger_heartbeat,
  timer_rebase_update
} = slice_menu.actions;
export type RootState = ReturnType<typeof slice_menu.reducer>;
export default slice_menu.reducer;