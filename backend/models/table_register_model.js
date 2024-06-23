const mongoose = require('mongoose');

// Define the TableBooking schema
const TableRegisterSchema = mongoose.Schema({
    table_number: {
        type: Number,
        required: true,
        unique: true,
    },
    pincode:{
        type: String,
        required: true 
    },
    order_id: {
        type: String,
        required: true,
        unique: true
    },
});

// Create a model
const TableRegisterModel = mongoose.model('TableRegister', TableRegisterSchema);

module.exports = TableRegisterModel;
