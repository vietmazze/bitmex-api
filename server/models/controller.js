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
  //console.log(data);
  return new Promise(function (resolve, reject) {
    const { name, total_profit } = body;
    pool.query(
      "INSERT INTO leaderboard (name, predicted_side,total_profit,profit_24h,profit_7d) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [name, "Short", total_profit, "0.98", "254"],
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(`A new leader has been added: ${res.rows[0]}`);
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
