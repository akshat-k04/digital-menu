const { type } = require("@testing-library/user-event/dist/type");
const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  amount: {
    type: String,
  },
  Tax: {
    type: String,
  },
  items: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dishes",
        required: true,
      },
      quantity: { type: Number, required: true },
      specialInstructions: { type: String },
    },
  ],
  status: {
    type: String,
    enum: ["Placed", "done"],
    default: "Placed",
  },
  createdAt: { type: Date, default: Date.now },
});

// Create a model
const TableBookingModel = mongoose.model("TableBooking", OrderSchema);

module.exports = TableBookingModel;
