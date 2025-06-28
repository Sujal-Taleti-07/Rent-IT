const express = require("express");
const router = express.Router({ mergeParams: true });
const { createReview, showReview, deleteReview } = require("../controller/reviewController");
const { verifyToken } = require("../middleware");

router.post("/", verifyToken, createReview);

router.get("/", showReview);

router.delete("/:reviewId", verifyToken, deleteReview);

module.exports = router;