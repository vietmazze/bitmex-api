const key = require("../config/keys");
const fetchBitmex = require("../../worker/fetchBitmex");
const Pool = require("pg").Pool;
const pool = new Pool({
  user: key.user,
  host: key.host,
  database: key.database,
  password: key.password,
  port: key.port,
});
pool.on("error", () => console.log("Lost PG connection"));

// Functions to get/create/delete
const getLeader = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM  leaderboard ORDER BY id ASC", (err, res) => {
      if (err) {
        reject(err);
      }

      resolve(res.rows);
    });
  });
};

const createLeader = async (body) => {
  var data = await fetchBitmex.getAPI();
  var username = data.map((p) => p.name);
  var total_profit = data.map((p) => `'${p.total_profit}'`);
  var profit_7d = data.map((p) => `'${p.profit_7d}'`);
  var profit_24h = data.map((p) => `'${p.profit_24h}'`);
  return new Promise(function (resolve, reject) {
    pool.query(
      "INSERT INTO leaderboard (name) SELECT * FROM UNNEST(ARRAY[$1])",
      [username],
      // UNNEST(ARRAY[$2]), UNNEST(ARRAY[$3])::text, UNNEST(ARRAY[$4])::text, UNNEST(ARRAY[$5])::varchar()
      //, predicted_side,total_profit,profit_24h,profit_7d
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(username);
      }
    );
  });
};

const deleteLeader = (body) => {
  return new Promise(function (resolve, reject) {
    const { id } = parseInt(request.params.id);
    pool.query("DELETE FROM leaderboard WHERE id=$1", [id], (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(`A leader has been deleted: ${res.rows[0]}`);
    });
  });
};

module.exports = {
  getLeader,
  createLeader,
  deleteLeader,
};
