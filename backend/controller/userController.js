const User = require("../models/user.js");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { sendMail } = require("../helper/sendMail.js");
const { registerEmail } = require("../helper/registerEmail.js");

module.exports.register = async(req, res) => {
    try {
        const { username, email, mobile, password } = req.body;
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"User Already exists"})
        }

        const hashPassword = await bcryptjs.hash(password,10);   //salt value is 10

        const createdUser = new User({
            username: username, 
            email: email, 
            mobile: mobile,
            password: hashPassword,
        });
        await createdUser.save();
        sendMail(email, "Welcome to RentIt", "", registerEmail(username));
        res.status(201).json({ message:"User Created succefully" })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message:"Internal server error" })
    }
}


// Login route
module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid)
            return res.status(400).json({ message: 'Invalid credentials' });

        // Create JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET, // Your secret key
            { expiresIn: "1h" }
        );

        res.status(200).json({ token, user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


