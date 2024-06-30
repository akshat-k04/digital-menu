const { type } = require("@testing-library/user-event/dist/type");
const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  order_id:{
    type:String,
    unique:true,
    require:true
  },
  customer_name: {
    type: String,
  },
  customer_contact: {
    type: String,
  },

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
    enum: ["Order not Placed","Order Placed", "Served","Payment Completed"],
    default: "Order not Placed",
  },
  createdAt: { type: Date, default: Date.now },
});

// Create a model
const Order_model = mongoose.model("Order_model", OrderSchema);

module.exports = Order_model;
// { "_id": { "$oid": "667c732ea6c89dc3a3a7f439" }, "name": "Dumplings", "image_url": "http://example.com/images/dumplings.jpg", "catagory": "Chinese", "price": { "$numberInt": "8" }, "__v": { "$numberInt": "0" } }