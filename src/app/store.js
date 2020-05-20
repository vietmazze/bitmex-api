import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import websocketReducer from "../features/todo/websocketSlice";

export default configureStore({
  middleware: getDefaultMiddleware({
    thunk: true,
    immutableCheck: false,
    serializableCheck: false,
  }),
  reducer: {
    counter: counterReducer,
    websocket: websocketReducer,
  },
});
