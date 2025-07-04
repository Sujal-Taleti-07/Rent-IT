const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
    },

    paymentId: {
        type: String,
        required: true,
    },

    signature: {
        type: String,
        required:true,
    },

    amount: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        enum: ["Pending", "Success", "Failed"],
        default: "Pending",
    },

    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

module.exports = mongoose.model("Payment", paymentSchema);
