const express = require("express");
const app = express();
var cors = require("cors");
//const pool = require("./models/controller");

// const bodyParser = require("body-parser");
// const cors = require("cors");
//app.use(cors());
var corsOptions = {
  origin: "http://localhost:3000",
};
// Init Middleware
app.use(cors(corsOptions));
// // parse requests of content-type - application/json
// app.use(bodyParser.json());
// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/leaderboard", require("./routes/leaderboard"));
app.use("/api/trollbox", require("./routes/trollbox"));
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
