const mongoose = require("mongoose");

// Define the TableBooking schema
const TableBookingSchema = mongoose.Schema({
  table_number: {
    type: Number,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
  capacity: { type: Number, required: true },
});

// Create a model
const TableBookingModel = mongoose.model("TableBooking", TableBookingSchema);

module.exports = TableBookingModel;
