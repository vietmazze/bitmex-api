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
const getTrollbox = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM  trollbox ORDER BY id ASC", (err, res) => {
      if (err) {
        reject(err);
      }

      resolve(res.rows);
    });
  });
};

const createTrollbox = async (body) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "INSERT INTO trollbox (name,position,entry,direction) VALUES ($1,$2,$3,$4) RETURNING *;",
      [body.name, body.position, body.entry, body.direction],

      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      }
    );
  });
};

const deleteTrollbox = (body) => {
  return new Promise(function (resolve, reject) {
    const { id } = parseInt(request.params.id);
    pool.query("DELETE FROM trollbox WHERE id=$1", [id], (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(`A leader has been deleted: ${res.rows[0]}`);
    });
  });
};

module.exports = {
  getTrollbox,
  createTrollbox,
  deleteTrollbox,
};
