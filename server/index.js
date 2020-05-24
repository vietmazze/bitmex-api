const express = require("express");
const app = express();

// const bodyParser = require("body-parser");
// const cors = require("cors");

// var corsOptions = {
//   origin: "http://localhost:3001",
// };
// Init Middleware
// app.use(cors(corsOptions));
// // parse requests of content-type - application/json
// app.use(bodyParser.json());
// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/leaderboard", require("./routes/leaderboard"));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
