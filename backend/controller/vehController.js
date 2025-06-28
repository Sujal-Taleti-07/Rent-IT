const express = require("express");
const Vehicle = require("../models/vehicle.js");


// View Cars
module.exports.getCar = async (req, res) => {
    try{
        const vehicle = await Vehicle.find();
        res.status(200).json(vehicle);   //200 for success
    }catch(e){
        res.send(e);
        res.status(500).json({ error: e.message });  //500 for internal server error  
    }
};


//Booking
module.exports.getBook = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



// Add a new car (Admin only)
module.exports.addCar = async (req, res) => {
  const { name, model, veh_num, type, seat, price, image } = req.body;

  try {
    const vehicle = new Vehicle({
      name, model, veh_num, type, seat, price, image, createdBy: req.user.id
    });
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    console.error(err);  // Log the error for debugging purposes
    res.status(500).json({ message: 'Error adding Vehicle' });
  }
};


// Update car details (Admin only)
module.exports.editCar = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: 'Error updating Vehicle' });
  }
};

// Delete car (Admin only)
module.exports.deleteCar = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json({ message: 'Vehicle deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting Vehicle' });
  }
};

