const mongoose = require("mongoose");
const express = require("express");
const Toll = mongoose.model("Toll");
const router = express.Router();

// routes

router.post("/entrypoint", async (req, res) => {
  try {
    const entrypoint = req.body.entrypoint 
    const day = req.body.day
    const numberPlate = req.body.numberPlate
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = router;
