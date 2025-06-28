const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  vehId:{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Vehicle", 
    required: true 
  },

  rating:{ 
    type: Number, 
    required: true, 
    min: 1, max: 5 
  },

  comment:{ 
    type: String, 
    required: true 
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },

  username:{
    type: String,
    required: true
  },

  profileImage: {
    type: String,
    default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsCQnZ53JFXMrfReLb0zZfNjzarQXw_nkKhA&s', // Default image
  },

  createdAt:{ 
    type: Date, 
    default: Date.now 
  },
});

module.exports = mongoose.model("Review", reviewSchema);
