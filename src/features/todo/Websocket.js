import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { open, close, selectors, actions, success } from "./websocketSlice";
import socket from "../../services/bitmex";
import styles from "../counter/Counter.module.css";
export function Websocket() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectors.isOpen);
  const isLog = useSelector(selectors.log);
  const trade = useSelector(selectors.trade);
  React.useEffect(() => {
    socket.open();

    socket.addEventListener("open", () => {
      dispatch(open("OPEN"));
      console.debug("Connection to Deribit opened");
    });

    socket.addEventListener(
      "close",
      () => {
        dispatch(close());
        console.debug("Connection to Bitmex closed");
      },
      { once: true }
    );

    return () => {
      console.log("Closing connection to Bitmex");
      socket.close();
    };
  }, [dispatch]);

  // if (trade != null) {
  //   return (
  //     <div>
  //       <ul>
  //         {Object.keys(trade).map((sub, index) => (
  //           <li key={index}></li>
  //         ))}
  //       </ul>
  //     </div>
  //   );
  // }

  return (
    <div>
      <button
        className={styles.button}
        onClick={() => dispatch(open("Online"))}
      >
        Open
      </button>
      <br />
      {isOpen ? isLog : "Connecting..."}
      <br />
      <button className={styles.button} onClick={() => dispatch(close())}>
        Close
      </button>
      <br />
    </div>
  );
}
