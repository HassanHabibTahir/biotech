    // event delegation
    // deep copy and shallow copy
    const mongoose = require('mongoose');

// MongoDB connection URI
// const uri = 'mongodb://localhost:27017/microservices'; // Change this to your MongoDB URI
const uri = "mongodb+srv://nftthee:nftthee@cluster0.hov9i7k.mongodb.net/"
// Function to connect to MongoDB
const connectToMongoDB = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(uri, { })
      .then(() => {
        console.log('Connected to MongoDB successfully');
        resolve(mongoose); // Resolve the promise with the mongoose instance
      })
      .catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
        reject(err); // Reject the promise with the error
      });
  });
};

module.exports = connectToMongoDB;
