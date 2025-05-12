// dbconnect/dbconfig.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // In Mongoose 6+, the defaults already use the new parser and topology engine.
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/galb-system');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
