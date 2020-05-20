import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { open, close, selectors, actions, success } from "./websocketSlice";
import socket from "../../services/bitmex";
import styles from "../counter/Counter.module.css";
import ReactJsonRenderer from "react-json-component";

export const Test = ({}) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectors.isOpen);
  const isLog = useSelector(selectors.log);
  const trade = useSelector(selectors.trade);
  var charat = "/position bitmext: 4000 @ count";
  var res = charat.charAt(4);

  return (
    <div>
      {trade.length > 0
        ? trade.map((item) => {
            return (
              <div>
                <ul>
                  <li>{item}</li>
                </ul>
              </div>
            );
          })
        : "Null"}
      <h1> {charat.substring(18, 23)}</h1>
    </div>
  );
};
