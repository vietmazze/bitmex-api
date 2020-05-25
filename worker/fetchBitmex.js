const fetch = require("node-fetch");

const url = "https://testnet.bitmex.com/api/v1/leaderboard?method=ROE";

var data = [];
const getAPI = async (url) => {
  try {
    const response = await fetch(url);
    json = await response.json();
    json.map(async (item) => await fixing(item));
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fixing = (item) => {
  try {
    var predicted_side = "Long";
    var profit_24h = item.profit * 3.14;
    var profit_7d = profit_24h * 7;

    data.push({
      name: item.name,
      predicted_side,
      total_profit: item.profit,
      profit_24h,
      profit_7d,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAPI };
