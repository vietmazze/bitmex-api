import { createSlice } from "@reduxjs/toolkit";
import socket from "../../services/bitmex";
import { call } from "../../services/bitmex";
const websocket = createSlice({
  name: "websocket",
  initialState: {
    isOpen: false,
    log: "",
    trade: [["/position bitmext: 4000 @ count"], ["/position 2 bitmex"]],
  },

  reducers: {
    open: (state, action) => {
      state.isOpen = true;
      const { payload } = action;
      state.log = payload;
    },

    close: (state, action) => {
      state.isOpen = false;
      const { payload } = action;
      state.log = payload;
    },

    success: (state, action) => {
      const { payload } = action;

      if (payload != null) {
        state.trade.push(payload);
      }

      if (state.trade.length > 100) {
        state.trade.splice(5, 10);
      }
    },
  },
});

export const actions = {
  request: () => (dispatch) =>
    call({
      op: "subscribe",
      args: "chat",
    }).then((result) => {
      dispatch(websocket.actions.success(result));
    }),
};

export const { open, close, success } = websocket.actions;

export const selectors = {
  isOpen: (state) => state.websocket.isOpen,
  log: (state) => state.websocket.log,
  test: (state) => state.websocket.test,
  trade: (state) => state.websocket.trade,
};
export default websocket.reducer;
