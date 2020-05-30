const key = require("../config/keys");
const fetchBitmex = require("../../worker/fetchBitmex");
const Pool = require("pg").Pool;
const pool = async () => {
  try {
    await new Pool({
      user: key.user,
      host: key.host,
      database: key.database,
      password: key.password,
      port: key.port,
    });
  } catch (err) {
    pool.on("error", () => console.log("Lost PG connection"));
  }
};

module.exports = pool;
// // Functions to get/create/delete
// const getLeader = () => {
//   return new Promise(function (resolve, reject) {
//     pool.query("SELECT * FROM  leaderboard ORDER BY id ASC", (err, res) => {
//       if (err) {
//         reject(err);
//       }

//       resolve(res.rows);
//     });
//   });
// };

// const createLeader = async (body) => {
//   var data = await fetchBitmex.getAPI();

//   return new Promise(function (resolve, reject) {
//     data.map((item) =>
//       pool.query(
//         "INSERT INTO leaderboard (name,predicted_side,total_profit,profit_24h,profit_7d) VALUES ($1,$2,$3,$4,$5) RETURNING name;",
//         [
//           item.name,
//           item.predicted_side,
//           item.total_profit,
//           item.profit_24h,
//           item.profit_7d,
//         ],

//         // UNNEST(ARRAY[$2]), UNNEST(ARRAY[$3])::text, UNNEST(ARRAY[$4])::text, UNNEST(ARRAY[$5])::varchar()
//         //, predicted_side,total_profit,profit_24h,profit_7d
//         (err, res) => {
//           if (err) {
//             reject(err);
//           }
//           resolve(res.rows[0]);
//         }
//       )
//     );
//   });
// };

// const deleteLeader = (body) => {
//   return new Promise(function (resolve, reject) {
//     const { id } = parseInt(request.params.id);
//     pool.query("DELETE FROM leaderboard WHERE id=$1", [id], (err, res) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(`A leader has been deleted: ${res.rows[0]}`);
//     });
//   });
// };

// module.exports = {
//   getLeader,
//   createLeader,
//   deleteLeader,
// };
