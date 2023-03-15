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

router.post('/exitpoint', async (req, res) => {
  try {
    // check is entry was made from this number plate
    const { distance, exitPoint, numberPlate } = req.body;
    const toll = await Toll.findOne({ numberPlate })
    if (!toll) return res.status(404).send('yo')

    // constants
    const distancePerKmRate = 0.2;
    const baseRate = 20;
    //distance Cost = perkm rate * distance
    const distanceCost = distancePerKmRate * (distance);
    res.send(distanceCost);
    

  } catch (err) {
    res.status(404).send(err.message)
  }
})

router.get("/getall", async (req, res) => {
  try {
    const tolls = await Toll.find({});
    res.send(tolls);
  } catch (err) {
    res.status(400).send(err);
  }
})


module.exports = router;