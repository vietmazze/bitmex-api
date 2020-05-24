//import reduce from "lodash/reduce";
import flatMap from "lodash/flatMap";
import omit from "lodash/omit";
import includes from "lodash/includes";
//import remove from "lodash/remove";
//import trim from "lodash/trim";
//import { isCompositeComponent } from "react-dom/test-utils";

import { regexTest } from "./bitmexRegex";

// Specific tables for authenticated api
export const noSymbolTables = [
  "account",
  "affiliate",
  "funds",
  "insurance",
  "margin",
  "transact",
  "wallet",
  "announcement",
  "connected",
  "chat",
  "publicNotifications",
  "privateNotifications",
];

export const transformData = (message) => {
  const { table, action, data } = message;

  //Message: /position xbtusd im done trading for the day :) ``` :bitmex: XBTUSD: 40,001 Cont @ 9698.3804 ```
  //Message: /position xbtm20 ``` :bitmex: XBTM20: -150,000 Cont @ 9489.4667 ```
  // {trade.map((item) => item.map((value) => Object.keys(value)))}:
  // "/position xbtusd 롱 살려주세요 다신 롱 안치겟습니다↵```↵:bitmex: XBTUSD: 2,000 Cont @ 9497.5781↵```"
  //{message: "/position xbtusd↵```↵:bitmex: XBTUSD: 9,500 Cont @ 9493.0701↵```", user: "Yurlo"}
  ///position xbtusd 7800간다고,Tytyrr
  var trollBoxMessage = [];
  var transferData = [];

  flatMap(data, (item) =>
    transferData.push(
      omit(item, ["fromBot", "id", "channelID", "html", "date"])
    )
  );

  if (includes(transferData[0].message, "/position")) {
    trollBoxMessage.push(transferData[0].message, transferData[0].user);
    console.log("NEW ENTRY AFTER PUSH IN" + trollBoxMessage);
  }
  console.log(
    "message: " + transferData[0].message,
    "user: " + transferData[0].user
  );
  return regexTest(trollBoxMessage);
  //return transferData;
};
