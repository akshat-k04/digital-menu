const mongoose = require('mongoose');


const restaurant_detail = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    is_employee:{
        type: Boolean,
        required: true 
    }
});


//lets create a model
const restaurant_model = mongoose.model('restaurant_detail', restaurant_detail);

module.exports = restaurant_model;