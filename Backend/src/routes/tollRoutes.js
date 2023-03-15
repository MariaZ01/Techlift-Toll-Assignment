const mongoose = require("mongoose");
const express = require("express");

const Toll = mongoose.model("Toll");
const router = express.Router();

// routes

router.post("/entrypoint", async (req, res) => {
  try {
    // inputs
    const { entryPoint, day, numberPlate } = req.body;

    // entry in database
    const entry = new Toll({ entryPoint, day, numberPlate });
    await entry.save();

    // output
    res.send(entry)
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = router;
