// const { type } = require("@testing-library/user-event/dist/type");
const mongoose = require("mongoose");

const subOrderSchema = mongoose.Schema({
    order_id: {
        type: String,
        require: true
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
        enum: ["Order not Placed", "Order Placed", "Served", "Payment Completed"],
        default: "Order not Placed",
    },
    createdAt: { type: Date, default: Date.now },
});

// Create a model
const subOrder_model = mongoose.model("sub_order_queue", subOrderSchema);

module.exports = subOrder_model;