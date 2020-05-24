const express = require("express");
const router = express.Router();

const leaderboard_model = require("../models/controller");

// @route   GET api/leaderboard
// @desc    GET all leaderboard users
router.get("/", (req, res) => {
  leaderboard_model
    .getLeader()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// @route   POST api/leaderboard/
router.post("/", (req, res) => {
  leaderboard_model
    .createLeader(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.put("/:id", (req, res) => {
  leaderboard_model
    .deleteLeader(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = router;
