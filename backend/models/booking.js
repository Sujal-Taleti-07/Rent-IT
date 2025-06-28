const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  vehicleId:{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Vehicle", 
    required: true 
  },

  userId:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },

  vehicleName:{ 
    type: String, 
    required: true 
  },

  vehicleNumber:{
    type: String,
  },

  vehicleImg: {
    type: String
  },

  startDate:{ 
    type: Date, 
    required: true
  },

  endDate:{ 
    type: Date, 
    required: true 
  },

  tripType:{ 
    type: String, 
    enum: ["single", "round"], 
    required: true 
  },

  pickupLocation:{ 
    type: String, 
    required: true 
  },

  dropLocation:{ 
    type: String, 
    required: true 
  },

  pickupTime:{ 
    type: String, 
    required: true 
  },

  totalCost:{ 
    type: Number, 
    required: true 
  },

  withDriver:{
    type: Boolean, 
    default: false 
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
