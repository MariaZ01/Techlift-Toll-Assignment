const mongoose = require("mongoose");
const express = require("express");

const Toll = mongoose.model("Toll");
const router = express.Router();

// routes

router.post("/entrypoint", async (req, res) => {
  try {
    // inputs
    const { entryPoint, day, numberPlate } = req.body;

    // Number Plate in LLL-NNN format

    const tollnumberPlate = req.body.numberPlate;

    // Check if the number plate matches the LLL-NNN format

    const regex = /^[A-Z]{3}-\d{3}$/;
    if (!regex.test(numberPlate)) {
      res.status(400).json({ message: "Invalid number plate format" });
    } else {
      // Process the valid number plate as needed
      res.json({ message: "Number plate accepted" });
    }

    // create new entry in database and store it
    const entry = new Toll({ entryPoint, day, numberPlate });
    await entry.save();

    // output
    res.send(entry);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.post("/exitpoint", async (req, res) => {
  try {
    // check is entry was made from this number plate
    const { distance, exitPoint, numberPlate } = req.body;
    const toll = await Toll.findOne({ numberPlate });
    if (!toll) return res.status(404).send("No entry was made");

    // constants
    const distancePerKmRate = 0.2;
    const baseRate = 20;
    //distance Cost = perkm rate * distance
    const distanceCost = distancePerKmRate * distance;
    // weekends
    const isweekend =
      toll.day.toLowerCase() == "saturday" ||
      toll.day.toLowerCase() == "sunday";
    // Special Discount
    const specialDiscountDays = ["Wednesday"];
    const getDayOfWeek = (dateString) => {
      const date = new Date(dateString);
      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
      return dayOfWeek;
    };
    //Base Cost
    const baseCost = distanceCost + baseRate;
    // Final Cost
    const FinalCost = baseCost * (isweekend ? 1.5 : 1);
    // Discounted FInal Cost
    const dayOfWeek = getDayOfWeek(Toll.day);
    if (specialDiscountDays.includes(dayOfWeek)) {
    const FinalCost = FinalCost - (FinalCost * 0.1);
    }
    
    toll.distance = distance;
    toll.exitPoint = exitPoint;
    toll.cost = FinalCost;
    toll.save();
    res.send({ toll });
  } catch (err) {
    res.status(404).send(err.message);
  }
});
router.get("/tolls", async (req, res) => {
  try {
    // get all entries in toll
    const tolls = await Toll.find({});
    res.send(tolls);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.delete("/deleteEntry/:id", async (req, res) => {
  try {
    const delEntry = await Toll.findByIdAndDelete(req.params.id);
    if (!delEntry) {
      return res.status(404).send("Entry has been deleted");
    }
    res.send(delEntry);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
