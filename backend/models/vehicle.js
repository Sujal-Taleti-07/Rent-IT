const mongoose = require("mongoose");
const { model } = require("mongoose");

const vehSchema = mongoose.Schema({
    name: {
      type: String,
      required: true, // Ensure name is provided
      trim: true, // Remove extra spaces
      minlength: [3, 'Name should be at least 3 characters'], // Add validation
    },
    model: {
      type: String,
      required: true, // Ensure model is provided
      trim: true,
    },
    veh_num: {
      type: String,
      required: true,
      unique: true, // Ensure vehicle number is unique
      trim: true,
      maxlength: [10, 'Vehicle number should not exceed 10 characters'],
    },
    type: {
      type: String,
      required: true,
      enum: ['Car', 'Bike', 'Scooty', 'Bus', 'Mini Van', 'Electric Vehicle (EV)'], // Enum for limited types
    },
    seat: {
      type: Number,
      required: true,
      min: [1, 'Vehicle must have at least 1 seat'],
    },
    price: {
      type: Number,
      required: true,
      min: [500, 'Price must be at least 1'], // Price cannot be less than 1
    },
    image: {
      type: String,
      required: true, // Assuming image is stored as a base64 string or URL
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a 'User' model for referencing the creator
      required: true,
    },
});


const Vehicle = mongoose.model("Vehicle", vehSchema);

module.exports = Vehicle;