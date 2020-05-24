import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "./websocketSlice";

export const Test = ({}) => {
  const dispatch = useDispatch();

  const trade = useSelector(selectors.trade);

  return (
    <div>
      {trade.length > 0
        ? trade.map((item) => {
            return (
              <div key={item.id}>
                <ul>
                  <li>User: {item.user}</li>
                  <li>Position: {item.position}</li>
                  <li>Entry: {item.entry}</li>
                </ul>
              </div>
            );
          })
        : "Null"}
    </div>
  );
};
