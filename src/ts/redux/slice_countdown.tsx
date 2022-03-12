import { createSlice } from '@reduxjs/toolkit';
import { addMinutes, fromUnixTime } from 'date-fns';
import { INSIGNIS_LAUNCH_EPOCH } from '../constant';

export const slice_menu = createSlice({
  name: 'slice_menu',
  initialState: {
    date_rebase: new Date(),
    date_launch: new Date(),
    timer_rebase: "0:00",
    timer_launch: "0:00:00",
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
      const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

      const seconds_format = seconds < 10 ? "0" + seconds : seconds;

      if (minutes > 0 || seconds > 0) state.timer_rebase = `${minutes}:${seconds_format}`;
      else state.timer_rebase = `waiting`;
    },
    /** }}} */
    /** reducer: timer_launch_update {{{ */
    timer_launch_update: (state) => {
      const now = new Date().getTime();
      const whitelist_end = fromUnixTime(INSIGNIS_LAUNCH_EPOCH).getTime();
      const whitelist_remaining = whitelist_end - now;

      const days = Math.floor(whitelist_remaining / (1000 * 60 * 60 * 24));
      const days_format = days < 10 ? "0" + days : days;
      const hours = Math.floor((whitelist_remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const hours_format = hours < 10 ? "0" + hours : hours;
      const minutes = Math.floor((whitelist_remaining % (1000 * 60 * 60)) / (1000 * 60));
      const minutes_format = minutes < 10 ? "0" + minutes : minutes;
      const seconds = Math.floor((whitelist_remaining % (1000 * 60)) / 1000);
      const seconds_format = seconds < 10 ? "0" + seconds : seconds;

      state.timer_launch = `${days_format}:${hours_format}:${minutes_format}:${seconds_format}`;
    },
    /** }}} */
  },
});

export const {
  trigger_heartbeat,
  timer_rebase_update,
  timer_launch_update
} = slice_menu.actions;
export type RootState = ReturnType<typeof slice_menu.reducer>;
export default slice_menu.reducer;