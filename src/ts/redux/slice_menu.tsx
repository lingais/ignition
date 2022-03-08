import { createSlice } from '@reduxjs/toolkit';

export const slice_menu = createSlice({
  name: 'slice_menu',
  initialState: {
    selected: null,
    active: false,
    clickable: false,
    list: [],
    mobile: false
  },
  reducers: {
    /** reducer: update_selected {{{ */
    update_selected: (state, action) => {
      state.selected = action.payload;

      if (action.payload === null) state.active = false;
      else state.active = true;
    },
    /** }}} */
    /** reducer: update_list {{{ */
    update_list: (state, action) => {
      state.list = action.payload;
    },
    /** }}} */
    /** reducer: update_clickable {{{ */
    update_clickable: (state, action) => {
      state.clickable = action.payload;
    },
    /** }}} */
    /** reducer: update_mobile {{{ */
    update_mobile: (state) => {
      state.mobile = !state.mobile;
    },
    /** }}} */
  },
});

export const {
  update_selected,
  update_list,
  update_clickable,
  update_mobile
} = slice_menu.actions;
export type RootState = ReturnType<typeof slice_menu.reducer>;
export default slice_menu.reducer;