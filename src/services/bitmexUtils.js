import reduce from "lodash/reduce";
import flatMap from "lodash/flatMap";
import omit from "lodash/omit";
import includes from "lodash/includes";
import remove from "lodash/remove";
import trim from "lodash/trim";
import { isCompositeComponent } from "react-dom/test-utils";

import regexTest from "./bitmexRegex";

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

  //Html: /position xbtm20 <pre><code><img class="emoji" src="/assets/img/emoji/bitmex.png?v=1" /> XBTM20: -150,000 Cont @ 9489.4667 </code></pre>
  //Message: /position xbtusd im done trading for the day :) ``` :bitmex: XBTUSD: 40,001 Cont @ 9698.3804 ```
  //Message: /position xbtm20 ``` :bitmex: XBTM20: -150,000 Cont @ 9489.4667 ```
  //User:Yurlo
  // {trade.map((item) => item.map((value) => Object.keys(value)))}:

  //:bitmex: XBTM20: -150,000 Cont @ 9489.4667
  var trollBoxMessage = [];
  var transferData = [];
  var finishedData = [];
  var count = 0;

  flatMap(data, (item) =>
    transferData.push(
      omit(item, ["fromBot", "id", "channelID", "html", "date"])
    )
  );

  for (var item of transferData) {
    if (includes(item.message, "/position")) {
      trollBoxMessage.push(item.message);
    }
  }

  finishedData.push(regexTest(trollBoxMessage));
  console.log(finishedData);
  return trollBoxMessage;
};
