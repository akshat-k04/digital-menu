const mongoose = require('mongoose');

// Define the TableBooking schema
const TableBookingSchema = mongoose.Schema({
    table_number: {
        type: Number,
        required: true
    },
    pincode:{
        type : String,
        // required:true 
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    customer_name: {
        type: String,
        required: true
    },
    customer_contact: {
        type: String,
    },
    order_id:{
        type:String,
    }
});

// Create a model
const TableBookingModel = mongoose.model('TableBooking', TableBookingSchema);

module.exports = TableBookingModel;
