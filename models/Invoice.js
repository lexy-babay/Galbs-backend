// models/invoice.js
const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceNumber:      { type: String, required: true, unique: true },
  trackingNumber:     { type: String, required: true, unique: true },
  date:               { type: String, required: true },
  customerName:       { type: String, required: true },
  email:              String,
  dropOffPhone:       String,
  departureDate:      String,
  arrivalDate:        String,
  pickupAddress:      String,
  dropOffAddress:     String,
  packageDescription: String,
  amountPaid:         Number,
  discount:           Number,
  status:             { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);
