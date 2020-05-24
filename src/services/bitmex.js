import ReconnectingWebsocket from "./reconnecting-websocket";
import { transformData } from "./bitmexUtils";
import isEmpty from "lodash/isEmpty";
const endpoints = {
  production: "wss://www.bitmex.com/realtime",
  testnet: "wss://testnet.bitmex.com/realtime",
};

const socket = new ReconnectingWebsocket(endpoints.production, null, {
  automaticOpen: false,
});

socket.addEventListener("message", (event) => {
  const e = new CustomEvent("json");
  e.data = JSON.parse(event.data);

  if (isEmpty(e.data.data)) return;
  e.data = transformData(e.data);

  socket.dispatchEvent(e);
});

socket.addEventListener("open", (event) => {});
socket.addEventListener("json", (event) => {});

export const call = (request, { timeout = 10000 } = {}) =>
  new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      op: request.op,
      args: request.args,
    });

    function callback(event) {
      // if message is empty, dont promise resolve

      //socket.removeEventListener("message", callback);
      if (isEmpty(event.data)) return;

      return resolve(event.data);
    }

    // If connection is open send, otherwise wait for connection to open;
    if (socket.readyState === 1) {
      socket.send(payload);
    } else {
      // Connection opened
      socket.addEventListener("open", () => socket.send(payload), {
        once: true,
      });
    }

    socket.addEventListener("json", callback);
  });

export default socket;
