const express = require("express");
const { getCar, getBook, addCar, editCar, deleteCar } = require("../controller/vehController.js");
const { verifyToken, isAdmin } = require("../middleware.js");
const router = express.Router();

router.get("/",getCar);

router.get("/:id", getBook);

router.post("/add", verifyToken, isAdmin, addCar);

router.put("/update/:id", verifyToken, isAdmin, editCar);

router.delete("/delete/:id", verifyToken, isAdmin, deleteCar);

module.exports = router;