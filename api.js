const express = require("express");
const router = express.Router();
const BookingService = require("../services/BookingService");
const PricingService = require("../services/PricingService");

// Get real-time price
router.get("/price", async (req, res) => {
  const area = {
    minLat: parseFloat(req.query.minLat),
    maxLat: parseFloat(req.query.maxLat),
    minLng: parseFloat(req.query.minLng),
    maxLng: parseFloat(req.query.maxLng)
  };
  const price = await PricingService.calculatePrice(area);
  res.json({ price });
});

// Create booking
router.post("/book", (req, res) => {
  const booking = BookingService.createBooking(req.body.location);
  res.json(booking);
});

// Update driver location
router.post("/driver/:id/location", (req, res) => {
  const driver = DriverService.updateDriverLocation(
    req.params.id,
    req.body.location
  );
  res.json(driver);
});

module.exports = router;