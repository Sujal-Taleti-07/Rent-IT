const mongoose = require("mongoose");
const { model } = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    mobile: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});


module.exports = mongoose.model('User', userSchema);
