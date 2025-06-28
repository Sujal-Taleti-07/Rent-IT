// const mongoose = require('mongoose');
// const User = require('./models/user');  // Your User model

// const createDefaultAdmin = async () => {
//   try {
//     const existingAdmin = await User.findOne({ role: 'admin' });
//     if (existingAdmin) {
//       console.log('Admin already exists!');
//       return;
//     }

//     // Create the default admin user
//     const adminUser = new User({
//       username: 'admin',  // Set your default admin username here
//       email: "admin@gmail.com",
//       mobile: 1111111111,
//       password: 'admin123',  // Set a secure password for your admin
//       role: 'admin'
//     });

//     // Save the admin user to the database
//     await adminUser.save();
//     console.log('Default admin created!');
//   } catch (error) {
//     console.error('Error creating default admin:', error);
//   }
// };

// // Run the function on server startup
// createDefaultAdmin();

