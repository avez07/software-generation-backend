const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()
const url = process.env.MONGODB_URL;
const connection = async () => {
  try {
    await mongoose.connect(url);
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Exit process with failure
  }
};
module.exports = connection
