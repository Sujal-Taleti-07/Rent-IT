const express = require("express");
const { createBooking, getAllBookings, deleteBook, detailsBook} = require("../controller/bookController.js");
const { verifyToken }  = require("../middleware.js");

const router = express.Router();

// Create a booking
router.post("/", verifyToken, createBooking);

// Get all bookings
router.get("/", verifyToken, getAllBookings);

// Get bookings details
router.get('/:id', verifyToken, detailsBook);

// router.delete("/:id", verifyToken, deleteBook);

module.exports = router;