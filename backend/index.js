require('dotenv').config();

const express = require("express");
const ExpressError = require("../backend/utils/ExpressError.js")
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const carRoute = require("../backend/router/vehicle.js");
const userRoute = require("../backend/router/user.js");
const bookRoute = require("../backend/router/book.js");
const reviewRoute = require("../backend/router/review.js");
const paymentRoute = require("../backend/router/payment.js");

var cors = require('cors');

const app = express();

app.use(cors());   //middleware for axios 
app.use(express.json());   //parsing to json


const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI

// connect MongoDB
try{
    mongoose.connect(URI, {});
    console.log("connected to database");
}catch(e){
    console.log("Error : ", e)
}

// defining routes
app.use("/cars", carRoute);

app.use("/user", userRoute);

app.use("/bookings", bookRoute);

app.use("/cars/:id/reviews", reviewRoute);
  
app.use("/payment", paymentRoute);

//Page Not Found 
// means if we route another page that is not in above route then it will show an error
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})