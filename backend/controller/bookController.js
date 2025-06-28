const { bookingVeh } = require("../helper/bookingVeh.js");
const { sendMail } = require("../helper/sendMail.js");
const Booking = require("../models/booking.js");

module.exports.createBooking = async (req, res) => {
  try {
    const bookingData = req.body;

    // Ensure user ID is provided
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const newBooking = new Booking({ ...bookingData, userId: req.user.id });
    await newBooking.save();
    sendMail(req.user.email, "Booking Details", "", bookingVeh(bookingData));

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({
      success: false,
      message: "Error creating booking",
      error: error.message || error,
    });
  }
};

module.exports.getAllBookings = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const bookings = await Booking.find({ userId: req.user.id }).populate("vehicleId");

    res.status(200).json({
      success: true,
      data: bookings,
      message: "Bookings fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching bookings",
      error: error.message || error,
    });
  }
};

module.exports.detailsBook = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate("vehicleId", "img");

    const formattedBookings = bookings.map((booking) => ({
      _id: booking._id,
      vehicleId: booking.vehicleId._id,
      vehicleName: booking.vehicleId.name,
      vehicleImg: booking.vehicleId.img, // Ensure vehicle image is available
      startDate: booking.startDate,
      endDate: booking.endDate,
      totalCost: booking.totalCost,
      tripType: booking.tripType,
      pickupLocation: booking.pickupLocation,
      dropLocation: booking.dropLocation,
      withDriver: booking.withDriver,
    }));

    res.json(formattedBookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// // Cancel a booking
// module.exports.deleteBook = async (req, res) => {
//   const { bookingId } = req.params;
//   try {
//     const booking = await Booking.findByIdAndDelete(bookingId);
//     console.log(booking);
//     if (!booking) return res.status(404).json({ message: "Booking not found" });
//     res.json({ message: "Booking cancelled successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to cancel booking", error });
//   }
// };
