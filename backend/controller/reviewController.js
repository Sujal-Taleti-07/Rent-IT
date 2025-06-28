const Review = require("../models/review");
const User = require("../models/user.js");

module.exports.createReview = async (req, res) => {
  const { id } = req.params; // Extract vehicle ID from URL
  const { rating, comment } = req.body;
  const userId = req.user?.id; // Ensure user is authenticated

  if (!id) {
    return res.status(400).json({ message: "Vehicle ID is required in the URL." });
  }

  if (!rating || !comment) {
    return res.status(400).json({ message: "Rating and comment are required." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const newReview = new Review({
      vehId: id,  // Ensure vehId is properly assigned
      rating,
      comment,
      user: userId,
      username: user.username,
      profileImage: Review.profileImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsCQnZ53JFXMrfReLb0zZfNjzarQXw_nkKhA&s",
    });

    await newReview.save();
    res.status(201).json({ message: "Review added successfully!", data: newReview });
  } catch (error) {
    console.error("Error saving review:", error);
    res.status(500).json({ message: "Failed to save review." });
  }
};


// GET: Fetch reviews for a car
module.exports.showReview = async (req, res) => {
      const { id } = req.params;
      
        try {
          const reviews = await Review.find({ vehId: id });
          res.status(200).json({ data: reviews });
        } catch (error) {
          console.error("Error fetching reviews:", error);
          res.status(500).json({ message: "Failed to fetch reviews." });
        }
};


module.exports.deleteReview = async (req, res) => {
  const reviewId = req.params.reviewId;
    const userId = req.user.id;
  
    try {
      const review = await Review.findById(reviewId);
  
      if (!review) {
        return res.status(404).json({ message: "Review not found." });
      }
  
      if (review.user.toString() !== userId) {
        return res.status(403).json({ message: "Unauthorized to delete this review." });
      }
  
      await Review.findByIdAndDelete(reviewId);
      res.status(200).json({ message: "Review deleted successfully!" });
    } catch (error) {
      console.error("Error deleting review:", error);
      res.status(500).json({ message: "Failed to delete review." });
    }
}
