const express = require("express");
const router = express.Router();

const trollbox_model = require("../models/trollboxControl");

// @route   GET api/trollb
// @desc    GET all trollbox users
router.get("/", (req, res) => {
  trollbox_model
    .getTrollbox()
    .then((response) => {
      res.status(200).send("WORK");
    })
    .catch((error) => {
      res.status(500).send("NOT WORK");
    });
});

// @route   POST api/trollbox/
router.post("/", (req, res) => {
  trollbox_model
    .createTrollbox(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.put("/:id", (req, res) => {
  trollbox_model
    .deleteTrollbox(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = router;
