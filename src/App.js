import React from "react";

import { useDispatcher, useSelector, useDispatch } from "react-redux";
import { socket } from "./services/bitmex";
import { actions, selectors } from "./features/todo/websocketSlice";
import { Websocket } from "./features/todo/Websocket";
import { Test } from "./features/todo/Test";
function App() {
  const dispatch = useDispatch();
  const trade = useSelector(selectors.trade);
  React.useEffect(() => {
    dispatch(actions.request());
  });

  return (
    <div className="App">
      <Websocket />
      <Test />
    </div>
  );
}

export default App;
