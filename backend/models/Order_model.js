const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');

// Define the TableBooking schema

const Item = mongoose.Schema({
    dish_id:{
        type:String,
        unique:true,
    },
    name:{
        type: String,
    },
    quantity:{
        type: String,
    },
    added_time:{
        type: String,
    },
    status:{
        type:String
    }
})

const OrderSchema = mongoose.Schema({
    order_id: {
        type: String,
        required: true,
        unique:true
    },
    amount: {
        type: String,
    },
    Tax:{
        type: String 
    },
    items:{
        type:[Item]
    }
});

// Create a model
const TableBookingModel = mongoose.model('TableBooking', OrderSchema);

module.exports = TableBookingModel;
